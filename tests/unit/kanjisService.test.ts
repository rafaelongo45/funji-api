import { jest } from "@jest/globals";
import authRepository from "../../src/repositories/authRepository";

import kanjisRepository from "../../src/repositories/kanjisRepository"
import usersKanjisRepository from "../../src/repositories/usersKanjisRepository";
import kanjisService from "../../src/services/kanjisService"

describe("Kanjis service unit test suite", () => {
  it("Inserts kanji that doesn't already exist succesfully", async () => {
    const kanjiData = {
      id: 0,              
      kanji: 'realKanji',                   
      grade: '1',
      createdAt: new Date('9/9/1999')
    }
    jest.spyOn(kanjisRepository, 'findByName').mockImplementationOnce((): any => {
      return false
    });
    const newKanji = jest.spyOn(kanjisRepository, 'insert').mockImplementationOnce((): any => {
      return kanjiData;
    });
    jest.spyOn(usersKanjisRepository, 'insert').mockImplementationOnce(():any => {});
    await kanjisService.insertKanji(kanjiData, 1);
    expect(usersKanjisRepository.insert).toBeCalled()
  });

  it("Inserts kanji that already exists succesfully", async () => {
    const kanjiData = {
      id: 0,              
      kanji: 'realKanji',                   
      grade: '1',
      createdAt: new Date('9/9/1999')
    }
    jest.spyOn(kanjisRepository, 'findByName').mockImplementationOnce((): any => {
      return kanjiData
    });
    jest.spyOn(kanjisService, 'checkUserKanji').mockImplementationOnce((): any =>{})
    jest.spyOn(usersKanjisRepository, 'insert').mockImplementationOnce(():any => {});
    await kanjisService.insertKanji(kanjiData, 1);
    expect(usersKanjisRepository.insert).toBeCalled()
  });

  it("Inserts kanji that already exists and user already has", async () => {
    const kanjiData = {
      id: 0,              
      kanji: 'realKanji',                   
      grade: '1',
      createdAt: new Date('9/9/1999')
    }
    jest.spyOn(kanjisRepository, 'findByName').mockImplementationOnce((): any => {
      return kanjiData
    });
    const kanjiInfo = jest.spyOn(usersKanjisRepository, 'findByUserIdAndKanjiId').mockImplementationOnce(():any => true)
    const promise = kanjisService.insertKanji(kanjiData, 1);
    expect(promise).rejects.toEqual({ type: "conflictError", message: "User already has this kanji registered", code: 409 })
  });

  it("Gets all of user's kanjis", async () => {
    const userData = {
      "id": 1,
      "username": "funji",
      "profileImage": "https://www.tripsavvy.com/thmb/xmHHjutbUKGMvgxh5Dr1F_BVXB8=/3435x2576/smart/filters:no_upscale()/fuji-mountain-in-autumn-822273028-5a6a8a9c3418c600363958d3.jpg",
      "usersKanjis": [
        {
          "kanji": {
            "kanji": "蛍"
          }
        }
      ]
    }
    const kanjis = jest.spyOn(usersKanjisRepository, 'findUserWithKanjis').mockImplementationOnce(():any => userData)
    const promise = await kanjisService.getUserAllKanjis(1);
    expect(promise).toEqual(userData)
  });
})