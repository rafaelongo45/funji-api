import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { UserSignin } from "../controllers/authorizationController";

dotenv.config();

export async function generateToken(user: UserSignin){
  const JWT_KEY = process.env.JWT_KEY;
  const token = jwt.sign(user.email, JWT_KEY);
  return token;
}