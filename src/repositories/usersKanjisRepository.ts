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

async function findUserKanjis(userId: number){
  const kanjis = await prisma.usersKanjis.findMany({
    where: { 
      userId
    }, 
    select:{
      kanji:{
        select: {
          kanji:true
        }
      }
    }
  });

  return kanjis;
}

const usersKanjisRepository = {
  insert,
  findByUserIdAndKanjiId,
  findUserKanjis
};

export default usersKanjisRepository;