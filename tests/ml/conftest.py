import os

os.environ.setdefault('MPLBACKEND', 'Agg')

import pandas as pd
import pytest

from food_delivery_ml.features.feature_engineering import (
    create_interactions,
    create_peak_hours,
    map_ordinal_traffic,
)

@pytest.fixture
def valid_row():
    return {
        'Order_ID': 1,
        'Distance_km': 10.0,
        'Weather': 'Clear',
        'Traffic_Level': 'Low',
        'Time_of_Day': 'Morning',
        'Vehicle_Type': 'Bike',
        'Preparation_Time_min': 15,
        'Courier_Experience_yrs': 3.0,
        'Delivery_Time_min': 45,
    }

@pytest.fixture
def valid_df(valid_row):
    rows = []
    traffic_levels = ['Low', 'Medium', 'High']
    times_of_day = ['Morning', 'Afternoon', 'Evening', 'Night']

    for i in range(5):
        row = valid_row.copy()
        row['Order_ID'] = i + 1
        row['Traffic_Level'] = traffic_levels[i % len(traffic_levels)]
        row['Time_of_Day'] = times_of_day[i % len(times_of_day)]
        row['Distance_km'] = 5.0 + i * 2
        row['Delivery_Time_min'] = 30 + i * 5
        rows.append(row)

    return pd.DataFrame(rows)

@pytest.fixture
def valid_csv(tmp_path, valid_df):
    csv_path = tmp_path / 'valid_data.csv'
    valid_df.to_csv(csv_path, index=False)
    return str(csv_path)

@pytest.fixture
def feature_df(valid_df):
    df = valid_df.drop(columns=['Order_ID']).copy()
    df = map_ordinal_traffic(df)
    df = create_peak_hours(df)
    df = create_interactions(df)
    return df
