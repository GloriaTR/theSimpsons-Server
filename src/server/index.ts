import "dotenv/config";

import cors from "cors";
import express from "express";
import morgan from "morgan";

const corsOptions = {
  origin: [process.env.ORIGIN_LOCAL!, process.env.ORIGIN_PROD!],
  methods: "GET",
  preflightContinue: false,
  optionSuccessStatus: 204,
};

const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(cors(corsOptions));

export default app;
