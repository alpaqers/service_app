from datetime import date
from .db import db


class Pracownicy(db.Model):
    __tablename__ = "Pracownicy"

    id_pracownika = db.Column(db.Integer, primary_key=True)
    imie = db.Column("imię", db.String(255), nullable=False)
    nazwisko = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    haslo = db.Column("hasło", db.String(255), nullable=False)
    nr_telefonu = db.Column("nr_telefonu", db.String(50))
    stanowisko = db.Column(db.String(100))

    stanowiska = db.relationship(
        "Stanowiska",
        back_populates="pracownik",
        cascade="all, delete-orphan",
    )
    zlecenia = db.relationship(
        "Zlecenia",
        secondary="Pracownicy_Zlecenia",
        back_populates="pracownicy",
    )


class Stanowiska(db.Model):
    __tablename__ = "Stanowiska"

    id_stanowiska = db.Column(db.Integer, primary_key=True)
    id_pracownika = db.Column(
        db.Integer,
        db.ForeignKey("Pracownicy.id_pracownika"),
        nullable=True,
    )
    opis = db.Column(db.String(255))

    pracownik = db.relationship("Pracownicy", back_populates="stanowiska")



class Adresy(db.Model):
    __tablename__ = "Adresy"

    id_adresu = db.Column(db.Integer, primary_key=True)
    ulica = db.Column(db.String(255))
    miasto = db.Column(db.String(100))
    kod_pocztowy = db.Column(db.String(20))
    wojewodztwo = db.Column(db.String(100))

    klient = db.relationship(
        "Klienci",
        back_populates="adres",
        uselist=False,
    )


class Klienci(db.Model):
    __tablename__ = "Klienci"

    id_klienta = db.Column(db.Integer, primary_key=True)
    id_adresu = db.Column(
        db.Integer,
        db.ForeignKey("Adresy.id_adresu"),
        nullable=True,
        unique=True,
    )
    imie = db.Column("imię", db.String(100), nullable=False)
    nazwisko = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255))
    nr_telefonu = db.Column("nr_telefonu", db.String(30))

    adres = db.relationship("Adresy", back_populates="klient")
    urzadzenia = db.relationship("Urządzenia", back_populates="klient")
    zlecenia = db.relationship("Zlecenia", back_populates="klient")


class Typy_urządzeń(db.Model):
    __tablename__ = "Typy_urządzeń"

    id_typu = db.Column(db.Integer, primary_key=True)
    nazwa = db.Column(db.String(100), nullable=False)

    urzadzenia = db.relationship("Urządzenia", back_populates="typ")


class Urządzenia(db.Model):
    __tablename__ = "Urządzenia"

    id_urzędzenia = db.Column(db.Integer, primary_key=True)
    id_klienta = db.Column(
        db.Integer,
        db.ForeignKey("Klienci.id_klienta"),
        nullable=False,
    )
    typ_urządzenia = db.Column(
        db.Integer,
        db.ForeignKey("Typy_urządzeń.id_typu"),
        nullable=False,
    )
    nr_seryjny = db.Column(db.String(100))
    opis = db.Column(db.String(255))

    klient = db.relationship("Klienci", back_populates="urzadzenia")
    typ = db.relationship("Typy_urządzeń", back_populates="urzadzenia")
    zlecenia = db.relationship("Zlecenia", back_populates="urzadzenie")


class Zlecenia(db.Model):
    __tablename__ = "Zlecenia"

    id_zlecenia = db.Column(db.Integer, primary_key=True)
    id_klienta = db.Column(
        db.Integer,
        db.ForeignKey("Klienci.id_klienta"),
        nullable=False,
    )
    id_urządzenia = db.Column(
        db.Integer,
        db.ForeignKey("Urządzenia.id_urzędzenia"),
        nullable=False,
    )
    opis = db.Column(db.String(255))
    data_utworzenia = db.Column(db.Date, default=date.today)
    termin_realizacji = db.Column(db.Date, nullable=True)
    status = db.Column(db.String(50), default="NEW")

    klient = db.relationship("Klienci", back_populates="zlecenia")
    urzadzenie = db.relationship("Urządzenia", back_populates="zlecenia")

    pracownicy = db.relationship(
        "Pracownicy",
        secondary="Pracownicy_Zlecenia",
        back_populates="zlecenia",
    )
    uzyte_czesci = db.relationship(
        "Używane_części",
        back_populates="zlecenie",
        cascade="all, delete-orphan",
    )



class Pracownicy_Zlecenia(db.Model):
    __tablename__ = "Pracownicy_Zlecenia"

    id_pracownika = db.Column(
        db.Integer,
        db.ForeignKey("Pracownicy.id_pracownika"),
        primary_key=True,
    )
    id_zlecenia = db.Column(
        db.Integer,
        db.ForeignKey("Zlecenia.id_zlecenia"),
        primary_key=True,
    )

    pracownik = db.relationship("Pracownicy", viewonly=True)
    zlecenie = db.relationship("Zlecenia", viewonly=True)


class Typy_części(db.Model):
    __tablename__ = "Typy_części"

    id_typu_części = db.Column(db.Integer, primary_key=True)
    nazwa = db.Column(db.String(100), nullable=False)

    czesci = db.relationship("Części", back_populates="typ")


class Części(db.Model):
    __tablename__ = "Części"

    id_części = db.Column(db.Integer, primary_key=True)
    id_typu_części = db.Column(
        db.Integer,
        db.ForeignKey("Typy_części.id_typu_części"),
        nullable=False,
    )
    liczba_sztuk = db.Column(db.Integer, default=0)
    opis = db.Column(db.String(255))

    typ = db.relationship("Typy_części", back_populates="czesci")
    uzycia = db.relationship(
        "Używane_części",
        back_populates="czesc",
        cascade="all, delete-orphan",
    )


class Używane_części(db.Model):
    __tablename__ = "Używane_części"

    id_zlecenia = db.Column(
        db.Integer,
        db.ForeignKey("Zlecenia.id_zlecenia"),
        primary_key=True,
    )
    id_części = db.Column(
        db.Integer,
        db.ForeignKey("Części.id_części"),
        primary_key=True,
    )

    zlecenie = db.relationship("Zlecenia", back_populates="uzyte_czesci")
    czesc = db.relationship("Części", back_populates="uzycia")
