import e from "express";
import prisma from "../config/database.js";

async function deleteDatabase(){
  await prisma.$executeRaw`TRUNCATE TABLE "Users" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Sessions" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Kanjis" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "UsersKanjis" CASCADE;`;
};

const testsRepository = {
  deleteDatabase
};

export default testsRepository;
