import bcrypt from "bcrypt";

export async function comparePassword(password: string, encryptedPassword: string){
  const isValid = bcrypt.compareSync(password, encryptedPassword);
  
  if(!isValid){
    throw { type: "authError", message: "Wrong password", code: 401 }
  }
}