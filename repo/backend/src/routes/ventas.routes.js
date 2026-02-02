const express = require("express");
const ventasController = require("../controllers/ventas.controller");

const router = express.Router();

router.get("/", ventasController.list);
router.get("/:id", ventasController.getById);
router.post("/registrar", ventasController.registrarVenta);

module.exports = router;
