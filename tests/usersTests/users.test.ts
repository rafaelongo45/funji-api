import supertest from "supertest";
import { faker } from "@faker-js/faker";

import app from "../../src";
import prisma from "../../src/config/database.js";
import authService from "../../src/services/authService.js";
import kanjisFactory from "../factories/kanjisFactory.js";
import usersFactory from "../factories/usersFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "Users" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Kanjis" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "UsersKanjis" CASCADE;`;
});

describe("get user information suite", () => {
  it("should return a user's information", async () => {
    const user = await usersFactory.createUser();
    const promise = await supertest(app).get(`/user/${user.username}`);
    const data = promise.body;
    expect(data).toEqual({id: user.id, username: user.username, profileImage: user.profileImage});
  });

  it("search for a user that doesn't exist, returns code 404", async () => {
    await usersFactory.createUser();
    const promise = await supertest(app).get(`/user/notauser`);
    const statusCode = promise.statusCode;
    expect(statusCode).toBe(404);
  })
});

describe("get user information with kanji suite", () => {
  it("Gets user's kanjis sending his username, should return a user's information with his saved kanjis", async () => {
    const user = await usersFactory.createUser();
    const kanjiInfo = await kanjisFactory.insertKanjiUser(user);
    const promise = await supertest(app).get(`/user/${user.username}/kanjis`);
    const data = promise.body;
    expect(data)
    .toEqual(
      {
        id: user.id, 
        username: user.username, 
        profileImage: user.profileImage, 
        kanjis:[{  
          kanji: kanjiInfo.kanji 
        }]
    });
  });

  it("Gets user's kanjis sending a username that doesn't exist, should return 404", async () => {
    const user = await usersFactory.createUser();
    await kanjisFactory.insertKanjiUser(user);
    const promise = await supertest(app).get(`/user/idontexist/kanjis`);
    const statusCode = promise.statusCode;
    expect(statusCode).toBe(404)
  });

  it("Gets user's kanjis sending his token, should return a user's information with his saved kanjis", async () => {
    const user = await usersFactory.createEncryptedUser();
    const token = await authService.signin({
      email: user.email,
      password: user.password
    })
    const kanjiInfo = await kanjisFactory.insertKanjiUser(user);
    const promise = await supertest(app).get(`/user/kanjis`).auth(token.token ,{ type: 'bearer'})
    const data = promise.body;
    expect(data)
    .toEqual(
      {
        id: user.id, 
        username: user.username, 
        profileImage: user.profileImage, 
        usersKanjis:[
          {  
            kanji: {
              kanji: kanjiInfo.kanji
            }
          }
        ]
      });
    }
  );

  it("Gets user's kanjis sending a token that doesn't exist, should return 404", async () => {
    const token = 'idontexisthahaha'
    const promise = await supertest(app).get(`/user/idontexist/kanjis`).auth(token ,{ type: 'bearer'});
    const statusCode = promise.statusCode;
    expect(statusCode).toBe(404)
  });
});

describe("user profile update", () => {
  it("updates user's profile image, receives updated image", async () => {
    const user = await usersFactory.createEncryptedUser();
    const token = await authService.signin({
      email: user.email,
      password: user.password
    })
    const newImage = {
      profileImage: faker.image.animals()
    }
    const promise = await supertest(app).post(`/user/edit`).send(newImage).auth(token.token , { type: 'bearer'})
    const statusCode = promise.statusCode;
    expect(statusCode).toBe(200);
    }
  );

  it("updates user's profile image sending a number, receives code 422", async () => {
    const user = await usersFactory.createEncryptedUser();
    const token = await authService.signin({
      email: user.email,
      password: user.password
    })
    const newImage = {
      profileImage: 1
    }
    const promise = await supertest(app).post(`/user/edit`).send(newImage).auth(token.token , { type: 'bearer'})
    const statusCode = promise.statusCode;
    expect(statusCode).toBe(422);
    }
  );
})

afterAll(async () => {
  await prisma.$disconnect();
})