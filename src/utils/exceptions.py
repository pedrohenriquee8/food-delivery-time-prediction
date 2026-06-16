class DeliveryPredictionError(Exception):
    """Erro base do pipeline de predição de tempo de entrega."""


class DataLoadError(DeliveryPredictionError):
    """Falha ao carregar arquivo de dados (inexistente, vazio, formato inválido)."""


class DataValidationError(DeliveryPredictionError):
    """Dados ou schema inválidos (colunas ausentes, NaN, categorias desconhecidas)."""


class PreprocessingError(DeliveryPredictionError):
    """Falha no pré-processamento (imputação, outliers, split)."""


class ModelTrainingError(DeliveryPredictionError):
    """Falha no treinamento do modelo."""


class MetricsError(DeliveryPredictionError):
    """Falha no cálculo ou persistência de métricas."""
