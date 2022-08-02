import { Router } from "express";

import authRouter from "./authorizationRouter.js";
import kanjisRouter from "./kanjisRouter.js";

const router = Router();

router.use(authRouter);
router.use(kanjisRouter);

export default router;