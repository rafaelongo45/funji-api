import { Users } from "@prisma/client";
import prisma from "../config/database.js";

async function insert(data: Users){
  await prisma.users.create({
    data
  });
};

async function findByEmail(email: string){
  const user = await prisma.users.findUnique({
    where: { email }
  });

  return user;
};

async function findById(id: number){
  const user = await prisma.users.findFirst({
    where: { id }
  });

  return user;
};

async function createSession(userId: number, token: string){
  await prisma.sessions.create({
    data: { userId, token }
  });
};

async function findByToken(token: string){
  const session = await prisma.sessions.findFirst({
    where: { token }
  });

  return session;
}

const authRepository = {
  insert,
  findByEmail,
  findById,
  createSession,
  findByToken
};

export default authRepository;