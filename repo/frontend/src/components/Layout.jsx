import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const can = (role, roles) => role && roles.includes(role);

export default function Layout() {
  const { user, logout } = useAuth();
  const role = user?.role;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 16, maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h2 style={{ margin: 0 }}>DSW TP</h2>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 14, opacity: 0.8 }}>
            {user?.email || ""} {role ? `(${role})` : ""}
          </span>
          <button onClick={logout}>Salir</button>
        </div>
      </header>

      <nav style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
        <NavLink to="/" end>
          Inicio
        </NavLink>
        {can(role, ["ADMIN", "VENDEDOR"]) && <NavLink to="/ventas">Ventas</NavLink>}
        {can(role, ["ADMIN", "REPOSITOR"]) && <NavLink to="/stock">Stock</NavLink>}
        {can(role, ["ADMIN"]) && <NavLink to="/clientes">Clientes</NavLink>}
        {can(role, ["ADMIN"]) && <NavLink to="/productos">Productos</NavLink>}
        {can(role, ["ADMIN"]) && <NavLink to="/sucursales">Sucursales</NavLink>}
        {can(role, ["ADMIN"]) && <NavLink to="/usuarios">Usuarios</NavLink>}
      </nav>

      <main style={{ marginTop: 16 }}>
        <Outlet />
      </main>
    </div>
  );
}
