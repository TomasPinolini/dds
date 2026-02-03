const express = require("express");
const ventasController = require("../controllers/ventas.controller");
const { requireRole } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { registrarVentaSchema, idParamSchema } = require("../schemas");

const router = express.Router();

/**
 * @swagger
 * /ventas:
 *   get:
 *     summary: Listar ventas
 *     tags: [Ventas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: clienteId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: Lista de ventas paginada
 */
router.get("/", requireRole("ADMIN", "VENDEDOR"), ventasController.list);

/**
 * @swagger
 * /ventas/{id}:
 *   get:
 *     summary: Obtener venta por ID
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venta encontrada
 *       404:
 *         description: Venta no encontrada
 */
router.get("/:id", requireRole("ADMIN", "VENDEDOR"), validate(idParamSchema, "params"), ventasController.getById);

/**
 * @swagger
 * /ventas/registrar:
 *   post:
 *     summary: Registrar venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clienteId
 *               - sucursalId
 *               - items
 *             properties:
 *               clienteId:
 *                 type: integer
 *               sucursalId:
 *                 type: integer
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productoId:
 *                       type: integer
 *                     cantidad:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Venta registrada
 *       400:
 *         description: Stock insuficiente o datos inválidos
 */
router.post("/registrar", requireRole("ADMIN", "VENDEDOR"), validate(registrarVentaSchema), ventasController.registrarVenta);

module.exports = router;
