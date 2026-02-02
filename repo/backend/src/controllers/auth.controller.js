const authService = require("../services/auth.service");

const bootstrap = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Body requerido. Enviá JSON con header Content-Type: application/json",
      });
    }

    const { email, password } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email es requerido" });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password es requerido (mínimo 6 caracteres)" });
    }

    const result = await authService.bootstrapAdmin({ email, password });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Body requerido. Enviá JSON con header Content-Type: application/json",
      });
    }

    const { email, password } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email es requerido" });
    }
    if (!password || typeof password !== "string") {
      return res.status(400).json({ message: "Password es requerido" });
    }

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
    if (!req.body) {
      return res.status(400).json({
        message: "Body requerido. Enviá JSON con header Content-Type: application/json",
      });
    }

    const { email, password, role } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email es requerido" });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password es requerido (mínimo 6 caracteres)" });
    }

    const allowedRoles = ["ADMIN", "VENDEDOR", "REPOSITOR"];
    if (!role || !allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Role inválido" });
    }

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
