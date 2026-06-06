# Expense Tracker

Fullstack expense tracking app built with FastAPI and React.

## Live Demo

Frontend: https://expense-tracker-gamma-hazel.vercel.app

API: https://expense-tracker-production-b449.up.railway.app

Docs: https://expense-tracker-production-b449.up.railway.app/docs

> **Note:** Backend hosted on Railway's free tier.
> First request may take a few seconds to respond.

## Tech Stack

### Backend
- **FastAPI** — Python web framework
- **PostgreSQL** — Database
- **SQLAlchemy** — ORM
- **bcrypt** — Password hashing
- **python-jose** — JWT tokens
- **Docker** — Containerization
- **pytest** — Testing

### Frontend
- **React** — UI framework
- **Vite** — Build tool
- **Recharts** — Charts
- **Axios** — HTTP client
- **React Router** — Navigation

## Features

- JWT authentication
- Add, edit and delete expenses
- Filter expenses by category and date
- Spending summary by category
- Interactive pie chart visualization

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+
- Python 3.12+

### Run the backend

```bash
git clone git@github.com:vanDevBett/expense-tracker.git
cd expense-tracker/backend

# Mac / Linux
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate

cp .env.example .env
docker compose up --build
```

### Configure VS Code Python interpreter

If you're using VS Code, create a `.vscode/settings.json` file in the root of the project:

```jsonc
{
    "python-envs.pythonProjects": [
        {
            "path": "backend",
            "envManager": "ms-python.python:system",
            "packageManager": "ms-python.python:pip"
        }
    ]
}
```

This requires the [Python Environments](https://marketplace.visualstudio.com/items?itemName=ms-python.python-envs) extension. It tells VS Code to find the Python interpreter inside the `backend` folder.

API available at `http://localhost:8000`

Interactive documentation at `http://localhost:8000/docs`

### Run the frontend

```bash
cd frontend
npm install
npm run dev
```

App available at `http://localhost:5173`

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /auth/register | Register a new user | No |
| POST | /auth/login | Login and get JWT token | No |

### Expenses
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /expenses | Get all expenses | Yes |
| GET | /expenses?category=food | Filter by category | Yes |
| GET | /expenses/summary | Get spending summary | Yes |
| POST | /expenses | Create an expense | Yes |
| PUT | /expenses/{id} | Update an expense | Yes |
| DELETE | /expenses/{id} | Delete an expense | Yes |

## Run Tests

```bash
cd backend
pytest tests/ -v
```

## Project Structure

```
expense-tracker/
├── backend/
│   ├── app/
│   │   ├── api/        # Endpoints
│   │   ├── core/       # Config, database, security
│   │   ├── models/     # Database models
│   │   ├── schemas/    # Pydantic schemas
│   │   ├── services/   # Business logic
│   │   └── main.py
│   └── tests/
└── frontend/
    └── src/
        ├── components/ # React components
        └── services/   # API client
```
