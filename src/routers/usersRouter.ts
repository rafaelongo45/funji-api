import { Router } from "express";
import usersController from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/user/:username", usersController.getUser)
usersRouter.get("/user/:username/kanjis", usersController.getUserWithKanjis)

export default usersRouter;