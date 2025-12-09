from flask import Blueprint, render_template
from .models import Zlecenia

bp = Blueprint("main", __name__)


@bp.route("/")
def index():
    # Strona startowa
    return render_template("index.html")


@bp.route("/zlecenia")
def zlecenia_list():
    """
    Widok listy zleceń.
    Pobiera wszystkie zlecenia z bazy i przekazuje je do szablonu.
    """
    zlecenia = (
        Zlecenia.query
        .order_by(Zlecenia.data_utworzenia.desc())
        .all()
    )
    return render_template("orders_list.html", zlecenia=zlecenia)
