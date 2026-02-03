const { prisma } = require("../db");

const list = async ({ skip, limit } = {}) => {
  const [data, total] = await Promise.all([
    prisma.producto.findMany({
      orderBy: { id: "asc" },
      skip,
      take: limit,
    }),
    prisma.producto.count(),
  ]);
  return { data, total };
};

const getById = (id) => prisma.producto.findUnique({ where: { id } });

const create = (data) => prisma.producto.create({ data });

const update = (id, data) => prisma.producto.update({ where: { id }, data });

const remove = (id) => prisma.producto.delete({ where: { id } });

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
