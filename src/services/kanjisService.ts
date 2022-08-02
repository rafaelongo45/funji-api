import axios from "axios";

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
}

const kanjisService = {
  getAllKanjis,
  getKanjiByName,
  getKanjisByCollection
};

export default kanjisService;