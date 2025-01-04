import CalendarCore from "~/src/js/core/calendar";
import { nullish, SortType, SortTypeBookOrder } from "~/src/js/core/type";
import { Root } from "~/src/js/view/root";

function refineTemplate(template) {
  return template.replace(/\s+/g, " ");
}

function refineTemplateList(templateList) {
  return templateList.map(refineTemplate).join("");
}

function calendarDayItemTemplate({
  date,
  dayLabel,
  lunar,
  holiday,
  remark,
  circle,
}) {
  if (!date) {
    return /* HTML */ ` <td class="day empty"></td>`;
  }
  return /* HTML */ ` <td
    class="day ${dayLabel}${!nullish(holiday) ? " holiday" : ""}"
  >
    <span class="wrap">
      <strong class="date${!nullish(circle) ? " circle" : ""}">${date}</strong>
      ${!nullish(holiday)
        ? /* HTML */ `<em class="holiday">${holiday}</em>`
        : ""}
    </span>
    ${lunar || remark
      ? /* HTML */ `<span class="wrap">
          ${!nullish(lunar)
            ? /* HTML */ `<span class="lunar">${lunar}</span>`
            : ""}
          ${!nullish(remark)
            ? /* HTML */ `<em class="remark">${remark}</em>`
            : ""}
        </span>`
      : ""}
  </td>`;
}

function calendarRowTemplate(row) {
  return /* HTML */ ` <tr class="row">
    ${refineTemplateList(row.map(calendarDayItemTemplate))}
  </tr>`;
}

function calendarRow(rowList) {
  return refineTemplateList(rowList.map(calendarRowTemplate));
}

const Template = {
  year(year, sortType = SortType.ASCENDING) {
    if (!year || year < 1900 || year > 2100) {
      year = new Date().getFullYear();
    }
    switch (sortType) {
      case SortType.ASCENDING:
      case SortType.DESCENDING:
      case SortType.BOOK:
        break;
      default:
        sortType = SortType.ASCENDING;
    }

    return refineTemplateList(
      Array(12)
        .fill(1)
        .map(function toFrame(month, index) {
          switch (sortType) {
            case SortType.DESCENDING:
              month = 12 - index;
              break;
            case SortType.ASCENDING:
              month = month + index;
              break;
            case SortType.BOOK:
              month = SortTypeBookOrder[index];
              break;
          }
          return Template.frame(year, month);
        })
    );
  },
  frame(year, month) {
    const rowList = CalendarCore.toRowList(year, month);
    return refineTemplate(/* HTML */ `
      <div class="page">
        <div class="fixer">
          <table class="calendar">
            <thead>
              <tr class="row head">
                <th scope="col" class="title head year western">
                  <span>서기 ${year}년</span>
                </th>
                <th scope="col" class="title head month" colspan="5">
                  <strong>${month}</strong>
                </th>
                <th scope="col" class="title head year oriental">
                  <span>단기 ${2333 + year}년</span>
                  <span>불기 ${544 + year}년</span>
                </th>
              </tr>
              <tr class="row head">
                <th scope="col" class="day head sun">일</th>
                <th scope="col" class="day head mon">월</th>
                <th scope="col" class="day head tue">화</th>
                <th scope="col" class="day head wed">수</th>
                <th scope="col" class="day head thu">목</th>
                <th scope="col" class="day head fri">금</th>
                <th scope="col" class="day head sat">토</th>
              </tr>
            </thead>
            <tbody>
              ${calendarRow(rowList)}
            </tbody>
          </table>
        </div>
      </div>
    `);
  },
};

const CalendarView = {
  Template,
  SortType,
  render(template) {
    Root.innerHTML = template;
  },
};

export default CalendarView;
