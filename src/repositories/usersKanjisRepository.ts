import prisma from "../config/database.js";

async function insert(userId: number, kanjiId: number){
  await prisma.usersKanjis.create({ 
    data: {
      userId,
      kanjiId
    } 
  });
};

async function findByUserIdAndKanjiId(userId: number, kanjiId: number){
  const kanjiInfo = await prisma.usersKanjis.findFirst({
    where: {
      userId,
      kanjiId
    }
  });

  return kanjiInfo
};

async function findUserWithKanjis(userId: number){
  const user = await prisma.users.findFirst({
    where: {
      id: userId
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
}

const usersKanjisRepository = {
  insert,
  findByUserIdAndKanjiId,
  findUserWithKanjis
};

export default usersKanjisRepository;