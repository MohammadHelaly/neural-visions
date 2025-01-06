from PIL import Image
from urllib.parse import urlparse


def is_valid_image(
    image_path: str, allowed_formats: set = {"JPEG", "PNG", "JPG", "WEBP"}
) -> bool:
    try:
        with Image.open(image_path) as img:
            return img.format.upper() in allowed_formats

    except Exception:
        return False


def is_valid_url(url: str) -> bool:
    parsed = urlparse(url)
    return bool(parsed.netloc) and bool(parsed.scheme)
