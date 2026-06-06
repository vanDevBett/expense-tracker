import { useState, useEffect } from "react";
import { expenseService } from "../services/api";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseChart from "./ExpenseChart";

export default function Dashboard({ token, onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wakingUp, setWakingUp] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const timer = setTimeout(() => setWakingUp(true), 3000);
      const [expRes, sumRes] = await Promise.all([
        expenseService.getAll(),
        expenseService.getSummary()
      ]);
      clearTimeout(timer);
      setWakingUp(false);
      setExpenses(expRes.data);
      setSummary(sumRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleCreate = async (data) => {
    await expenseService.create(data);
    setShowForm(false);
    loadData();
  };

  const handleDelete = async (id) => {
    await expenseService.delete(id);
    loadData();
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        {wakingUp && (
          <div style={styles.wakingUp}>
            <p style={styles.wakingText}>⏳ Waking up the server...</p>
            <p style={styles.wakingSubtext}>Free tier servers sleep when inactive. This may take up to 30 seconds.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>💸 Expense Tracker</h1>
        <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Total Expenses</p>
          <p style={styles.statValue}>${total.toFixed(2)}</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Transactions</p>
          <p style={styles.statValue}>{expenses.length}</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Categories</p>
          <p style={styles.statValue}>{summary.length}</p>
        </div>
      </div>

      {summary.length > 0 && <ExpenseChart data={summary} />}

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Expenses</h2>
          <button style={styles.addBtn} onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Add Expense"}
          </button>
        </div>
        {showForm && <ExpenseForm onSubmit={handleCreate} />}
        <ExpenseList expenses={expenses} onDelete={handleDelete} />
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "900px", margin: "0 auto", padding: "24px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  title: { margin: 0, fontSize: "24px" },
  logoutBtn: { padding: "8px 16px", background: "transparent", border: "1px solid #ddd", borderRadius: "6px", cursor: "pointer" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" },
  statCard: { background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  statLabel: { margin: "0 0 8px", fontSize: "13px", color: "#666" },
  statValue: { margin: 0, fontSize: "28px", fontWeight: "600" },
  section: { background: "white", borderRadius: "8px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  sectionTitle: { margin: 0, fontSize: "18px" },
  addBtn: { padding: "8px 16px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" },
  loadingContainer: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", gap: "24px" },
  spinner: {
    width: "48px", height: "48px",
    border: "4px solid #f0f0f0",
    borderTop: "4px solid #4f46e5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },
  wakingUp: { textAlign: "center", maxWidth: "320px" },
  wakingText: { margin: "0 0 8px", fontSize: "16px", fontWeight: "500" },
  wakingSubtext: { margin: 0, fontSize: "13px", color: "#888" }
};
