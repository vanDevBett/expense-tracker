from datetime import datetime, timezone
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate, ExpenseUpdate, ExpenseSummary


def get_expenses(
    db: Session,
    user_id: int,
    category: str | None = None,
    start_date: datetime | None = None,
    end_date: datetime | None = None
) -> list[Expense]:
    query = db.query(Expense).filter(Expense.user_id == user_id)
    if category:
        query = query.filter(Expense.category == category)
    if start_date:
        query = query.filter(Expense.date >= start_date)
    if end_date:
        query = query.filter(Expense.date <= end_date)
    return query.order_by(Expense.date.desc()).all()


def get_expense(db: Session, expense_id: int, user_id: int) -> Expense | None:
    return db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.user_id == user_id
    ).first()


def create_expense(db: Session, expense: ExpenseCreate, user_id: int) -> Expense:
    db_expense = Expense(
        **expense.model_dump(exclude={"date"}),
        user_id=user_id,
        date=expense.date or datetime.now(timezone.utc)
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense


def update_expense(
    db: Session,
    expense_id: int,
    expense: ExpenseUpdate,
    user_id: int
) -> Expense | None:
    db_expense = get_expense(db, expense_id, user_id)
    if not db_expense:
        return None
    update_data = expense.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_expense, field, value)
    db.commit()
    db.refresh(db_expense)
    return db_expense


def delete_expense(db: Session, expense_id: int, user_id: int) -> bool:
    db_expense = get_expense(db, expense_id, user_id)
    if not db_expense:
        return False
    db.delete(db_expense)
    db.commit()
    return True


def get_summary(db: Session, user_id: int) -> list[ExpenseSummary]:
    results = (
        db.query(
            Expense.category,
            func.sum(Expense.amount).label("total"),
            func.count(Expense.id).label("count")
        )
        .filter(Expense.user_id == user_id)
        .group_by(Expense.category)
        .all()
    )
    return [
        ExpenseSummary(category=r.category, total=round(r.total, 2), count=r.count)
        for r in results
    ]