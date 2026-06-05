from datetime import datetime
from typing import Optional
from pydantic import BaseModel


VALID_CATEGORIES = [
    "food",
    "transport",
    "entertainment",
    "health",
    "education",
    "shopping",
    "bills",
    "other"
]


class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category: str
    description: Optional[str] = None
    date: Optional[datetime] = None


class ExpenseUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = None
    category: Optional[str] = None
    description: Optional[str] = None
    date: Optional[datetime] = None


class ExpenseResponse(BaseModel):
    id: int
    title: str
    amount: float
    category: str
    description: Optional[str]
    date: datetime
    created_at: datetime
    user_id: int

    class Config:
        from_attributes = True


class ExpenseSummary(BaseModel):
    category: str
    total: float
    count: int