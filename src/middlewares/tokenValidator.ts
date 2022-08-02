import { NextFunction, Request, Response } from "express";
import authRepository from "../repositories/authRepository.js";

export async function validateToken(req: Request, res: Response, next: NextFunction){
  const { authorization } = req.headers;
  const token = authorization?.replace(`Bearer `, '').trim();
  
  if(!token){
    throw { type: "authError", message: "Token not sent", code: 403 }
  }  

  const userId = await validateSession(token);
  res.locals.userId = userId;
  next();
}

async function validateSession(token: string){
  const session = await authRepository.findByToken(token);

  if(!session){
    throw { type: "sessionError", message: "Session doesn't exist", code: 404 }
  }

  if(!session.isValid){
    throw { type: "sessionError", message: "Session is not valid anymore", code: 403 }
  }

  return session.userId;
}