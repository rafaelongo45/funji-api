import { Request, Response } from "express";
import kanjisService from "../services/kanjisService.js";

async function getAllKanjis(req: Request, res: Response){
  const kanjis = await kanjisService.getAllKanjis();
  return res.status(200).send(kanjis)
};

async function getInfoByName(req: Request, res: Response){
  const { name } = req.params;
  const kanjiInfo = await kanjisService.getKanjiByName(encodeURI(name));
  return res.status(200).send(kanjiInfo);
};

async function getKanjisCollection(req: Request, res: Response){
  const { collection } = req.params;
  const kanjisCollection = await kanjisService.getKanjisByCollection(collection);
  return res.status(200).send(kanjisCollection);
}

const kanjisController = {
  getAllKanjis,
  getInfoByName,
  getKanjisCollection
};

export default kanjisController;