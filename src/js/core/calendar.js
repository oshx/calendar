const dayLabel = [
    'sun',
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
];

const holidayList = {
    '1-1': '신정',
    '3-1': '삼일절',
    '5-5': '어린이날',
    '6-6': '현충일',
    '8-15': '광복절',
    '10-3': '개천절',
    '10-9': '한글날',
    '12-25': '크리스마스',
};

function dayItem(month, date, day, lunar) {
    day = dayLabel[day];
    date = date || '';
    lunar = lunar || '';
    const remark = holidayList[`${month}-${date}`] || '';
    const holiday = remark ? 'holiday' : '';

    return {
        date, day, lunar, holiday, remark,
    };
}

const CalendarCore = {
    toRowList(year, month) {
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);
        const firstDayOfWeek = firstDay.getDay();
        const lastDate = lastDay.getDate();
        const rowList = [];
        let row = [];
        for (let i = 0; i < firstDayOfWeek; i++) {
            row.push(dayItem(month, null, row.length, null));
        }
        for (let i = 1; i <= lastDate; i++) {
            row.push(dayItem(month, i, row.length, null));
            if (row.length % 7 === 0) {
                rowList.push(row);
                row = [];
            }
        }
        if (row.length) {
            rowList.push(row);
        }
        return rowList;
    },
};

export default CalendarCore;
