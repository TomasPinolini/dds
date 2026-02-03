const ventasService = require("../services/ventas.service");
const { parseId } = require("../utils/parse");
const { parsePagination, paginatedResponse } = require("../utils/pagination");

const list = async (req, res, next) => {
  try {
    const clienteId = req.query.clienteId ? parseId(req.query.clienteId) : undefined;
    if (req.query.clienteId && Number.isNaN(clienteId)) {
      return res.status(400).json({ message: "clienteId inválido" });
    }

    const from = req.query.from ? new Date(req.query.from) : undefined;
    const to = req.query.to ? new Date(req.query.to) : undefined;

    if (req.query.from && Number.isNaN(from?.getTime())) {
      return res.status(400).json({ message: "from inválido" });
    }
    if (req.query.to && Number.isNaN(to?.getTime())) {
      return res.status(400).json({ message: "to inválido" });
    }

    const { page, limit, skip } = parsePagination(req.query);
    const { data, total } = await ventasService.list({ clienteId, from, to, skip, limit });
    res.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;
    const venta = await ventasService.getById(id);
    if (!venta) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }
    res.json(venta);
  } catch (error) {
    next(error);
  }
};

const registrarVenta = async (req, res, next) => {
  try {
    const usuarioId = parseId(req.user?.sub);
    if (Number.isNaN(usuarioId)) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const { clienteId, sucursalId, items } = req.validatedBody;
    const venta = await ventasService.registrarVenta({ usuarioId, clienteId, sucursalId, items });
    res.status(201).json(venta);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
  getById,
  registrarVenta,
};
