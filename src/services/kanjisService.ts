import axios from "axios";

import { CreateKanji } from "../controllers/kanjisController.js";
import kanjisRepository from "../repositories/kanjisRepository.js";
import usersKanjisRepository from "../repositories/usersKanjisRepository.js";

const BASE_URL = 'https://kanjiapi.dev/v1/kanji/';

async function getAllKanjis(){
  const promise = axios.get(BASE_URL + 'all');
  const kanjis = await promise.then(response => {
    const allKanjis = response.data
    return allKanjis
  })
  await promise.catch(err => console.log(err));
  return kanjis;
};

async function getKanjiByName(name: string){
  const promise = axios.get(`${BASE_URL + name}`);
  const kanjiInfo = await promise.then(response => {
    const kanjiInfo = response.data
    return kanjiInfo
  }).catch(err => console.log(err));
  return kanjiInfo;
};

async function getKanjisByCollection(collection: string){
  const promise = axios.get(`${BASE_URL + collection}`);
  const kanjiCollection = await promise.then(response => {
    const kanjiCollection = response.data
    return kanjiCollection
  }).catch(err => console.log(err));
  return kanjiCollection;
};

async function insertKanji(data:CreateKanji, userId: number){
  const kanji = await kanjisRepository.findByName(data.kanji);
  if(!kanji){
    const newKanji = await kanjisRepository.insert(data.kanji, parseInt(data.grade));
    await usersKanjisRepository.insert(userId, newKanji.id);
  }else{
    await checkUserKanji(userId, kanji.id);
    await usersKanjisRepository.insert(userId, kanji.id);
  }
}

async function checkUserKanji(userId: number, kanjiId: number){
  const kanjiInfo = await usersKanjisRepository.findByUserIdAndKanjiId(userId, kanjiId);
  if(kanjiInfo){
    throw { type: "conflictError", message: "User already has this kanji registered", code: 409 };
  }
}

const kanjisService = {
  getAllKanjis,
  getKanjiByName,
  getKanjisByCollection,
  insertKanji
};

export default kanjisService;