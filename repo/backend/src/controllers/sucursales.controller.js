const sucursalesService = require("../services/sucursales.service");

const parseId = (value) => Number.parseInt(value, 10);

const list = async (_req, res, next) => {
  try {
    const sucursales = await sucursalesService.list();
    res.json(sucursales);
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
    if (!req.body) {
      return res.status(400).json({
        message: "Body requerido. Enviá JSON con header Content-Type: application/json",
      });
    }

    const { nombre, direccion } = req.body;

    if (!nombre || typeof nombre !== "string") {
      return res.status(400).json({ message: "Nombre es requerido" });
    }

    const sucursal = await sucursalesService.create({ nombre, direccion });
    res.status(201).json(sucursal);
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

    const { nombre, direccion } = req.body;

    if (!nombre || typeof nombre !== "string") {
      return res.status(400).json({ message: "Nombre es requerido" });
    }

    const sucursal = await sucursalesService.update(id, { nombre, direccion });
    res.json(sucursal);
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
