const clientesService = require("../services/clientes.service");
const { parsePagination, paginatedResponse } = require("../utils/pagination");

const list = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const { data, total } = await clientesService.list({ skip, limit });
    res.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;
    const cliente = await clientesService.getById(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(cliente);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { nombre, email, telefono } = req.validatedBody;
    const cliente = await clientesService.create({ nombre, email, telefono });
    res.status(201).json(cliente);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;
    const { nombre, email, telefono } = req.validatedBody;
    const cliente = await clientesService.update(id, { nombre, email, telefono });
    res.json(cliente);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;
    await clientesService.remove(id);
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
