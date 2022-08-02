import bcrypt from "bcrypt"

export async function encryptPassword(password: string){
  const SALT = 10;
  const encryptedPassword = bcrypt.hashSync(password, SALT);
  return encryptedPassword;
}