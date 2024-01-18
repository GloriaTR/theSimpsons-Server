import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../database/connectToDatabase.js";
import app from "../server/index.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given an endPoint GET '/'", () => {
  describe("When it receives a request", () => {
    test("Then it should call its method with status code 200 and message '🏓 pong'", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "🏓 pong";
      const path = "/";

      const response = await request(app).get(path).expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
