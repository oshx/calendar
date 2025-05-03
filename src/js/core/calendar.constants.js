export const EMPTY_HOLIDAY_VALUE = "";

export const NEW_YEAR_VALUE = "신정";
export const MEMORIAL_DAY_VALUE = "현충일";

export const LUNAR_NEW_YEAR_VALUE = "설날";
export const LUNAR_THANKS_GIVING_VALUE = "추석";

export const SOLAR_REMARK_ENTER_SPRING_KEY_LEAP = "2-3";
export const SOLAR_REMARK_ENTER_SPRING_KEY = "2-4";
export const SOLAR_REMARK_ENTER_SPRING_VALUE = "입춘 立春";

export const LUNAR_INTERCALATION_MONTH = "윤달";
export const LUNAR_CALENDAR = "음력";

export const temporaryHolidayList = {
  2025: {
    "1-27": ["임시"],
    "6-3": ["대선"],
  },
};

export const holidayList = {
  "1-1": [NEW_YEAR_VALUE],
  "3-1": ["삼일절"],
  "5-5": ["어린이날"],
  "6-6": [MEMORIAL_DAY_VALUE],
  "8-15": ["광복절"],
  "10-3": ["개천절"],
  "10-9": ["한글날"],
  "12-25": ["성탄절"],
};

export const lunarHolidayList = {
  "1-1": [LUNAR_NEW_YEAR_VALUE],
  "4-8": ["부처님 오신 날"],
  "8-15": [LUNAR_THANKS_GIVING_VALUE],
};

export const dayLabelList = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export const remarkList = {
  "1-5": "소한 小寒",
  "1-20": "대한 大寒",
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

export const lunarRemarkList = {
  "1-15": "정월 대보름",
  "3-3": "삼짇날",
  "5-5": "단오",
  "7-7": "칠석",
  "7-15": "백중",
};

export const circleList = {
  "9-6": true,
  "9-8": true,
  "7-28": true,
};

export const lunarCircleList = {
  "4-8": true,
  "10-15": true,
  "7-18": true,
};
