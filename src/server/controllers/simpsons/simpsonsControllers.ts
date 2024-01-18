import { type NextFunction, type Request, type Response } from "express";
import Simpson from "../../../database/models/Simpson.js";
import CustomError from "../../../CustomError/CustomError.js";

export const getSimpsons = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const simpsons = await Simpson.find().limit(10).exec();

    res.status(200).json({ simpsons });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "Can't retrieve simpsons",
    );

    next(customError);
  }
};
