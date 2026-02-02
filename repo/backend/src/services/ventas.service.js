const ventasRepository = require("../repositories/ventas.repository");

const list = (filters) => ventasRepository.list(filters);

const getById = (id) => ventasRepository.getById(id);

const registrarVenta = (payload) => ventasRepository.registrarVenta(payload);

module.exports = {
  list,
  getById,
  registrarVenta,
};
