import { Users } from "@prisma/client";
import authRepository from "../repositories/authRepository.js";
import { encryptPassword } from "../utils/passwordEncrypter.js";

async function insertUser(data: Users){
  await checkIfRegistered(data.email);
  const encryptedPassword = await encryptPassword(data.password)
  await authRepository.insert({ ...data, password: encryptedPassword });
};

async function checkIfRegistered(email: string){
  const user = await authRepository.findByEmail(email)

  if(user){
    throw { type: "authError", message: "E-mail already registered", code: 409}
  }
};

const authService = {
  insertUser,
};

export default authService;