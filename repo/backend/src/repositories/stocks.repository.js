const { prisma } = require("../db");

const list = async (filters = {}) => {
  const where = {};
  if (filters.productoId !== undefined) where.productoId = filters.productoId;
  if (filters.sucursalId !== undefined) where.sucursalId = filters.sucursalId;

  const [data, total] = await Promise.all([
    prisma.stock.findMany({
      where,
      include: {
        producto: true,
        sucursal: true,
      },
      orderBy: { id: "asc" },
      skip: filters.skip,
      take: filters.limit,
    }),
    prisma.stock.count({ where }),
  ]);
  return { data, total };
};

const getById = (id) =>
  prisma.stock.findUnique({
    where: { id },
    include: {
      producto: true,
      sucursal: true,
    },
  });

const create = (data) =>
  prisma.stock.create({
    data,
    include: {
      producto: true,
      sucursal: true,
    },
  });

const reponer = ({ productoId, sucursalId, cantidad }) =>
  prisma.stock.upsert({
    where: {
      productoId_sucursalId: {
        productoId,
        sucursalId,
      },
    },
    update: {
      cantidad: {
        increment: cantidad,
      },
    },
    create: {
      productoId,
      sucursalId,
      cantidad,
    },
    include: {
      producto: true,
      sucursal: true,
    },
  });

const update = (id, data) =>
  prisma.stock.update({
    where: { id },
    data,
    include: {
      producto: true,
      sucursal: true,
    },
  });

const remove = (id) => prisma.stock.delete({ where: { id } });

module.exports = {
  list,
  getById,
  create,
  reponer,
  update,
  remove,
};
