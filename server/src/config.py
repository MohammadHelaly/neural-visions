import os

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

CLIENT_DIR = os.path.join(BASE_DIR, "../../client")
CLIENT_DIST_DIR = os.path.join(CLIENT_DIR, "./dist")

IMAGES_DIR = os.path.join(BASE_DIR, "./images")

SAVED_DIR = os.path.join(BASE_DIR, "./saved")
SAVED_MODELS_DIR = os.path.join(SAVED_DIR, "./models")
SAVED_ENCODERS_DIR = os.path.join(SAVED_DIR, "./encoders")

MODEL_ENCODER_ANSWER_PATH = os.path.join(SAVED_ENCODERS_DIR, "model_encoder_answer.pkl")
MODEL_ENCODER_ANSWER_TYPE_PATH = os.path.join(
    SAVED_ENCODERS_DIR, "model_encoder_answer_type.pkl"
)

MODEL_PATH = os.path.join(SAVED_MODELS_DIR, "VisualQnA.pth")

# Ensure images directory exists
os.makedirs(IMAGES_DIR, exist_ok=True)
