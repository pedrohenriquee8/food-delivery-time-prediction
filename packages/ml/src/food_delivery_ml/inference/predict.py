from pathlib import Path

import joblib
import pandas as pd

from food_delivery_ml.features.feature_engineering import (
    create_interactions,
    create_peak_hours,
    map_ordinal_traffic,
)
from food_delivery_ml.utils.constants import FEATURE_COLUMNS

_pipeline = None
_model_path: Path | None = None


def _resolve_model_path(model_path: str | Path) -> Path:
    path = Path(model_path)
    if path.is_file():
        return path

    project_root = Path(__file__).resolve().parents[5]
    candidate = project_root / path
    if candidate.is_file():
        return candidate

    raise FileNotFoundError(f"Model file not found: {model_path}")


def load_model(model_path: str | Path) -> None:
    global _pipeline, _model_path
    resolved = _resolve_model_path(model_path)
    _pipeline = joblib.load(resolved)
    _model_path = resolved


def _get_pipeline():
    if _pipeline is None:
        raise RuntimeError("Model not loaded. Call load_model() first.")
    return _pipeline


def predict_delivery_time_min(features: dict) -> float:
    raw = pd.DataFrame([features])
    df = map_ordinal_traffic(raw)
    df = create_peak_hours(df)
    df = create_interactions(df)
    x = df[FEATURE_COLUMNS]
    prediction = _get_pipeline().predict(x)
    return float(prediction[0])
