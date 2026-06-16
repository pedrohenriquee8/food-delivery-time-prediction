from unittest.mock import patch

import numpy as np
import pytest
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import Pipeline

from metrics.metrics import calculate_metrics, plot_importances, save_metrics
from src.utils.exceptions import DataValidationError, MetricsError

def test_calculate_metrics_returns_expected_keys():
    y_true = np.array([10, 20, 30])
    y_pred = np.array([12, 18, 28])

    result = calculate_metrics(y_true, y_pred)

    assert set(result.keys()) == {'MAE', 'MSE', 'RMSE', 'R2'}
    assert all(isinstance(value, (float, np.floating)) for value in result.values())

def test_calculate_metrics_raises_for_empty_arrays():
    with pytest.raises(MetricsError, match='não podem estar vazios'):
        calculate_metrics([], [])

def test_calculate_metrics_raises_for_mismatched_lengths():
    with pytest.raises(DataValidationError, match='Tamanhos incompatíveis'):
        calculate_metrics([1, 2, 3], [1, 2])

def test_save_metrics_writes_csv(tmp_path):
    metrics = {'MAE': 1.0, 'MSE': 2.0, 'RMSE': 1.41, 'R2': 0.9}
    output_file = tmp_path / 'metricas.csv'

    save_metrics(metrics, str(output_file))

    assert output_file.exists()
    assert 'MAE' in output_file.read_text(encoding='utf-8')

def test_save_metrics_raises_for_empty_dict(tmp_path):
    with pytest.raises(MetricsError, match='dicionário de métricas não pode estar vazio'):
        save_metrics({}, str(tmp_path / 'metricas.csv'))

def test_plot_importances_raises_for_model_without_importances():
    pipeline = Pipeline([('regressor', LinearRegression())])
    pipeline.fit([[1], [2], [3]], [10, 20, 30])

    with pytest.raises(MetricsError, match="feature_importances_"):
        with patch('metrics.metrics.plt.show'):
            plot_importances(pipeline, ['feature_1'])
