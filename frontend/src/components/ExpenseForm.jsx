import { useState } from "react";

const CATEGORIES = ["food", "transport", "entertainment", "health", "education", "shopping", "bills", "other"];

export default function ExpenseForm({ onSubmit }) {
  const [form, setForm] = useState({ title: "", amount: "", category: "food", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, amount: parseFloat(form.amount) });
    setForm({ title: "", amount: "", category: "food", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.row}>
        <input
          style={styles.input}
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <select
          style={styles.input}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div style={styles.row}>
        <input
          style={{ ...styles.input, flex: 2 }}
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button style={styles.button} type="submit">Add</button>
      </div>
    </form>
  );
}

const styles = {
  form: { background: "#f9f9f9", padding: "16px", borderRadius: "6px", marginBottom: "16px" },
  row: { display: "flex", gap: "12px", marginBottom: "12px" },
  input: { flex: 1, padding: "8px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" },
  button: { padding: "8px 20px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }
};