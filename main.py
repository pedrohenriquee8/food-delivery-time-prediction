import sys

sys.path.append('.')

import joblib
import pandas as pd

from metrics.metrics import calculate_metrics, plot_importances, save_metrics
from src.features.feature_engineering import (
    create_interactions,
    create_peak_hours,
    map_ordinal_traffic,
)
from src.ingestion.load_data import load_data
from src.models.train import train_model
from src.preprocessing.clear_data import remove_outliers_iqr, treat_missing_values
from src.preprocessing.data_splitter import separate_training_test
from src.preprocessing.eda import correlations, descriptive_statistics, plot_distribution_target
from src.preprocessing.pipeline_preprocess import create_preprocessor
from src.utils.constants import (
    CATEGORICAL_FEATURE_COLUMNS,
    FEATURE_COLUMNS,
    NUMERIC_FEATURE_COLUMNS,
    TARGET_COLUMN,
)
from src.utils.exceptions import (
    DataLoadError,
    DataValidationError,
    DeliveryPredictionError,
    MetricsError,
    ModelTrainingError,
    PreprocessingError,
)
from src.utils.validators import ensure_directory, validate_no_nulls, validate_required_columns

def run_pipeline():
    ensure_directory('models_saved')
    ensure_directory('metrics')

    df = load_data('data/raw/food-delivery-times.csv')
    
    df = treat_missing_values(df)
    
    df = map_ordinal_traffic(df)
    df = create_peak_hours(df)
    df = create_interactions(df)

    descriptive_statistics(df)
    plot_distribution_target(df, target_col=TARGET_COLUMN)
    correlations(df, target_col=TARGET_COLUMN)

    # Utilizou-se o método do IQR (Intervalo Interquartil) com limite de 1,5 para identificar outliers em cada variável numérica
    df = remove_outliers_iqr(df, [TARGET_COLUMN], limite=1.5)

    validate_required_columns(df, FEATURE_COLUMNS)

    X = df[FEATURE_COLUMNS]
    y = df[TARGET_COLUMN]

    validate_no_nulls(X, X.columns)

    X_train, X_test, y_train, y_test = separate_training_test(X, y, test_size=0.2)

    preprocessor = create_preprocessor(NUMERIC_FEATURE_COLUMNS, CATEGORICAL_FEATURE_COLUMNS)

    results = {}

    models = ['linear', 'random_forest', 'gradient_boosting']

    for name in models:
        print(f"\n--- Treinando {name} ---")

        pipeline = train_model(preprocessor, name, X_train, y_train)
        y_pred = pipeline.predict(X_test)
        metricas = calculate_metrics(y_test, y_pred)
        results[name] = metricas

        save_metrics(metricas, f'./metrics/metricas_{name}.csv')

        model_path = f'./models_saved/{name}_model.pkl'
        ensure_directory(model_path)
        joblib.dump(pipeline, model_path)

        if name in ['random_forest', 'gradient_boosting']:
            pipeline.fit(X_train, y_train)
            transformed_cols = pipeline.named_steps['preprocessor'].get_feature_names_out()
            plot_importances(pipeline, transformed_cols)

    # Tabela comparativa entre os modelos executados
    df_resultados = pd.DataFrame(results).T

    print("\n=== Comparação de Modelos ===")
    print(df_resultados)

    comparacao_path = './metrics/comparacao_modelos.csv'
    ensure_directory(comparacao_path)
    df_resultados.to_csv(comparacao_path)

def main():
    try:
        run_pipeline()
    except DataLoadError as e:
        print(f"Falha ao carregar dados: {e}")
        sys.exit(1)
    except DataValidationError as e:
        print(f"Dados inválidos: {e}")
        sys.exit(1)
    except PreprocessingError as e:
        print(f"Falha no pré-processamento: {e}")
        sys.exit(1)
    except ModelTrainingError as e:
        print(f"Falha no treinamento: {e}")
        sys.exit(1)
    except MetricsError as e:
        print(f"Falha nas métricas: {e}")
        sys.exit(1)
    except DeliveryPredictionError as e:
        print(f"Pipeline: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Falha inesperada: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
