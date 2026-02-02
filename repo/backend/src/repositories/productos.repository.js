const { prisma } = require("../db");

const list = () => prisma.producto.findMany({ orderBy: { id: "asc" } });

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
