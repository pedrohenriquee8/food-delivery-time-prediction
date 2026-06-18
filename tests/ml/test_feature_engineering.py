import pandas as pd
import pytest

from food_delivery_ml.features.feature_engineering import (
    create_interactions,
    create_peak_hours,
    map_ordinal_traffic,
)
from food_delivery_ml.utils.exceptions import DataValidationError

def test_map_ordinal_traffic_maps_values(valid_df):
    df = valid_df.drop(columns=['Order_ID']).copy()
    result = map_ordinal_traffic(df)

    expected = {'Low': 1, 'Medium': 2, 'High': 3}
    for level, code in expected.items():
        assert result.loc[result['Traffic_Level'] == level, 'Traffic_Level_ord'].iloc[0] == code

def test_map_ordinal_traffic_raises_for_invalid_category(valid_df):
    df = valid_df.drop(columns=['Order_ID']).copy()
    df.loc[0, 'Traffic_Level'] = 'Invalid'

    with pytest.raises(DataValidationError, match='Valores desconhecidos'):
        map_ordinal_traffic(df)

def test_create_peak_hours_maps_values(valid_df):
    df = valid_df.drop(columns=['Order_ID']).copy()
    result = create_peak_hours(df)

    assert result.loc[result['Time_of_Day'] == 'Morning', 'Horario_Pico'].iloc[0] == 0
    assert result.loc[result['Time_of_Day'] == 'Afternoon', 'Horario_Pico'].iloc[0] == 1
    assert result.loc[result['Time_of_Day'] == 'Evening', 'Horario_Pico'].iloc[0] == 1
    assert result.loc[result['Time_of_Day'] == 'Night', 'Horario_Pico'].iloc[0] == 0

def test_create_peak_hours_raises_for_invalid_time(valid_df):
    df = valid_df.drop(columns=['Order_ID']).copy()
    df.loc[0, 'Time_of_Day'] = 'Midnight'

    with pytest.raises(DataValidationError, match='Valores desconhecidos'):
        create_peak_hours(df)

def test_create_interactions_creates_columns(feature_df):
    result = create_interactions(feature_df.copy())

    assert 'Dist_x_Traffic' in result.columns
    assert 'Prep_x_Pico' in result.columns
    assert result.loc[0, 'Dist_x_Traffic'] == (
        result.loc[0, 'Distance_km'] * result.loc[0, 'Traffic_Level_ord']
    )
    assert result.loc[0, 'Prep_x_Pico'] == (
        result.loc[0, 'Preparation_Time_min'] * result.loc[0, 'Horario_Pico']
    )

def test_create_interactions_raises_for_missing_column(feature_df):
    df = feature_df.drop(columns=['Horario_Pico'])

    with pytest.raises(DataValidationError, match='Colunas ausentes'):
        create_interactions(df)
