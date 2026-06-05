from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.expense import ExpenseCreate, ExpenseResponse, ExpenseUpdate, ExpenseSummary
from app.services import expense_service

router = APIRouter()


@router.get("/", response_model=list[ExpenseResponse])
def get_expenses(
    category: Optional[str] = Query(None),
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return expense_service.get_expenses(
        db, current_user.id, category, start_date, end_date
    )


@router.get("/summary", response_model=list[ExpenseSummary])
def get_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return expense_service.get_summary(db, current_user.id)


@router.get("/{expense_id}", response_model=ExpenseResponse)
def get_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    expense = expense_service.get_expense(db, expense_id, current_user.id)
    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )
    return expense


@router.post("/", response_model=ExpenseResponse, status_code=status.HTTP_201_CREATED)
def create_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return expense_service.create_expense(db, expense, current_user.id)


@router.put("/{expense_id}", response_model=ExpenseResponse)
def update_expense(
    expense_id: int,
    expense: ExpenseUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    updated = expense_service.update_expense(db, expense_id, expense, current_user.id)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )
    return updated


@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    deleted = expense_service.delete_expense(db, expense_id, current_user.id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )