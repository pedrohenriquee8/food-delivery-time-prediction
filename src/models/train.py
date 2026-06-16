from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import Pipeline

from src.utils.constants import VALID_MODELS
from src.utils.exceptions import ModelTrainingError
from src.utils.validators import (
    validate_dataframe_not_empty,
    validate_same_length,
)

def train_model(preprocessor, modelo_nome, X_train, y_train):
    ''' Treina o modelo de regressão a partir do conjunto de treino utilizando um pré-processador 
    
        :param preprocessor: Pipeline de pré-processamento dos dados
        :param modelo_nome: Nome do modelo a ser treinado ('linear', 'random_forest', 'gradient_boosting')
        :param X_train: Conjunto de treino (features)
        :param y_train: Conjunto de treino (target)
        :return: Pipeline com o modelo treinado
    '''

    if modelo_nome not in VALID_MODELS:
        raise ModelTrainingError(
            f"Modelo '{modelo_nome}' não disponível. Opções: {sorted(VALID_MODELS)}"
        )

    validate_dataframe_not_empty(X_train, context='Conjunto de treino (X_train)')
    validate_dataframe_not_empty(y_train, context='Conjunto alvo de treino (y_train)')
    validate_same_length(X_train, y_train, 'X_train', 'y_train')

    modelos = {
        'linear': LinearRegression(),
        'random_forest': RandomForestRegressor(n_estimators=100, random_state=42),
        'gradient_boosting': GradientBoostingRegressor(random_state=42),
    }

    pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', modelos[modelo_nome]),
    ])

    try:
        pipeline.fit(X_train, y_train)
    except Exception as e:
        raise ModelTrainingError(
            f"Falha ao treinar modelo '{modelo_nome}': {e}"
        ) from e

    return pipeline
