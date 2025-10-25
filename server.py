from flask import Flask
from flask import render_template as render

app = Flask("__BBCImagesCaptioner__")


@app.route('/')
def index():
    return render("index.html")
