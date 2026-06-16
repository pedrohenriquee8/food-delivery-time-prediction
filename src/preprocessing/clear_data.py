import warnings

import pandas as pd
from sklearn.impute import SimpleImputer

from src.utils.exceptions import PreprocessingError
from src.utils.validators import (
    validate_column_exists,
    validate_dataframe_not_empty,
    validate_no_nulls,
)


def treat_missing_values(df):
    ''' Imputa valores ausentes (numéricas: mediana, categóricas: moda) e 
        cria features: Traffic_Level_ord, Horario_Pico, Dist_x_Traffic, Prep_x_Pico
    
        :param df: DataFrame a ser tratado
        :return: DataFrame com valores ausentes tratados
    '''

    validate_dataframe_not_empty(df, context='Dataset para imputação')
    
    df = df.copy()
    
    numeric_cols = df.select_dtypes(include=['int64', 'float64']).columns.tolist()
    categorical_cols = df.select_dtypes(include=['object']).columns.tolist()
    
    if numeric_cols:
        num_imputer = SimpleImputer(strategy='median')
        df[numeric_cols] = num_imputer.fit_transform(df[numeric_cols])
        
        print(f"\nValores ausentes preenchidos nas colunas numéricas: {numeric_cols}")
    
    if categorical_cols:
        cat_imputer = SimpleImputer(strategy='most_frequent')
        df[categorical_cols] = cat_imputer.fit_transform(df[categorical_cols])
        
        print(f"Valores ausentes preenchidos nas colunas categóricas: {categorical_cols}")
    
    print("\nVerificação final de valores ausentes:")
    remaining_nulls = df.isnull().sum()
    print(remaining_nulls[remaining_nulls > 0])

    validate_no_nulls(df, df.columns)

    return df

def remove_outliers_iqr(df, colunas, limite=1.5):
    ''' Remove linhas de um DataFrame que contenham outliers 
        com base no método do IQR (Interquartile Range).
    
        :param df: DataFrame a ser tratado
        :param colunas: Lista de colunas numéricas para verificar outliers
        :param limite: Multiplicador do IQR para definir os limites (padrão: 1.5)
        :return: DataFrame sem os outliers
    '''

    validate_dataframe_not_empty(df, context='Dataset para remoção de outliers')

    if limite <= 0:
        raise PreprocessingError(f"O limite do IQR deve ser maior que zero, recebido: {limite}")

    for col in colunas:
        validate_column_exists(df, col)

    df_sem_outliers = df.copy()
    original_count = df.shape[0]

    for col in colunas:
        Q1 = df_sem_outliers[col].quantile(0.25)
        Q3 = df_sem_outliers[col].quantile(0.75)
        IQR = Q3 - Q1
        inf = Q1 - limite * IQR
        sup = Q3 + limite * IQR

        df_sem_outliers = df_sem_outliers[
            (df_sem_outliers[col] >= inf) & (df_sem_outliers[col] <= sup)
        ]

    removed = original_count - df_sem_outliers.shape[0]
    print(f"\nRemovidos {removed} outliers.")

    if df_sem_outliers.empty:
        raise PreprocessingError(
            "O filtro de outliers removeu todas as amostras. Ajuste o limite ou as colunas."
        )

    if removed > original_count * 0.5:
        warnings.warn(
            f"Mais de 50% das amostras foram removidas ({removed}/{original_count}).",
            stacklevel=2,
        )

    return df_sem_outliers
