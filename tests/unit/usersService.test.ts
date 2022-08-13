import { jest } from "@jest/globals";
import usersRepository from "../../src/repositories/usersRepository";
import usersService from "../../src/services/usersService";
import { formatUserInfo } from "../../src/utils/userKanjisFormatter";

describe("Users Service test suite", () => {
  it("Find user by username successfully", async () => {
    const userData = {
      id: 1,
      username: "funji",
      profileImage:
        "https://www.tripsavvy.com/thmb/xmHHjutbUKGMvgxh5Dr1F_BVXB8=/3435x2576/smart/filters:no_upscale()/fuji-mountain-in-autumn-822273028-5a6a8a9c3418c600363958d3.jpg",
    };

    const user = jest
      .spyOn(usersRepository, "findByUsername")
      .mockImplementationOnce((): any => userData);
    const promise = await usersService.getUserByUsername(userData.username);
    expect(promise).not.toBeNull();
  });

  it("Fails to find user by username", async () => {
    const userData = {
      id: 1,
      username: "funji",
      profileImage:
        "https://www.tripsavvy.com/thmb/xmHHjutbUKGMvgxh5Dr1F_BVXB8=/3435x2576/smart/filters:no_upscale()/fuji-mountain-in-autumn-822273028-5a6a8a9c3418c600363958d3.jpg",
    };

    const user = jest
      .spyOn(usersRepository, "findByUsername")
      .mockImplementationOnce((): any => false);
    const promise = usersService.getUserByUsername(userData.username);
    expect(promise).rejects.toEqual({
      type: "notFoundError",
      message: "User was not found",
      code: 404,
    });
  });

  // it("Gets all user's info successfully", async () => {
  //   const userInfo = {
  //     id: 1,
  //     username: "funji",
  //     profileImage:
  //       "https://www.tripsavvy.com/thmb/xmHHjutbUKGMvgxh5Dr1F_BVXB8=/3435x2576/smart/filters:no_upscale()/fuji-mountain-in-autumn-822273028-5a6a8a9c3418c600363958d3.jpg",
  //     kanjis: [
  //       {
  //         kanji: "a",
  //       },
  //       {
  //         kanji: "蛍",
  //       },
  //     ],
  //   };

  //   const user = jest
  //     .spyOn(usersRepository, "findByUsernameWithKanjis")
  //     .mockImplementationOnce((): any => userInfo);
  //   const userData = jest.spyOn({formatUserInfo}, "formatUserInfo").mockImplementationOnce((): any => user);
  //   const promise = await usersService.getAllUserInfoByUsername(userInfo.username);
  //   expect(promise).toEqual(userData);
  // });

  it("Updates user profile image successfully", async () => {
    const userData = {
      id: 1,
      username: "funji",
      profileImage:
        "https://www.tripsavvy.com/thmb/xmHHjutbUKGMvgxh5Dr1F_BVXB8=/3435x2576/smart/filters:no_upscale()/fuji-mountain-in-autumn-822273028-5a6a8a9c3418c600363958d3.jpg",
    };

    const user = jest
      .spyOn(usersRepository, "findById")
      .mockImplementationOnce((): any => userData);
    jest.spyOn(usersRepository, "update").mockImplementationOnce((): any => {});
    await usersService.updateProfile(userData.id, userData.profileImage);
    expect(usersRepository.update).toHaveBeenCalled();
  });

  it("Gets all users successfully", async () => {
    const userData = [{
      id: 1,
      username: "funji",
      profileImage:
        "https://www.tripsavvy.com/thmb/xmHHjutbUKGMvgxh5Dr1F_BVXB8=/3435x2576/smart/filters:no_upscale()/fuji-mountain-in-autumn-822273028-5a6a8a9c3418c600363958d3.jpg",
    }];
    const users = jest.spyOn(usersRepository, 'findAllUsers').mockImplementationOnce((): any => userData);
    const promise = await usersService.getUsers(userData[0].username);
    expect(promise).toEqual(userData)
  })
});
