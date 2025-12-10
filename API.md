# Dokumentacja API serwisu

## 1. Podstawowe endpointy

### 1.1. Klienci

---

#### `GET /api/klienci`  
Pobranie listy wszystkich klientów.

**Output**

```json
[
  {
    "id_klienta": 1,
    "imie": "Jan",
    "nazwisko": "Kowalski",
    "email": "jan.kowalski@example.com",
    "nr_telefonu": "500600700"
  },
  {
    "id_klienta": 2,
    "imie": "Anna",
    "nazwisko": "Nowak",
    "email": "anna.nowak@example.com",
    "nr_telefonu": null
  }
]
```

---

#### `POST /api/klienci`  
Utworzenie nowego klienta razem z jego adresem.

**Przykładowe dane wejściowe**

```json
{
  "imie": "Jan",
  "nazwisko": "Kowalski",
  "email": "jan.kowalski@example.com",
  "nr_telefonu": "500600700",
  "adres": {
    "ulica": "Długa 10",
    "miasto": "Wrocław",
    "kod_pocztowy": "50-100",
    "wojewodztwo": "dolnośląskie"
  }
}
```

**Output**

```json
{
  "message": "Klient utworzony",
  "id_klienta": 5
}
```

---

#### `GET /api/klienci/<id_klienta>`  
Pobranie szczegółów konkretnego klienta wraz z jego adresem.

**Output**

```json
{
  "id_klienta": 5,
  "imie": "Jan",
  "nazwisko": "Kowalski",
  "email": "jan.kowalski@example.com",
  "nr_telefonu": "500600700",
  "adres": {
    "ulica": "Długa 10",
    "miasto": "Wrocław",
    "kod_pocztowy": "50-100",
    "wojewodztwo": "dolnośląskie"
  }
}
```

---

#### `GET /api/klienci/<id_klienta>/urzadzenia`  
Pobranie listy urządzeń przypisanych do konkretnego klienta.

**Output**

```json
[
  {
    "id_urzadzenia": 10,
    "id_klienta": 5,
    "typ_urządzenia": 2,
    "nr_seryjny": "SN12345",
    "opis": "Telewizor LG 42 cala"
  },
  {
    "id_urzadzenia": 11,
    "id_klienta": 5,
    "typ_urządzenia": 1,
    "nr_seryjny": "ABC98765",
    "opis": "Laptop Dell – nie włącza się"
  }
]
```

---

### 1.2. Urządzenia

---

#### `GET /api/urzadzenia`  
Pobranie listy wszystkich urządzeń.

**Output**

```json
[
  {
    "id_urzadzenia": 10,
    "id_klienta": 5,
    "typ_urządzenia": 2,
    "nr_seryjny": "SN12345",
    "opis": "Telewizor LG - brak obraza"
  },
  {
    "id_urzadzenia": 11,
    "id_klienta": 2,
    "typ_urządzenia": 1,
    "nr_seryjny": "LAP123",
    "opis": "Laptop Dell - uszkodzony zasilacz"
  }
]
```

---

#### `POST /api/urzadzenia`  
Dodanie nowego urządzenia do istniejącego klienta.

**Przykładowe dane wejściowe**

```json
{
  "id_klienta": 5,
  "typ_urządzenia": 2,
  "nr_seryjny": "SN12345",
  "opis": "Telewizor LG - brak obrazu"
}
```

**Output**

```json
{
  "message": "Urządzenie utworzone",
  "id_urzadzenia": 10
}
```

---

### 1.3. Zlecenia

---

#### `GET /api/zlecenia`  
Pobranie listy wszystkich zleceń (podstawowe informacje).

**Output**

```json
[
  {
    "id_zlecenia": 1,
    "id_klienta": 5,
    "id_urzadzenia": 10,
    "opis": "Brak obrazu po włączeniu",
    "status": "NEW",
    "data_utworzenia": "2025-01-10",
    "termin_realizacji": null
  },
  {
    "id_zlecenia": 2,
    "id_klienta": 2,
    "id_urzadzenia": 11,
    "opis": "Wymiana zasilacza",
    "status": "IN_PROGRESS",
    "data_utworzenia": "2025-01-09",
    "termin_realizacji": "2025-01-15"
  }
]
```

---

#### `GET /api/zlecenia/<id_zlecenia>`  
Pobranie szczegółów pojedynczego zlecenia.

**Output**

```json
{
  "id_zlecenia": 1,
  "id_klienta": 5,
  "id_urzadzenia": 10,
  "opis": "Brak obraza po włączeniu",
  "status": "NEW",
  "data_utworzenia": "2025-01-10",
  "termin_realizacji": null
}
```

---

#### `PUT /api/zlecenia/<id_zlecenia>/status`  
Aktualizacja statusu zlecenia (np. NEW → IN_PROGRESS → DONE).

**Przykładowe dane wejściowe**

```json
{
  "status": "IN_PROGRESS"
}
```

**Output**

```json
{
  "message": "Status zaktualizowany"
}
```

---

### 1.4. Pracownicy

---

#### `GET /api/pracownicy`  
Pobranie listy wszystkich pracowników.

**Output**

```json
[
  {
    "id_pracownika": 3,
    "imie": "Piotr",
    "nazwisko": "Serwisant",
    "email": "piotr.serwisant@example.com",
    "nr_telefonu": "600700800",
    "stanowisko": "Serwisant"
  }
]
```

---

#### `POST /api/pracownicy`  
Utworzenie nowego pracownika.

**Przykładowe dane wejściowe**

```json
{
  "imie": "Piotr",
  "nazwisko": "Serwisant",
  "email": "piotr.serwisant@example.com",
  "haslo": "tajnehaslo",
  "nr_telefonu": "600700800",
  "stanowisko": "Serwisant"
}
```

**Output**

```json
{
  "message": "Pracownik utworzony",
  "id_pracownika": 3
}
```

---

### 1.5. Części / magazyn

---

#### `GET /api/czesci`  
Pobranie listy wszystkich części w magazynie.

**Output**

```json
[
  {
    "id_czesci": 1,
    "id_typu_czesci": 10,
    "liczba_sztuk": 5,
    "opis": "Zasilacz do laptopa 90W"
  },
  {
    "id_czesci": 2,
    "id_typu_czesci": 11,
    "liczba_sztuk": 20,
    "opis": "Kondensator 1000uF"
  }
]
```

---

#### `POST /api/czesci`  
Dodanie nowej pozycji magazynowej.

**Przykładowe dane wejściowe**

```json
{
  "id_typu_czesci": 10,
  "liczba_sztuk": 5,
  "opis": "Zasilacz do laptopa 90W"
}
```

**Output**

```json
{
  "message": "Część dodana",
  "id_czesci": 1
}
```

---

#### `POST /api/zlecenia/<id_zlecenia>/czesci`  
Dodanie użytych części do zlecenia oraz zmniejszenie stanu magazynowego.

**Przykładowe dane wejściowe**

```json
{
  "id_czesci": 1,
  "ilosc": 2
}
```

**Output**

```json
{
  "message": "Części dodane do zlecenia"
}
```

---

## 2. Endpointy z transakcjami, statystykami i kalendarzem

### 2.1. Dodanie nowego zlecenia jako transakcja

#### `POST /api/zlecenia`  
Utworzenie nowego zlecenia w ramach jednej transakcji:
- dodanie urządzenia,
- dodanie zlecenia,
- przypisanie pracownika.

**Przykładowe dane wejściowe**

```json
{
  "id_klienta": 5,
  "urzadzenie": {
    "typ_urządzenia": 2,
    "nr_seryjny": "SN12345",
    "opis": "Telewizor LG - brak obrazu"
  },
  "opis_zlecenia": "Brak obrazu po włączeniu",
  "id_pracownika": 3
}
```

**Output**

```json
{
  "message": "Zlecenie utworzone",
  "id_zlecenia": 1
}
```

---

### 2.2. Usunięcie klienta z powiązanymi danymi

#### `DELETE /api/klienci/<id_klienta>`  
Usunięcie klienta wraz z jego adresem oraz wszystkimi urządzeniami.

**Output**

```json
{
  "message": "Klient usunięty"
}
```

---

### 2.3. Lista zleceń z przypisanym pracownikiem i typem urządzenia

#### `GET /api/zlecenia/rozszerzone`  
Pobranie listy zleceń z dodatkowymi informacjami:
- pełne imię i nazwisko klienta,
- pełne imię i nazwisko pierwszego przypisanego serwisanta,
- nazwa typu urządzenia,
- status zlecenia.

**Output**

```json
[
  {
    "id_zlecenia": 1,
    "klient": "Jan Kowalski",
    "serwisant": "Piotr Serwisant",
    "typ_urzadzenia": "Telewizor",
    "status": "NEW"
  },
  {
    "id_zlecenia": 2,
    "klient": "Anna Nowak",
    "serwisant": "Piotr Serwisant",
    "typ_urzadzenia": "Laptop",
    "status": "IN_PROGRESS"
  }
]
```

---

### 2.4. Zestawienie najczęściej wykorzystywanych części

#### `GET /api/statystyki/czesci`  
Zwrócenie listy typów części wraz z liczbą ich użyć w zleceniach, posortowane malejąco po liczbie użyć.

**Output**

```json
[
  {
    "typ_czesci": "Zasilacz do laptopa",
    "liczba_uzyc": 15
  },
  {
    "typ_czesci": "Kondensator 1000uF",
    "liczba_uzyc": 8
  }
]
```

---

### 2.5. Aktywne zlecenia przypisane do danego pracownika

#### `GET /api/pracownicy/<id_pracownika>/zlecenia`  
Zwrócenie listy aktywnych zleceń (status `NEW` lub `IN_PROGRESS`) przypisanych do wybranego pracownika.

**Output**

```json
[
  {
    "id_zlecenia": 1,
    "opis": "Brak obrazu po włączeniu",
    "status": "NEW",
    "termin_realizacji": null
  },
  {
    "id_zlecenia": 2,
    "opis": "Wymiana zasilacza",
    "status": "IN_PROGRESS",
    "termin_realizacji": "2025-01-15"
  }
]
```

---

### 2.6. Zajęte terminy do widoku kalendarza

#### `GET /api/kalendarz/zajete-terminy`  
Zwrócenie nadchodzących zleceń (od dnia bieżącego w górę) w formacie wygodnym do prezentacji w kalendarzu.

**Output**

```json
[
  {
    "id_zlecenia": 2,
    "data": "2025-01-15",
    "status": "IN_PROGRESS"
  },
  {
    "id_zlecenia": 3,
    "data": "2025-01-20",
    "status": "NEW"
  }
]
```
