import { Users } from "@prisma/client";
import { Request, Response } from "express";

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

async function createUser(req: Request, res: Response){
  const body: CreateUser = req.body;
  delete body.confirmPassword
  await authService.insertUser(body)
  return res.sendStatus(201);
};

const authorizationControler = {
  createUser
};

export default authorizationControler;