const express = require("express");
const sucursalesController = require("../controllers/sucursales.controller");

const router = express.Router();

router.get("/", sucursalesController.list);
router.get("/:id", sucursalesController.getById);
router.post("/", sucursalesController.create);
router.put("/:id", sucursalesController.update);
router.delete("/:id", sucursalesController.remove);

module.exports = router;
