from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline

def create_preprocessor(numericas, categoricas):
    ''' Controí um pré-processador automático aplicando StandardScaler nas numéricas e OneHotEncoder nas categóricas '''
    
    num_transformer = Pipeline([('scaler', StandardScaler())])
    cat_transformer = Pipeline([('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))])
    
    preprocessor = ColumnTransformer([
        ('num', num_transformer, numericas),
        ('cat', cat_transformer, categoricas)
    ])
    
    return preprocessor