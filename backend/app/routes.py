from flask import Blueprint, render_template
from .models import Zlecenia

bp = Blueprint("main", __name__)

@bp.route("/")
def index():
    return render_template("index.html")


@bp.route("/login")
def login():
    return render_template("login.html")


@bp.route("/panel/klient")
def panel_klienta():
    return render_template("panel_klienta.html")


@bp.route("/panel/serwisant")
def panel_serwisanta():
    return render_template("panel_serwisanta.html")


@bp.route("/panel/koordynator")
def panel_koordynatora():
    return render_template("panel_koordynatora.html")

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
