from sklearn.model_selection import train_test_split

# Utilizou-se Hold-out: Separando 20% para teste e 80% para treino
def separate_training_test(X, y, test_size=0.2, random_state=42):
    ''' Separa os dados em conjuntos de treino e teste 
    
        :param X: Variáveis independentes (features)
        :param y: Variável dependente (target)
        :param test_size: Proporção do conjunto de teste (default: 0.2)
        :param random_state: Semente para reprodução dos resultados (default: 42)
        :return: X_train, X_test, y_train, y_test
    '''
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state
    )
    
    print(f"\n\nTreino: {X_train.shape[0]} amostras | Teste: {X_test.shape[0]}")
    
    return X_train, X_test, y_train, y_test