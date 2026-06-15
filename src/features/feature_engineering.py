def map_ordinal_traffic(df):
    mapa = {'Low': 1, 'Medium': 2, 'High': 3}
    df['Traffic_Level_ord'] = df['Traffic_Level'].map(mapa)
    
    return df

def create_peak_hours(df):
    pico = {'Morning': 0, 'Afternoon': 1, 'Evening': 1, 'Night': 0}
    df['Horario_Pico'] = df['Time_of_Day'].map(pico)
    
    return df

def create_interactions(df):
    if 'Distance_km' in df.columns and 'Traffic_Level_ord' in df.columns:
        df['Dist_x_Traffic'] = df['Distance_km'] * df['Traffic_Level_ord']
        
    if 'Preparation_Time_min' in df.columns and 'Horario_Pico' in df.columns:
        df['Prep_x_Pico'] = df['Preparation_Time_min'] * df['Horario_Pico']
        
    return df