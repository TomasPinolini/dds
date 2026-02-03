const express = require("express");
const stocksController = require("../controllers/stocks.controller");
const { requireRole } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { stockSchema, reponerStockSchema, idParamSchema } = require("../schemas");

const router = express.Router();

/**
 * @swagger
 * /stocks:
 *   get:
 *     summary: Listar stocks
 *     tags: [Stocks]
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
 *         name: productoId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sucursalId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de stocks paginada
 */
router.get("/", stocksController.list);

/**
 * @swagger
 * /stocks/{id}:
 *   get:
 *     summary: Obtener stock por ID
 *     tags: [Stocks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stock encontrado
 *       404:
 *         description: Stock no encontrado
 */
router.get("/:id", validate(idParamSchema, "params"), stocksController.getById);

/**
 * @swagger
 * /stocks/reponer:
 *   post:
 *     summary: Reponer stock
 *     tags: [Stocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productoId
 *               - sucursalId
 *               - cantidad
 *             properties:
 *               productoId:
 *                 type: integer
 *               sucursalId:
 *                 type: integer
 *               cantidad:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Stock repuesto
 */
router.post("/reponer", requireRole("ADMIN", "REPOSITOR"), validate(reponerStockSchema), stocksController.reponer);

/**
 * @swagger
 * /stocks:
 *   post:
 *     summary: Crear stock
 *     tags: [Stocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productoId
 *               - sucursalId
 *               - cantidad
 *             properties:
 *               productoId:
 *                 type: integer
 *               sucursalId:
 *                 type: integer
 *               cantidad:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Stock creado
 */
router.post("/", requireRole("ADMIN"), validate(stockSchema), stocksController.create);

/**
 * @swagger
 * /stocks/{id}:
 *   put:
 *     summary: Actualizar stock
 *     tags: [Stocks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stock actualizado
 */
router.put("/:id", requireRole("ADMIN"), validate(idParamSchema, "params"), stocksController.update);

/**
 * @swagger
 * /stocks/{id}:
 *   delete:
 *     summary: Eliminar stock
 *     tags: [Stocks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Stock eliminado
 */
router.delete("/:id", requireRole("ADMIN"), validate(idParamSchema, "params"), stocksController.remove);

module.exports = router;
