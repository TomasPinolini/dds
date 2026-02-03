import { useAuth } from "../auth/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Inicio</h1>
      <p>Bienvenido{user?.email ? `, ${user.email}` : ""}.</p>
      <p>Usá la navegación de arriba para entrar a tus pantallas según el rol.</p>
    </div>
  );
}
