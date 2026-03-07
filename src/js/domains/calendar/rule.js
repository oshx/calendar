// type definitions
/**
 * @typedef {
 *  "SOLAR" |
 *  "LUNAR"
 *  } caledarType - 양력, 음력
 */
/**
 * @typedef {
 *  "REMARK" |
 *  "HOLIDAY"
 * } statusType - 특정, 휴일
 */
/**
 * @typedef {
 *   "ANNUAL" |
 *   "MONTHLY" |
 *   "WEEKLY" |
 *   "DAILY" |
 *   "SUBSTITUTE" |
 *   "SPECIAL" |
 *   "TEMPORARY"
 * } repeatType - 연례, 월간, 주간, 일간, 대체, 임시
 */
/**
 * @typedef {function(value: calendarRule): boolean} validator
 */
/**
 * @typedef {Object} calendarRule
 * @property {calendarType} [calendarType]
 * @property {statusType} [statusType]
 * @property {repeatType} [repeatType]
 * @property {string | number} [year]
 * @property {string | number} [month]
 * @property {string | number} [date]
 * @property {string | number} [day]
 * @property {string | number} [time]
 * @property {date} [startDate]
 * @property {date} [endDate]
 * @property {validator} [validator]
 */
/**
 * @typedef {{
 *   year: number;
 *   month: number;
 *   date: number;
 *   day: number;
 * }} calendarRuleResult
 */
// private

// public
/**
 * @param {calendarRule} option
 * @returns {calendarRule}
 */
export default function createCalendarRule(option) {
  
}
