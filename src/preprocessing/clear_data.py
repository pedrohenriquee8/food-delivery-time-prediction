import pandas as pd
from sklearn.impute import SimpleImputer

def treat_missing_values(df):
    """
    Imputa valores ausentes (numéricas: mediana, categóricas: moda)
    Cria features: Traffic_Level_ord, Horario_Pico, Dist_x_Traffic, Prep_x_Pico
    """
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
    print(df.isnull().sum()[df.isnull().sum() > 0])  
    
    return df

def remove_outliers_iqr(df, colunas, limite=1.5):
    df_sem_outliers = df.copy()
    
    for col in colunas:
        Q1 = df_sem_outliers[col].quantile(0.25)
        Q3 = df_sem_outliers[col].quantile(0.75)
        IQR = Q3 - Q1
        inf = Q1 - limite * IQR
        sup = Q3 + limite * IQR
        
        df_sem_outliers = df_sem_outliers[(df_sem_outliers[col] >= inf) & (df_sem_outliers[col] <= sup)]
        
    print(f"\nRemovidos {df.shape[0] - df_sem_outliers.shape[0]} outliers.")
    
    return df_sem_outliers