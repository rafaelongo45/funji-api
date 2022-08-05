import { Users } from "@prisma/client";
import kanjisService from "../../src/services/kanjisService";

async function insertKanjiUser(user: Users){
  const data = {
    kanji: '蛍',
    grade: '8'
  };
  await kanjisService.insertKanji(data, user.id);
  return { kanji: data.kanji, grade: data.grade }
};

const kanjisFactory = {
  insertKanjiUser
};

export default kanjisFactory;