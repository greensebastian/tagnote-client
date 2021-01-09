import FetchService from "./fetchService";

describe("FetchService", () => {
  it("should build", () => {
    let sut = new FetchService();
    expect(sut).toBeDefined();
  })
})