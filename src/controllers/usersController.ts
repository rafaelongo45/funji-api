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

async function updateUserProfile(req: Request, res: Response){
  const { userId } = res.locals;
  const { profileImage } : { profileImage: string} = req.body;
  await usersService.updateProfile(userId, profileImage)
  return res.sendStatus(200);
};

async function getAllUsers(req: Request, res: Response){
  const { username } = req.params;
  const users = await usersService.getUsers(username);
  return res.status(200).send(users);
}

const usersController = {
  getUser,
  getUserWithKanjis,
  updateUserProfile,
  getAllUsers
};

export default usersController;