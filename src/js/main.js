import calendarCore from '~/src/js/core/calendar';
import calendarView from '~/src/js/view/calendar';

export default new (function CalendarMain(core, view) {
    view.render(view.Template.year(2025));
    console.debug(core.toRowList(2025, 1));
})(calendarCore, calendarView);