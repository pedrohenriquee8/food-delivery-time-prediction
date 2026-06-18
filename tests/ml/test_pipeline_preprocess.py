import pytest
from sklearn.compose import ColumnTransformer

from food_delivery_ml.preprocessing.pipeline_preprocess import create_preprocessor
from food_delivery_ml.utils.constants import CATEGORICAL_FEATURE_COLUMNS, NUMERIC_FEATURE_COLUMNS
from food_delivery_ml.utils.exceptions import DataValidationError, PreprocessingError

def test_create_preprocessor_returns_column_transformer():
    preprocessor = create_preprocessor(
        NUMERIC_FEATURE_COLUMNS,
        CATEGORICAL_FEATURE_COLUMNS,
    )

    assert isinstance(preprocessor, ColumnTransformer)

def test_create_preprocessor_fit_transform(feature_df):
    preprocessor = create_preprocessor(
        NUMERIC_FEATURE_COLUMNS,
        CATEGORICAL_FEATURE_COLUMNS,
    )

    transformed = preprocessor.fit_transform(feature_df)

    assert transformed.shape[0] == len(feature_df)
    assert transformed.shape[1] > 0

def test_create_preprocessor_raises_when_both_lists_empty():
    with pytest.raises(PreprocessingError, match='ao menos uma coluna'):
        create_preprocessor([], [])

def test_create_preprocessor_raises_for_overlapping_columns():
    with pytest.raises(DataValidationError, match='Colunas presentes em numéricas e categóricas'):
        create_preprocessor(['Distance_km'], ['Distance_km'])
