const express = require("express");
const clientesController = require("../controllers/clientes.controller");
const { requireRole } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", clientesController.list);
router.get("/:id", clientesController.getById);
router.post("/", requireRole("ADMIN"), clientesController.create);
router.put("/:id", requireRole("ADMIN"), clientesController.update);
router.delete("/:id", requireRole("ADMIN"), clientesController.remove);

module.exports = router;
