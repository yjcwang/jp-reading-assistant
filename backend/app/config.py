from pydantic_settings import BaseSettings
from typing import Literal

# entrance to get env setting (e.g OpenAI key, temperature)

class Settings(BaseSettings):
    OPENAI_API_KEY: str
    LLM_PROVIDER: Literal["openai", "mock", "ollama"] = "openai" # default is openai, in case env not well defined
    OLLAMA_MODEL: str

    class Config:
        env_file = ".env"

settings = Settings()
 
 