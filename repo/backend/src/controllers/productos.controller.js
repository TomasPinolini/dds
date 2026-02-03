const productosService = require("../services/productos.service");
const { parsePagination, paginatedResponse } = require("../utils/pagination");

const list = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const { data, total } = await productosService.list({ skip, limit });
    res.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;
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
    const { nombre, sku, precio } = req.validatedBody;
    const producto = await productosService.create({ nombre, sku, precio });
    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;
    const { nombre, sku, precio } = req.validatedBody;
    const producto = await productosService.update(id, { nombre, sku, precio });
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;
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
