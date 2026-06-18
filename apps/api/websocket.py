import asyncio
import json
import logging
import threading
from typing import Literal

import time

import redis
from fastapi import WebSocket, WebSocketDisconnect
from pydantic import BaseModel

from apps.api.config import settings
from apps.api.queue import enqueue_job, get_blocking_redis_client

logger = logging.getLogger(__name__)


class CalculateMessage(BaseModel):
    type: Literal["calculate"]
    requestId: str
    restaurantId: str
    metric: Literal["distance", "time"]
    lat: float
    lng: float


class ConnectionManager:
    def __init__(self) -> None:
        self._connections: set[WebSocket] = set()
        self._lock = asyncio.Lock()

    async def connect(self, websocket: WebSocket) -> None:
        await websocket.accept()
        async with self._lock:
            self._connections.add(websocket)

    async def disconnect(self, websocket: WebSocket) -> None:
        async with self._lock:
            self._connections.discard(websocket)

    async def broadcast(self, message: dict) -> None:
        payload = json.dumps(message)
        async with self._lock:
            connections = list(self._connections)

        if not connections:
            logger.warning("No active WebSocket connections to broadcast result")
            return

        stale: list[WebSocket] = []
        for connection in connections:
            try:
                await connection.send_text(payload)
            except Exception:
                stale.append(connection)

        if stale:
            async with self._lock:
                for connection in stale:
                    self._connections.discard(connection)


manager = ConnectionManager()


def _sync_pubsub_loop(loop: asyncio.AbstractEventLoop) -> None:
    while True:
        client = get_blocking_redis_client()
        pubsub = client.pubsub(ignore_subscribe_messages=True)

        try:
            pubsub.subscribe(settings.delivery_results_channel)
            logger.info("Subscribed to Redis channel %s", settings.delivery_results_channel)

            for message in pubsub.listen():
                if message.get("type") != "message":
                    continue

                data = message.get("data")
                if not data:
                    continue

                try:
                    payload = json.loads(data)
                except json.JSONDecodeError:
                    logger.warning("Invalid pub/sub payload: %s", data)
                    continue

                asyncio.run_coroutine_threadsafe(
                    manager.broadcast({"type": "result", **payload}),
                    loop,
                )
        except redis.RedisError as exc:
            logger.warning("Redis pub/sub error, reconnecting: %s", exc)
        finally:
            try:
                pubsub.close()
            except redis.RedisError:
                pass
            try:
                client.close()
            except redis.RedisError:
                pass

        time.sleep(2)


async def listen_for_results() -> None:
    loop = asyncio.get_running_loop()
    thread = threading.Thread(
        target=_sync_pubsub_loop,
        args=(loop,),
        daemon=True,
        name="redis-pubsub-listener",
    )
    thread.start()

    try:
        while thread.is_alive():
            await asyncio.sleep(1)
    except asyncio.CancelledError:
        logger.info("Stopping Redis pub/sub listener")


async def delivery_websocket(websocket: WebSocket) -> None:
    await manager.connect(websocket)
    await websocket.send_json({"type": "connected"})

    try:
        while True:
            raw = await websocket.receive_text()
            try:
                data = json.loads(raw)
            except json.JSONDecodeError:
                await websocket.send_json(
                    {"type": "error", "requestId": "", "message": "Invalid JSON"}
                )
                continue

            if data.get("type") != "calculate":
                await websocket.send_json(
                    {
                        "type": "error",
                        "requestId": data.get("requestId", ""),
                        "message": "Unsupported message type",
                    }
                )
                continue

            try:
                message = CalculateMessage.model_validate(data)
            except Exception as exc:
                await websocket.send_json(
                    {
                        "type": "error",
                        "requestId": data.get("requestId", ""),
                        "message": str(exc),
                    }
                )
                continue

            enqueue_job(message.model_dump())
            await websocket.send_json(
                {"type": "queued", "requestId": message.requestId}
            )
    except WebSocketDisconnect:
        pass
    finally:
        await manager.disconnect(websocket)
