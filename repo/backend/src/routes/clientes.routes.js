const express = require("express");
const clientesController = require("../controllers/clientes.controller");
const { requireRole } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { clienteSchema, idParamSchema } = require("../schemas");

const router = express.Router();

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Listar clientes
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad por página (max 100)
 *     responses:
 *       200:
 *         description: Lista de clientes paginada
 */
router.get("/", clientesController.list);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Obtener cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 */
router.get("/:id", validate(idParamSchema, "params"), clientesController.getById);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente creado
 *       400:
 *         description: Datos inválidos
 */
router.post("/", requireRole("ADMIN"), validate(clienteSchema), clientesController.create);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Actualizar cliente
 *     tags: [Clientes]
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
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente actualizado
 */
router.put("/:id", requireRole("ADMIN"), validate(idParamSchema, "params"), validate(clienteSchema), clientesController.update);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Eliminar cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cliente eliminado
 */
router.delete("/:id", requireRole("ADMIN"), validate(idParamSchema, "params"), clientesController.remove);

module.exports = router;
