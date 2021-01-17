import leftPad from "./leftPad";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export enum Months {
  "January" = 0,
  "February" = 1,
  "March" = 2,
  "April" = 3,
  "May" = 4,
  "June" = 5,
  "July" = 6,
  "August" = 7,
  "September" = 8,
  "October" = 9,
  "November" = 10,
  "December" = 11,
}

export enum Days {
  "Sun" = 0,
  "Mon" = 1,
  "Tue" = 2,
  "Wed" = 3,
  "Thu" = 4,
  "Fri" = 5,
  "Sat" = 6,
}

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
};

export const prettyDateAndTime = (date: Date) => {
  let year = date.getFullYear();
  let month = Months[date.getMonth()];
  let day = Days[date.getDay()];
  let dayNumber = date.getDate();
  let hour = date.getHours();
  let minute = leftPad(date.getMinutes(), 2);

  return `${hour}:${minute}, ${day} ${dayNumber} ${month} ${year}`;
};

export const dayDiff = (d1: Date, d2: Date) => {
  let [earlier, later] = d1 < d2 ? [d1, d2] : [d2, d1];
  let earlierUtc = Date.UTC(
    earlier.getFullYear(),
    earlier.getMonth(),
    earlier.getDate()
  );
  let laterUtc = Date.UTC(
    later.getFullYear(),
    later.getMonth(),
    later.getDate()
  );

  return Math.floor((laterUtc - earlierUtc) / MS_PER_DAY);
};
