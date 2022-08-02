import prisma from "../config/database.js";

async function insert(name: string, grade: number){
  const kanji = await prisma.kanjis.create({ 
    data:{
      kanji: name,
      grade
    } 
  });
  return kanji;
};

async function findByName(name: string){
  const kanji = await prisma.kanjis.findFirst({
    where: { kanji: name }
  });

  return kanji;
}

const kanjisRepository = {
  insert,
  findByName
};

export default kanjisRepository;