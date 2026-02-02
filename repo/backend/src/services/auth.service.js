const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usuariosRepository = require("../repositories/usuarios.repository");

const signToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const err = new Error("JWT_SECRET no configurado");
    err.statusCode = 500;
    throw err;
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
    const err = new Error("Bootstrap deshabilitado: ya existen usuarios");
    err.statusCode = 409;
    throw err;
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
    const err = new Error("Credenciales inválidas");
    err.statusCode = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    const err = new Error("Credenciales inválidas");
    err.statusCode = 401;
    throw err;
  }

  const token = signToken(user);
  return { user: { id: user.id, email: user.email, role: user.role }, token };
};

const createUser = async ({ email, password, role }) => {
  const existing = await usuariosRepository.findByEmail(email);
  if (existing) {
    const err = new Error("Email ya registrado");
    err.statusCode = 409;
    throw err;
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
