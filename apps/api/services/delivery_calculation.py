import random
import time


def calculate_delivery_metrics(
    restaurant_id: str,
    lat: float,
    lng: float,
) -> dict[str, str]:
    _ = restaurant_id, lat, lng
    time.sleep(random.uniform(0.05, 0.2))
    distance_value = f"{random.uniform(0.5, 5.0):.1f} km".replace(".", ",")
    time_value = f"{random.randint(10, 45)} min"
    return {
        "distance": distance_value,
        "estimatedTime": time_value,
    }
