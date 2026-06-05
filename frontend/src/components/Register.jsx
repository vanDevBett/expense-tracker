import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/api";

export default function Register({ onLogin }) {
  const [form, setForm] = useState({ email: "", full_name: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(form);
      const res = await authService.login(form.email, form.password);
      onLogin(res.data.access_token);
    } catch {
      setError("Registration failed. Email may already be in use.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Start tracking your expenses</p>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            required
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button style={styles.button} type="submit">Create Account</button>
        </form>
        <p style={styles.link}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f5f5f5" },
  card: { background: "white", padding: "2rem", borderRadius: "8px", width: "360px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  title: { margin: "0 0 4px", fontSize: "24px" },
  subtitle: { margin: "0 0 24px", color: "#666" },
  input: { width: "100%", padding: "10px", marginBottom: "12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" },
  button: { width: "100%", padding: "10px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", fontSize: "14px", cursor: "pointer" },
  error: { color: "red", fontSize: "14px", marginBottom: "12px" },
  link: { textAlign: "center", marginTop: "16px", fontSize: "14px" }
};