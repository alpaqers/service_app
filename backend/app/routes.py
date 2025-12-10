from flask import Blueprint, render_template
from .models import Zlecenia

bp = Blueprint("main", __name__)

@bp.route("/")
def index():
    return render_template("index.html")