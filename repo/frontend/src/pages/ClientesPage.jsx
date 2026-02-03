import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { api } from "../lib/api";
import ErrorBanner from "../components/ErrorBanner";

export default function ClientesPage() {
  const { token } = useAuth();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.listClientes({ token });
      setClientes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.createCliente({ token, nombre, email: email || null, telefono: telefono || null });
      setNombre("");
      setEmail("");
      setTelefono("");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const onDelete = async (id) => {
    if (!confirm(`Eliminar cliente ${id}?`)) return;
    setError("");
    try {
      await api.deleteCliente({ token, id });
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Clientes</h1>

      <form onSubmit={onCreate} style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "end" }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Nombre</span>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Email (opcional)</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Teléfono (opcional)</span>
          <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </label>

        <button type="submit">Crear</button>
      </form>

      <ErrorBanner message={error} />

      <div style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>Listado</h3>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <table width="100%" cellPadding="6" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.id} style={{ borderTop: "1px solid #ddd" }}>
                  <td>{c.id}</td>
                  <td>{c.nombre}</td>
                  <td>{c.email || "-"}</td>
                  <td>{c.telefono || "-"}</td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={() => onDelete(c.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
