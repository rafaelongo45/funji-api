import { Router } from "express";

import signupSchema from "../schemas/signupSchema.js";
import signinSchema from "../schemas/signinSchema.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import authorizationControler from "../controllers/authorizationController.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signupSchema), authorizationControler.createUser);
authRouter.post("/signin", validateSchema(signinSchema), authorizationControler.userSignin);

export default authRouter;