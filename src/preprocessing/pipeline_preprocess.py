from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

from src.utils.exceptions import PreprocessingError
from src.utils.validators import validate_no_column_overlap


def create_preprocessor(numericas, categoricas):
    ''' Controí um pré-processador automático aplicando StandardScaler nas numéricas e OneHotEncoder nas categóricas 
    
        :param numericas: lista de colunas numéricas
        :param categoricas: lista de colunas categóricas
        :return: um objeto ColumnTransformer que pode ser usado em um pipeline de machine learning
    '''

    if not numericas and not categoricas:
        raise PreprocessingError(
            "É necessário informar ao menos uma coluna numérica ou categórica."
        )

    validate_no_column_overlap(numericas, categoricas)

    num_transformer = Pipeline([('scaler', StandardScaler())])
    cat_transformer = Pipeline([
        ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
    ])

    preprocessor = ColumnTransformer([
        ('num', num_transformer, numericas),
        ('cat', cat_transformer, categoricas),
    ])

    return preprocessor
