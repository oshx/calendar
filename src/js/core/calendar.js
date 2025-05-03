import {
  addLunarHolidayToHolidayList,
  evaluateHolidayByYear,
  evaluateSubstituteHoliday,
  getHoliday,
  hasHoliday,
} from "./calendar.holiday";
import { dayLabelList } from "./calendar.constants";
import {
  addRemark,
  evaluateLeapYearRemark,
  getLunarRemark,
  getRemark,
} from "./calendar.remark";
import { toLunarDate, toLunarLabel } from "./calendar.lunar";
import { addCircle, getCircle, getLunarCircle } from "./calendar.circle";

function toDayItem(year, month, date, day, lunar) {
  const monthDateKey = `${month}-${date}`;
  const { lunarMonthDateKey, lunarMonth, lunarDate, intercalation } =
    toLunarDate(year, month, date);
  if (lunarMonthDateKey) {
    lunar = toLunarLabel(lunarMonth, lunarDate, intercalation);
    addLunarHolidayToHolidayList(lunarMonthDateKey, monthDateKey);
    addRemark(monthDateKey, getLunarRemark(lunarMonthDateKey));
    addCircle(monthDateKey, getLunarCircle(lunarMonthDateKey));
  }
  const remark = getRemark(monthDateKey);
  const circle = getCircle(monthDateKey);
  const holiday = getHoliday(monthDateKey);
  const dayLabel = dayLabelList[day];

  evaluateSubstituteHoliday(year, month, date, holiday);

  return {
    year,
    month,
    date,
    day,
    dayLabel,
    lunar,
    holiday,
    remark,
    circle,
  };
}

function evaluateDayItem(dayItem) {
  const monthDateKey = `${dayItem.month}-${dayItem.date}`;
  if (!hasHoliday(monthDateKey)) return dayItem;
  dayItem.holiday = getHoliday(monthDateKey);
  return dayItem;
}

const CalendarCore = {
  mapYearPreprocessFormula(year) {
    evaluateLeapYearRemark(year);
    evaluateHolidayByYear(year);
    return true;
  },
  toRowList(year, month) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const firstDayOfWeek = firstDay.getDay();
    const lastDate = lastDay.getDate();
    const rowList = [];
    let row = [];
    const emptyDayItem = toDayItem(year, month, null, row.length, null);
    for (let i = 0; i < firstDayOfWeek; i++) {
      row.push(emptyDayItem);
    }
    for (let i = 1; i <= lastDate; i++) {
      row.push(toDayItem(year, month, i, row.length, null));
      if (row.length % 7 === 0) {
        rowList.push(row);
        row = [];
      }
    }
    if (row.length) {
      rowList.push(row.concat(Array(7 - row.length).fill(emptyDayItem)));
    }
    rowList.map((row) => row.map(evaluateDayItem));
    return rowList;
  },
};

export default CalendarCore;
