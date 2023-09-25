require("dotenv").config();
const testReq = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const { DB_HOST_TEST } = process.env;

const testUser = {
  email: "test@gmail.com",
  password: "1111",
};

describe("login test", () => {
  let userRes = null;

  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST_TEST)
      .then(() => console.log("DB connected"))
      .catch((e) => console.log(e));

    await testReq(app).post("/users/register").send(testUser);
  });

  it("should login succesfully", async () => {
    userRes = await testReq(app).post("/users/login").send(testUser);

    expect(userRes.status).toBe(200);
    expect(userRes.body).toHaveProperty("token");
    expect(userRes.body).toMatchObject({
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });
  });

  it("should throw error when req body doesn't have an email field", async () => {
    const res = await testReq(app).post("/users/login").send({
      password: testUser.password,
    });

    expect(res.status).toBe(400);
    expect(res.error.text).toMatch(
      '{"message":"Missing required email field"}'
    );
  });

  it("should throw error when the email is wrong", async () => {
    const res = await testReq(app).post("/users/login").send({
      email: "Wrong_test@gmail.com",
      password: testUser.password,
    });

    expect(res.status).toBe(401);
    expect(res.error.text).toMatch('{"message":"Email or password is wrong"}');
  });

  it("should throw error when req body doesn't have a password field", async () => {
    const res = await testReq(app).post("/users/login").send({
      email: testUser.email,
    });

    expect(res.status).toBe(400);
    expect(res.error.text).toMatch(
      '{"message":"Missing required password field"}'
    );
  });

  it("should throw error when the password is wrong", async () => {
    const res = await testReq(app).post("/users/login").send({
      email: testUser.email,
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
    expect(res.error.text).toMatch('{"message":"Email or password is wrong"}');
  });

  it("should throw error when req body is empty", async () => {
    const res = await testReq(app).post("/users/login").send({});

    expect(res.status).toBe(400);
    expect(res.error.text).toMatch('{"message":"Missing fields"}');
  });

  afterAll(async () => {
    await mongoose
      .disconnect(DB_HOST_TEST)
      .then(() => console.log("DB disconnected"));
  });
});
