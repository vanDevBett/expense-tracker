export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p style={{ color: "#999", textAlign: "center" }}>No expenses yet. Add your first one!</p>;
  }

  return (
    <div>
      {expenses.map(expense => (
        <div key={expense.id} style={styles.item}>
          <div style={styles.left}>
            <span style={styles.category}>{expense.category}</span>
            <span style={styles.title}>{expense.title}</span>
            {expense.description && <span style={styles.desc}>{expense.description}</span>}
          </div>
          <div style={styles.right}>
            <span style={styles.amount}>${expense.amount.toFixed(2)}</span>
            <button style={styles.deleteBtn} onClick={() => onDelete(expense.id)}>✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  item: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f0f0f0" },
  left: { display: "flex", alignItems: "center", gap: "12px" },
  category: { background: "#ede9fe", color: "#4f46e5", padding: "2px 8px", borderRadius: "4px", fontSize: "12px" },
  title: { fontSize: "14px", fontWeight: "500" },
  desc: { fontSize: "12px", color: "#999" },
  right: { display: "flex", alignItems: "center", gap: "12px" },
  amount: { fontSize: "16px", fontWeight: "600" },
  deleteBtn: { background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: "16px" }
};