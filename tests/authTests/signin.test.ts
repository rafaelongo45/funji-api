import supertest from "supertest";
import { faker } from "@faker-js/faker";

import app from "../../src/index.js";
import prisma from "../../src/config/database.js";
import usersFactory from "../factories/usersFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "Users" CASCADE;`;
})

describe("signup suite", () => {
  it("Tries to signin without sending data receives code 422", async () => {
    const data = {
      email: '',
      password: ''
    };
    const promise = await supertest(app).post("/signin").send(data);
    const statusCode = promise.statusCode;
    expect(statusCode).toBe(422);
  });

  it("Tries to signin with a user that is not registered, receives code 404", async () => {
    const data = {
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(6)
    };
    const promise = await supertest(app).post("/signin").send(data);
    const statusCode = promise.statusCode;
    expect(statusCode).toBe(404);
  });

  it("Tries to signin using a wrong password, receives code 403", async () => {
    const user = await usersFactory.createUser();
    const data = {
      email: user.email,
      password: faker.random.alphaNumeric(6)
    };
    const promise = await supertest(app).post("/signin").send(data);
    const statusCode = promise.statusCode;
    expect(statusCode).toBe(401);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});