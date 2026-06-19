from pathlib import Path
from typing import Any

import joblib
import pandas as pd

from apps.api.catalog import get_restaurant_by_id
from apps.api.config import settings
from apps.api.services.geo import haversine_km
from food_delivery_ml.features.feature_engineering import (
    create_interactions,
    create_peak_hours,
    map_ordinal_traffic,
)
from food_delivery_ml.utils.constants import FEATURE_COLUMNS

_metrics_cache: dict[tuple, dict[str, str]] = {}
_model_cache: dict[str, Any] = {}


def _get_pipeline(model: str) -> Any:
    if model not in _model_cache:
        path = Path(settings.models_dir) / f"{model}_model.pkl"
        if not path.is_file():
            project_root = Path(__file__).resolve().parents[3]
            path = project_root / path
        _model_cache[model] = joblib.load(path)
    return _model_cache[model]


def _predict(features: dict, model: str) -> float:
    pipeline = _get_pipeline(model)
    raw = pd.DataFrame([features])
    df = map_ordinal_traffic(raw)
    df = create_peak_hours(df)
    df = create_interactions(df)
    x = df[FEATURE_COLUMNS]
    return float(pipeline.predict(x)[0])


def _cache_key(
    restaurant_id: str,
    lat: float,
    lng: float,
    weather: str,
    traffic: str,
    time_of_day: str,
    vehicle: str,
    model: str,
) -> tuple:
    return (
        restaurant_id,
        round(lat, 4),
        round(lng, 4),
        weather,
        traffic,
        time_of_day,
        vehicle,
        model,
    )


def calculate_delivery_metrics(
    restaurant_id: str,
    lat: float,
    lng: float,
    weather: str,
    traffic: str,
    time_of_day: str,
    vehicle: str,
    model: str = "linear",
) -> dict[str, str]:
    key = _cache_key(restaurant_id, lat, lng, weather, traffic, time_of_day, vehicle, model)
    cached = _metrics_cache.get(key)
    if cached is not None:
        return cached

    restaurant = get_restaurant_by_id(restaurant_id)
    if restaurant is None:
        raise ValueError(f"Restaurant not found: {restaurant_id}")

    distance_km = haversine_km(lat, lng, restaurant["lat"], restaurant["lng"])

    minutes = _predict(
        {
            "Distance_km": distance_km,
            "Weather": weather,
            "Traffic_Level": traffic,
            "Time_of_Day": time_of_day,
            "Vehicle_Type": vehicle,
            "Preparation_Time_min": restaurant["preparationTimeMin"],
            "Courier_Experience_yrs": restaurant["courierExperienceYrs"],
        },
        model=model,
    )

    result = {
        "distance": f"{distance_km:.1f} km".replace(".", ","),
        "estimatedTime": f"{max(1, round(minutes))} min",
    }
    _metrics_cache[key] = result
    return result
