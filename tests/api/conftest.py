import pytest

from apps.api.services import delivery_calculation


@pytest.fixture(autouse=True)
def clear_delivery_cache():
    delivery_calculation._metrics_cache.clear()
    delivery_calculation._model_loaded = False
    yield
    delivery_calculation._metrics_cache.clear()
    delivery_calculation._model_loaded = False
