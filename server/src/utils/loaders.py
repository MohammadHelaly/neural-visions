from typing import Any
import pickle
import torch
from src.models import LinearNet
from src.config import (
    MODEL_ENCODER_ANSWER_PATH,
    MODEL_ENCODER_ANSWER_TYPE_PATH,
    MODEL_PATH,
)


def load_encoder(encoder_path: str) -> Any:
    with open(encoder_path, "rb") as f:
        encoder = pickle.load(f)
    return encoder


def load_model_and_encoders() -> tuple:
    model_encoder_answer = load_encoder(MODEL_ENCODER_ANSWER_PATH)
    model_encoder_answer_type = load_encoder(MODEL_ENCODER_ANSWER_TYPE_PATH)

    model = LinearNet(
        num_classes=5410, device=torch.device("cpu"), model="ViT-L/14@336px"
    ).to(torch.device("cpu"))
    model.load_model(MODEL_PATH)

    return model, model_encoder_answer, model_encoder_answer_type
