from sklearn.model_selection import train_test_split

from food_delivery_ml.utils.exceptions import PreprocessingError
from food_delivery_ml.utils.validators import (
    validate_dataframe_not_empty,
    validate_same_length,
    validate_test_size,
)

# Utilizou-se Hold-out: Separando 20% para teste e 80% para treino
def separate_training_test(X, y, test_size=0.2, random_state=42):
    ''' Separa os dados em conjuntos de treino e teste 
    
        :param X: Variáveis independentes (features)
        :param y: Variável dependente (target)
        :param test_size: Proporção do conjunto de teste (default: 0.2)
        :param random_state: Semente para reprodução dos resultados (default: 42)
        :return: X_train, X_test, y_train, y_test
    '''

    validate_dataframe_not_empty(X, context='Conjunto de features (X)')
    validate_dataframe_not_empty(y, context='Conjunto alvo (y)')
    validate_same_length(X, y, 'X', 'y')
    validate_test_size(test_size)

    if len(X) < 2:
        raise PreprocessingError(
            "São necessárias ao menos 2 amostras para realizar a separação treino/teste."
        )

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state
    )

    print(f"\n\nTreino: {X_train.shape[0]} amostras | Teste: {X_test.shape[0]}")

    return X_train, X_test, y_train, y_test
