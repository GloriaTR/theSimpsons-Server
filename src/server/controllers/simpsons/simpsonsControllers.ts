import { type NextFunction, type Request, type Response } from "express";
import Simpson from "../../../database/models/Simpson.js";
import CustomError from "../../../CustomError/CustomError.js";

export const getSimpsons = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { limit, skip } = req.query;
    const limitSimpsonsPerPage = Number(limit);
    const skipSimpsons = Number(skip);

    const simpsons = await Simpson.find()
      .skip(skipSimpsons)
      .limit(limitSimpsonsPerPage)
      .exec();

    const totalSimpsons = await Simpson.where().countDocuments().exec();

    res.status(200).json({ simpsons, totalSimpsons });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "Can't retrieve simpsons",
    );

    next(customError);
  }
};
