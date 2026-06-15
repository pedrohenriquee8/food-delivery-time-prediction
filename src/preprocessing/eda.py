import pandas as pd

def load_data(caminho_raw):
    df = pd.read_csv(caminho_raw)
    
    if 'Order_ID' in df.columns:
        df = df.drop('Order_ID', axis=1)
    print(f"Dados carregados: {df.shape[0]} linhas, {df.shape[1]} colunas")
    
    return df
