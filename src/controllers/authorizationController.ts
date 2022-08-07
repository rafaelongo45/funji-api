import { Users } from "@prisma/client";
import { Request, response, Response } from "express";

import authService from "../services/authService.js";

interface CreateUser {
  id: number
  username: string
  email: string
  password: string
  confirmPassword: string
  profileImage: string
  createdAt: Date
}

export interface UserSignin {
  email: string
  password: string
}

async function createUser(req: Request, res: Response){
  const body: CreateUser = req.body;
  delete body.confirmPassword
  await authService.insertUser(body)
  return res.sendStatus(201);
};

async function userSignin(req:Request, res: Response){
  const body: UserSignin = req.body;
  const userData = await authService.signin(body);
  return res.status(200).send(userData);
}

const authorizationControler = {
  createUser,
  userSignin
};

export default authorizationControler;