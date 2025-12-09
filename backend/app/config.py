import os
from dotenv import load_dotenv

BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
ENV_PATH = os.path.join(BASE_DIR, ".env")
load_dotenv(ENV_PATH)

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-key")
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        #W przypadku braku MySQL używana jest baza SQLite
        "sqlite:///" + os.path.join(BASE_DIR, "service.db")
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
