import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from = location.state?.from || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 420, margin: "60px auto" }}>
      <h1 style={{ marginBottom: 8 }}>Ingresar</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>Usá tu email y contraseña del sistema.</p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Contraseña</span>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </label>

        {error ? (
          <div style={{ padding: 10, border: "1px solid #f3b4b4", background: "#fff5f5", color: "#8a1f1f" }}>
            {error}
          </div>
        ) : null}

        <button disabled={loading} type="submit">
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <div style={{ marginTop: 16, fontSize: 13, opacity: 0.8 }}>
        <div>Backend: http://localhost:3000</div>
      </div>
    </div>
  );
}
