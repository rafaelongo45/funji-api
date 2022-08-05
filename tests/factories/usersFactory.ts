import { faker } from "@faker-js/faker";
import prisma from "../../src/config/database";
import { encryptPassword } from "../../src/utils/passwordEncrypter";

async function createUser(){
  const data = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(6),
    profileImage: faker.image.animals(),
  }
  const user = await prisma.users.create({
    data
  })
  return user;
};

async function createEncryptedUser(){
  const data = {
    id: 1,
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(6),
    profileImage: faker.image.animals(),
    createdAt: new Date('11/05/2022')
  }
  const encryptedPassword = await encryptPassword(data.password);
  const dbData = { ...data, password: encryptedPassword };
  await prisma.users.create({
    data: dbData
  })
  return data;
};

const usersFactory = {
  createUser,
  createEncryptedUser
};

export default usersFactory;