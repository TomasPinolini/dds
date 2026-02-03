const { authRequired, requireRole } = require("../src/middlewares/auth.middleware");

const run = (mw, req = {}) =>
  new Promise((resolve) => {
    mw(req, {}, (err) => resolve(err));
  });

describe("auth middleware", () => {
  test("authRequired rejects when Authorization header is missing", async () => {
    const err = await run(authRequired, { headers: {} });
    expect(err).toBeTruthy();
    expect(err.statusCode).toBe(401);
  });

  test("requireRole rejects when user role is not allowed", async () => {
    const mw = requireRole("ADMIN");
    const err = await run(mw, { user: { role: "VENDEDOR" } });
    expect(err).toBeTruthy();
    expect(err.statusCode).toBe(403);
  });
});
