import os

import pandas as pd

from src.utils.exceptions import DataLoadError, DataValidationError


def validate_file_exists(path):
    """
    Verifica se o arquivo existe no caminho informado.

    :param path: caminho do arquivo
    :raises DataLoadError: se o arquivo não existir
    """
    if not os.path.isfile(path):
        raise DataLoadError(f"Arquivo não encontrado: '{path}'")


def validate_dataframe_not_empty(df, context='DataFrame'):
    """
    Verifica se o DataFrame possui ao menos uma linha.

    :param df: DataFrame a validar
    :param context: descrição do contexto para a mensagem de erro
    :raises DataValidationError: se o DataFrame estiver vazio
    """
    if df is None or len(df) == 0:
        raise DataValidationError(f"{context} está vazio.")


def validate_required_columns(df, columns):
    """
    Verifica se todas as colunas obrigatórias estão presentes no DataFrame.

    :param df: DataFrame a validar
    :param columns: lista de colunas obrigatórias
    :raises DataValidationError: se alguma coluna estiver ausente
    """
    missing = [col for col in columns if col not in df.columns]
    if missing:
        raise DataValidationError(f"Colunas ausentes: {missing}")


def validate_column_exists(df, column):
    """
    Verifica se uma coluna específica existe no DataFrame.

    :param df: DataFrame a validar
    :param column: nome da coluna
    :raises DataValidationError: se a coluna não existir
    """
    if column not in df.columns:
        raise DataValidationError(f"Coluna '{column}' não encontrada no DataFrame.")


def validate_no_nulls(df, columns):
    """
    Verifica se não há valores nulos nas colunas informadas.

    :param df: DataFrame a validar
    :param columns: colunas a verificar
    :raises DataValidationError: se houver NaN em alguma coluna
    """
    null_cols = [col for col in columns if col in df.columns and df[col].isnull().any()]
    if null_cols:
        raise DataValidationError(f"Valores nulos detectados nas colunas: {null_cols}")


def validate_categorical_values(series, allowed_values, column_name):
    """
    Verifica se todos os valores da série pertencem ao conjunto permitido.

    :param series: série pandas com valores categóricos
    :param allowed_values: conjunto de valores válidos
    :param column_name: nome da coluna para a mensagem de erro
    :raises DataValidationError: se houver valores desconhecidos
    """
    unknown = set(series.dropna().unique()) - allowed_values
    if unknown:
        raise DataValidationError(
            f"Valores desconhecidos em '{column_name}': {sorted(unknown)}. "
            f"Valores esperados: {sorted(allowed_values)}"
        )


def validate_same_length(a, b, name_a='a', name_b='b'):
    """
    Verifica se dois objetos possuem o mesmo tamanho.

    :param a: primeiro objeto
    :param b: segundo objeto
    :param name_a: nome do primeiro objeto para a mensagem
    :param name_b: nome do segundo objeto para a mensagem
    :raises DataValidationError: se os tamanhos forem diferentes
    """
    if len(a) != len(b):
        raise DataValidationError(
            f"Tamanhos incompatíveis: {name_a}={len(a)}, {name_b}={len(b)}"
        )


def validate_test_size(test_size):
    """
    Verifica se test_size está no intervalo (0, 1).

    :param test_size: proporção do conjunto de teste
    :raises DataValidationError: se test_size for inválido
    """
    if not 0 < test_size < 1:
        raise DataValidationError(
            f"test_size deve estar entre 0 e 1 (exclusivo), recebido: {test_size}"
        )


def validate_no_column_overlap(numeric_cols, categorical_cols):
    """
    Verifica se não há colunas duplicadas entre listas numéricas e categóricas.

    :param numeric_cols: colunas numéricas
    :param categorical_cols: colunas categóricas
    :raises DataValidationError: se houver sobreposição
    """
    overlap = set(numeric_cols) & set(categorical_cols)
    if overlap:
        raise DataValidationError(
            f"Colunas presentes em numéricas e categóricas: {sorted(overlap)}"
        )


def ensure_directory(path):
    """
    Garante que o diretório existe, criando-o se necessário.

    :param path: caminho do diretório ou arquivo
    :raises DataLoadError: se não for possível criar o diretório
    """
    directory = path if not os.path.splitext(path)[1] else os.path.dirname(path)
    if not directory:
        return

    try:
        os.makedirs(directory, exist_ok=True)
    except OSError as e:
        raise DataLoadError(f"Não foi possível criar o diretório '{directory}': {e}") from e
