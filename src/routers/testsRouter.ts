import { Router } from "express";

import { deleteDb } from "../controllers/testsController.js";

const testsRouter = Router();

testsRouter.delete("/delete/all", deleteDb);

export default testsRouter;