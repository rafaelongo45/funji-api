import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import "express-async-errors"
import router from "./routers/index.js";
import testsRouter from "./routers/testsRouter.js";
import { errorHandler } from "./middlewares/handleError.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.REACT_APP_URL }));
app.use(router);
app.use(errorHandler);

if(process.env.NODE_ENV === "test"){
  app.use(testsRouter);
}

export default app;