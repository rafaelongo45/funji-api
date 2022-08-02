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
}

const usersKanjisRepository = {
  insert,
  findByUserIdAndKanjiId
};

export default usersKanjisRepository;