from flask import Flask
from flask_cors import CORS
from src.routes import web, predict
from src.config import CLIENT_DIST_DIR


def create_app():
    app = Flask(__name__, static_folder=CLIENT_DIST_DIR, static_url_path="/")

    CORS(app, methods=["GET", "POST", "OPTIONS"])

    app.register_blueprint(web)
    app.register_blueprint(predict, url_prefix="/predict")

    return app
