const express = require("express");
const ventasController = require("../controllers/ventas.controller");
const { requireRole } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", requireRole("ADMIN", "VENDEDOR"), ventasController.list);
router.get("/:id", requireRole("ADMIN", "VENDEDOR"), ventasController.getById);
router.post("/registrar", requireRole("ADMIN", "VENDEDOR"), ventasController.registrarVenta);

module.exports = router;
