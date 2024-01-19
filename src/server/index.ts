import "dotenv/config";

import cors from "cors";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/ping/pingController.js";
import { endPointNotFound, generalErrorHandler } from "./middlewares/errors.js";
import paths from "../paths/paths.js";
import simpsonsRouter from "../routers/simpsonsRouters.js";

const corsOptions = {
  origin: [process.env.ORIGIN_LOCAL!, process.env.ORIGIN_PROD!],
};

const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(cors(corsOptions));

app.get(paths.root, pingController);

app.use(paths.simpsons, simpsonsRouter);

app.use(endPointNotFound);

app.use(generalErrorHandler);

export default app;
