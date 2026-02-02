const express = require("express");
const cors = require("cors");
const clientesRoutes = require("./routes/clientes.routes");
const productosRoutes = require("./routes/productos.routes");
const sucursalesRoutes = require("./routes/sucursales.routes");
const stocksRoutes = require("./routes/stocks.routes");
const ventasRoutes = require("./routes/ventas.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/clientes", clientesRoutes);
app.use("/productos", productosRoutes);
app.use("/sucursales", sucursalesRoutes);
app.use("/stocks", stocksRoutes);
app.use("/ventas", ventasRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  const statusCode = error?.statusCode && Number.isInteger(error.statusCode) ? error.statusCode : 500;
  const message = statusCode === 500 ? "Error interno" : error.message;
  res.status(statusCode).json({ message });
});

module.exports = { app };
