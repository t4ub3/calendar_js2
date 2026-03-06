/**
 * @fileoverview provides basic functionality to the calendar
 * @author Jonas Neumann
 * @version 0.0.1
 * @date 2026-02-23
 * 
 * @license MIT
 */


// get all the needed html elements
const elements = {
    todayWeekdayAndDate: document.getElementById("today-weekday-and-date"),
    todayDayInMonth: document.getElementById("today-day-in-month"),
    nowMsUtc: document.getElementById("now-ms-utc"),
    listCurrentWeekdays: document.getElementsByName("current-weekday"),
    numberOfWeekday: document.getElementById("number-of-weekday"),
    currentMonth: document.getElementById("current-month"),
    primeOrNot: document.getElementById("prime-or-not"),
    fullDate: document.getElementById("full-date"),
    body: document.getElementById("holds-background"),
    calendarSheetTitle: document.getElementById("calendar-sheet-title"),
    calendarSheetCells: document.getElementById("cal-sheet-cells")

}

// adjust displayed data to match today
function setToday() {
    elements.nowMsUtc.innerHTML = today.getTime().toString();
    elements.todayDayInMonth.innerHTML = today.getDate().toString();
    elements.primeOrNot.innerHTML = isPrime(today.getDate()) ? "eine" : "keine";
    elements.listCurrentWeekdays.forEach((item) => {
        item.innerHTML = today.toLocaleString('de-de', { weekday: 'long' });
    })
    elements.fullDate.innerHTML = today.toLocaleString('de-de', { year: 'numeric', month: '2-digit', day: '2-digit' });
    elements.currentMonth.innerHTML = today.toLocaleString('de-de', { month: 'long' });
    elements.numberOfWeekday.innerHTML = (Math.floor(today.getDate() / 7) + 1).toString();
    elements.calendarSheetTitle.innerText = today.toLocaleString('de-de', { month: 'long', year: 'numeric' });

    setupCalendarSheet();
}

function isPrime(dateNumber) {
    return (dateNumber in [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]);
}

function setupCalendarSheet() {
    
    function calcfirstMonday() {
        let factor = (firstOfMonth.getDay() + 6) % 7;
        let date = new Date(firstOfMonth.valueOf() - (86400000 * factor));
        return date;
    }

    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstMonday = calcfirstMonday();
    const lastOfPreviousMonth = new Date(firstOfMonth.valueOf() - 86400000);
    //const firstOfNextMonth = (today.getMonth === 11) ? new Date(today.getFullYear + 1, 1, 1) : new Date(today.getFullYear, today.getMonth + 1, 1);
    const firstOfNextMonth = new Date(2026, 4, 1);
    const lastOfCurrentMonth = new Date(firstOfNextMonth.valueOf() - 86400000);
    const calendarCells = new Array(48).fill(1);
    let dayCount = firstMonday.getDate();

    let totalCount = 0;


    let weekCount = 1 //TODO implement week count (its based on the first thursday of a year!)

    el = document.createElement("li");
    el.innerText = weekCount.toString();
    el.classList.add('cal-monthly__week-nr');
    elements.calendarSheetCells.appendChild(el);
    totalCount++;
    weekCount++;

    // previous month
    for (i = firstMonday.getDate(); i <= lastOfPreviousMonth.getDate(); i++) {
        el = document.createElement("li");
        el.innerText = i.toString();
        el.classList.add('cal-monthly__day--prev-month');
        //check for weekends
        if (totalCount % 8 >= 6) {
            el.classList.add('cal-monthly__day--weekend');
        }
        elements.calendarSheetCells.appendChild(el);
        totalCount++;
    }

    // current month
    for (i = 1; i <= lastOfCurrentMonth.getDate() + 1; i++) {
        el = document.createElement("li");
        if (totalCount % 8 === 0) {
            el.innerText = weekCount.toString();
            el.classList.add('cal-monthly__week-nr');
            elements.calendarSheetCells.appendChild(el);
            weekCount++;
            totalCount++;
            i--;
        }
        // for all actual days
        else {
            el.innerText = i.toString();
            el.classList.add('cal-monthly__day--current-month');
            //check for weekends
            if (totalCount % 8 >= 6) {
                el.classList.add('cal-monthly__day--weekend');
            }
            // check for today
            if (i === today.getDate()) {
                el.classList.add('cal-monthly__day--today');
            }
            elements.calendarSheetCells.appendChild(el);
            totalCount++;
        }
    }

    // next month
    for (i = 1; totalCount < calendarCells.length; i++) {
        el = document.createElement("li");
        if (totalCount % 8 === 0) {
            el.innerText = weekCount.toString();
            el.classList.add('cal-monthly__week-nr');
            elements.calendarSheetCells.appendChild(el);
            weekCount++;
            totalCount++;
            i--;
        }
        // for all actual days
        else {
            el.innerText = i.toString();
            el.classList.add('cal-monthly__day--next-month');
            //check for weekends
            if (totalCount % 8 >= 6) {
                el.classList.add('cal-monthly__day--weekend');
            }
            elements.calendarSheetCells.appendChild(el);
            totalCount++;
        }
    }
}

const today = new Date(Date.now());
setToday();