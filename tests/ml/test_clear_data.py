import pandas as pd
import pytest

from food_delivery_ml.preprocessing.clear_data import remove_outliers_iqr, treat_missing_values
from food_delivery_ml.utils.exceptions import DataValidationError, PreprocessingError

def test_treat_missing_values_fills_numeric_and_categorical(valid_df):
    df = valid_df.drop(columns=['Order_ID']).copy()
    df.loc[0, 'Distance_km'] = None
    df.loc[1, 'Weather'] = None

    result = treat_missing_values(df)

    assert result['Distance_km'].isnull().sum() == 0
    assert result['Weather'].isnull().sum() == 0

def test_treat_missing_values_raises_for_empty_df():
    with pytest.raises(DataValidationError, match='está vazio'):
        treat_missing_values(pd.DataFrame())

def test_remove_outliers_iqr_removes_extreme_values(valid_df):
    df = valid_df.drop(columns=['Order_ID']).copy()
    df.loc[0, 'Delivery_Time_min'] = 1000

    result = remove_outliers_iqr(df, ['Delivery_Time_min'], limite=1.5)

    assert len(result) < len(df)
    assert 1000 not in result['Delivery_Time_min'].values

def test_remove_outliers_iqr_raises_for_invalid_limit(valid_df):
    df = valid_df.drop(columns=['Order_ID']).copy()

    with pytest.raises(PreprocessingError, match='limite do IQR deve ser maior que zero'):
        remove_outliers_iqr(df, ['Delivery_Time_min'], limite=0)

def test_remove_outliers_iqr_raises_when_all_rows_removed(monkeypatch):
    df = pd.DataFrame({'Delivery_Time_min': [10, 20, 30]})

    def fake_quantile(self, q):
        return 100

    monkeypatch.setattr(pd.Series, 'quantile', fake_quantile)

    with pytest.raises(PreprocessingError, match='removeu todas as amostras'):
        remove_outliers_iqr(df, ['Delivery_Time_min'], limite=1.5)
