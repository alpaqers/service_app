# Service App – System Zarządzania Serwisem RTV/AGD

Aplikacja webowa do obsługi serwisów urządzeń RTV/AGD.  
Projekt obejmuje moduły dla klientów, serwisantów oraz koordynatorów.

# Przygotowanie środowiska programistycznego

```bash
git clone https://github.com/alpaqers/service_app.git
cd service_app
```

## Backend (Flask)

```bash
cd backend
```

```bash
python -m venv venv
```

Aktywacja środowiska (po wpisaniu komendy w terminalu powinien się pojawić przedorstek *(venv)*):

### Windows
```bash
venv\Scripts\activate
```

### Linux / MacOS
```bash
source venv/bin/activate
```
---

```bash
pip install -r requirements.txt
```

## Baza danych (MySQL)

Do testów póki co wykorzystujemy lokalną bazę danych na lokalnym serwerze.
Do wizualnego zarządzania bazą polecam wykorzystać *MySQL Workbench*

### Inicjalizacja

```sql
CREATE DATABASE service_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```bash
flask db init
```
---

### Migracja

```bash
flask db migrate -m "initial tables"
```

```bash
flask db upgrade
```

### Dodanie danych testowych

```bash
python seed.py
```

## Plik ze zmiennymi środowiskowymi .env

.env.example służy tylko za szablon, wystarczy go skopiować, zmienić nazwę i wpisać dane do połączenia się z bazą

```bash
cp .env.example .env
```

```powershell
copy .env.example .env
```

# Uruchomienie aplikacji

```bash
cd backend
python run.py
```

Aplikacja działa pod adresem:  
**http://localhost:5000/**


