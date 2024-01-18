import { type Request, type Response, type NextFunction } from "express";
import { endPointNotFound } from "../errors.js";
import CustomError from "../../../CustomError/CustomError.js";

describe("Given an endPointNotFound middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the next function with status code 404 and message 'Endpoint Not Found'", () => {
      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();

      const expectedNotFoundError = new CustomError(
        "Endpoint Not Found",
        404,
        "Endpoint Not Found",
      );

      endPointNotFound(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedNotFoundError);
    });
  });
});
