const sucursalesService = require("../services/sucursales.service");
const { parsePagination, paginatedResponse } = require("../utils/pagination");

const list = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const { data, total } = await sucursalesService.list({ skip, limit });
    res.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;
    const sucursal = await sucursalesService.getById(id);
    if (!sucursal) {
      return res.status(404).json({ message: "Sucursal no encontrada" });
    }
    res.json(sucursal);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { nombre, direccion } = req.validatedBody;
    const sucursal = await sucursalesService.create({ nombre, direccion });
    res.status(201).json(sucursal);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;
    const { nombre, direccion } = req.validatedBody;
    const sucursal = await sucursalesService.update(id, { nombre, direccion });
    res.json(sucursal);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;
    await sucursalesService.remove(id);
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
