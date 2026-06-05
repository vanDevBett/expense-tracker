from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.expenses import router as expenses_router
from app.core.database import Base, engine
from app.core.exceptions import add_exception_handlers
from app.core.config import settings

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Expense Tracker API",
    description="REST API for personal expense tracking",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

add_exception_handlers(app)

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(expenses_router, prefix="/expenses", tags=["expenses"])


@app.get("/")
def root():
    return {"message": "Expense Tracker API is running"}


@app.get("/health")
def health():
    return {"status": "ok"}
