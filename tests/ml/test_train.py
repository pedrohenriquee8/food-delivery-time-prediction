import pytest

from food_delivery_ml.models.train import train_model
from food_delivery_ml.preprocessing.pipeline_preprocess import create_preprocessor
from food_delivery_ml.utils.constants import CATEGORICAL_FEATURE_COLUMNS, NUMERIC_FEATURE_COLUMNS
from food_delivery_ml.utils.exceptions import DataValidationError, ModelTrainingError

@pytest.fixture
def train_data(feature_df):
    X = feature_df.drop(columns=['Delivery_Time_min'])
    y = feature_df['Delivery_Time_min']
    return X, y

def test_train_model_linear_predicts(train_data):
    X, y = train_data
    preprocessor = create_preprocessor(NUMERIC_FEATURE_COLUMNS, CATEGORICAL_FEATURE_COLUMNS)

    pipeline = train_model(preprocessor, 'linear', X, y)
    predictions = pipeline.predict(X.iloc[:2])

    assert len(predictions) == 2

def test_train_model_raises_for_invalid_model(train_data):
    X, y = train_data
    preprocessor = create_preprocessor(NUMERIC_FEATURE_COLUMNS, CATEGORICAL_FEATURE_COLUMNS)

    with pytest.raises(ModelTrainingError, match="Modelo 'invalido' não disponível"):
        train_model(preprocessor, 'invalido', X, y)

def test_train_model_raises_for_empty_training_set(feature_df):
    X = feature_df.drop(columns=['Delivery_Time_min']).iloc[:0]
    y = feature_df['Delivery_Time_min'].iloc[:0]
    preprocessor = create_preprocessor(NUMERIC_FEATURE_COLUMNS, CATEGORICAL_FEATURE_COLUMNS)

    with pytest.raises(DataValidationError, match='Conjunto de treino \\(X_train\\) está vazio'):
        train_model(preprocessor, 'linear', X, y)

def test_train_model_raises_for_mismatched_lengths(train_data):
    X, y = train_data
    preprocessor = create_preprocessor(NUMERIC_FEATURE_COLUMNS, CATEGORICAL_FEATURE_COLUMNS)

    with pytest.raises(DataValidationError, match='Tamanhos incompatíveis'):
        train_model(preprocessor, 'linear', X, y.iloc[:-1])
