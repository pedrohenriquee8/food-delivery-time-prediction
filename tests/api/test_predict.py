from pathlib import Path

import pytest

from food_delivery_ml.inference.predict import load_model, predict_delivery_time_min

PROJECT_ROOT = Path(__file__).resolve().parents[2]
MODEL_PATH = PROJECT_ROOT / "artifacts" / "models" / "linear_model.pkl"


@pytest.fixture(scope="module")
def loaded_model():
    load_model(MODEL_PATH)
    yield


def test_predict_delivery_time_min_returns_positive_float(loaded_model):
    minutes = predict_delivery_time_min(
        {
            "Distance_km": 7.93,
            "Weather": "Windy",
            "Traffic_Level": "Low",
            "Time_of_Day": "Afternoon",
            "Vehicle_Type": "Scooter",
            "Preparation_Time_min": 12,
            "Courier_Experience_yrs": 1.0,
        }
    )

    assert isinstance(minutes, float)
    assert minutes > 0


def test_predict_delivery_time_increases_with_traffic(loaded_model):
    base_features = {
        "Distance_km": 5.0,
        "Weather": "Clear",
        "Time_of_Day": "Afternoon",
        "Vehicle_Type": "Bike",
        "Preparation_Time_min": 15,
        "Courier_Experience_yrs": 2.0,
    }

    low = predict_delivery_time_min({**base_features, "Traffic_Level": "Low"})
    high = predict_delivery_time_min({**base_features, "Traffic_Level": "High"})

    assert high > low
