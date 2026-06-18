from apps.api.catalog import get_restaurant_by_id
from apps.api.config import settings
from apps.api.services.geo import haversine_km
from food_delivery_ml.inference.predict import load_model, predict_delivery_time_min

_metrics_cache: dict[tuple, dict[str, str]] = {}
_model_loaded = False


def _ensure_model_loaded() -> None:
    global _model_loaded
    if not _model_loaded:
        load_model(settings.model_path)
        _model_loaded = True


def _cache_key(
    restaurant_id: str,
    lat: float,
    lng: float,
    weather: str,
    traffic: str,
    time_of_day: str,
    vehicle: str,
) -> tuple:
    return (
        restaurant_id,
        round(lat, 4),
        round(lng, 4),
        weather,
        traffic,
        time_of_day,
        vehicle,
    )


def calculate_delivery_metrics(
    restaurant_id: str,
    lat: float,
    lng: float,
    weather: str,
    traffic: str,
    time_of_day: str,
    vehicle: str,
) -> dict[str, str]:
    key = _cache_key(restaurant_id, lat, lng, weather, traffic, time_of_day, vehicle)
    cached = _metrics_cache.get(key)
    if cached is not None:
        return cached

    restaurant = get_restaurant_by_id(restaurant_id)
    if restaurant is None:
        raise ValueError(f"Restaurant not found: {restaurant_id}")

    distance_km = haversine_km(lat, lng, restaurant["lat"], restaurant["lng"])

    _ensure_model_loaded()
    minutes = predict_delivery_time_min(
        {
            "Distance_km": distance_km,
            "Weather": weather,
            "Traffic_Level": traffic,
            "Time_of_Day": time_of_day,
            "Vehicle_Type": vehicle,
            "Preparation_Time_min": restaurant["preparationTimeMin"],
            "Courier_Experience_yrs": restaurant["courierExperienceYrs"],
        }
    )

    result = {
        "distance": f"{distance_km:.1f} km".replace(".", ","),
        "estimatedTime": f"{max(1, round(minutes))} min",
    }
    _metrics_cache[key] = result
    return result
