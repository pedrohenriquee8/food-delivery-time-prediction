import pandas as pd
import pytest

from food_delivery_ml.utils.exceptions import DataLoadError, DataValidationError
from food_delivery_ml.utils.validators import (
    ensure_directory,
    validate_categorical_values,
    validate_column_exists,
    validate_dataframe_not_empty,
    validate_file_exists,
    validate_no_column_overlap,
    validate_no_nulls,
    validate_required_columns,
    validate_same_length,
    validate_test_size,
)

def test_validate_file_exists_success(tmp_path):
    file_path = tmp_path / 'data.csv'
    file_path.write_text('col\n1', encoding='utf-8')

    validate_file_exists(str(file_path))

def test_validate_file_exists_raises_for_missing_file():
    with pytest.raises(DataLoadError, match='Arquivo não encontrado'):
        validate_file_exists('caminho/inexistente.csv')

def test_validate_dataframe_not_empty_success(valid_df):
    validate_dataframe_not_empty(valid_df)

def test_validate_dataframe_not_empty_raises_for_empty_df():
    with pytest.raises(DataValidationError, match='está vazio'):
        validate_dataframe_not_empty(pd.DataFrame())

def test_validate_dataframe_not_empty_raises_for_none():
    with pytest.raises(DataValidationError, match='está vazio'):
        validate_dataframe_not_empty(None)

def test_validate_required_columns_success(valid_df):
    validate_required_columns(valid_df, list(valid_df.columns))

def test_validate_required_columns_raises_for_missing_columns(valid_df):
    with pytest.raises(DataValidationError, match='Colunas ausentes'):
        validate_required_columns(valid_df, ['Distance_km', 'ColunaInexistente'])

def test_validate_column_exists_success(valid_df):
    validate_column_exists(valid_df, 'Distance_km')

def test_validate_column_exists_raises(valid_df):
    with pytest.raises(DataValidationError, match="Coluna 'Inexistente'"):
        validate_column_exists(valid_df, 'Inexistente')

def test_validate_no_nulls_success(valid_df):
    validate_no_nulls(valid_df, valid_df.columns)

def test_validate_no_nulls_raises(valid_df):
    df = valid_df.copy()
    df.loc[0, 'Distance_km'] = None

    with pytest.raises(DataValidationError, match='Valores nulos detectados'):
        validate_no_nulls(df, ['Distance_km'])

def test_validate_categorical_values_success(valid_df):
    validate_categorical_values(
        valid_df['Traffic_Level'],
        {'Low', 'Medium', 'High'},
        'Traffic_Level',
    )

def test_validate_categorical_values_raises(valid_df):
    series = valid_df['Traffic_Level'].copy()
    series.iloc[0] = 'Invalid'

    with pytest.raises(DataValidationError, match='Valores desconhecidos'):
        validate_categorical_values(series, {'Low', 'Medium', 'High'}, 'Traffic_Level')

def test_validate_same_length_success():
    validate_same_length([1, 2, 3], [4, 5, 6], 'a', 'b')

def test_validate_same_length_raises():
    with pytest.raises(DataValidationError, match='Tamanhos incompatíveis'):
        validate_same_length([1, 2], [1], 'X', 'y')

@pytest.mark.parametrize('invalid_size', [0, 1, -0.1, 1.5])
def test_validate_test_size_raises_for_invalid_values(invalid_size):
    with pytest.raises(DataValidationError, match='test_size deve estar entre 0 e 1'):
        validate_test_size(invalid_size)

def test_validate_test_size_success():
    validate_test_size(0.2)

def test_validate_no_column_overlap_success():
    validate_no_column_overlap(['a', 'b'], ['c', 'd'])

def test_validate_no_column_overlap_raises():
    with pytest.raises(DataValidationError, match='Colunas presentes em numéricas e categóricas'):
        validate_no_column_overlap(['a', 'b'], ['b', 'c'])

def test_ensure_directory_creates_directory(tmp_path):
    target = tmp_path / 'output' / 'metrics'
    ensure_directory(str(target))
    assert target.is_dir()
