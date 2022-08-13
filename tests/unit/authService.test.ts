import bcrypt from "bcrypt";
import { jest } from "@jest/globals";

import authRepository from "../../src/repositories/authRepository.js";
import authService from "../../src/services/authService.js";
import { comparePassword } from "../../src/utils/passwordComparer.js";
import { encryptPassword } from "../../src/utils/passwordEncrypter.js";
import { generateToken } from "../../src/utils/tokenGenerator.js";
import { errorHandler } from "../../src/middlewares/handleError.js";

describe("Authorization unit test suite", () => {
  it("Creates a user succesfully", async () => {
    const data = {
      id: 1,
      username: "cool-username",
      email: "cool-email@cool.com",
      password: "coolPassword",
      profileImage: "https://google.com/cool",
      createdAt: new Date("15-08-1990"),
    };
    jest
      .spyOn(authService, "checkIfExists")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn({ encryptPassword }, "encryptPassword")
      .mockImplementationOnce((): any => {});
    jest.spyOn(authRepository, "insert").mockImplementationOnce((): any => {});
    await authService.insertUser(data);
    expect(authRepository.insert).toBeCalled();
  });

  it("Creates a user that is already registered with the e-mail", async () => {
    const data = {
      id: 0,
      username: "cool-username",
      email: "cool-email@cool.com",
      password: "coolPassword",
      profileImage: "https://google.com/cool",
      createdAt: new Date("15-08-1990"),
    };

    jest
      .spyOn(authRepository, "findByEmail")
      .mockImplementationOnce((): any => {
        return data;
      });
    jest
      .spyOn(authService, "checkIfExists")
      .mockImplementationOnce((): any => {});
    const promise = authService.insertUser(data);
    expect(promise).rejects.toEqual({
      type: "authError",
      message: "E-mail already registered",
      code: 409,
    });
  });

  it("Creates a user that is already registered with the username", async () => {
    const data = {
      id: 0,
      username: "cool-username",
      email: "cool-email@cool.com",
      password: "coolPassword",
      profileImage: "https://google.com/cool",
      createdAt: new Date("15-08-1990"),
    };

    jest
      .spyOn(authRepository, "findByEmail")
      .mockImplementationOnce((): any => {
        return false;
      });

    jest
      .spyOn(authRepository, "findByUsername")
      .mockImplementationOnce((): any => {
        return data;
      });
    jest
      .spyOn(authService, "checkIfExists")
      .mockImplementationOnce((): any => {});
    const promise = authService.insertUser(data);
    expect(promise).rejects.toEqual({
      type: "authError",
      message: "Username already registered",
      code: 409,
    });
  });

  it("Signs in a user successfully", async () => {
    const data = {
      id: 0,
      username: "cool-username",
      email: "cool-email@cool.com",
      password: "coolPassword",
      profileImage: "https://google.com/cool",
      createdAt: new Date("15-08-1990"),
    };

    const existingUser = jest
      .spyOn(authRepository, "findByEmail")
      .mockImplementationOnce((): any => {
        return {
          id: 0,
          username: "cool-username",
          email: "cool-email@cool.com",
          password: "coolPassword",
          profileImage: "https://google.com/cool",
          createdAt: new Date("15-08-1990"),
        };
      });

    const user = jest
      .spyOn(authService, "checkIfExists")
      .mockImplementationOnce((): any => {
        return existingUser;
      });

    jest.spyOn(bcrypt, "compareSync").mockImplementationOnce((): any => true);
    jest
      .spyOn({ comparePassword }, "comparePassword")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn({ generateToken }, "generateToken")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn(authRepository, "createSession")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn(authService, "createSession")
      .mockImplementationOnce((): any => {});

    const signedIn = await authService.signin(data);
    const userData = {
      username: data.username,
      profileImage: data.profileImage,
    };

    expect(signedIn.username).toEqual(userData.username);
  });

  it("Signs in a user with an e-mail that doesn't exist", async () => {
    const data = {
      id: 0,
      username: "cool-username",
      email: "cool-email@cool.com",
      password: "coolPassword",
      profileImage: "https://google.com/cool",
      createdAt: new Date("15-08-1990"),
    };
    jest.spyOn(authRepository, 'findByEmail').mockImplementationOnce((): any => false)
    const promise = authService.signin(data);
    expect(promise).rejects.toEqual({ type: "notFound", message: "E-mail not registered", code: 404 })
  });
});
