import { Router } from "express";

import usersController from "../controllers/usersController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidator.js";
import updateProfile from "../schemas/updateSchema.js";

const usersRouter = Router();

usersRouter.get("/user/:username", usersController.getUser);
usersRouter.get("/user/:username/kanjis", usersController.getUserWithKanjis);
usersRouter.post("/user/edit", validateSchema(updateProfile), validateToken, usersController.updateUserProfile)

export default usersRouter;