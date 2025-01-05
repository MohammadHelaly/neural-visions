from flask import Flask
from flask_cors import CORS
from blueprints import web, predict
from config import CLIENT_DIST_DIR


app = Flask(__name__, static_folder=CLIENT_DIST_DIR, static_url_path="/")

CORS(app, methods=["GET", "POST", "OPTIONS"])

app.register_blueprint(web)

app.register_blueprint(predict, url_prefix="/predict")

if __name__ == "__main__":
    app.run(debug=True)
