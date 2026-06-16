import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

from src.utils.exceptions import DataValidationError
from src.utils.validators import (
    ensure_directory,
    validate_column_exists,
    validate_dataframe_not_empty,
)

def descriptive_statistics(df):
    ''' Demostra as estatísticas descritivas 
    
        :param df: DataFrame do pandas contendo os dados carregados e pré-processados
    '''

    validate_dataframe_not_empty(df, context='Dataset para EDA')

    print(df.describe())
    print(df.info())

def plot_distribution_target(df, target_col):
    ''' Distribuição de variáveis 
            
        :param df: DataFrame do pandas contendo os dados carregados e pré-processados
        :param target_col: nome da coluna alvo para análise de distribuição
    '''

    validate_dataframe_not_empty(df, context='Dataset para visualização')
    validate_column_exists(df, target_col)

    sns.histplot(df[target_col], kde=True)
    plt.show()

def correlations(df, target_col):
    ''' Analisa e visualiza a correlação linear entre as variáveis numéricas do dataset 
    
        :param df: DataFrame do pandas contendo os dados carregados e pré-processados
        :param target_col: nome da coluna alvo para análise de correlação
    '''

    validate_dataframe_not_empty(df, context='Dataset para correlação')
    validate_column_exists(df, target_col)

    numeric_df = df.select_dtypes(include=np.number)

    if target_col not in numeric_df.columns:
        raise DataValidationError(
            f"A coluna alvo '{target_col}' não é numérica ou não está disponível para correlação."
        )

    if numeric_df.shape[1] < 2:
        raise DataValidationError(
            "São necessárias ao menos duas colunas numéricas para calcular correlação."
        )

    corr = numeric_df.corr()

    plt.figure(figsize=(10, 8))
    sns.heatmap(corr, annot=True, cmap='coolwarm', fmt='.2f', linewidths=0.5)
    plt.title(f'Matriz de Correlação - Target: {target_col}')

    ensure_directory('./metrics/correlacao_heatmap.png')
    
    plt.savefig('./metrics/correlacao_heatmap.png', bbox_inches='tight')
    plt.close()

    print("\nCorrelação com a variável alvo:\n")
    print(corr[target_col].sort_values(ascending=False))
