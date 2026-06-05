def test_create_expense(client, registered_user):
    response = client.post("/expenses/",
        json={"title": "Lunch", "amount": 15.50, "category": "food"},
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    assert response.status_code == 201
    assert response.json()["title"] == "Lunch"
    assert response.json()["amount"] == 15.50


def test_get_expenses(client, registered_user):
    client.post("/expenses/",
        json={"title": "Lunch", "amount": 15.50, "category": "food"},
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    client.post("/expenses/",
        json={"title": "Bus", "amount": 2.50, "category": "transport"},
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    response = client.get("/expenses/",
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    assert response.status_code == 200
    assert len(response.json()) == 2


def test_get_expenses_no_token(client):
    response = client.get("/expenses/")
    assert response.status_code == 401


def test_filter_expenses_by_category(client, registered_user):
    client.post("/expenses/",
        json={"title": "Lunch", "amount": 15.50, "category": "food"},
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    client.post("/expenses/",
        json={"title": "Bus", "amount": 2.50, "category": "transport"},
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    response = client.get("/expenses/?category=food",
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["category"] == "food"


def test_update_expense(client, registered_user):
    created = client.post("/expenses/",
        json={"title": "Lunch", "amount": 15.50, "category": "food"},
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    expense_id = created.json()["id"]
    response = client.put(f"/expenses/{expense_id}",
        json={"amount": 20.00},
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    assert response.status_code == 200
    assert response.json()["amount"] == 20.00


def test_delete_expense(client, registered_user):
    created = client.post("/expenses/",
        json={"title": "Lunch", "amount": 15.50, "category": "food"},
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    expense_id = created.json()["id"]
    response = client.delete(f"/expenses/{expense_id}",
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    assert response.status_code == 204
    response = client.get(f"/expenses/{expense_id}",
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    assert response.status_code == 404


def test_get_summary(client, registered_user):
    client.post("/expenses/",
        json={"title": "Lunch", "amount": 15.50, "category": "food"},
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    client.post("/expenses/",
        json={"title": "Dinner", "amount": 25.00, "category": "food"},
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    client.post("/expenses/",
        json={"title": "Bus", "amount": 2.50, "category": "transport"},
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    response = client.get("/expenses/summary",
        headers={"Authorization": f"Bearer {registered_user}"}
    )
    assert response.status_code == 200
    assert len(response.json()) == 2
    food = next(r for r in response.json() if r["category"] == "food")
    assert food["total"] == 40.50
    assert food["count"] == 2