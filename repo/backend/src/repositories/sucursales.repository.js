const { prisma } = require("../db");

const list = async ({ skip, limit } = {}) => {
  const [data, total] = await Promise.all([
    prisma.sucursal.findMany({
      orderBy: { id: "asc" },
      skip,
      take: limit,
    }),
    prisma.sucursal.count(),
  ]);
  return { data, total };
};

const getById = (id) => prisma.sucursal.findUnique({ where: { id } });

const create = (data) => prisma.sucursal.create({ data });

const update = (id, data) => prisma.sucursal.update({ where: { id }, data });

const remove = (id) => prisma.sucursal.delete({ where: { id } });

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
