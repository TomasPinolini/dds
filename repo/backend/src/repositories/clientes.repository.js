const { prisma } = require("../db");

const list = async ({ skip, limit } = {}) => {
  const [data, total] = await Promise.all([
    prisma.cliente.findMany({
      orderBy: { id: "asc" },
      skip,
      take: limit,
    }),
    prisma.cliente.count(),
  ]);
  return { data, total };
};

const getById = (id) => prisma.cliente.findUnique({ where: { id } });

const create = (data) => prisma.cliente.create({ data });

const update = (id, data) => prisma.cliente.update({ where: { id }, data });

const remove = (id) => prisma.cliente.delete({ where: { id } });

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
