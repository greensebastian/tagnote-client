import leftPad from "./leftPad";

export const datesEqual = (d1: Date, d2: Date) => d1.getTime() !== d2.getTime();

export const toBasicDateString = (date: Date) => {
  return (
    date.getFullYear() +
    leftPad(date.getMonth() + 1, 2) +
    leftPad(date.getDate(), 2) +
    "T" +
    leftPad(date.getHours(), 2) +
    leftPad(date.getMinutes(), 2) +
    leftPad(date.getSeconds(), 2)
  );
};

export const fromBasicDateString = (dateString: string) => {
  const year = Number(dateString.substring(0, 4));
  const month = Number(dateString.substring(4, 6)) - 1;
  const date = Number(dateString.substring(6, 8));
  const hour = Number(dateString.substring(9, 11));
  const minute = Number(dateString.substring(11, 13));
  const second = Number(dateString.substring(13, 15));

  return new Date(year, month, date, hour, minute, second);
};

export const addDays = (date: Date, days: number) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}