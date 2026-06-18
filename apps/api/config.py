from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    redis_url: str = "redis://localhost:6379/0"
    delivery_queue_key: str = "delivery:queue"
    delivery_results_channel: str = "delivery:results"
    model_path: str = "artifacts/models/linear_model.pkl"


settings = Settings()
