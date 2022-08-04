import { faker } from "@faker-js/faker";
import prisma from "../../src/config/database";

async function createUser(){
  const data = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(6),
    profileImage: faker.image.animals()
  }
  const user = await prisma.users.create({
    data
  });

  return user;
};

const usersFactory = {
  createUser
};

export default usersFactory;