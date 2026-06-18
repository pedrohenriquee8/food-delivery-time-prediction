REQUIRED_COLUMNS = [
    'Distance_km',
    'Weather',
    'Traffic_Level',
    'Time_of_Day',
    'Vehicle_Type',
    'Preparation_Time_min',
    'Courier_Experience_yrs',
    'Delivery_Time_min',
]

OPTIONAL_COLUMNS = ['Order_ID']

FEATURE_COLUMNS = [
    'Distance_km',
    'Preparation_Time_min',
    'Courier_Experience_yrs',
    'Weather',
    'Traffic_Level',
    'Time_of_Day',
    'Vehicle_Type',
    'Traffic_Level_ord',
    'Horario_Pico',
    'Dist_x_Traffic',
    'Prep_x_Pico',
]

NUMERIC_FEATURE_COLUMNS = [
    'Distance_km',
    'Preparation_Time_min',
    'Courier_Experience_yrs',
    'Traffic_Level_ord',
    'Horario_Pico',
    'Dist_x_Traffic',
    'Prep_x_Pico',
]

CATEGORICAL_FEATURE_COLUMNS = [
    'Weather',
    'Traffic_Level',
    'Time_of_Day',
    'Vehicle_Type',
]

TARGET_COLUMN = 'Delivery_Time_min'

TRAFFIC_LEVEL_VALUES = {'Low', 'Medium', 'High'}
TIME_OF_DAY_VALUES = {'Morning', 'Afternoon', 'Evening', 'Night'}
VALID_MODELS = {'linear', 'random_forest', 'gradient_boosting'}
