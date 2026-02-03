import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { api } from "../lib/api";
import ErrorBanner from "../components/ErrorBanner";

export default function StockPage() {
  const { token } = useAuth();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [productos, setProductos] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const [productoId, setProductoId] = useState("");
  const [sucursalId, setSucursalId] = useState("");
  const [cantidad, setCantidad] = useState("10");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.listStocks({ token });
      setStocks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      setError("");

      try {
        const [prod, suc] = await Promise.all([api.listProductos({ token }), api.listSucursales({ token })]);
        setProductos(prod);
        setSucursales(suc);

        if (!productoId && prod?.[0]?.id) setProductoId(String(prod[0].id));
        if (!sucursalId && suc?.[0]?.id) setSucursalId(String(suc[0].id));
      } catch (err) {
        setError(err.message);
      }

      await load();
    };

    init();
  }, []);

  const onReponer = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!productoId || !sucursalId) {
        setError("Seleccioná producto y sucursal");
        return;
      }

      await api.reponerStock({
        token,
        productoId: Number(productoId),
        sucursalId: Number(sucursalId),
        cantidad: Number(cantidad),
      });
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Stock</h1>

      <form onSubmit={onReponer} style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "end" }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Producto</span>
          <select value={productoId} onChange={(e) => setProductoId(e.target.value)}>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id} - {p.nombre}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Sucursal</span>
          <select value={sucursalId} onChange={(e) => setSucursalId(e.target.value)}>
            {sucursales.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id} - {s.nombre}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Cantidad</span>
          <input value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
        </label>

        <button type="submit">Reponer</button>
      </form>

      <ErrorBanner message={error} />

      <div style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>Stock actual</h3>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <table width="100%" cellPadding="6" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th>ID</th>
                <th>Producto</th>
                <th>Sucursal</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((s) => (
                <tr key={s.id} style={{ borderTop: "1px solid #ddd" }}>
                  <td>{s.id}</td>
                  <td>{s.producto?.nombre || s.productoId}</td>
                  <td>{s.sucursal?.nombre || s.sucursalId}</td>
                  <td>{s.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
