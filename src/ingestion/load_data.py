import pandas as pd

from src.utils.constants import OPTIONAL_COLUMNS, REQUIRED_COLUMNS
from src.utils.exceptions import DataLoadError
from src.utils.validators import (
    validate_dataframe_not_empty,
    validate_file_exists,
    validate_required_columns,
)

def load_data(caminho_raw):
    """
    Carrega o dataset CSV, valida o schema e remove a coluna Order_ID.

    :param caminho_raw: caminho para o arquivo CSV bruto
    :return: DataFrame validado sem Order_ID
    :raises DataLoadError: se o arquivo não existir ou não puder ser lido
    :raises DataValidationError: se o schema ou conteúdo forem inválidos
    """
    validate_file_exists(caminho_raw)

    try:
        df = pd.read_csv(caminho_raw)
    except pd.errors.EmptyDataError as e:
        raise DataLoadError(f"Arquivo CSV vazio: '{caminho_raw}'") from e
    except pd.errors.ParserError as e:
        raise DataLoadError(f"Erro ao interpretar CSV '{caminho_raw}': {e}") from e

    validate_dataframe_not_empty(df, context='Dataset carregado')
    validate_required_columns(df, REQUIRED_COLUMNS)

    extra_cols = set(df.columns) - set(REQUIRED_COLUMNS) - set(OPTIONAL_COLUMNS)
    if extra_cols:
        print(f"Aviso: colunas extras ignoradas: {sorted(extra_cols)}")

    if 'Order_ID' in df.columns:
        df = df.drop('Order_ID', axis=1)

    print(f"Dados carregados: {df.shape[0]} linhas, {df.shape[1]} colunas")

    return df
