from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline

def create_preprocessor(numericas, categoricas):
    ''' Controí um pré-processador automático aplicando StandardScaler nas numéricas e OneHotEncoder nas categóricas 
    
        :param numericas: lista de colunas numéricas
        :param categoricas: lista de colunas categóricas
        :return: um objeto ColumnTransformer que pode ser usado em um pipeline de machine learning
    '''
    
    num_transformer = Pipeline([('scaler', StandardScaler())])
    cat_transformer = Pipeline([('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))])
    
    preprocessor = ColumnTransformer([
        ('num', num_transformer, numericas),
        ('cat', cat_transformer, categoricas)
    ])
    
    return preprocessor