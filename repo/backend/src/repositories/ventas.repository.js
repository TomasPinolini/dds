const { prisma } = require("../db");

const list = (filters = {}) => {
  const where = {};

  if (filters.clienteId !== undefined) where.clienteId = filters.clienteId;

  if (filters.from || filters.to) {
    where.fecha = {};
    if (filters.from) where.fecha.gte = filters.from;
    if (filters.to) where.fecha.lte = filters.to;
  }

  return prisma.venta.findMany({
    where,
    include: {
      usuario: true,
      cliente: true,
      sucursal: true,
      detalles: {
        include: {
          producto: true,
        },
      },
    },
    orderBy: { id: "desc" },
  });
};

const getById = (id) =>
  prisma.venta.findUnique({
    where: { id },
    include: {
      usuario: true,
      cliente: true,
      sucursal: true,
      detalles: {
        include: {
          producto: true,
        },
      },
    },
  });

const registrarVenta = async ({ usuarioId, clienteId, sucursalId, items }) => {
  return prisma.$transaction(async (tx) => {
    const productoIds = items.map((i) => Number.parseInt(i.productoId, 10));

    const productos = await tx.producto.findMany({
      where: { id: { in: productoIds } },
    });

    if (productos.length !== productoIds.length) {
      throw new Error("Producto no encontrado");
    }

    const precioById = new Map(productos.map((p) => [p.id, p.precio]));

    for (const item of items) {
      const productoId = Number.parseInt(item.productoId, 10);
      const cantidad = Number.parseInt(item.cantidad, 10);

      const stock = await tx.stock.findUnique({
        where: {
          productoId_sucursalId: {
            productoId,
            sucursalId,
          },
        },
      });

      if (!stock) {
        const err = new Error("Stock insuficiente");
        err.statusCode = 400;
        throw err;
      }

      if (stock.cantidad < cantidad) {
        const err = new Error("Stock insuficiente");
        err.statusCode = 400;
        throw err;
      }

      await tx.stock.update({
        where: { id: stock.id },
        data: { cantidad: stock.cantidad - cantidad },
      });
    }

    let total = 0;
    const detallesData = items.map((item) => {
      const productoId = Number.parseInt(item.productoId, 10);
      const cantidad = Number.parseInt(item.cantidad, 10);

      const precioUnitarioRaw = precioById.get(productoId);
      const precioUnitario = Number.parseFloat(precioUnitarioRaw.toString());
      total += precioUnitario * cantidad;

      return {
        productoId,
        cantidad,
        precioUnitario: precioUnitario.toFixed(2),
      };
    });

    const venta = await tx.venta.create({
      data: {
        usuarioId,
        clienteId,
        sucursalId,
        total: total.toFixed(2),
        detalles: {
          create: detallesData,
        },
      },
      include: {
        usuario: true,
        cliente: true,
        sucursal: true,
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });

    return venta;
  });
};

module.exports = {
  list,
  getById,
  registrarVenta,
};
