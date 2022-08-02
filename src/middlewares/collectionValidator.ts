import { NextFunction, Request, Response } from "express";

export async function validateCollection(req: Request, res: Response, next: NextFunction){
  const { collection } = req.params;
  const collectionArray = ['joyo', 'jouyou', 'jinmeiyo', 'jinmeiyou', 'grade-1', 'grade-2', 'grade-3', 'grade-4', 'grade-5', 'grade-6', 'grade-8'];
  const isCollectionValid = collectionArray.includes(collection);
  if(!isCollectionValid){
    throw { type: "collectionError", message: "Collection doesn't exist", code: 403 }
  }

  next()
}