/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  return Date.parse(date);
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  const hour =
    date.getHours() >= 10 ? `${date.getHours()}` : `0${date.getHours()}`;
  const min =
    date.getMinutes() >= 10 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
  const sec =
    date.getSeconds() >= 10 ? `${date.getSeconds()}` : `0${date.getSeconds()}`;
  return `${hour}:${min}:${sec}`;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const days = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    0: 'Sunday',
  };
  return days[new Date(date).getUTCDay()];
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const dateInMilliseconds = date.getTime();
  const dateDay = date.getDay();
  if (dateDay === 5) {
    return new Date(dateInMilliseconds + 7 * millisecondsInDay);
  }
  if (dateDay < 5) {
    return new Date(dateInMilliseconds + (5 - dateDay) * millisecondsInDay);
  }
  return new Date(dateInMilliseconds + 6 * millisecondsInDay);
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  if (month === 12) {
    return 31;
  }
  const nextMonth = new Date(year, month);
  return new Date(nextMonth.setDate(nextMonth.getDate() - 1)).getDate();
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  return (
    1 +
    (new Date(dateEnd).valueOf() - new Date(dateStart).valueOf()) /
      millisecondsInDay
  );
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  return (
    new Date(date).valueOf() >= new Date(period.start).valueOf() &&
    new Date(date).valueOf() <= new Date(period.end).valueOf()
  );
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const d = new Date(date);
  const day = d.getUTCDate();
  const month = d.getUTCMonth() + 1;
  const year = d.getUTCFullYear();
  let hour = d.getUTCHours();
  let option = 'AM';
  if (hour >= 12) {
    if (hour > 12) {
      hour -= 12;
    }
    option = 'PM';
  }
  const min = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
  const sec = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
  return `${month}/${day}/${year}, ${hour}:${min}:${sec} ${option}`;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  let day = new Date(year, month - 1).getDay();
  if (day === 0) day = 7;
  let countDays = 0;
  if (month === 12) {
    countDays = 31;
  } else {
    const nextMonth = new Date(year, month);
    countDays = new Date(nextMonth.setDate(nextMonth.getDate() - 1)).getDate();
  }
  let count = 0;
  if (day <= 6) count += 2;
  if (day === 7) count += 1;
  let remainDay = countDays - (7 - day + 1);
  const fullWeekend = Math.floor(remainDay / 7);
  count += fullWeekend * 2;
  remainDay -= fullWeekend * 7;
  if (remainDay === 6) count += 1;
  return count;
}

/**
 * Returns the week number of the year for a given date.
 * The first week of the year is defined according to ISO8601.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const year = date.getFullYear();
  let firstDay = new Date(year, 0).getDay();
  if (firstDay === 0) firstDay = 7;
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const countDays =
    1 + (date.valueOf() - new Date(year, 0).valueOf()) / millisecondsInDay;
  let count = 0;
  if (firstDay <= 4) count += 1;
  const remainDay = countDays - (7 - firstDay + 1);
  const fullWeekend = Math.floor(remainDay / 7);
  count += fullWeekend;
  if (remainDay % 7 !== 0) count += 1;
  return count;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  const resultDate = date;
  if (date.getDate() > 13) resultDate.setMonth(date.getMonth() + 1);
  resultDate.setDate(13);
  while (resultDate.getDay() !== 5) {
    resultDate.setMonth(resultDate.getMonth() + 1);
  }
  return resultDate;
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  if (date.getMonth() < 3) return 1;
  if (date.getMonth() < 6) return 2;
  if (date.getMonth() < 9) return 3;
  return 4;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const millisecondsInOffDays = 1000 * 60 * 60 * 24 * countOffDays;
  const millisecondsInDays = 1000 * 60 * 60 * 24;
  const arr = [];
  let start = new Date(
    period.start.split('-')[2],
    period.start.split('-')[1] - 1,
    period.start.split('-')[0]
  ).getTime();
  const end = new Date(
    period.end.split('-')[2],
    period.end.split('-')[1] - 1,
    period.end.split('-')[0]
  ).getTime();
  let count = 0;
  while (end >= start) {
    const startDate = new Date(start);
    const startDateDate =
      startDate.getDate() < 10
        ? `0${startDate.getDate()}`
        : startDate.getDate();
    const startDateMonth =
      startDate.getMonth() < 9
        ? `0${startDate.getMonth() + 1}`
        : startDate.getMonth() + 1;
    if (count === countWorkDays) {
      start += millisecondsInOffDays;
      count = 0;
    } else {
      arr.push(`${startDateDate}-${startDateMonth}-${startDate.getFullYear()}`);
      count += 1;
      start += millisecondsInDays;
    }
  }
  return arr;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  if (year % 400 === 0) return true;
  if (year % 4 === 0 && year % 100 !== 0) return true;
  return false;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
