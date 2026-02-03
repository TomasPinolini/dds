process.env.JWT_SECRET = process.env.JWT_SECRET || "test_jwt_secret";

if (process.env.TEST_DATABASE_URL) {
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
}
