import { DEFAULT_PARAM, extractParam } from "~/src/js/core/param";
import { optimizeHTMLRoot } from "~/src/js/view/root";
import calendarView from "~/src/js/view/calendar";
import { scrollToCurrentMonth } from "~/src/js/view/scroll";

export default new (function CalendarMain(view, param) {
  optimizeHTMLRoot(param);
  view.render(view.Template.year(param.year, param.sortType));
  scrollToCurrentMonth();
})(calendarView, extractParam(DEFAULT_PARAM));
