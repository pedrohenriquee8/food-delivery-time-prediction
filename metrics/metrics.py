from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def calculate_metrics(y_true, y_pred):
    ''' Calcula métrica MAE, MSE, RMSE e R2 para avaliação 
    
        :param y_true: valor real da variável alvo
        :param y_pred:  valor predito da variável alvo
        :return: dicionário com as métricas calculadas
    '''
    
    mae = mean_absolute_error(y_true, y_pred)
    mse = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_true, y_pred)
    
    return {'MAE': mae, 'MSE': mse, 'RMSE': rmse, 'R2': r2}

def save_metrics(metricas_dict, arquivo='./metrics/metricas.csv'):
    ''' Salva as métricas 
    
        :param metricas_dict: dicionário com as métricas calculadas
        :param arquivo: caminho do arquivo onde as métricas serão salvas
    '''
    
    df = pd.DataFrame([metricas_dict])
    df.to_csv(arquivo, index=False)
    
    print(f"Métricas salvas em {arquivo}")

def plot_importances(modelo_pipeline, feature_names, top_n=20):
    ''' Avalia a importância das variáveis para os modelos Random Forest e Gradient Boosting 
    
        :param modelo_pipeline: pipeline do modelo treinado
        :param feature_names: lista com os nomes das features utilizadas no modelo
        :param top_n: número de features mais importantes a serem exibidas
    '''
    
    regressor = modelo_pipeline.named_steps['regressor']
    
    if hasattr(regressor, 'feature_importances_'):
        importances = regressor.feature_importances_
        indices = np.argsort(importances)[::-1][:top_n]
        
        plt.figure(figsize=(10,6))
        plt.title(f'Top {top_n} Feature Importances')
        plt.barh(range(len(indices)), importances[indices], align='center')
        plt.yticks(range(len(indices)), [feature_names[i] for i in indices])
        plt.gca().invert_yaxis()
        plt.tight_layout()
        plt.savefig('./metrics/importancias_features.png')
        plt.show()