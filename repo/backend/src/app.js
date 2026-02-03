const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./config/swagger");
const clientesRoutes = require("./routes/clientes.routes");
const productosRoutes = require("./routes/productos.routes");
const sucursalesRoutes = require("./routes/sucursales.routes");
const stocksRoutes = require("./routes/stocks.routes");
const ventasRoutes = require("./routes/ventas.routes");
const authRoutes = require("./routes/auth.routes");
const { authRequired } = require("./middlewares/auth.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(authRequired);

app.use("/clientes", clientesRoutes);
app.use("/productos", productosRoutes);
app.use("/sucursales", sucursalesRoutes);
app.use("/stocks", stocksRoutes);
app.use("/ventas", ventasRoutes);

app.use((error, _req, res, _next) => {
  const { AppError } = require("./utils/AppError");

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error?.statusCode && Number.isInteger(error.statusCode)) {
    const message = error.statusCode === 500 ? "Error interno" : error.message;
    return res.status(error.statusCode).json({ message });
  }

  console.error(error);
  res.status(500).json({ message: "Error interno" });
});

module.exports = { app };
