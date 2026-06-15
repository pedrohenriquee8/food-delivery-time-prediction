import sys
sys.path.append('.') 

from src.preprocessing.eda import load_data
from src.preprocessing.clear_data import treat_missing_values, remove_outliers_iqr
from src.features.feature_engineering import create_interactions, create_peak_hours, map_ordinal_traffic
from src.preprocessing.data_splitter import separate_training_test
from src.preprocessing.pipeline_preprocess import create_preprocessor
from src.models.train import train_model
from src.evaluation.metrics import calculate_metrics, save_metrics, plot_importances

import pandas as pd
import joblib

def main():
    df = load_data('data/raw/food-delivery-times.csv')
    
    df = treat_missing_values(df)
    
    df = map_ordinal_traffic(df)
    df = create_peak_hours(df)
    df = create_interactions(df)
    
    df = remove_outliers_iqr(df, ['Delivery_Time_min'], limite=1.5)
    
    target = 'Delivery_Time_min'
    
    feature_cols = [
        'Distance_km', 'Preparation_Time_min', 'Courier_Experience_yrs',
        'Weather', 'Traffic_Level', 'Time_of_Day', 'Vehicle_Type',
        'Traffic_Level_ord', 'Horario_Pico', 'Dist_x_Traffic', 'Prep_x_Pico'
    ]
    
    X = df[feature_cols]
    y = df[target]
    
    # Verifica se existe dados ausentes
    assert X.isnull().sum().sum() == 0, "Ainda há NaN em X!"
    
    numeric_cols = [
        'Distance_km', 'Preparation_Time_min', 'Courier_Experience_yrs',
        'Traffic_Level_ord', 'Horario_Pico', 'Dist_x_Traffic', 'Prep_x_Pico'
    ]
    
    categorical_cols = ['Weather', 'Traffic_Level', 'Time_of_Day', 'Vehicle_Type']
    
    X_train, X_test, y_train, y_test = separate_training_test(X, y, test_size=0.2)
    
    preprocessor = create_preprocessor(numeric_cols, categorical_cols)
    
    models = ['linear', 'random_forest', 'gradient_boosting', 'xgboost']
    results = {}
    
    for name in models:
        print(f"\n--- Treinando {name} ---")
        
        pipeline = train_model(preprocessor, name, X_train, y_train)
        y_pred = pipeline.predict(X_test)
        metricas = calculate_metrics(y_test, y_pred)
        results[name] = metricas
        
        save_metrics(metricas, f'./src/evaluation/metrics/metricas_{name}.csv')
        joblib.dump(pipeline, f'./models_saved/{name}_model.pkl')
        
        if name in ['random_forest', 'gradient_boosting', 'xgboost']:
            pipeline.fit(X_train, y_train)  # já foi fit, mas garantia
            transformed_cols = pipeline.named_steps['preprocessor'].get_feature_names_out()
            plot_importances(pipeline, transformed_cols)
    
    # Tabela comparativa entre os modelos executados
    df_resultados = pd.DataFrame(results).T
    
    print("\n=== Comparação de Modelos ===")
    
    print(df_resultados)
    df_resultados.to_csv('./src/evaluation/metrics/comparacao_modelos.csv')

if __name__ == '__main__':
    main()