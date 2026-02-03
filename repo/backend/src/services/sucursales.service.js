const sucursalesRepository = require("../repositories/sucursales.repository");

const list = (pagination) => sucursalesRepository.list(pagination);

const getById = (id) => sucursalesRepository.getById(id);

const create = (data) => sucursalesRepository.create(data);

const update = (id, data) => sucursalesRepository.update(id, data);

const remove = (id) => sucursalesRepository.remove(id);

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
