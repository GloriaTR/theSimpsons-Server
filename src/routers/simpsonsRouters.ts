import express from "express";
import paths from "../paths/paths.js";
import {
  getSimpsonById,
  getSimpsons,
} from "../server/controllers/simpsons/simpsonsControllers.js";

const simpsonsRouter = express.Router();

simpsonsRouter.get(paths.root, getSimpsons);
simpsonsRouter.get(`${paths.root}:id`, getSimpsonById);

export default simpsonsRouter;
