/* =========================================
   LOVE COUNTER
========================================= */

let counterTimer = null;


/* =========================================
   FORMAT DATE
========================================= */

function parseStartDate(dateString) {

    if (!dateString) {
        return null;
    }


    const parts =
        dateString.split("-");


    if (parts.length !== 3) {
        return null;
    }


    const year =
        Number(parts[0]);


    const month =
        Number(parts[1]) - 1;


    const day =
        Number(parts[2]);


    const date =
        new Date(
            year,
            month,
            day,
            0,
            0,
            0
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return null;

    }


    return date;

}


/* =========================================
   ADD YEARS
========================================= */

function addYears(date, years) {

    const result =
        new Date(date);


    result.setFullYear(
        result.getFullYear() + years
    );


    return result;

}


/* =========================================
   ADD MONTHS
========================================= */

function addMonths(date, months) {

    const result =
        new Date(date);


    result.setMonth(
        result.getMonth() + months
    );


    return result;

}


/* =========================================
   CALCULATE
========================================= */

function calculateLoveTime(startDate) {

    const now =
        new Date();


    if (
        !startDate ||
        startDate > now
    ) {

        return {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

    }


    let cursor =
        new Date(startDate);


    /* YEARS */

    let years =
        now.getFullYear() -
        cursor.getFullYear();


    let yearCandidate =
        addYears(
            cursor,
            years
        );


    if (
        yearCandidate > now
    ) {

        years--;

        yearCandidate =
            addYears(
                cursor,
                years
            );

    }


    cursor =
        yearCandidate;


    /* MONTHS */

    let months =
        now.getMonth() -
        cursor.getMonth();


    months +=
        12 *
        (
            now.getFullYear() -
            cursor.getFullYear()
        );


    let monthCandidate =
        addMonths(
            cursor,
            months
        );


    if (
        monthCandidate > now
    ) {

        months--;

        monthCandidate =
            addMonths(
                cursor,
                months
            );

    }


    cursor =
        monthCandidate;


    /* REMAINING TIME */

    let difference =
        now.getTime() -
        cursor.getTime();


    const dayMS =
        24 * 60 * 60 * 1000;


    const hourMS =
        60 * 60 * 1000;


    const minuteMS =
        60 * 1000;


    const secondMS =
        1000;


    const days =
        Math.floor(
            difference / dayMS
        );


    difference %=
        dayMS;


    const hours =
        Math.floor(
            difference / hourMS
        );


    difference %=
        hourMS;


    const minutes =
        Math.floor(
            difference / minuteMS
        );


    difference %=
        minuteMS;


    const seconds =
        Math.floor(
            difference / secondMS
        );


    return {

        years,

        months,

        days,

        hours,

        minutes,

        seconds

    };

}


/* =========================================
   UPDATE SCREEN
========================================= */

function updateCounter() {

    const startDate =
        parseStartDate(
            giftData.date
        );


    const time =
        calculateLoveTime(
            startDate
        );


    document.getElementById(
        "years"
    ).textContent =
        time.years;


    document.getElementById(
        "months"
    ).textContent =
        time.months;


    document.getElementById(
        "days"
    ).textContent =
        time.days;


    document.getElementById(
        "hours"
    ).textContent =
        time.hours;


    document.getElementById(
        "minutes"
    ).textContent =
        String(
            time.minutes
        ).padStart(
            2,
            "0"
        );


    document.getElementById(
        "seconds"
    ).textContent =
        String(
            time.seconds
        ).padStart(
            2,
            "0"
        );

}


/* =========================================
   START
========================================= */

function startCounter() {

    updateCounter();


    if (counterTimer) {

        clearInterval(
            counterTimer
        );

    }


    counterTimer =
        setInterval(
            updateCounter,
            1000
        );

}