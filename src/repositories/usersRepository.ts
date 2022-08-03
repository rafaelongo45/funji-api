import prisma from "../config/database.js";

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
}

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

const usersRepository = {
  findByUsernameWithKanjis,
  findByUsername
};

export default usersRepository;