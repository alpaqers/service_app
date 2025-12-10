# -*- coding: utf-8 -*-
from datetime import date, timedelta
import random

from app import create_app
from app.db import db
from app.models import (
    Pracownicy,
    Stanowiska,
    Adresy,
    Klienci,
    Typy_urządzeń,
    Urządzenia,
    Zlecenia,
    Typy_części,
    Części,
    Używane_części,
    Pracownicy_Zlecenia,
)


# -------------------------------
# DANE POMOCNICZE
# -------------------------------

FIRST_NAMES = ["Jan", "Adam", "Marek", "Tomasz", "Piotr"]
LAST_NAMES = ["Nowak", "Kowalski", "Wiśniewski", "Wójcik", "Zieliński"]

CITIES = ["Wrocław", "Kraków", "Poznań", "Warszawa", "Gdańsk"]
STREETS = ["Polna", "Leśna", "Kwiatowa", "Słoneczna", "Długa"]
WOJEW = ["dolnośląskie", "małopolskie", "wielkopolskie", "mazowieckie", "pomorskie"]

DEVICE_TYPES = ["Telewizor", "Pralka", "Zmywarka", "Lodówka", "Smartfon"]
DEVICE_ISSUES = [
    "Nie włącza się",
    "Brak obrazu",
    "Hałasuje przy pracy",
    "Nie reaguje na przyciski",
    "Problem z zasilaniem",
]

PART_TYPE_NAMES = ["Elektronika", "Mechaniczne", "Zasilanie", "Sterowanie", "Obudowa"]
PART_DESCRIPTIONS = [
    "Płyta główna urządzenia",
    "Moduł zasilania",
    "Taśma sygnałowa",
    "Moduł WiFi",
    "Panel sterowania",
]


def run_seed():
    app = create_app()
    with app.app_context():
        print("Czyszczenie bazy…\n")
        db.drop_all()
        db.create_all()

        # -------------------------------
        # 1. Adresy
        # -------------------------------
        print("Dodawanie adresów…")
        adresy_list = []
        for i in range(5):
            adr = Adresy(
                ulica=f"{random.choice(STREETS)} {random.randint(1, 120)}",
                miasto=random.choice(CITIES),
                kod_pocztowy=f"{random.randint(10, 99)}-{random.randint(100, 999)}",
                wojewodztwo=random.choice(WOJEW),
            )
            db.session.add(adr)
            adresy_list.append(adr)

        # -------------------------------
        # 2. Klienci (każdy z unikalnym adresem)
        # -------------------------------
        print("Dodawanie klientów…")
        klienci_list = []
        for i in range(5):
            imie = random.choice(FIRST_NAMES)
            nazwisko = random.choice(LAST_NAMES)
            klient = Klienci(
                imie=imie,
                nazwisko=nazwisko,
                email=f"{imie.lower()}.{nazwisko.lower()}{i}@example.com",
                nr_telefonu=f"60070070{i}",
                adres=adresy_list[i],  # relacja one-to-one, id_adresu jest UNIQUE
            )
            db.session.add(klient)
            klienci_list.append(klient)

        # -------------------------------
        # 3. Typy urządzeń
        # -------------------------------
        print("Dodawanie typów urządzeń…")
        typy_urzadzen_list = []
        for name in DEVICE_TYPES:
            typ = Typy_urządzeń(nazwa=name)
            db.session.add(typ)
            typy_urzadzen_list.append(typ)

        # -------------------------------
        # 4. Typy części
        # -------------------------------
        print("Dodawanie typów części…")
        typy_czesci_list = []
        for name in PART_TYPE_NAMES:
            t = Typy_części(nazwa=name)
            db.session.add(t)
            typy_czesci_list.append(t)

        db.session.flush()  # mamy już id_* dla typów, adresów, klientów

        # -------------------------------
        # 5. Części (magazyn)
        # -------------------------------
        print("Dodawanie części…")
        czesci_list = []
        for i in range(5):
            opis = PART_DESCRIPTIONS[i % len(PART_DESCRIPTIONS)]
            cz = Części(
                typ=random.choice(typy_czesci_list),
                liczba_sztuk=random.randint(5, 20),
                opis=opis,
            )
            db.session.add(cz)
            czesci_list.append(cz)

        # -------------------------------
        # 6. Urządzenia
        # -------------------------------
        print("Dodawanie urządzeń…")
        urzadzenia_list = []
        for i in range(5):
            issue = random.choice(DEVICE_ISSUES)
            urz = Urządzenia(
                klient=klienci_list[i],
                typ=random.choice(typy_urzadzen_list),
                nr_seryjny=f"SN-{random.randint(100000, 999999)}",
                opis=issue,
            )
            db.session.add(urz)
            urzadzenia_list.append(urz)

        # -------------------------------
        # 7. Zlecenia
        # -------------------------------
        print("Dodawanie zleceń…")
        zlecenia_list = []
        today = date.today()
        for i in range(5):
            created = today - timedelta(days=random.randint(0, 10))
            # Część zleceń ma termin realizacji, część nie
            if random.choice([True, False]):
                termin = created + timedelta(days=random.randint(1, 7))
            else:
                termin = None

            zlec = Zlecenia(
                klient=klienci_list[i],
                urzadzenie=urzadzenia_list[i],
                opis=f"Zgłoszenie: {urzadzenia_list[i].opis}",
                data_utworzenia=created,
                termin_realizacji=termin,
                status=random.choice(["NEW", "IN_PROGRESS", "DONE"]),
            )
            db.session.add(zlec)
            zlecenia_list.append(zlec)

        # -------------------------------
        # 8. Pracownicy + Stanowiska
        # -------------------------------
        print("Dodawanie pracowników i stanowisk…")
        pracownicy_list = []
        for i in range(5):
            imie = random.choice(FIRST_NAMES)
            nazwisko = random.choice(LAST_NAMES)
            prac = Pracownicy(
                imie=imie,
                nazwisko=nazwisko,
                email=f"{imie.lower()}.{nazwisko.lower()}{i}@firma.pl",
                haslo="tajnehaslo",  # na razie zwykły tekst, bez hashowania
                nr_telefonu=f"50080090{i}",
                stanowisko="Serwisant" if i < 4 else "Koordynator",
            )
            db.session.add(prac)
            pracownicy_list.append(prac)

        db.session.flush()  # żeby mieć id_pracownika, id_zlecenia, id_części itd.

        # Proste stanowiska opisowe powiązane z pracownikami
        for p in pracownicy_list:
            st = Stanowiska(
                id_pracownika=p.id_pracownika,
                opis=f"Stanowisko: {p.stanowisko}",
            )
            db.session.add(st)

        db.session.commit()
        print("\nZapisano dane podstawowe (klienci, urządzenia, zlecenia, pracownicy, części).\n")

        # -------------------------------
        # 9. Relacja Pracownicy_Zlecenia
        # -------------------------------
        print("Przypisywanie pracowników do zleceń…")
        # Na start: 1 pracownik = 1 zlecenie (prosto)
        for i in range(5):
            p = pracownicy_list[i]
            z = zlecenia_list[i]
            rel = Pracownicy_Zlecenia(
                id_pracownika=p.id_pracownika,
                id_zlecenia=z.id_zlecenia,
            )
            db.session.add(rel)

        # -------------------------------
        # 10. Używane_części (łącznik zleceń i części)
        # -------------------------------
        print("Przypisywanie części do zleceń…")
        # Utworzymy po jednym wpisie Używane_części na zlecenie
        for i in range(5):
            z = zlecenia_list[i]
            cz = random.choice(czesci_list)
            u = Używane_części(
                id_zlecenia=z.id_zlecenia,
                id_części=cz.id_części,
            )
            db.session.add(u)

            # zmniejszamy stan w magazynie
            if cz.liczba_sztuk > 0:
                cz.liczba_sztuk -= 1

        db.session.commit()
        print("\noperacja zakończona pomyślnie")


if __name__ == "__main__":
    run_seed()
