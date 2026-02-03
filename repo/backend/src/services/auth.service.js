const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usuariosRepository = require("../repositories/usuarios.repository");
const { AppError } = require("../utils/AppError");

const signToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AppError("JWT_SECRET no configurado", 500);
  }

  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    secret,
    { expiresIn: "2h" }
  );
};

const bootstrapAdmin = async ({ email, password }) => {
  const total = await usuariosRepository.count();
  if (total > 0) {
    throw new AppError("Bootstrap deshabilitado: ya existen usuarios", 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await usuariosRepository.create({
    email,
    passwordHash,
    role: "ADMIN",
  });

  const token = signToken(user);
  return { user: { id: user.id, email: user.email, role: user.role }, token };
};

const login = async ({ email, password }) => {
  const user = await usuariosRepository.findByEmail(email);
  if (!user) {
    throw new AppError("Credenciales inválidas", 401);
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw new AppError("Credenciales inválidas", 401);
  }

  const token = signToken(user);
  return { user: { id: user.id, email: user.email, role: user.role }, token };
};

const createUser = async ({ email, password, role }) => {
  const existing = await usuariosRepository.findByEmail(email);
  if (existing) {
    throw new AppError("Email ya registrado", 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await usuariosRepository.create({ email, passwordHash, role });
  return { id: user.id, email: user.email, role: user.role };
};

const listUsers = () => usuariosRepository.list();

module.exports = {
  bootstrapAdmin,
  login,
  createUser,
  listUsers,
};
