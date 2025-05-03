import KoreanLunarCalendar from "korean-lunar-calendar";
import {
  LUNAR_CALENDAR,
  LUNAR_INTERCALATION_MONTH,
} from "./calendar.constants";

/**
 * @private
 */

const koreanLunarCalendar = new KoreanLunarCalendar();

/**
 * @public
 */
export function toLunarDate(year, month, date) {
  const result = {
    lunarMonth: null,
    lunarDate: null,
    lunarMonthDateKey: null,
    intercalation: null,
  };
  if (!koreanLunarCalendar.setSolarDate(year, month, date)) {
    return result;
  }
  const {
    month: lunarMonth,
    day: lunarDate,
    intercalation,
  } = koreanLunarCalendar.getLunarCalendar();
  result.lunarMonth = lunarMonth;
  result.lunarDate = lunarDate;
  result.lunarMonthDateKey = `${lunarMonth}-${lunarDate}`;
  result.intercalation = intercalation;
  return result;
}

export function toLunarLabel(month, date, intercalation) {
  return `${intercalation ? LUNAR_INTERCALATION_MONTH : LUNAR_CALENDAR} ${month}.${date}`;
}
