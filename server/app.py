from flask import Flask, send_from_directory, request, jsonify, make_response
import torch
import pickle
import os
import urllib.request
import uuid
from model import LinearNet

path_current_directory = os.path.dirname(os.path.realpath(__file__))
path_dist_directory = os.path.join(path_current_directory, "../client/dist")
path_images_directory = os.path.join(path_current_directory, "./images")
path_model_encoder_answer = os.path.join(
    path_current_directory, "./saved/encoders/model_encoder_answer.pkl"
)
path_model_encoder_answer_type = os.path.join(
    path_current_directory, "./saved/encoders/model_encoder_answer_type.pkl"
)
path_model = os.path.join(path_current_directory, "./saved/models/VisualQnA.pth")

os.makedirs(path_images_directory, exist_ok=True)

with open(path_model_encoder_answer, "rb") as f:
    model_encoder_answer = pickle.load(f)

with open(path_model_encoder_answer_type, "rb") as f:
    model_encoder_answer_type = pickle.load(f)

model = LinearNet(
    num_classes=5410, device=torch.device("cpu"), model="ViT-L/14@336px"
).to(torch.device("cpu"))
model.load_model(path_model)


def allowed_image_format(image_name):
    allowed_extensions = {"png", "jpg", "jpeg"}
    return (
        "." in image_name and image_name.rsplit(".", 1)[1].lower() in allowed_extensions
    )


app = Flask(__name__, static_folder=path_dist_directory, static_url_path="/")


@app.after_request
def apply_cors(response):
    origin = request.headers.get("Origin")
    if origin:
        response.headers["Access-Control-Allow-Origin"] = origin
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"

    return response


@app.route("/", methods=["GET"])
def index():
    return send_from_directory(path_dist_directory, "index.html")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        image_url_user = request.form.get("image_url")
        question_user = request.form.get("question")
        unique_image_filename = str(uuid.uuid4())
        path_image_user = os.path.join(
            path_images_directory, unique_image_filename + ".jpg"
        )

        if not question_user:
            return make_response(jsonify({"error": "Question not provided."}), 400)

        if (not image_url_user) and "image" not in request.files:
            return make_response(jsonify({"error": "Image not provided."}), 400)

        if "image" in request.files:
            image_user = request.files["image"]

            if not allowed_image_format(image_user.filename):
                return make_response(
                    jsonify({"error": "Image format not allowed."}), 400
                )

            image_user.save(path_image_user)

        if image_url_user:
            urllib.request.urlretrieve(image_url_user, path_image_user)

        predicted_answer, predicted_answer_type, answerability = model.test_model(
            image_path=path_image_user, question=question_user
        )
        answer = model_encoder_answer.inverse_transform(
            predicted_answer.cpu().detach().numpy()
        )
        answer_type = model_encoder_answer_type.inverse_transform(
            predicted_answer_type.cpu().detach().numpy()
        )

        return make_response(
            jsonify(
                {
                    "answer": answer[0][0],
                    "answer_type": answer_type[0][0],
                    "answerability": answerability.item(),
                }
            ),
            200,
        )

    except:
        return make_response(jsonify({"error": "Prediction failed."}), 500)

    finally:
        if os.path.exists(path_image_user):
            os.remove(path_image_user)


if __name__ == "__main__":
    app.run(debug=True)
