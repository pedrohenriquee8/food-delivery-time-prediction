from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.pipeline import Pipeline

def train_model(preprocessor, modelo_nome, X_train, y_train):
    ''' Treina o modelo de regressão a partir do conjunto de treino utilizando um pré-processador '''
    
    modelos = {
        'linear': LinearRegression(),
        'random_forest': RandomForestRegressor(n_estimators=100, random_state=42),
        'gradient_boosting': GradientBoostingRegressor(random_state=42),
    }
    
    modelo = modelos.get(modelo_nome)
    
    if modelo is None:
        raise ValueError(f"Modelo {modelo_nome} não disponível")
    
    pipeline = Pipeline([('preprocessor', preprocessor),
                         ('regressor', modelo)])
    
    pipeline.fit(X_train, y_train)
    
    return pipeline