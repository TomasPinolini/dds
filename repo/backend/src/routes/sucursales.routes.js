const express = require("express");
const sucursalesController = require("../controllers/sucursales.controller");
const { requireRole } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", sucursalesController.list);
router.get("/:id", sucursalesController.getById);
router.post("/", requireRole("ADMIN"), sucursalesController.create);
router.put("/:id", requireRole("ADMIN"), sucursalesController.update);
router.delete("/:id", requireRole("ADMIN"), sucursalesController.remove);

module.exports = router;
