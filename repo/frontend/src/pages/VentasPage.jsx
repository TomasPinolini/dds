import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { api } from "../lib/api";
import ErrorBanner from "../components/ErrorBanner";

export default function VentasPage() {
  const { token } = useAuth();
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [clientes, setClientes] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [productos, setProductos] = useState([]);

  const [clienteId, setClienteId] = useState("");
  const [sucursalId, setSucursalId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("1");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.listVentas({ token });
      setVentas(data);
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
        const [cli, suc, prod] = await Promise.all([
          api.listClientes({ token }),
          api.listSucursales({ token }),
          api.listProductos({ token }),
        ]);

        setClientes(cli);
        setSucursales(suc);
        setProductos(prod);

        if (!clienteId && cli?.[0]?.id) setClienteId(String(cli[0].id));
        if (!sucursalId && suc?.[0]?.id) setSucursalId(String(suc[0].id));
        if (!productoId && prod?.[0]?.id) setProductoId(String(prod[0].id));
      } catch (err) {
        setError(err.message);
      }

      await load();
    };

    init();
  }, []);

  const onRegistrar = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!clienteId || !sucursalId || !productoId) {
        setError("Seleccioná cliente, sucursal y producto");
        return;
      }

      await api.registrarVenta({
        token,
        clienteId: Number(clienteId),
        sucursalId: Number(sucursalId),
        items: [{ productoId: Number(productoId), cantidad: Number(cantidad) }],
      });
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Ventas</h1>

      <form onSubmit={onRegistrar} style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "end" }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Cliente</span>
          <select value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} - {c.nombre}
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
          <span>Cantidad</span>
          <input value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
        </label>

        <button type="submit">Registrar venta</button>
      </form>

      <ErrorBanner message={error} />

      <div style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>Últimas ventas</h3>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <table width="100%" cellPadding="6" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th>ID</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Cliente</th>
                <th>Sucursal</th>
                <th>Usuario</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((v) => (
                <tr key={v.id} style={{ borderTop: "1px solid #ddd" }}>
                  <td>{v.id}</td>
                  <td>{new Date(v.fecha).toLocaleString()}</td>
                  <td>{v.total}</td>
                  <td>{v.cliente?.nombre || v.clienteId}</td>
                  <td>{v.sucursal?.nombre || v.sucursalId}</td>
                  <td>{v.usuario?.email || v.usuarioId || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
