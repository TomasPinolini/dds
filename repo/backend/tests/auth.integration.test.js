const request = require("supertest");

describe("auth integration", () => {
  test("bootstrap -> login -> list users", async () => {
    if (!process.env.TEST_DATABASE_URL) {
      throw new Error("TEST_DATABASE_URL is required for integration tests");
    }

    const { prisma } = require("../src/db");
    const { app } = require("../src/app");

    try {
      await prisma.detalleVenta.deleteMany();
      await prisma.venta.deleteMany();
      await prisma.stock.deleteMany();
      await prisma.producto.deleteMany();
      await prisma.sucursal.deleteMany();
      await prisma.cliente.deleteMany();
      await prisma.usuario.deleteMany();

      const email = "admin_test@local";
      const password = "admin123";

      const bootstrap = await request(app).post("/auth/bootstrap").send({ email, password });
      expect(bootstrap.statusCode).toBe(201);

      const login = await request(app).post("/auth/login").send({ email, password });
      expect(login.statusCode).toBe(200);
      expect(login.body.token).toBeTruthy();

      const token = login.body.token;

      const users = await request(app)
        .get("/auth/users")
        .set("Authorization", `Bearer ${token}`);

      expect(users.statusCode).toBe(200);
      expect(Array.isArray(users.body)).toBe(true);
      expect(users.body.length).toBeGreaterThan(0);
    } finally {
      await prisma.$disconnect();
    }
  });
});
