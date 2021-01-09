import { addDays } from "./dateUtil";

describe("dateUtil", () => {
  it("should add days past a month", () => {
    const date = new Date("2020-12-31T12:00:00Z");
    const newDate = addDays(date, 10);
    expect(newDate.getDate()).toEqual(10);
    expect(newDate.getMonth()).toEqual(0);
    expect(newDate.getFullYear()).toEqual(2021);
  });

  it("should remove days past a month", () => {
    const date = new Date("2021-01-01T12:00:00Z");
    const newDate = addDays(date, -10);
    expect(newDate.getDate()).toEqual(22);
    expect(newDate.getMonth()).toEqual(11);
    expect(newDate.getFullYear()).toEqual(2020);
  });
})