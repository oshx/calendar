import KoreanLunarCalendar from "korean-lunar-calendar";
import { nullish } from "./type";

const koreanLunarCalendar = new KoreanLunarCalendar();

const dayLabel = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const remarkList = {
  "1-5": "소한 小寒",
  "1-20": "대한 大寒",
  "2-4": "입춘 立春",
  "2-19": "우수 雨水",
  "3-6": "경칩 驚蟄",
  "3-21": "춘분 春分",
  "4-5": "청명 淸明",
  "4-20": "곡우 穀雨",
  "5-6": "입하 立夏",
  "5-21": "소만 小滿",
  "6-6": "망종 芒種",
  "6-22": "하지 夏至",
  "7-7": "소서 小暑",
  "7-23": "대서 大暑",
  "8-8": "입추 立秋",
  "8-23": "처서 處暑",
  "9-8": "백로 白露",
  "9-23": "추분 秋分",
  "10-8": "한로 寒露",
  "10-24": "상강 霜降",
  "11-8": "입동 立冬",
  "11-22": "소설 小雪",
  "12-7": "대설 大雪",
  "12-22": "동지 冬至",

  "2-14": "발렌타인데이",
  "3-14": "화이트데이",
  "5-1": "근로자의 날",
  "5-8": "어버이날",
  "5-15": "스승의 날",
  "7-17": "제헌절",
  "11-11": "빼빼로데이",
};

const holidayList = {
  "1-1": "신정",
  "3-1": "삼일절",
  "5-5": "어린이날",
  "6-6": "현충일",
  "8-15": "광복절",
  "10-3": "개천절",
  "10-9": "한글날",
  "12-25": "성탄절",
};

const LUNAR_NEW_YEAR = "설날";
const LUNAR_THANKS_GIVING = "추석";

const lunarHolidayList = {
  "1-1": LUNAR_NEW_YEAR,
  "4-8": "부처님 오신 날",
  "8-15": LUNAR_THANKS_GIVING,
};

const lunarRemarkList = {
  "1-15": "정월 대보름",
  "3-3": "삼짇날",
  "5-5": "단오",
  "7-7": "칠석",
  "7-15": "백중",
};

const circleList = {
  "9-6": true,
  "9-8": true,
  "7-28": true,
};
const lunarCircleList = {
  "4-8": true,
  "10-15": true,
};

function evaluateSubstituteHoliday(year, month, date, holiday) {
  if (!holiday) {
    return;
  }
  if (holiday === LUNAR_NEW_YEAR || holiday === LUNAR_THANKS_GIVING) {
    const dayBefore = new Date(year, month - 1, date - 1);
    const dayAfter = new Date(year, month - 1, date + 1);
    holidayList[`${dayBefore.getMonth() + 1}-${dayBefore.getDate()}`] = "";
    holidayList[`${dayAfter.getMonth() + 1}-${dayAfter.getDate()}`] = "";
    if (dayBefore.getDay() === 0) {
      addSubstituteHoliday(
        dayBefore.getFullYear(),
        dayBefore.getMonth() + 1,
        dayBefore.getDate() + 3,
        ""
      );
    }
    if (dayAfter.getDay() === 0) {
      addSubstituteHoliday(
        dayAfter.getFullYear(),
        dayAfter.getMonth() + 1,
        dayAfter.getDate() + 1,
        ""
      );
    }
    return;
  }
  const day = new Date(year, month - 1, date);
  if (day.getDay() !== 0 && day.getDay() !== 6) {
    return;
  }
  addSubstituteHoliday(year, month, date, holiday);
}

function addSubstituteHoliday(year, month, date, holiday = "", dayAfter = 1) {
  let day = new Date(year, month - 1, date);
  if (day.getDay() === 0) {
    day = new Date(year, month - 1, date + dayAfter);
  } else if (day.getDay() === 6) {
    day = new Date(year, month - 1, date + dayAfter + 1);
  }
  // if (!nullish(holidayList[`${day.getMonth() + 1}-${day.getDate()}`])) {
  //   console.error(
  //     "이미 휴일이 지정되어 있습니다.\n",
  //     holidayList[`${day.getMonth() + 1}-${day.getDate()}`]
  //   );
  // }
  holidayList[`${day.getMonth() + 1}-${day.getDate()}`] =
    `${!nullish(holiday) ? `${holiday} ` : ""}대체 휴일`;
}

function toDayItem(year, month, date, day, lunar) {
  let remark = null;
  let holiday = null;
  let circle = null;
  if (koreanLunarCalendar.setSolarDate(year, month, date)) {
    const {
      month: lunarMonth,
      day: lunarDate,
      intercalation,
    } = koreanLunarCalendar.getLunarCalendar();
    lunar = `${intercalation ? "윤달" : "음력"} ${lunarMonth}.${lunarDate}`;
    if (lunarHolidayList[`${lunarMonth}-${lunarDate}`]) {
      holidayList[`${month}-${date}`] =
        lunarHolidayList[`${lunarMonth}-${lunarDate}`];
    }
    if (lunarRemarkList[`${lunarMonth}-${lunarDate}`]) {
      remarkList[`${month}-${date}`] =
        lunarRemarkList[`${lunarMonth}-${lunarDate}`];
    }
    if (lunarCircleList[`${lunarMonth}-${lunarDate}`]) {
      circleList[`${month}-${date}`] = true;
    }
  }
  remark = remarkList[`${month}-${date}`];
  holiday = holidayList[`${month}-${date}`];
  circle = circleList[`${month}-${date}`];

  evaluateSubstituteHoliday(year, month, date, holiday);

  return {
    year,
    month,
    date,
    day,
    dayLabel: dayLabel[day],
    lunar,
    holiday,
    remark,
    circle,
  };
}

function evaluateDayItem(dayItem) {
  dayItem.holiday = nullish(holidayList[`${dayItem.month}-${dayItem.date}`])
    ? dayItem.holiday
    : holidayList[`${dayItem.month}-${dayItem.date}`];
  return dayItem;
}

const CalendarCore = {
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
