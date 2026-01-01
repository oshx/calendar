import { nullish } from "./type";
import {
  EMPTY_HOLIDAY_VALUE,
  holidayList,
  LUNAR_NEW_YEAR_VALUE,
  LUNAR_THANKS_GIVING_VALUE,
  lunarHolidayList,
  MEMORIAL_DAY_VALUE,
  NEW_YEAR_VALUE,
  temporaryHolidayList,
} from "./calendar.constants";

/**
 * @private
 */

function mergeHolidayList(monthDateKey, targetList) {
  if (!targetList?.length) return;
  holidayList[monthDateKey] = [
    ...getHoliday(monthDateKey, true),
    ...targetList,
  ];
}

function addHoliday(monthDateKey, target, skipSat = false, skipSun = false) {
  if (!monthDateKey || nullish(target)) return;
  mergeHolidayList(monthDateKey, [target]);
}

function addSubstituteHoliday({
  year,
  month,
  date,
  holidayName = null,
  dayAfter = 1,
  skipName = true,
  suffix = "대체",
  skipSat = false,
  skipSun = false,
}) {
  if (nullish(holidayName)) {
    return;
  }
  let day = new Date(year, month - 1, date);
  const isSaturday = day.getDay() === 6;
  const isSunday = day.getDay() === 0;

  if (isSunday && !skipSun) {
    day = new Date(year, month - 1, date + dayAfter);
  } else if (isSaturday && !skipSat) {
    day = new Date(year, month - 1, date + dayAfter + 1);
  }
  const substituteKey = `${day.getMonth() + 1}-${day.getDate()}`;
  const substituteHolidayText = (
    holidayName && !skipName ? [holidayName, suffix] : [suffix]
  ).join(" ");
  addHoliday(substituteKey, substituteHolidayText, skipSat, skipSun);
}

/**
 * @public
 */

export function evaluateHolidayByYear(year) {
  if (temporaryHolidayList[year]) {
    Object.entries(temporaryHolidayList[year]).forEach(
      ([monthDateKey, temporaryHolidays]) =>
        mergeHolidayList(monthDateKey, temporaryHolidays)
    );
  }
}

export function addLunarHolidayToHolidayList(lunarMonthDateKey, monthDateKey) {
  mergeHolidayList(monthDateKey, getLunarHoliday(lunarMonthDateKey));
}

export function getHoliday(monthDateKey, defaultEmptyList = false) {
  if (!holidayList[monthDateKey]?.length) {
    return defaultEmptyList ? [] : null;
  }
  return holidayList[monthDateKey];
}

export function hasHoliday(monthDateKey) {
  return Array.isArray(holidayList[monthDateKey]);
}

export function getLunarHoliday(lunarMonthDateKey) {
  return lunarHolidayList[lunarMonthDateKey] || null;
}

export function evaluateSubstituteHoliday(year, month, date, holidays) {
  if (
    !holidays?.length ||
    holidays.includes(NEW_YEAR_VALUE) ||
    holidays.includes(MEMORIAL_DAY_VALUE)
  ) {
    return;
  }
  if (
    holidays.includes(LUNAR_NEW_YEAR_VALUE) ||
    holidays.includes(LUNAR_THANKS_GIVING_VALUE)
  ) {
    let dayBefore = new Date(year, month - 1, date - 1);
    let dayAfter = new Date(year, month - 1, date + 1);
    if (dayBefore.getDay() === 0) {
      dayBefore = new Date(year, month - 1, date - 1 + 3);
    }
    if (dayAfter.getDay() === 0) {
      dayAfter = new Date(year, month - 1, date + 1 + 1);
    }
    addSubstituteHoliday({
      year: dayBefore.getFullYear(),
      month: dayBefore.getMonth() + 1,
      date: dayBefore.getDate(),
      holidayName: EMPTY_HOLIDAY_VALUE,
      dayAfter: 0,
      suffix: EMPTY_HOLIDAY_VALUE,
      skipSat: true,
    });
    addSubstituteHoliday({
      year: dayAfter.getFullYear(),
      month: dayAfter.getMonth() + 1,
      date: dayAfter.getDate(),
      holidayName: EMPTY_HOLIDAY_VALUE,
      dayAfter: 0,
      suffix: EMPTY_HOLIDAY_VALUE,
      skipSat: true,
    });
    return;
  }
  const day = new Date(year, month - 1, date);
  const isWeekend = day.getDay() === 0 || day.getDay() === 6;
  const isOverlapHolidays = holidays.length > 1;
  if (!isWeekend && !isOverlapHolidays) {
    return;
  }
  holidays.forEach((holidayName, index) => {
    // 이번 달 휴일 전체 재검증
    if (index === 0 && isOverlapHolidays) {
      return;
    }

    addSubstituteHoliday({
      year,
      month,
      date: date + index,
      holidayName,
      // EMPTY_HOLIDAY_VALUE 는 설과 추석 연휴만 해당
      suffix: holidayName === EMPTY_HOLIDAY_VALUE ? EMPTY_HOLIDAY_VALUE : undefined,
      skipSat: EMPTY_HOLIDAY_VALUE === holidayName,
    });
  });
}
