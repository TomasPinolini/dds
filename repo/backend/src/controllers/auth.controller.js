const authService = require("../services/auth.service");

const bootstrap = async (req, res, next) => {
  try {
    const { email, password } = req.validatedBody;
    const result = await authService.bootstrapAdmin({ email, password });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.validatedBody;
    const result = await authService.login({ email, password });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const me = async (req, res) => {
  res.json({ user: req.user });
};

const createUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.validatedBody;
    const user = await authService.createUser({ email, password, role });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const listUsers = async (_req, res, next) => {
  try {
    const users = await authService.listUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  bootstrap,
  login,
  me,
  createUser,
  listUsers,
};
