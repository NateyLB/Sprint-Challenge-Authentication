const supertest = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

afterEach(async () => {
    await db("users").truncate();
  });

  describe("server", () => {
    it("can run the tests", () => {
      expect(true).toBeTruthy();
    });






});
