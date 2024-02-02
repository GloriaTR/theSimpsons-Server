import { type NextFunction, type Request, type Response } from "express";
import { getSimpsonById } from "../simpsonsControllers.js";
import {
  simpsonIdMock,
  simpsonMockById,
} from "../../../../mocks/simpsonsMocks.js";
import Simpson from "../../../../database/models/Simpson.js";
import CustomError from "../../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Pick<Request, "params"> = {
  params: {
    id: simpsonIdMock,
  },
};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn();

describe("Given a getSimpsonById controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its method with status code 200", async () => {
      const expectedStatusCode = 200;

      Simpson.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(simpsonMockById),
      });

      await getSimpsonById(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with 'Marge Simpson'", async () => {
      await getSimpsonById(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ simpson: simpsonMockById });
    });
  });

  describe("When it receives a next function and there is an error", () => {
    test("Then it should call the received next function with a 404 status code and the message 'Can't retrieve the simpson character'", async () => {
      const expectedError = new CustomError(
        "Can't retrieve the simpson character",
        500,
        "Can't retrieve the simpson character",
      );

      Simpson.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await getSimpsonById(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
