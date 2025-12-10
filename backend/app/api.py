# -*- coding: utf-8 -*-
from datetime import date

from flask import Blueprint, jsonify, request, abort
from sqlalchemy import func

from .db import db
from .models import (
    Klienci,
    Adresy,
    Urządzenia,
    Typy_urządzeń,
    Zlecenia,
    Pracownicy_Zlecenia,
    Pracownicy,
    Części,
    Typy_części,
    Używane_części,
)

api_bp = Blueprint("api", __name__, url_prefix="/api")


def to_date_str(d):
    """Pomocniczo zamienia date/datetime na string do JSON-a."""
    return d.isoformat() if d is not None else None


# ------------------------------------------------------
#  KLIENCI
# ------------------------------------------------------

@api_bp.get("/klienci")
def get_klienci():
    klienci = Klienci.query.all()
    result = []
    for k in klienci:
        result.append({
            "id_klienta": k.id_klienta,
            "imie": k.imie,
            "nazwisko": k.nazwisko,
            "email": k.email,
            "nr_telefonu": k.nr_telefonu,
        })
    return jsonify(result)


@api_bp.post("/klienci")
def create_klient():
    data = request.get_json() or {}

    if "imie" not in data or "nazwisko" not in data or "email" not in data or "adres" not in data:
        return jsonify({"error": "Brakuje wymaganych pól"}), 400

    adres_data = data["adres"]

    adres = Adresy(
        ulica=adres_data.get("ulica"),
        miasto=adres_data.get("miasto"),
        kod_pocztowy=adres_data.get("kod_pocztowy"),
        wojewodztwo=adres_data.get("wojewodztwo"),
    )
    db.session.add(adres)
    db.session.flush()  # żeby mieć id_adresu

    klient = Klienci(
        imie=data["imie"],
        nazwisko=data["nazwisko"],
        email=data["email"],
        nr_telefonu=data.get("nr_telefonu"),
        id_adresu=adres.id_adresu,
    )
    db.session.add(klient)
    db.session.commit()

    return jsonify({"message": "Klient utworzony", "id_klienta": klient.id_klienta}), 201


@api_bp.get("/klienci/<int:id_klienta>")
def get_klient(id_klienta):
    klient = Klienci.query.get_or_404(id_klienta)
    adres = klient.adres  # relacja one-to-one

    return jsonify({
        "id_klienta": klient.id_klienta,
        "imie": klient.imie,
        "nazwisko": klient.nazwisko,
        "email": klient.email,
        "nr_telefonu": klient.nr_telefonu,
        "adres": {
            "ulica": adres.ulica if adres else None,
            "miasto": adres.miasto if adres else None,
            "kod_pocztowy": adres.kod_pocztowy if adres else None,
            "wojewodztwo": adres.wojewodztwo if adres else None,
        }
    })


@api_bp.get("/klienci/<int:id_klienta>/urzadzenia")
def get_urzadzenia_klienta(id_klienta):
    urzadzenia = Urządzenia.query.filter_by(id_klienta=id_klienta).all()

    return jsonify([
        {
            "id_urzadzenia": u.id_urzędzenia,
            "id_klienta": u.id_klienta,
            "typ_urządzenia": u.typ_urządzenia,
            "nr_seryjny": u.nr_seryjny,
            "opis": u.opis,
        }
        for u in urzadzenia
    ])


@api_bp.delete("/klienci/<int:id_klienta>")
def delete_klient(id_klienta):
    klient = Klienci.query.get_or_404(id_klienta)

    # Usuwamy adres klienta (relacja 1-1)
    if klient.id_adresu is not None:
        Adresy.query.filter_by(id_adresu=klient.id_adresu).delete()

    # Usuwamy urządzenia klienta
    Urządzenia.query.filter_by(id_klienta=id_klienta).delete()

    # TODO: w razie potrzeby można tu dodać usuwanie zleceń, użytych części itd.
    db.session.delete(klient)
    db.session.commit()

    return jsonify({"message": "Klient usunięty"})


# ------------------------------------------------------
#  URZĄDZENIA
# ------------------------------------------------------

@api_bp.get("/urzadzenia")
def get_urzadzenia():
    urzadzenia = Urządzenia.query.all()
    result = []
    for u in urzadzenia:
        result.append({
            "id_urzadzenia": u.id_urzędzenia,
            "id_klienta": u.id_klienta,
            "typ_urządzenia": u.typ_urządzenia,
            "nr_seryjny": u.nr_seryjny,
            "opis": u.opis,
        })
    return jsonify(result)


@api_bp.post("/urzadzenia")
def create_urzadzenie():
    data = request.get_json() or {}

    if "id_klienta" not in data or "typ_urządzenia" not in data:
        return jsonify({"error": "Brakuje wymaganych pól"}), 400

    urz = Urządzenia(
        id_klienta=data["id_klienta"],
        typ_urządzenia=data["typ_urządzenia"],
        nr_seryjny=data.get("nr_seryjny"),
        opis=data.get("opis"),
    )
    db.session.add(urz)
    db.session.commit()

    return jsonify({"message": "Urządzenie utworzone", "id_urzadzenia": urz.id_urzędzenia}), 201


# ------------------------------------------------------
#  ZLECENIA
# ------------------------------------------------------

@api_bp.get("/zlecenia")
def get_zlecenia():
    zlecenia = Zlecenia.query.all()

    result = []
    for z in zlecenia:
        result.append({
            "id_zlecenia": z.id_zlecenia,
            "id_klienta": z.id_klienta,
            "id_urzadzenia": z.id_urządzenia,
            "opis": z.opis,
            "status": z.status,
            "data_utworzenia": to_date_str(z.data_utworzenia),
            "termin_realizacji": to_date_str(z.termin_realizacji),
        })
    return jsonify(result)


@api_bp.get("/zlecenia/<int:id_zlecenia>")
def get_zlecenie(id_zlecenia):
    z = Zlecenia.query.get_or_404(id_zlecenia)
    return jsonify({
        "id_zlecenia": z.id_zlecenia,
        "id_klienta": z.id_klienta,
        "id_urzadzenia": z.id_urządzenia,
        "opis": z.opis,
        "status": z.status,
        "data_utworzenia": to_date_str(z.data_utworzenia),
        "termin_realizacji": to_date_str(z.termin_realizacji),
    })


@api_bp.post("/zlecenia")
def create_zlecenie():
    """
    Transakcja:
    - dodanie urządzenia (jeśli nowe)
    - dodanie zlecenia
    - przypisanie pracownika
    """
    data = request.get_json() or {}

    required = ("id_klienta", "urzadzenie", "opis_zlecenia", "id_pracownika")
    if not all(k in data for k in required):
        return jsonify({"error": "Brakuje wymaganych pól"}), 400

    urz_data = data["urzadzenie"]

    # 1. dodanie urządzenia
    urz = Urządzenia(
        id_klienta=data["id_klienta"],
        typ_urządzenia=urz_data["typ_urządzenia"],
        nr_seryjny=urz_data.get("nr_seryjny"),
        opis=urz_data.get("opis"),
    )
    db.session.add(urz)
    db.session.flush()  # żeby mieć id_urzędzenia

    # 2. dodanie zlecenia
    zlec = Zlecenia(
        id_klienta=data["id_klienta"],
        id_urządzenia=urz.id_urzędzenia,
        opis=data["opis_zlecenia"],
        status="NEW",
        data_utworzenia=date.today(),
        termin_realizacji=None,
    )
    db.session.add(zlec)
    db.session.flush()

    # 3. przypisanie pracownika
    przyp = Pracownicy_Zlecenia(
        id_pracownika=data["id_pracownika"],
        id_zlecenia=zlec.id_zlecenia,
    )
    db.session.add(przyp)

    db.session.commit()

    return jsonify({"message": "Zlecenie utworzone", "id_zlecenia": zlec.id_zlecenia}), 201


@api_bp.put("/zlecenia/<int:id_zlecenia>/status")
def update_status(id_zlecenia):
    data = request.get_json() or {}

    if "status" not in data:
        return jsonify({"error": "Brakuje pola 'status'"}), 400

    zlec = Zlecenia.query.get_or_404(id_zlecenia)
    zlec.status = data["status"]

    db.session.commit()

    return jsonify({"message": "Status zaktualizowany"})


@api_bp.get("/zlecenia/rozszerzone")
def get_zlecenia_rozszerzone():
    """
    Zwraca listę zleceń z:
    - klientem,
    - pierwszym przypisanym pracownikiem,
    - typem urządzenia.
    """
    zlecenia = Zlecenia.query.all()
    result = []

    for z in zlecenia:
        klient = z.klient
        urz = z.urzadzenie if hasattr(z, "urzadzenie") else None
        typ = urz.typ if urz and hasattr(urz, "typ") else None
        pracownik = z.pracownicy[0] if getattr(z, "pracownicy", []) else None

        result.append({
            "id_zlecenia": z.id_zlecenia,
            "klient": f"{klient.imie} {klient.nazwisko}" if klient else None,
            "serwisant": f"{pracownik.imie} {pracownik.nazwisko}" if pracownik else None,
            "typ_urzadzenia": typ.nazwa if typ else None,
            "status": z.status,
        })

    return jsonify(result)


# ------------------------------------------------------
#  PRACOWNICY
# ------------------------------------------------------

@api_bp.get("/pracownicy")
def get_pracownicy():
    pracownicy = Pracownicy.query.all()

    return jsonify([
        {
            "id_pracownika": p.id_pracownika,
            "imie": p.imie,
            "nazwisko": p.nazwisko,
            "email": p.email,
            "nr_telefonu": p.nr_telefonu,
            "stanowisko": p.stanowisko,
        }
        for p in pracownicy
    ])


@api_bp.post("/pracownicy")
def create_pracownik():
    data = request.get_json() or {}

    required = ("imie", "nazwisko", "email")
    if not all(k in data for k in required):
        return jsonify({"error": "Brakuje wymaganych pól"}), 400

    pracownik = Pracownicy(
        imie=data["imie"],
        nazwisko=data["nazwisko"],
        email=data["email"],
        haslo=data.get("haslo", ""),  # docelowo: hashowanie
        nr_telefonu=data.get("nr_telefonu"),
        stanowisko=data.get("stanowisko"),
    )

    db.session.add(pracownik)
    db.session.commit()

    return jsonify({"message": "Pracownik utworzony", "id_pracownika": pracownik.id_pracownika}), 201


@api_bp.get("/pracownicy/<int:id_pracownika>/zlecenia")
def get_zlecenia_pracownika(id_pracownika):
    pracownik = Pracownicy.query.get_or_404(id_pracownika)
    aktywne = [
        z for z in pracownik.zlecenia
        if z.status in ("NEW", "IN_PROGRESS")
    ]

    return jsonify([
        {
            "id_zlecenia": z.id_zlecenia,
            "opis": z.opis,
            "status": z.status,
            "termin_realizacji": to_date_str(z.termin_realizacji),
        }
        for z in aktywne
    ])


# ------------------------------------------------------
#  CZĘŚCI / MAGAZYN
# ------------------------------------------------------

@api_bp.get("/czesci")
def get_czesci():
    czesci = Części.query.all()

    return jsonify([
        {
            "id_czesci": c.id_części,
            "id_typu_czesci": c.id_typu_części,
            "liczba_sztuk": c.liczba_sztuk,
            "opis": c.opis,
        }
        for c in czesci
    ])


@api_bp.post("/czesci")
def create_czesc():
    data = request.get_json() or {}

    required = ("id_typu_czesci", "liczba_sztuk")
    if not all(k in data for k in required):
        return jsonify({"error": "Brakuje wymaganych pól"}), 400

    czesc = Części(
        id_typu_części=data["id_typu_czesci"],
        liczba_sztuk=data["liczba_sztuk"],
        opis=data.get("opis"),
    )

    db.session.add(czesc)
    db.session.commit()

    return jsonify({"message": "Część dodana", "id_czesci": czesc.id_części}), 201


@api_bp.post("/zlecenia/<int:id_zlecenia>/czesci")
def add_czesci_to_zlecenie(id_zlecenia):
    """
    Dodanie użytych części do zlecenia:
    - tworzy wpisy w Używane_części (po 1 na sztukę),
    - zmniejsza stan magazynowy w Części.
    """
    data = request.get_json() or {}

    if "id_czesci" not in data:
        return jsonify({"error": "Brakuje pola 'id_czesci'"}), 400

    ilosc = data.get("ilosc", 1)

    zlec = Zlecenia.query.get_or_404(id_zlecenia)
    czesc = Części.query.get_or_404(data["id_czesci"])

    if czesc.liczba_sztuk is None or czesc.liczba_sztuk < ilosc:
        return jsonify({"error": "Za mało sztuk w magazynie"}), 400

    for _ in range(ilosc):
        uzycie = Używane_części(
            id_zlecenia=zlec.id_zlecenia,
            id_części=czesc.id_części,
        )
        db.session.add(uzycie)

    czesc.liczba_sztuk -= ilosc

    db.session.commit()

    return jsonify({"message": "Części dodane do zlecenia"})


# ------------------------------------------------------
#  STATYSTYKI
# ------------------------------------------------------

@api_bp.get("/statystyki/czesci")
def statystyki_czesci():
    """
    Zestawienie najczęściej wykorzystywanych typów części.
    Odpowiada zapytaniu z dokumentacji.
    """
    q = (
        db.session.query(
            Typy_części.nazwa.label("typ_czesci"),
            func.count(Używane_części.id_części).label("liczba_uzyc"),
        )
        .join(Części, Części.id_typu_części == Typy_części.id_typu_części)
        .join(Używane_części, Używane_części.id_części == Części.id_części)
        .group_by(Typy_części.nazwa)
        .order_by(func.count(Używane_części.id_części).desc())
    )

    return jsonify([
        {
            "typ_czesci": row.typ_czesci,
            "liczba_uzyc": row.liczba_uzyc,
        }
        for row in q
    ])


# ------------------------------------------------------
#  KALENDARZ – zajęte terminy
# ------------------------------------------------------

@api_bp.get("/kalendarz/zajete-terminy")
def get_zajete_terminy():
    """
    Zwraca nadchodzące zlecenia (od dzisiaj wzwyż),
    z datą terminu i statusem - pod widok kalendarza.
    """
    today = date.today()

    zlecenia = (
        Zlecenia.query
        .filter(Zlecenia.termin_realizacji >= today)
        .order_by(Zlecenia.termin_realizacji.asc())
        .all()
    )

    return jsonify([
        {
            "id_zlecenia": z.id_zlecenia,
            "data": to_date_str(z.termin_realizacji),
            "status": z.status,
        }
        for z in zlecenia
    ])
