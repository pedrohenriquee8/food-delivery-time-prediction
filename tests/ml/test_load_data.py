import pandas as pd
import pytest

from food_delivery_ml.ingestion.load_data import load_data
from food_delivery_ml.utils.exceptions import DataLoadError, DataValidationError

def test_load_data_remove_order_id(valid_csv):
    df = load_data(valid_csv)

    assert 'Order_ID' not in df.columns
    assert len(df.columns) == 8
    assert len(df) == 5

def test_load_data_raises_for_missing_file():
    with pytest.raises(DataLoadError, match='Arquivo não encontrado'):
        load_data('data/raw/arquivo_inexistente.csv')

def test_load_data_raises_for_empty_csv(tmp_path):
    empty_csv = tmp_path / 'empty.csv'
    empty_csv.write_text('', encoding='utf-8')

    with pytest.raises(DataLoadError, match='Arquivo CSV vazio'):
        load_data(str(empty_csv))

def test_load_data_raises_for_incomplete_schema(tmp_path, valid_row):
    incomplete_df = pd.DataFrame([{k: v for k, v in valid_row.items() if k != 'Delivery_Time_min'}])
    incomplete_csv = tmp_path / 'incomplete.csv'
    incomplete_df.to_csv(incomplete_csv, index=False)

    with pytest.raises(DataValidationError, match='Colunas ausentes'):
        load_data(str(incomplete_csv))

def test_load_data_raises_for_malformed_csv(tmp_path):
    malformed_csv = tmp_path / 'malformed.csv'
    malformed_csv.write_text('col1,col2\n"unclosed quote', encoding='utf-8')

    with pytest.raises(DataLoadError, match='Erro ao interpretar CSV'):
        load_data(str(malformed_csv))
