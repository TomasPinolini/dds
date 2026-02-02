const express = require("express");
const cors = require("cors");
const clientesRoutes = require("./routes/clientes.routes");
const productosRoutes = require("./routes/productos.routes");
const sucursalesRoutes = require("./routes/sucursales.routes");
const stocksRoutes = require("./routes/stocks.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/clientes", clientesRoutes);
app.use("/productos", productosRoutes);
app.use("/sucursales", sucursalesRoutes);
app.use("/stocks", stocksRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Error interno" });
});

module.exports = { app };
