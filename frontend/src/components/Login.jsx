import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.login(email, password);
      onLogin(res.data.access_token);
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Expense Tracker 💰</h2>
        <p style={styles.subtitle}>Sign in to your account</p>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button style={styles.button} type="submit">Sign In</button>
        </form>
        <p style={styles.link}>
          Don't have an account? <Link to="/register">Register</Link>
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