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

function checkIfUserExists(user){
  if(!user){
    throw { type: "notFoundError", message: "User with this username was not found", code: 404 };
  }
}

const usersService = {
  getUserByUsername,
  getAllUserInfoByUsername
};

export default usersService;