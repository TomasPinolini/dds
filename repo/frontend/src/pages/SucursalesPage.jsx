import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { api } from "../lib/api";
import ErrorBanner from "../components/ErrorBanner";

export default function SucursalesPage() {
  const { token } = useAuth();
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.listSucursales({ token });
      setSucursales(data);
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
      await api.createSucursal({ token, nombre, direccion: direccion || null });
      setNombre("");
      setDireccion("");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const onDelete = async (id) => {
    if (!confirm(`Eliminar sucursal ${id}?`)) return;
    setError("");
    try {
      await api.deleteSucursal({ token, id });
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Sucursales</h1>

      <form onSubmit={onCreate} style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "end" }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Nombre</span>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Dirección (opcional)</span>
          <input value={direccion} onChange={(e) => setDireccion(e.target.value)} />
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
                <th>Dirección</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sucursales.map((s) => (
                <tr key={s.id} style={{ borderTop: "1px solid #ddd" }}>
                  <td>{s.id}</td>
                  <td>{s.nombre}</td>
                  <td>{s.direccion || "-"}</td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={() => onDelete(s.id)}>Eliminar</button>
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
