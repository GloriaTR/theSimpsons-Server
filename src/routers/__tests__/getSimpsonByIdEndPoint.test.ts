import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../database/connectToDatabase.js";
import Simpson from "../../database/models/Simpson.js";
import { simpsonIdMock, simpsonMockById } from "../../mocks/simpsonsMocks.js";
import app from "../../server/index.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given an endPoint GET '/simpsons/:id'", () => {
  describe("When it receives a request with a Simpson character", () => {
    test("Then it should call its method with status code 200 and the character 'Marge Simpson''", async () => {
      const expectedStatusCode = 200;
      const idSimpsonPath = `/simpsons/${simpsonIdMock}`;

      await Simpson.create(simpsonMockById);

      const response = await request(app)
        .get(idSimpsonPath)
        .expect(expectedStatusCode);

      expect(response.body.simpson).toHaveProperty(
        "name",
        simpsonMockById.name,
      );
    });
  });
});

describe("Given an endPoint GET '/simpson'", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status code 404 and message 'Endpoint Not Found'", async () => {
      const expectedStatusCode = 404;
      const expectedMessage = "Endpoint Not Found";
      const simpsonsPath = "/simpson";

      const response = await request(app)
        .get(simpsonsPath)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });
});
