import { Request, Response } from "express";

import usersService from "../services/usersService.js";

async function getUser(req: Request, res: Response){
  const { username } = req.params;
  const user = await usersService.getUserByUsername(username);
  return res.status(200).send(user);
}

async function getUserWithKanjis(req: Request, res: Response){
  const { username } = req.params;
  const userInfo = await usersService.getAllUserInfoByUsername(username);
  return res.status(200).send(userInfo);
};

const usersController = {
  getUser,
  getUserWithKanjis
};

export default usersController;