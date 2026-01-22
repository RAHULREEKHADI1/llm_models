from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    DATABASE_URL: str

    DECODER_MODEL_NAME: str
    ENC_DEC_MODEL_NAME: str
    FRONTEND_ORIGINS: str 

    class Config:
        env_file = ".env"


@lru_cache
def get_settings() -> Settings:
    return Settings()
