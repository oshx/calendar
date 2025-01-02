import CalendarCore from '~/src/js/core/calendar';

function refineTemplate(template) {
    return template.replace(/\s+/g, ' ');
}

function refineTemplateList(templateList) {
    return templateList.map(refineTemplate).join('')
}

const Root = (function generateRoot(target) {
    const root = window.document.createElement('div');
    root.className = 'root';
    target.appendChild(root);
    return root;
})(window.document.body);

function calendarDayItemTemplate({date, day, lunar, holiday, remark}) {
    return `
        <td class="day ${day} ${holiday}">
            <strong class="date">${date}</strong>
            <span class="lunar">${lunar}</span>
            <em class="remark">${remark}</em>
        </td>`;
}

function calendarRowTemplate(row) {
    return `
        <tr class="row">
            ${refineTemplateList(row.map(calendarDayItemTemplate))}
        </tr>`;
}

function calendarRow(rowList) {
    return refineTemplateList(rowList.map(calendarRowTemplate));
}

const Template = {
    year(year) {
        return refineTemplateList(Array(12).fill(1).map((v, i) => this.frame(year, v + i)));
    },
    frame(year, month) {
        const rowList = CalendarCore.toRowList(year, month);
        return refineTemplate(`
        <div class="page">
            <table class="calendar">
                <thead>
                    <tr class="row head">
                        <th scope="col" class="title head" colspan="7">
                            <span>${year}</span>
                            <strong>${month}</strong>
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
    `);
    },
};

const CalendarView = {
    Template,
    render(template) {
        Root.innerHTML = template;
    },
};

export default CalendarView;