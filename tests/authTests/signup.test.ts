import supertest from "supertest";
import { faker } from "@faker-js/faker";

import app from "../../src/index.js";
import prisma from "../../src/config/database.js";
import usersFactory from "../factories/usersFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "Users" CASCADE;`;
})

describe("signup suite", () => {
  it("Succesfully creates a new user, return status 201", async () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(6),
      profileImage: faker.image.animals()
    }
    const data = {...user, confirmPassword: user.password}; 
    const promise = await supertest(app).post("/signup").send(data);
    const statusCode = promise.statusCode;
    expect(statusCode).toBe(201); 
  });

  it("Creates a new user with invalid e-mail, return status 422", async () => {
    const user = {
      username: faker.internet.userName(),
      email: 'isthisanemail',
      password: faker.random.alphaNumeric(6),
      profileImage: faker.image.animals()
    }
    const data = {...user, confirmPassword: user.password}; 
    const promise = await supertest(app).post("/signup").send(data);
    const statusCode = promise.statusCode;
    expect(statusCode).toBe(422); 
  });

  it("Creates a new user with a password with less than 6 characters, return status 422", async () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(5),
      profileImage: faker.image.animals()
    }
    const data = {...user, confirmPassword: user.password}; 
    const promise = await supertest(app).post("/signup").send(data);
    const statusCode = promise.statusCode;
    expect(statusCode).toBe(422); 
  });

  it("Creates a new user with blank data, return status 422", async () => {
    const user = {
      username: '',
      email: '',
      password: '',
      profileImage:''
    }
    const data = {...user, confirmPassword: user.password}; 
    const promise = await supertest(app).post("/signup").send(data);
    const statusCode = promise.statusCode;
    expect(statusCode).toBe(422); 
  });

  it("Creates a new user sending something other than a link for the profile image, return status 422", async () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(5),
      profileImage: "i'mnotanimage"
    }
    const data = {...user, confirmPassword: user.password}; 
    const promise = await supertest(app).post("/signup").send(data);
    const statusCode = promise.statusCode;
    expect(statusCode).toBe(422); 
  });

  it("Creates a user with a username already registered. Receives code 409", async () => {
    const user = await usersFactory.createUser();
    const userData = {
      username: user.username,
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(6),
      profileImage: faker.image.animals()
    };
    const data = { ...userData, confirmPassword: userData.password}
    const promise = await supertest(app).post("/signup").send(data);
    const statusCode = promise.statusCode;
    expect(statusCode).toBe(409);
  });

  it("Creates a user with an e-mail already registered. Receives code 409", async () => {
    const user = await usersFactory.createUser();
    const userData = {
      username: faker.internet.userName(),
      email: user.email,
      password: faker.random.alphaNumeric(6),
      profileImage: faker.image.animals()
    };
    const data = { ...userData, confirmPassword: userData.password}
    const promise = await supertest(app).post("/signup").send(data);
    const statusCode = promise.statusCode;
    expect(statusCode).toBe(409);
  });
})

afterAll(async () => {
  await prisma.$disconnect();
});