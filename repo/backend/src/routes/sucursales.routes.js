const express = require("express");
const sucursalesController = require("../controllers/sucursales.controller");
const { requireRole } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { sucursalSchema, idParamSchema } = require("../schemas");

const router = express.Router();

/**
 * @swagger
 * /sucursales:
 *   get:
 *     summary: Listar sucursales
 *     tags: [Sucursales]
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
 *         description: Lista de sucursales paginada
 */
router.get("/", sucursalesController.list);

/**
 * @swagger
 * /sucursales/{id}:
 *   get:
 *     summary: Obtener sucursal por ID
 *     tags: [Sucursales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucursal encontrada
 *       404:
 *         description: Sucursal no encontrada
 */
router.get("/:id", validate(idParamSchema, "params"), sucursalesController.getById);

/**
 * @swagger
 * /sucursales:
 *   post:
 *     summary: Crear sucursal
 *     tags: [Sucursales]
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
 *               direccion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sucursal creada
 */
router.post("/", requireRole("ADMIN"), validate(sucursalSchema), sucursalesController.create);

/**
 * @swagger
 * /sucursales/{id}:
 *   put:
 *     summary: Actualizar sucursal
 *     tags: [Sucursales]
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
 *             $ref: '#/components/schemas/Sucursal'
 *     responses:
 *       200:
 *         description: Sucursal actualizada
 */
router.put("/:id", requireRole("ADMIN"), validate(idParamSchema, "params"), validate(sucursalSchema), sucursalesController.update);

/**
 * @swagger
 * /sucursales/{id}:
 *   delete:
 *     summary: Eliminar sucursal
 *     tags: [Sucursales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Sucursal eliminada
 */
router.delete("/:id", requireRole("ADMIN"), validate(idParamSchema, "params"), sucursalesController.remove);

module.exports = router;
