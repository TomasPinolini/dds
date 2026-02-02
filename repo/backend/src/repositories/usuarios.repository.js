const { prisma } = require("../db");

const count = () => prisma.usuario.count();

const list = () =>
  prisma.usuario.findMany({
    orderBy: { id: "asc" },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

const findByEmail = (email) => prisma.usuario.findUnique({ where: { email } });

const create = (data) => prisma.usuario.create({ data });

module.exports = {
  count,
  list,
  findByEmail,
  create,
};
