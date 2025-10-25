from flask import Flask
from flask import render_template as render
from urllib.parse import unquote # Decode url

app = Flask("__BBCImagesCaptioner__")


@app.route('/')
def index():
    return render("index.html")


@app.route('/submit-url/<path:URL>/', methods=["POST"])
def web_scrapping(URL):
    URL = unquote(URL)
    if not ("bbc.com" in URL):
        return "Incorrect link, please use a URL containing bbc.com"
    else:
        return "Valid link"
