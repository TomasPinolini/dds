const express = require("express");
const productosController = require("../controllers/productos.controller");
const { requireRole } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { productoSchema, idParamSchema } = require("../schemas");

const router = express.Router();

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Listar productos
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de productos paginada
 */
router.get("/", productosController.list);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", validate(idParamSchema, "params"), productosController.getById);

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - sku
 *               - precio
 *             properties:
 *               nombre:
 *                 type: string
 *               sku:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post("/", requireRole("ADMIN"), validate(productoSchema), productosController.create);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
router.put("/:id", requireRole("ADMIN"), validate(idParamSchema, "params"), validate(productoSchema), productosController.update);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Producto eliminado
 */
router.delete("/:id", requireRole("ADMIN"), validate(idParamSchema, "params"), productosController.remove);

module.exports = router;
