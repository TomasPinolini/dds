const { prisma } = require("../db");

const list = () => prisma.cliente.findMany({ orderBy: { id: "asc" } });

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
