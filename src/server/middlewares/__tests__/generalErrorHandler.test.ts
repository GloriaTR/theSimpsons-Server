import { type Request, type Response, type NextFunction } from "express";
import { generalErrorHandler } from "../errors";
import CustomError from "../../../CustomError/CustomError.js";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalErrorHandler middleware", () => {
  const errorMessage = new CustomError(
    "Simpsons characters not found",
    404,
    "Simpsons characters not found",
  );

  describe("When it receives a response and an error with status code 404 and message 'Simpsons characters not found'", () => {
    test("Then it should call its status method with code 404", () => {
      const expectedStatusCode = 404;

      generalErrorHandler(errorMessage, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method with error message 'Simpsons characters not found'", () => {
      const expectedMessage = { error: "Simpsons characters not found" };

      generalErrorHandler(errorMessage, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  const error = new Error();

  describe("When it receives a response and an error with no status code and no message", () => {
    test("Then it should call the received response status method with code 500", () => {
      const expectedStatusCode = 500;

      generalErrorHandler(
        error as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the received response status method with the error message 'Internal Server Error'", () => {
      const expectedMessage = { error: "Internal Server Error" };

      generalErrorHandler(
        error as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
