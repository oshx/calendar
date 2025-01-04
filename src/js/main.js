import { DEFAULT_PARAM, extractParam } from "~/src/js/core/param";
import { optimizeHTMLRoot } from "~/src/js/view/root";
import calendarView from "~/src/js/view/calendar";

export default new (function CalendarMain(view, param) {
  optimizeHTMLRoot(param);
  view.render(view.Template.year(param.year, param.sortType));
})(calendarView, extractParam(DEFAULT_PARAM));
