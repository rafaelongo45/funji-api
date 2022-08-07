import usersRepository from "../repositories/usersRepository.js";
import { formatUserInfo } from "../utils/userKanjisFormatter.js";

async function getUserByUsername(username: string){
  const user = await usersRepository.findByUsername(username);
  checkIfUserExists(user)
  return user
}

async function getAllUserInfoByUsername(username: string){
  const user = await usersRepository.findByUsernameWithKanjis(username);
  checkIfUserExists(user)
  const userData = formatUserInfo(user)
  return userData;
};

async function updateProfile(userId: number, profileImage: string){
  const user = await usersRepository.findById(userId);
  checkIfUserExists(user);
  await usersRepository.update(userId, profileImage)
};

async function getUsers(username: string){
  const users = await usersRepository.findAllUsers(username);
  return users;
}

function checkIfUserExists(user){
  if(!user){
    throw { type: "notFoundError", message: "User was not found", code: 404 };
  }
};

const usersService = {
  getUserByUsername,
  getAllUserInfoByUsername,
  updateProfile,
  getUsers
};

export default usersService;