import { type Request, type Response, type NextFunction } from "express";
import debug from "debug";
import chalk from "chalk";
import type CustomError from "../../CustomError/CustomError.js";

const generalErrorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  debug(chalk.red(error.message));

  const errorMessage = error.publicMessage ?? "Internal Server Error";
  const errorStatusCode = error.statusCode ?? 500;

  res.status(errorStatusCode).json({ error: errorMessage });
};

export default generalErrorHandler;
