import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

def load_data(caminho_raw):
    ''' Carrega o dataset e remove a coluna Order_ID 
    
        :param caminho_raw: caminho do arquivo CSV contendo os dados brutos
        :return: DataFrame do pandas contendo os dados carregados e pré-processados
    '''
    
    df = pd.read_csv(caminho_raw)
    
    if 'Order_ID' in df.columns:
        df = df.drop('Order_ID', axis=1)
    print(f"Dados carregados: {df.shape[0]} linhas, {df.shape[1]} colunas")
    
    return df

def descriptive_statistics(df):
    ''' Demostra as estatísticas descritivas 
    
        :param df: DataFrame do pandas contendo os dados carregados e pré-processados
    '''
    
    print(df.describe())
    print(df.info())

def plot_distribution_target(df, target_col):
    ''' Distribuição de variáveis 
            
        :param df: DataFrame do pandas contendo os dados carregados e pré-processados
        :param target_col: nome da coluna alvo para análise de distribuição
    '''
    
    sns.histplot(df[target_col], kde=True)
    plt.show()

def correlations(df, target_col):
    ''' Analisa e visualiza a correlação linear entre as variáveis numéricas do dataset 
    
        :param df: DataFrame do pandas contendo os dados carregados e pré-processados
        :param target_col: nome da coluna alvo para análise de correlação
    '''
    
    numeric_df = df.select_dtypes(include=np.number)
    corr = numeric_df.corr()
    
    plt.figure(figsize=(10, 8))
    sns.heatmap(corr, annot=True, cmap='coolwarm', fmt='.2f', linewidths=0.5)
    plt.title(f'Matriz de Correlação - Target: {target_col}')
    
    import os
    os.makedirs('metrics', exist_ok=True)
    plt.savefig('./metrics/correlacao_heatmap.png', bbox_inches='tight')
    plt.close() 
    
    print("\nCorrelação com a variável alvo:\n")
    print(corr[target_col].sort_values(ascending=False))
