const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("Auth API", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should signup a new user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Test User",
        email: "testuser@example.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it("should login an existing user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@example.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
