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
    /*
    - welcher Wochentag ist 1. des Monats
    - wie viele Tage zuvor? wie viele Tage nach dem letzten des Monats?
    - welche KW hat der erste des Monats?
    - array erstellen mit allen Tagen, alle 8 Werte KW einfügen (immer 40 Elemente)
    - iterieren und <li> mit entsprechender Klasse erstellen
    */
   
    function calcfirstMonday() {
        let factor = (today.getDay() + 6) % 7;
        let date = new Date(firstOfMonth.valueOf() - (86400000 * factor));
        return date;
    }

    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstMonday = calcfirstMonday();
    const lastOfPreviousMonth = new Date(firstOfMonth.valueOf() - 86400000);
    const firstOfNextMonth = (today.getMonth === 11) ? new Date(today.getFullYear + 1, 1, 1) : new Date(today.getFullYear, today.getMonth + 1, 1);
    const calendarCells = new Array(40).fill(1);
    let dayCount = firstMonday.getDate();
    console.log(firstMonday);
    console.log(dayCount);


    let weekCount = 1 //TODO implement week count (its based on the first thursday of a year!)

    console.log(calendarCells);

    calendarCells.forEach((el, i) => {
        el = document.createElement("li");
        // only for calendar weeks
        if (i % 8 === 0) {
            el.innerText = weekCount.toString();
            el.classList.add('cal-monthly__week-nr');
            weekCount++;
        }
        // for all actual days
        else {
            el.innerText = dayCount.toString();
            el.classList.add('cal-monthly__day');
            //check for weekends
            if (i % 8 >= 6) {
                el.classList.add('cal-monthly__weekend');
            }
            dayCount++;
        }
        elements.calendarSheetCells.appendChild(el);
        calendarCells[i] = el;
    });

    /*CSS Klassen anpassen (aufeinander aufbauend, ggf. kombiantionen beachten):
    - KW
    - default: ausgegraut
    - current-month
    - weekend
    - today
    */
}

const today = new Date(Date.now());
setToday();