from apps.api.services.delivery_calculation import calculate_delivery_metrics

USER_LAT = -9.7544
USER_LNG = -36.6611


def test_calculate_delivery_metrics_returns_formatted_strings():
    result = calculate_delivery_metrics(
        restaurant_id="baixao-burgers",
        lat=USER_LAT,
        lng=USER_LNG,
        weather="Clear",
        traffic="Medium",
        time_of_day="Afternoon",
        vehicle="Bike",
    )

    assert result["distance"].endswith(" km")
    assert "," in result["distance"]
    assert result["estimatedTime"].endswith(" min")


def test_calculate_delivery_metrics_is_deterministic():
    kwargs = {
        "restaurant_id": "fernandes-pizza",
        "lat": USER_LAT,
        "lng": USER_LNG,
        "weather": "Rainy",
        "traffic": "High",
        "time_of_day": "Evening",
        "vehicle": "Car",
    }

    first = calculate_delivery_metrics(**kwargs)
    second = calculate_delivery_metrics(**kwargs)

    assert first == second


def test_calculate_delivery_metrics_varies_with_traffic():
    base_kwargs = {
        "restaurant_id": "baixao-burgers",
        "lat": USER_LAT,
        "lng": USER_LNG,
        "weather": "Clear",
        "time_of_day": "Afternoon",
        "vehicle": "Bike",
    }

    low_traffic = calculate_delivery_metrics(**base_kwargs, traffic="Low")
    high_traffic = calculate_delivery_metrics(**base_kwargs, traffic="High")

    low_minutes = int(low_traffic["estimatedTime"].replace(" min", ""))
    high_minutes = int(high_traffic["estimatedTime"].replace(" min", ""))

    assert high_minutes > low_minutes


def test_calculate_delivery_metrics_unknown_restaurant_raises():
    try:
        calculate_delivery_metrics(
            restaurant_id="unknown",
            lat=USER_LAT,
            lng=USER_LNG,
            weather="Clear",
            traffic="Low",
            time_of_day="Morning",
            vehicle="Bike",
        )
    except ValueError as exc:
        assert "unknown" in str(exc)
    else:
        raise AssertionError("Expected ValueError for unknown restaurant")
