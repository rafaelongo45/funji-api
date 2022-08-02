import { Router } from "express";

import authRouter from "./authorizationRouter.js";

const router = Router();

router.use(authRouter);

export default router;