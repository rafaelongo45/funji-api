import { Router } from "express";

import authRouter from "./authorizationRouter.js";
import kanjisRouter from "./kanjisRouter.js";
import usersRouter from "./usersRouter.js";

const router = Router();

router.use(authRouter);
router.use(kanjisRouter);
router.use(usersRouter);

export default router;