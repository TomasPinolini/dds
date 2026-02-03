const { z } = require("zod");

const clienteSchema = z.object({
  nombre: z.string().min(1, "Nombre es requerido"),
  email: z.string().email("Email inválido").nullable().optional(),
  telefono: z.string().nullable().optional(),
});

const productoSchema = z.object({
  nombre: z.string().min(1, "Nombre es requerido"),
  sku: z.string().min(1, "SKU es requerido"),
  precio: z.union([z.string(), z.number()]).transform((val) => String(val)),
});

const sucursalSchema = z.object({
  nombre: z.string().min(1, "Nombre es requerido"),
  direccion: z.string().nullable().optional(),
});

const stockSchema = z.object({
  productoId: z.coerce.number().int().positive("productoId es requerido"),
  sucursalId: z.coerce.number().int().positive("sucursalId es requerido"),
  cantidad: z.coerce.number().int().min(0, "cantidad inválida"),
});

const reponerStockSchema = z.object({
  productoId: z.coerce.number().int().positive("productoId es requerido"),
  sucursalId: z.coerce.number().int().positive("sucursalId es requerido"),
  cantidad: z.coerce.number().int().positive("cantidad debe ser mayor a 0"),
});

const ventaItemSchema = z.object({
  productoId: z.coerce.number().int().positive("productoId inválido"),
  cantidad: z.coerce.number().int().positive("cantidad inválida"),
});

const registrarVentaSchema = z.object({
  clienteId: z.coerce.number().int().positive("clienteId es requerido"),
  sucursalId: z.coerce.number().int().positive("sucursalId es requerido"),
  items: z.array(ventaItemSchema).min(1, "items es requerido"),
});

const loginSchema = z.object({
  email: z.string().min(1, "Email es requerido"),
  password: z.string().min(1, "Password es requerido"),
});

const bootstrapSchema = z.object({
  email: z.string().min(1, "Email es requerido"),
  password: z.string().min(6, "Password es requerido (mínimo 6 caracteres)"),
});

const createUserSchema = z.object({
  email: z.string().min(1, "Email es requerido"),
  password: z.string().min(6, "Password es requerido (mínimo 6 caracteres)"),
  role: z.enum(["ADMIN", "VENDEDOR", "REPOSITOR"], { message: "Role inválido" }),
});

const idParamSchema = z.object({
  id: z.coerce.number().int().positive("Id inválido"),
});

module.exports = {
  clienteSchema,
  productoSchema,
  sucursalSchema,
  stockSchema,
  reponerStockSchema,
  registrarVentaSchema,
  loginSchema,
  bootstrapSchema,
  createUserSchema,
  idParamSchema,
};
