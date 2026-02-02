const express = require("express");
const productosController = require("../controllers/productos.controller");

const router = express.Router();

router.get("/", productosController.list);
router.get("/:id", productosController.getById);
router.post("/", productosController.create);
router.put("/:id", productosController.update);
router.delete("/:id", productosController.remove);

module.exports = router;
