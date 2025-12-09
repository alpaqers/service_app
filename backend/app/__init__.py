from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from .config import Config
from .db import db
from . import models
from .routes import bp as main_bp


migrate = Migrate()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(main_bp)

    @app.cli.command("init-db")
    def init_db():
        """Ręczne stworzenie tabel (dla dev)."""
        with app.app_context():
            db.create_all()
            print("Baza zainicjalizowana.")

    return app
