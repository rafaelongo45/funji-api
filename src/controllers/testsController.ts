import { Request, Response } from "express";

import testsRepository from "../repositories/testsRepository.js";

export async function deleteDb(req: Request, res: Response){
  await testsRepository.deleteDatabase();
  return res.status(200).send("Deleted database");
}