import { fetchMock } from "../util/test/mocks";
import AuthorizedWebClientService, { HttpMethod } from "./authorizedWebClientService"


describe("AuthorizedWebClientService", () => {
  it("should build", () => {
    let fetchService = fetchMock(200);
    let sut = new AuthorizedWebClientService("", fetchService);
    expect(sut).toBeDefined();
  });

  it("should require username", async () => {
    let sut = new AuthorizedWebClientService("", fetchMock(200, "data"));
    sut.setAuth("", "password", "");
    expect(sut).toBeDefined();
    await expect(sut.fetch(HttpMethod.GET)).rejects.toThrow("Username");
  });

  it("should require password", async () => {
    expect.assertions(2);
    let sut = new AuthorizedWebClientService("", fetchMock(200, "data"));
    sut.setAuth("username", "", "");
    expect(sut).toBeDefined();
    await expect(sut.fetch(HttpMethod.GET)).rejects.toThrow("password");
  });

  it("should fetch the response", async () => {
    expect.assertions(2);
    let sut = new AuthorizedWebClientService("", fetchMock(200, "data"));
    sut.setAuth("username", "password", "");
    expect(sut).toBeDefined();
    expect(await sut.fetch(HttpMethod.GET)).toEqual("data");
  });
})