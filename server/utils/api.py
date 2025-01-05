from flask import Response, jsonify, make_response


def send_response(
    status_code: int, status: str, message: str, data: dict = None
) -> Response:
    response_body = {"status": status, "message": message}

    if data is not None:
        response_body["data"] = data

    return make_response(jsonify(response_body), status_code)
