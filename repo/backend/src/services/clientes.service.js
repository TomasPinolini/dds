const clientesRepository = require("../repositories/clientes.repository");

const list = (pagination) => clientesRepository.list(pagination);

const getById = (id) => clientesRepository.getById(id);

const create = (data) => clientesRepository.create(data);

const update = (id, data) => clientesRepository.update(id, data);

const remove = (id) => clientesRepository.remove(id);

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
