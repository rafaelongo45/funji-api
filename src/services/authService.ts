import { Users } from "@prisma/client";

import authRepository from "../repositories/authRepository.js";

import { UserSignin } from "../controllers/authorizationController.js";
import { comparePassword } from "../utils/passwordComparer.js";
import { encryptPassword } from "../utils/passwordEncrypter.js";
import { generateToken } from "../utils/tokenGenerator.js";

async function insertUser(data: Users){
  await checkIfRegistered(data.email, data.username);
  const encryptedPassword = await encryptPassword(data.password)
  await authRepository.insert({ ...data, password: encryptedPassword });
};

async function signin(data: UserSignin){
  const user = await checkIfExists(data.email);
  await comparePassword(data.password, user.password);
  const token = await generateToken(user);
  await createSession(user, token);
  const userData = {
    username: user.username,
    profileImage: user.profileImage,
    token
  }
  return userData;
}

async function checkIfRegistered(email: string, username: string){
  const userByEmail = await authRepository.findByEmail(email)
  if(userByEmail){
    throw { type: "authError", message: "E-mail already registered", code: 409 }
  }

  const userByUsername = await authRepository.findByUsername(username);
  if(userByUsername){
    throw { type: "authError", message: "Username already registered", code: 409 }
  }
};

async function checkIfExists(email: string){
  const user = await authRepository.findByEmail(email);
  if(!user){
    throw { type: "notFound", message: "E-mail not registered", code: 404 }
  }
  return user;
}

async function createSession(user: Users, token: string){
  await authRepository.createSession(user.id, token);
}

const authService = {
  insertUser,
  signin
};

export default authService;