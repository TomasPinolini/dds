const express = require("express");
const stocksController = require("../controllers/stocks.controller");

const router = express.Router();

router.get("/", stocksController.list);
router.get("/:id", stocksController.getById);
router.post("/", stocksController.create);
router.put("/:id", stocksController.update);
router.delete("/:id", stocksController.remove);

module.exports = router;
