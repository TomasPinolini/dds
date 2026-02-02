const stocksRepository = require("../repositories/stocks.repository");

const list = (filters) => stocksRepository.list(filters);

const getById = (id) => stocksRepository.getById(id);

const create = (data) => stocksRepository.create(data);

const update = (id, data) => stocksRepository.update(id, data);

const remove = (id) => stocksRepository.remove(id);

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
