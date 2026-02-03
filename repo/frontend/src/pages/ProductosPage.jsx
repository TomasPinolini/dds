import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { api } from "../lib/api";
import ErrorBanner from "../components/ErrorBanner";

export default function ProductosPage() {
  const { token } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [nombre, setNombre] = useState("");
  const [sku, setSku] = useState("");
  const [precio, setPrecio] = useState("0");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.listProductos({ token });
      setProductos(data);
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
      await api.createProducto({
        token,
        nombre,
        sku,
        precio: Number(precio),
      });
      setNombre("");
      setSku("");
      setPrecio("0");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const onDelete = async (id) => {
    if (!confirm(`Eliminar producto ${id}?`)) return;
    setError("");
    try {
      await api.deleteProducto({ token, id });
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Productos</h1>

      <form onSubmit={onCreate} style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "end" }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Nombre</span>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>SKU</span>
          <input value={sku} onChange={(e) => setSku(e.target.value)} required />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Precio</span>
          <input value={precio} onChange={(e) => setPrecio(e.target.value)} required />
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
                <th>SKU</th>
                <th>Precio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id} style={{ borderTop: "1px solid #ddd" }}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.sku}</td>
                  <td>{p.precio}</td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={() => onDelete(p.id)}>Eliminar</button>
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
