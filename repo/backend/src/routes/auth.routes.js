const express = require("express");
const authController = require("../controllers/auth.controller");
const { authRequired, requireRole } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { loginSchema, bootstrapSchema, createUserSchema } = require("../schemas");

const router = express.Router();

/**
 * @swagger
 * /auth/bootstrap:
 *   post:
 *     summary: Crear primer usuario admin (solo funciona si no hay usuarios)
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Admin creado
 *       409:
 *         description: Ya existen usuarios
 */
router.post("/bootstrap", validate(bootstrapSchema), authController.bootstrap);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso, retorna token JWT
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", validate(loginSchema), authController.login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtener usuario actual
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Datos del usuario autenticado
 *       401:
 *         description: No autenticado
 */
router.get("/me", authRequired, authController.me);

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Listar usuarios (solo admin)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       403:
 *         description: No autorizado
 */
router.get("/users", authRequired, requireRole("ADMIN"), authController.listUsers);

/**
 * @swagger
 * /auth/users:
 *   post:
 *     summary: Crear usuario (solo admin)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *               role:
 *                 type: string
 *                 enum: [ADMIN, VENDEDOR, REPOSITOR]
 *     responses:
 *       201:
 *         description: Usuario creado
 *       409:
 *         description: Email ya registrado
 */
router.post("/users", authRequired, requireRole("ADMIN"), validate(createUserSchema), authController.createUser);

module.exports = router;
