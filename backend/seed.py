from datetime import date

from app import create_app
from app.db import db
from app.models import Klienci, Adresy, Typy_urządzeń, Urządzenia, Zlecenia


def run_seed():
    app = create_app()
    with app.app_context():
        # 1. Adres klienta
        adres = Adresy(
            ulica="ul. Serwisowa 10",
            miasto="Wrocław",
            kod_pocztowy="50-000",
            wojewodztwo="dolnośląskie",
        )

        # 2. Klient
        klient = Klienci(
            imie="Jan",
            nazwisko="Kowalski",
            email="jan.kowalski@example.com",
            nr_telefonu="600700800",
            adres=adres,
        )

        # 3. Typ urządzenia
        typ_tv = Typy_urządzeń(
            nazwa="Telewizor"
        )

        # 4. Urządzenie
        urzadzenie = Urządzenia(
            klient=klient,
            typ=typ_tv,
            nr_seryjny="SN-ABC-123",
            opis="Telewizor LG, brak obrazu",
        )

        # 5. Zlecenie
        zlecenie = Zlecenia(
            klient=klient,
            urzadzenie=urzadzenie,
            opis="Brak obrazu po włączeniu",
            data_utworzenia=date.today(),
            status="NEW",
        )

        # dodanie wszystkiego do sesji
        db.session.add_all([adres, klient, typ_tv, urzadzenie, zlecenie])
        db.session.commit()
        print("Dane testowe zostały dodane.")


if __name__ == "__main__":
    run_seed()
