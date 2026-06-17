import pandas as pd
import pytest

from food_delivery_ml.preprocessing.data_splitter import separate_training_test
from food_delivery_ml.utils.exceptions import DataValidationError, PreprocessingError

def test_separate_training_test_is_reproducible(feature_df):
    X = feature_df.drop(columns=['Delivery_Time_min'])
    y = feature_df['Delivery_Time_min']

    first_split = separate_training_test(X, y, test_size=0.2, random_state=42)
    second_split = separate_training_test(X, y, test_size=0.2, random_state=42)

    pd.testing.assert_frame_equal(first_split[0], second_split[0])
    pd.testing.assert_frame_equal(first_split[1], second_split[1])

def test_separate_training_test_correct_proportions(feature_df):
    X = feature_df.drop(columns=['Delivery_Time_min'])
    y = feature_df['Delivery_Time_min']

    X_train, X_test, y_train, y_test = separate_training_test(
        X, y, test_size=0.2, random_state=42
    )

    assert len(X_train) == 4
    assert len(X_test) == 1
    assert len(y_train) == 4
    assert len(y_test) == 1

def test_separate_training_test_raises_for_invalid_test_size(feature_df):
    X = feature_df.drop(columns=['Delivery_Time_min'])
    y = feature_df['Delivery_Time_min']

    with pytest.raises(DataValidationError, match='test_size deve estar entre 0 e 1'):
        separate_training_test(X, y, test_size=1.0)

def test_separate_training_test_raises_for_mismatched_lengths(feature_df):
    X = feature_df.drop(columns=['Delivery_Time_min'])
    y = feature_df['Delivery_Time_min'].iloc[:-1]

    with pytest.raises(DataValidationError, match='Tamanhos incompatíveis'):
        separate_training_test(X, y)

def test_separate_training_test_raises_for_single_sample(feature_df):
    X = feature_df.drop(columns=['Delivery_Time_min']).iloc[:1]
    y = feature_df['Delivery_Time_min'].iloc[:1]

    with pytest.raises(PreprocessingError, match='ao menos 2 amostras'):
        separate_training_test(X, y)
