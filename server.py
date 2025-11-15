import os
from flask import Flask
from flask import render_template as render
from urllib.parse import unquote  # Decode url
from ServerHandler.captioningAPI import getImages, captioning_with_filter
from waitress import serve
import json

app = Flask("__BBCImagesCaptioner__")


@app.route('/')
def index():
    return render("index.html")


@app.route('/submit-url/<path:URL>/', methods=["POST"])
def web_scrapping(URL):
    URL = unquote(URL)
    if not ("bbc.com" in URL):
        return "Incorrect link, please use a BBC link"
    else:
        return "Valid link"


@app.route('/get-images/<path:URL>/', methods=["GET"])
def get_images(URL):
    URL = unquote(URL)
    paths = getImages(URL)
    return json.dumps(paths)  # Convert Python list to JSON type


@app.route('/get-context/<path:URL>/', methods=["GET"])
def get_context(URL):
    URL = unquote(URL)
    res = captioning_with_filter(URL)
    return res


port = int(os.environ.get("PORT", 5000))


if __name__ == "__main__":
    serve(app, host='0.0.0.0', port=port)
