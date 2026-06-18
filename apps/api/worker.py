import json
import logging
import time

import redis

from apps.api.config import settings
from apps.api.queue import get_blocking_redis_client, publish_result
from apps.api.services.delivery_calculation import calculate_delivery_metrics

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

RECONNECT_DELAY_SECONDS = 2


def metric_response_key(metric: str) -> str:
    return "distance" if metric == "distance" else "estimatedTime"


def process_job(payload: dict, client: redis.Redis) -> None:
    restaurant_id = payload["restaurantId"]
    lat = payload["lat"]
    lng = payload["lng"]
    metric = payload["metric"]

    metrics = calculate_delivery_metrics(
        restaurant_id=restaurant_id,
        lat=lat,
        lng=lng,
        weather=payload["weather"],
        traffic=payload["traffic"],
        time_of_day=payload["timeOfDay"],
        vehicle=payload["vehicle"],
    )
    value = metrics[metric_response_key(metric)]

    publish_result(
        {
            "requestId": payload["requestId"],
            "restaurantId": restaurant_id,
            "metric": metric,
            "value": value,
        },
        client=client,
    )


def run_worker() -> None:
    logger.info("Worker started, waiting for jobs on %s", settings.delivery_queue_key)

    while True:
        client = get_blocking_redis_client()

        try:
            while True:
                try:
                    result = client.brpop(settings.delivery_queue_key, timeout=0)
                except redis.RedisError as exc:
                    logger.warning("Redis BRPOP failed: %s", exc)
                    break

                if result is None:
                    continue

                _, raw_payload = result
                payload = json.loads(raw_payload)
                logger.info(
                    "Processing job %s for %s",
                    payload.get("requestId"),
                    payload.get("metric"),
                )

                try:
                    process_job(payload, client)
                except Exception:
                    logger.exception(
                        "Failed to process job %s",
                        payload.get("requestId"),
                    )
        finally:
            try:
                client.close()
            except redis.RedisError:
                pass

        logger.info("Reconnecting to Redis in %ss...", RECONNECT_DELAY_SECONDS)
        time.sleep(RECONNECT_DELAY_SECONDS)


if __name__ == "__main__":
    run_worker()
