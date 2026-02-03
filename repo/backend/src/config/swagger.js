const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DSW API",
      version: "1.0.0",
      description: "API para el sistema de gestión de ventas, clientes, productos, sucursales y stock",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Pagination: {
          type: "object",
          properties: {
            page: { type: "integer", example: 1 },
            limit: { type: "integer", example: 20 },
            total: { type: "integer", example: 100 },
            totalPages: { type: "integer", example: 5 },
          },
        },
        Cliente: {
          type: "object",
          properties: {
            id: { type: "integer" },
            nombre: { type: "string" },
            email: { type: "string", nullable: true },
            telefono: { type: "string", nullable: true },
          },
        },
        Producto: {
          type: "object",
          properties: {
            id: { type: "integer" },
            nombre: { type: "string" },
            sku: { type: "string" },
            precio: { type: "string" },
          },
        },
        Sucursal: {
          type: "object",
          properties: {
            id: { type: "integer" },
            nombre: { type: "string" },
            direccion: { type: "string", nullable: true },
          },
        },
        Stock: {
          type: "object",
          properties: {
            id: { type: "integer" },
            productoId: { type: "integer" },
            sucursalId: { type: "integer" },
            cantidad: { type: "integer" },
            producto: { $ref: "#/components/schemas/Producto" },
            sucursal: { $ref: "#/components/schemas/Sucursal" },
          },
        },
        Venta: {
          type: "object",
          properties: {
            id: { type: "integer" },
            fecha: { type: "string", format: "date-time" },
            total: { type: "string" },
            usuarioId: { type: "integer" },
            clienteId: { type: "integer" },
            sucursalId: { type: "integer" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec };
