const jwt = require("jsonwebtoken");

const authRequired = (req, _res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || typeof header !== "string") {
      const err = new Error("No autenticado");
      err.statusCode = 401;
      throw err;
    }

    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token) {
      const err = new Error("Token inválido");
      err.statusCode = 401;
      throw err;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      const err = new Error("JWT_SECRET no configurado");
      err.statusCode = 500;
      throw err;
    }

    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (error) {
    if (error?.name === "JsonWebTokenError" || error?.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "Token inválido o expirado";
    }
    next(error);
  }
};

const requireRole = (role) => (req, _res, next) => {
  const userRole = req.user?.role;
  if (userRole !== role) {
    const err = new Error("No autorizado");
    err.statusCode = 403;
    return next(err);
  }
  next();
};

module.exports = {
  authRequired,
  requireRole,
};
