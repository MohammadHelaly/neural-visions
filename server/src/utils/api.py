from flask import Response, jsonify, make_response
from typing import Optional, Dict, Any


def send_response(
    status_code: int, status: str, message: str, data: Optional[Dict[str, Any]] = None
) -> Response:
    response_body: Dict[str, Any] = {"status": status, "message": message}

    if data is not None:
        response_body["data"] = data

    return make_response(jsonify(response_body), status_code)
