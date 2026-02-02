const productosRepository = require("../repositories/productos.repository");

const list = () => productosRepository.list();

const getById = (id) => productosRepository.getById(id);

const create = (data) => productosRepository.create(data);

const update = (id, data) => productosRepository.update(id, data);

const remove = (id) => productosRepository.remove(id);

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
