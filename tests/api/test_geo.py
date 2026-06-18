import math

from apps.api.services.geo import haversine_km


def test_haversine_same_point_returns_zero():
    assert haversine_km(-23.5505, -46.6333, -23.5505, -46.6333) == 0.0


def test_haversine_known_distance_approximate():
    distance = haversine_km(-23.5505, -46.6333, -23.5480, -46.6380)
    assert 0.4 < distance < 0.8


def test_haversine_is_symmetric():
    a = haversine_km(-23.5505, -46.6333, -23.5480, -46.6380)
    b = haversine_km(-23.5480, -46.6380, -23.5505, -46.6333)
    assert math.isclose(a, b, rel_tol=1e-9)
