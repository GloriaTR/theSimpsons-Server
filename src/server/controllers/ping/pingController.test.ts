import { type Request, type Response } from "express";
import pingController from "./pingController.js";

describe("Given a pingController controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its method with status code 200 and message '🏓 pong'", () => {
      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedStatusCode = 200;
      const expectedMessage = "🏓 pong";

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenLastCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenLastCalledWith({ message: expectedMessage });
    });
  });
});
