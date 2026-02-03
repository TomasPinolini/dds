const express = require("express");
const productosController = require("../controllers/productos.controller");
const { requireRole } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", productosController.list);
router.get("/:id", productosController.getById);
router.post("/", requireRole("ADMIN"), productosController.create);
router.put("/:id", requireRole("ADMIN"), productosController.update);
router.delete("/:id", requireRole("ADMIN"), productosController.remove);

module.exports = router;
