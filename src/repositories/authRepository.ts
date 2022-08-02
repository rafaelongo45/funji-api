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
}

const authRepository = {
  insert,
  findByEmail,
  findById
};

export default authRepository;