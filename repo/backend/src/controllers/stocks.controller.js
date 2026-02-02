const stocksService = require("../services/stocks.service");

const parseId = (value) => Number.parseInt(value, 10);

const list = async (req, res, next) => {
  try {
    const productoId = req.query.productoId ? parseId(req.query.productoId) : undefined;
    const sucursalId = req.query.sucursalId ? parseId(req.query.sucursalId) : undefined;

    if (req.query.productoId && Number.isNaN(productoId)) {
      return res.status(400).json({ message: "productoId inválido" });
    }
    if (req.query.sucursalId && Number.isNaN(sucursalId)) {
      return res.status(400).json({ message: "sucursalId inválido" });
    }

    const stocks = await stocksService.list({ productoId, sucursalId });
    res.json(stocks);
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

    const stock = await stocksService.getById(id);
    if (!stock) {
      return res.status(404).json({ message: "Stock no encontrado" });
    }

    res.json(stock);
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

    const productoId = parseId(req.body.productoId);
    const sucursalId = parseId(req.body.sucursalId);
    const cantidad = parseId(req.body.cantidad);

    if (Number.isNaN(productoId)) {
      return res.status(400).json({ message: "productoId es requerido" });
    }
    if (Number.isNaN(sucursalId)) {
      return res.status(400).json({ message: "sucursalId es requerido" });
    }
    if (Number.isNaN(cantidad)) {
      return res.status(400).json({ message: "cantidad es requerida" });
    }

    const stock = await stocksService.create({ productoId, sucursalId, cantidad });
    res.status(201).json(stock);
  } catch (error) {
    next(error);
  }
};

const reponer = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Body requerido. Enviá JSON con header Content-Type: application/json",
      });
    }

    const productoId = parseId(req.body.productoId);
    const sucursalId = parseId(req.body.sucursalId);
    const cantidad = parseId(req.body.cantidad);

    if (Number.isNaN(productoId)) {
      return res.status(400).json({ message: "productoId es requerido" });
    }
    if (Number.isNaN(sucursalId)) {
      return res.status(400).json({ message: "sucursalId es requerido" });
    }
    if (Number.isNaN(cantidad) || cantidad <= 0) {
      return res.status(400).json({ message: "cantidad inválida" });
    }

    const stock = await stocksService.reponer({ productoId, sucursalId, cantidad });
    res.status(200).json(stock);
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

    const cantidad = parseId(req.body.cantidad);
    if (Number.isNaN(cantidad)) {
      return res.status(400).json({ message: "cantidad es requerida" });
    }

    const stock = await stocksService.update(id, { cantidad });
    res.json(stock);
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

    await stocksService.remove(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
  getById,
  reponer,
  create,
  update,
  remove,
};
