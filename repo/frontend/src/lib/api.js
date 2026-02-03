const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const request = async (path, { method = "GET", token, body } = {}) => {
  const headers = {};

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await res.json() : null;

  if (!res.ok) {
    let message = data?.message || `Error HTTP ${res.status}`;
    if (res.status === 401) message = data?.message || "No autenticado. Iniciá sesión nuevamente.";
    if (res.status === 403) message = data?.message || "No autorizado. No tenés permisos para esta acción.";
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
};

export const api = {
  login: ({ email, password }) => request("/auth/login", { method: "POST", body: { email, password } }),
  me: ({ token }) => request("/auth/me", { token }),
  listUsers: ({ token }) => request("/auth/users", { token }),
  createUser: ({ token, email, password, role }) =>
    request("/auth/users", { method: "POST", token, body: { email, password, role } }),

  listVentas: ({ token }) => request("/ventas", { token }).then((res) => res.data),
  registrarVenta: ({ token, clienteId, sucursalId, items }) =>
    request("/ventas/registrar", {
      method: "POST",
      token,
      body: { clienteId, sucursalId, items },
    }),

  listStocks: ({ token }) => request("/stocks", { token }).then((res) => res.data),
  reponerStock: ({ token, productoId, sucursalId, cantidad }) =>
    request("/stocks/reponer", {
      method: "POST",
      token,
      body: { productoId, sucursalId, cantidad },
    }),

  listClientes: ({ token }) => request("/clientes", { token }).then((res) => res.data),
  createCliente: ({ token, nombre, email, telefono }) =>
    request("/clientes", { method: "POST", token, body: { nombre, email, telefono } }),
  deleteCliente: ({ token, id }) => request(`/clientes/${id}`, { method: "DELETE", token }),

  listProductos: ({ token }) => request("/productos", { token }).then((res) => res.data),
  createProducto: ({ token, nombre, sku, precio }) =>
    request("/productos", { method: "POST", token, body: { nombre, sku, precio } }),
  deleteProducto: ({ token, id }) => request(`/productos/${id}`, { method: "DELETE", token }),

  listSucursales: ({ token }) => request("/sucursales", { token }).then((res) => res.data),
  createSucursal: ({ token, nombre, direccion }) =>
    request("/sucursales", { method: "POST", token, body: { nombre, direccion } }),
  deleteSucursal: ({ token, id }) => request(`/sucursales/${id}`, { method: "DELETE", token }),
};
