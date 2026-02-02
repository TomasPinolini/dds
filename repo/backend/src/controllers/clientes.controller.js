const clientesService = require("../services/clientes.service");

const parseId = (value) => Number.parseInt(value, 10);

const list = async (_req, res, next) => {
  try {
    const clientes = await clientesService.list();
    res.json(clientes);
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
    if (!req.body) {
      return res.status(400).json({
        message: "Body requerido. Enviá JSON con header Content-Type: application/json",
      });
    }
    const { nombre, email, telefono } = req.body;
    if (!nombre || typeof nombre !== "string") {
      return res.status(400).json({ message: "Nombre es requerido" });
    }
    const cliente = await clientesService.create({ nombre, email, telefono });
    res.status(201).json(cliente);
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
    const { nombre, email, telefono } = req.body;
    if (!nombre || typeof nombre !== "string") {
      return res.status(400).json({ message: "Nombre es requerido" });
    }
    const cliente = await clientesService.update(id, { nombre, email, telefono });
    res.json(cliente);
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
