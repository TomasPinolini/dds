const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/AppError");

const authRequired = (req, _res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || typeof header !== "string") {
      throw new AppError("No autenticado", 401);
    }

    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token) {
      throw new AppError("Token inválido", 401);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError("JWT_SECRET no configurado", 500);
    }

    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    if (error?.name === "JsonWebTokenError" || error?.name === "TokenExpiredError") {
      return next(new AppError("Token inválido o expirado", 401));
    }
    next(error);
  }
};

const requireRole = (...roles) => (req, _res, next) => {
  const userRole = req.user?.role;
  if (!userRole || roles.length === 0 || !roles.includes(userRole)) {
    return next(new AppError("No autorizado", 403));
  }
  next();
};

module.exports = {
  authRequired,
  requireRole,
};
