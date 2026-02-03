const { ZodError } = require("zod");

const validate = (schema, source = "body") => (req, res, next) => {
  try {
    const data = source === "params" ? req.params : req.body;
    const parsed = schema.parse(data);

    if (source === "params") {
      req.validatedParams = parsed;
    } else {
      req.validatedBody = parsed;
    }

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.errors.map((e) => e.message).join(", ");
      return res.status(400).json({ message });
    }
    next(error);
  }
};

module.exports = { validate };
