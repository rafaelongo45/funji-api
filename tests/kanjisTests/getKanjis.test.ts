import supertest from "supertest";

import app from "../../src/";
import prisma from "../../src/config/database.js";
import kanjisCollection from "../utils/kanjisCollection.js";

describe("get kanjis suite", () => {
  it("should return an array with all kanjis registered", async () => {
    const promise = await supertest(app).get("/kanjis/all");
    const kanjisArray = promise.body;
    expect(kanjisArray).not.toBeNull();
  });

  it("should return informations about the kanji", async () => {
    const kanjiSearch = '火'
    const promise = await supertest(app).get(`/kanji/${encodeURI(kanjiSearch)}`);
    const kanjiInfo = promise.body;
    expect(kanjiInfo.kanji).toBe(kanjiSearch);
  });

  it("should return all kanjis from a collection", async () => {
    const collection = kanjisCollection.getRandomCollection()
    const promise = await supertest(app).get(`/kanji/${collection}`);
    const allKanjis = promise.body;
    expect(allKanjis).not.toBeNull();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
})