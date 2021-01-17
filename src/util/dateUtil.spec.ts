import { addDays, dayDiff } from "./dateUtil";

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

  it("should calculate day differences properly within one day", () => {
    const d1 = new Date("2021-01-01T00:00:01");
    const d2 = new Date("2021-01-01T23:59:59");
    expect(dayDiff(d1, d2)).toEqual(0);
  });

  it("should calculate day differences properly between two days", () => {
    const d1 = new Date("2021-01-02T00:00:01");
    const d2 = new Date("2021-01-01T23:59:59");
    expect(dayDiff(d1, d2)).toEqual(1);
  });

  it("should calculate day differences properly between two years", () => {
    const d1 = new Date("2021-01-02T00:00:01");
    const d2 = new Date("2020-12-31T23:59:59");
    expect(dayDiff(d1, d2)).toEqual(2);
  });
});
