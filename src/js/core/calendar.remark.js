import {
  lunarRemarkList,
  remarkList,
  SOLAR_REMARK_ENTER_SPRING_KEY,
  SOLAR_REMARK_ENTER_SPRING_KEY_LEAP,
  SOLAR_REMARK_ENTER_SPRING_VALUE,
} from "./calendar.constants";
import { nullish } from "./type";

export function evaluateLeapYearRemark(year) {
  if (year % 4 === 1) {
    remarkList[SOLAR_REMARK_ENTER_SPRING_KEY_LEAP] =
      SOLAR_REMARK_ENTER_SPRING_VALUE;
  } else {
    remarkList[SOLAR_REMARK_ENTER_SPRING_KEY] = SOLAR_REMARK_ENTER_SPRING_VALUE;
  }
}

export function getLunarRemark(monthDateKey) {
  return lunarRemarkList[monthDateKey] || null;
}

export function addRemark(monthDateKey, target) {
  if (!monthDateKey || nullish(target)) return;
  remarkList[monthDateKey] = target;
}

export function getRemark(monthDateKey) {
  return remarkList[monthDateKey] || null;
}
