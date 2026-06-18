import json
from typing import Any

import redis

from apps.api.config import settings


def get_redis_client() -> redis.Redis:
    return redis.from_url(
        settings.redis_url,
        decode_responses=True,
        socket_timeout=5,
        socket_connect_timeout=5,
        retry_on_timeout=True,
        health_check_interval=30,
    )


def get_blocking_redis_client() -> redis.Redis:
    return redis.from_url(
        settings.redis_url,
        decode_responses=True,
        socket_timeout=None,
        socket_connect_timeout=5,
        retry_on_timeout=True,
    )


def enqueue_job(payload: dict[str, Any]) -> None:
    client = get_redis_client()
    client.lpush(settings.delivery_queue_key, json.dumps(payload))


def publish_result(payload: dict[str, Any], client: redis.Redis | None = None) -> None:
    redis_client = client or get_redis_client()
    redis_client.publish(settings.delivery_results_channel, json.dumps(payload))
