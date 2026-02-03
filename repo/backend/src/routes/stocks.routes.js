const express = require("express");
const stocksController = require("../controllers/stocks.controller");
const { requireRole } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", stocksController.list);
router.get("/:id", stocksController.getById);
router.post("/reponer", requireRole("ADMIN", "REPOSITOR"), stocksController.reponer);
router.post("/", requireRole("ADMIN"), stocksController.create);
router.put("/:id", requireRole("ADMIN"), stocksController.update);
router.delete("/:id", requireRole("ADMIN"), stocksController.remove);

module.exports = router;
