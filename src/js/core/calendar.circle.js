import { circleList, lunarCircleList } from "./calendar.constants";
import { nullish } from "./type";

/**
 * @public
 */
export function getLunarCircle(monthDateKey) {
  return lunarCircleList[monthDateKey];
}

export function getCircle(monthDateKey) {
  return circleList[monthDateKey];
}

export function addCircle(monthDateKey, circle = null) {
  if (!monthDateKey || nullish(circle)) return;
  circleList[monthDateKey] = circle;
}
