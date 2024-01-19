import express from "express";
import paths from "../paths/paths.js";
import { getSimpsons } from "../server/controllers/simpsons/simpsonsControllers.js";

const simpsonsRouter = express.Router();

simpsonsRouter.get(paths.root, getSimpsons);

export default simpsonsRouter;
