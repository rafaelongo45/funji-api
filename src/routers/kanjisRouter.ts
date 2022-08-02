import { Router } from "express";

import kanjisController from "../controllers/kanjisController.js";
import { validateCollection } from "../middlewares/collectionValidator.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidator.js";
import kanjiSchema from "../schemas/kanjiSchema.js";

const kanjisRouter = Router();

kanjisRouter.get("/kanji/:name", kanjisController.getInfoByName);
kanjisRouter.get("/kanjis/all", kanjisController.getAllKanjis);
kanjisRouter.get("/kanjis/:collection", validateCollection, kanjisController.getKanjisCollection);
kanjisRouter.post("/kanji",validateSchema(kanjiSchema), validateToken, kanjisController.createKanji);

export default kanjisRouter;