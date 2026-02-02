const productosService = require("../services/productos.service");

const parseId = (value) => Number.parseInt(value, 10);

const normalizePrecio = (precio) => {
  if (precio === null || precio === undefined) return undefined;
  if (typeof precio === "number") return precio.toString();
  if (typeof precio === "string") return precio;
  return undefined;
};

const list = async (_req, res, next) => {
  try {
    const productos = await productosService.list();
    res.json(productos);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Id inválido" });
    }
    const producto = await productosService.getById(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Body requerido. Enviá JSON con header Content-Type: application/json",
      });
    }

    const { nombre, sku } = req.body;
    const precio = normalizePrecio(req.body.precio);

    if (!nombre || typeof nombre !== "string") {
      return res.status(400).json({ message: "Nombre es requerido" });
    }
    if (!sku || typeof sku !== "string") {
      return res.status(400).json({ message: "SKU es requerido" });
    }
    if (precio === undefined || precio.trim().length === 0) {
      return res.status(400).json({ message: "Precio es requerido" });
    }

    const producto = await productosService.create({ nombre, sku, precio });
    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Id inválido" });
    }
    if (!req.body) {
      return res.status(400).json({
        message: "Body requerido. Enviá JSON con header Content-Type: application/json",
      });
    }

    const { nombre, sku } = req.body;
    const precio = normalizePrecio(req.body.precio);

    if (!nombre || typeof nombre !== "string") {
      return res.status(400).json({ message: "Nombre es requerido" });
    }
    if (!sku || typeof sku !== "string") {
      return res.status(400).json({ message: "SKU es requerido" });
    }
    if (precio === undefined || precio.trim().length === 0) {
      return res.status(400).json({ message: "Precio es requerido" });
    }

    const producto = await productosService.update(id, { nombre, sku, precio });
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Id inválido" });
    }
    await productosService.remove(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
