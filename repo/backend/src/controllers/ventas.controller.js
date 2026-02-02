const ventasService = require("../services/ventas.service");

const parseId = (value) => Number.parseInt(value, 10);

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

    const ventas = await ventasService.list({ clienteId, from, to });
    res.json(ventas);
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
    if (!req.body) {
      return res.status(400).json({
        message: "Body requerido. Enviá JSON con header Content-Type: application/json",
      });
    }

    const usuarioId = parseId(req.user?.sub);
    if (Number.isNaN(usuarioId)) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const clienteId = parseId(req.body.clienteId);
    const sucursalId = parseId(req.body.sucursalId);
    const items = req.body.items;

    if (Number.isNaN(clienteId)) {
      return res.status(400).json({ message: "clienteId es requerido" });
    }
    if (Number.isNaN(sucursalId)) {
      return res.status(400).json({ message: "sucursalId es requerido" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "items es requerido" });
    }

    for (const item of items) {
      const productoId = parseId(item.productoId);
      const cantidad = parseId(item.cantidad);
      if (Number.isNaN(productoId)) {
        return res.status(400).json({ message: "productoId inválido" });
      }
      if (Number.isNaN(cantidad) || cantidad <= 0) {
        return res.status(400).json({ message: "cantidad inválida" });
      }
    }

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
