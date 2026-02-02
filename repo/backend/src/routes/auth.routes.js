const express = require("express");
const authController = require("../controllers/auth.controller");
const { authRequired, requireRole } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/bootstrap", authController.bootstrap);
router.post("/login", authController.login);

router.get("/me", authRequired, authController.me);
router.get("/users", authRequired, requireRole("ADMIN"), authController.listUsers);
router.post("/users", authRequired, requireRole("ADMIN"), authController.createUser);

module.exports = router;
