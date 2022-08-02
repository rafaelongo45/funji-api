import { Router } from "express";

import kanjisController from "../controllers/kanjisController.js";
import { validateCollection } from "../middlewares/collectionValidator.js";

const kanjisRouter = Router();

kanjisRouter.get("/kanji/:name", kanjisController.getInfoByName);
kanjisRouter.get("/kanjis/all", kanjisController.getAllKanjis);
kanjisRouter.get("/kanjis/:collection", validateCollection, kanjisController.getKanjisCollection) 

export default kanjisRouter;