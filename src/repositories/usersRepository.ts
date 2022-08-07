import prisma from "../config/database.js";

async function findById(id: number){
  const user = await prisma.users.findFirst({
    where:{
      id
    }
  });

  return user;
};

async function findAllUsers(username: string){
  const users = await prisma.$queryRaw`SELECT id, username, "profileImage" FROM "Users" WHERE username ILIKE ${'%'+username+'%'};`;
  return users;
}

async function findByUsername(username: string){
  const user = await prisma.users.findFirst({
    where: { username },
    select:{
      id: true,
      username: true,
      profileImage: true
    }
  });

  return user;
};

async function findByUsernameWithKanjis(username: string){
  const user = await prisma.users.findFirst({
    where: {
      username
    },
    select: {
      id: true,
      username: true,
      profileImage: true,
      usersKanjis: {
        select: {
          kanji:{
            select: {
              kanji: true
            }
          }
        }
      }
    },
  });

  return user;
};

async function update(id: number, profileImage: string){
  await prisma.users.update({
    where: { id },
    data: { profileImage }
  });
}

const usersRepository = {
  findAllUsers,
  findByUsernameWithKanjis,
  findByUsername,
  findById,
  update
};

export default usersRepository;