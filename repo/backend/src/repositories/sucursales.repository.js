const { prisma } = require("../db");

const list = () => prisma.sucursal.findMany({ orderBy: { id: "asc" } });

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
