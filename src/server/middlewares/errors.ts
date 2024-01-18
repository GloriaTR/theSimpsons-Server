import { type Request, type Response, type NextFunction } from "express";
import debug from "debug";
import chalk from "chalk";
import CustomError from "../../CustomError/CustomError.js";

export const endPointNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const notFoundError = new CustomError(
    "Endpoint Not Found",
    404,
    "Endpoint Not Found",
  );

  next(notFoundError);
};

export const generalErrorHandler = (
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
