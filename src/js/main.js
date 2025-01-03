import calendarView from "~/src/js/view/calendar";

export default new (function CalendarMain(view) {
  view.render(view.Template.year(2025));
})(calendarView);
