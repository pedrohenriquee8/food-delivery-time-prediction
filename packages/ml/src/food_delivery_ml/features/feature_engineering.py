from food_delivery_ml.utils.constants import TIME_OF_DAY_VALUES, TRAFFIC_LEVEL_VALUES
from food_delivery_ml.utils.validators import (
    validate_categorical_values,
    validate_column_exists,
    validate_required_columns,
)

def map_ordinal_traffic(df):
    ''' Converte a variável categórica Traffic_Level em uma variável numérica 
    
        :param df: DataFrame contendo a coluna Traffic_Level
        :return: DataFrame com a nova coluna Traffic_Level_ord
    '''

    validate_column_exists(df, 'Traffic_Level')
    validate_categorical_values(df['Traffic_Level'], TRAFFIC_LEVEL_VALUES, 'Traffic_Level')

    mapa = {'Low': 1, 'Medium': 2, 'High': 3}
    df['Traffic_Level_ord'] = df['Traffic_Level'].map(mapa)

    return df

def create_peak_hours(df):
    ''' Cria uma variável Horario_Pico que faz o modelo entender que horários de maior demanda as entregas podem demorar mais 
    
        :param df: DataFrame contendo a coluna Time_of_Day
        :return: DataFrame com a nova coluna Horario_Pico
    '''

    validate_column_exists(df, 'Time_of_Day')
    validate_categorical_values(df['Time_of_Day'], TIME_OF_DAY_VALUES, 'Time_of_Day')

    pico = {'Morning': 0, 'Afternoon': 1, 'Evening': 1, 'Night': 0}
    df['Horario_Pico'] = df['Time_of_Day'].map(pico)

    return df

def create_interactions(df):
    ''' Combina variáveis independentes para capturar efeitos conjuntos que podem impactar na entrega 
    
        :param df: DataFrame contendo as colunas Distance_km, Traffic_Level_ord, Preparation_Time_min e Horario_Pico
        :return: DataFrame com as novas colunas Dist_x_Traffic e Prep_x_Pico
    '''

    validate_required_columns(
        df,
        ['Distance_km', 'Traffic_Level_ord', 'Preparation_Time_min', 'Horario_Pico'],
    )

    df['Dist_x_Traffic'] = df['Distance_km'] * df['Traffic_Level_ord']
    df['Prep_x_Pico'] = df['Preparation_Time_min'] * df['Horario_Pico']

    return df
