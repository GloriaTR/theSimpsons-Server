import { type NextFunction, type Request, type Response } from "express";
import { getSimpsons } from "../simpsonsControllers.js";
import { simpsonsMock } from "../../../../mocks/simpsonsMocks.js";
import Simpson from "../../../../database/models/Simpson.js";
import CustomError from "../../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {
  query: { limit: "10", skip: "0" },
};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();

describe("Given a getSimpsons controller", () => {
  describe("When it receives a response", () => {
    Simpson.find = jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(simpsonsMock),
    });

    Simpson.where = jest.fn().mockReturnValue({
      countDocuments: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(simpsonsMock.length),
      }),
    });

    test("Then it should call its method with status code 200", async () => {
      const expectedStatusCode = 200;

      await getSimpsons(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with 'Marge Simpson' and 'Herb Powell'", async () => {
      await getSimpsons(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({
        simpsons: simpsonsMock,
        totalSimpsons: simpsonsMock.length,
      });
    });
  });

  describe("When it receives a next function and there is an error", () => {
    test("Then it should call the received next function with a 404 status code and the message 'Can't retrieve simpsons'", async () => {
      const expectedError = new CustomError(
        "Can't retrieve simpsons",
        404,
        "Can't retrieve simpsons",
      );

      Simpson.find = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await getSimpsons(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
