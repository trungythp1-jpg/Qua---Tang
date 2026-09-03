/* =========================================
   LOVE STORY
========================================= */


/* -----------------------------------------
   Lấy dữ liệu từ URL
----------------------------------------- */

const params = new URLSearchParams(window.location.search);

const coupleName =
    params.get("c") || "Trung Trang";

const receiverName =
    params.get("t") || "Em";

const startDate =
    params.get("d") || "2018-03-04";

const loveLetter =
    params.get("l") ||
    "Cảm ơn em vì đã xuất hiện trong cuộc đời anh.\n\nMong rằng chúng ta sẽ luôn ở bên nhau và cùng viết tiếp câu chuyện này. ❤️";


/* -----------------------------------------
   Lấy các phần tử HTML
----------------------------------------- */

const openingScreen =
    document.getElementById("openingScreen");

const storyPage =
    document.getElementById("storyPage");

const openStoryBtn =
    document.getElementById("openStoryBtn");

const receiverNameEl =
    document.getElementById("receiverName");

const coupleNameEl =
    document.getElementById("coupleName");

const startDateTextEl =
    document.getElementById("startDateText");

const loveLetterEl =
    document.getElementById("loveLetter");


/* -----------------------------------------
   Hiển thị thông tin
----------------------------------------- */

receiverNameEl.textContent =
    receiverName;

coupleNameEl.textContent =
    coupleName;

loveLetterEl.textContent =
    loveLetter;


/* -----------------------------------------
   Chuyển ngày YYYY-MM-DD
   thành ngày local
----------------------------------------- */

function parseLocalDate(dateString) {

    const parts =
        dateString.split("-");

    if (parts.length !== 3) {
        return null;
    }

    const year =
        Number(parts[0]);

    const month =
        Number(parts[1]);

    const day =
        Number(parts[2]);

    const date =
        new Date(
            year,
            month - 1,
            day,
            0,
            0,
            0,
            0
        );

    if (isNaN(date.getTime())) {
        return null;
    }

    return date;
}


/* -----------------------------------------
   Hiển thị ngày
----------------------------------------- */

function formatDate(dateString) {

    const date =
        parseLocalDate(dateString);

    if (!date) {
        return dateString;
    }

    const day =
        String(date.getDate()).padStart(2, "0");

    const month =
        String(date.getMonth() + 1).padStart(2, "0");

    const year =
        date.getFullYear();

    return `${day}/${month}/${year}`;
}

startDateTextEl.textContent =
    formatDate(startDate);


/* -----------------------------------------
   Tính số năm / tháng / ngày
----------------------------------------- */

function calculateCalendarDifference(start, now) {

    if (now < start) {

        return {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }


    /* -------------------------------
       Tính số năm hoàn chỉnh
    ------------------------------- */

    let years =
        now.getFullYear() -
        start.getFullYear();


    let anniversary =
        new Date(
            start.getFullYear() + years,
            start.getMonth(),
            start.getDate(),
            start.getHours(),
            start.getMinutes(),
            start.getSeconds()
        );


    if (anniversary > now) {

        years--;

        anniversary =
            new Date(
                start.getFullYear() + years,
                start.getMonth(),
                start.getDate(),
                start.getHours(),
                start.getMinutes(),
                start.getSeconds()
            );
    }


    /* -------------------------------
       Tính số tháng hoàn chỉnh
    ------------------------------- */

    let months =
        (now.getFullYear() -
            anniversary.getFullYear()) * 12
        +
        (now.getMonth() -
            anniversary.getMonth());


    let monthPoint =
        new Date(
            anniversary.getFullYear(),
            anniversary.getMonth() + months,
            anniversary.getDate(),
            anniversary.getHours(),
            anniversary.getMinutes(),
            anniversary.getSeconds()
        );


    if (monthPoint > now) {

        months--;

        monthPoint =
            new Date(
                anniversary.getFullYear(),
                anniversary.getMonth() + months,
                anniversary.getDate(),
                anniversary.getHours(),
                anniversary.getMinutes(),
                anniversary.getSeconds()
            );
    }


    /* -------------------------------
       Phần thời gian còn lại
    ------------------------------- */

    let remaining =
        now - monthPoint;


    const SECOND = 1000;

    const MINUTE =
        SECOND * 60;

    const HOUR =
        MINUTE * 60;

    const DAY =
        HOUR * 24;


    const days =
        Math.floor(remaining / DAY);

    remaining %= DAY;


    const hours =
        Math.floor(remaining / HOUR);

    remaining %= HOUR;


    const minutes =
        Math.floor(remaining / MINUTE);

    remaining %= MINUTE;


    const seconds =
        Math.floor(remaining / SECOND);


    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
    };
}


/* -----------------------------------------
   Cập nhật bộ đếm
----------------------------------------- */

function updateCounter() {

    const start =
        parseLocalDate(startDate);

    if (!start) {
        return;
    }

    const now =
        new Date();


    /* -----------------------------------
       Nếu ngày bắt đầu ở tương lai
    ----------------------------------- */

    if (start > now) {

        document.getElementById("years")
            .textContent = "0";

        document.getElementById("months")
            .textContent = "0";

        document.getElementById("days")
            .textContent = "0";

        document.getElementById("hours")
            .textContent = "0";

        document.getElementById("minutes")
            .textContent = "0";

        document.getElementById("seconds")
            .textContent = "00";

        document.getElementById("totalDays")
            .textContent = "0";

        return;
    }


    /* -----------------------------------
       Năm / tháng / ngày / giờ...
    ----------------------------------- */

    const difference =
        calculateCalendarDifference(
            start,
            now
        );


    document.getElementById("years")
        .textContent =
        difference.years;

    document.getElementById("months")
        .textContent =
        difference.months;

    document.getElementById("days")
        .textContent =
        difference.days;

    document.getElementById("hours")
        .textContent =
        difference.hours;

    document.getElementById("minutes")
        .textContent =
        difference.minutes;

    document.getElementById("seconds")
        .textContent =
        String(
            difference.seconds
        ).padStart(2, "0");


    /* -----------------------------------
       TỔNG SỐ NGÀY
    ----------------------------------- */

    const totalMilliseconds =
        now - start;

    const totalDays =
        Math.floor(
            totalMilliseconds /
            (1000 * 60 * 60 * 24)
        );


    document.getElementById("totalDays")
        .textContent =
        totalDays.toLocaleString("vi-VN");
}


/* -----------------------------------------
   Chạy counter
----------------------------------------- */

updateCounter();


let counterInterval =
    setInterval(
        updateCounter,
        1000
    );


/* -----------------------------------------
   Mở câu chuyện
----------------------------------------- */

openStoryBtn.addEventListener(
    "click",
    function () {

        openingScreen.classList.add("hide");

        document.body.style.overflow =
            "auto";

        setTimeout(
            function () {

                openingScreen.style.display =
                    "none";

            },
            900
        );

    }
);


/* -----------------------------------------
   Khởi tạo trạng thái
----------------------------------------- */

storyPage.style.display =
    "block";


/* -----------------------------------------
   Tim bay
----------------------------------------- */

const heartsContainer =
    document.getElementById(
        "heartsContainer"
    );


function createHeart() {

    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";

    heart.textContent =
        Math.random() > .5
            ? "❤️"
            : "💕";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (14 + Math.random() * 18) + "px";


    const duration =
        6 + Math.random() * 7;


    heart.style.animationDuration =
        duration + "s";


    heartsContainer.appendChild(
        heart
    );


    setTimeout(
        function () {

            heart.remove();

        },
        duration * 1000 + 500
    );
}


setInterval(
    createHeart,
    1200
);


/* -----------------------------------------
   Tạo một vài tim ban đầu
----------------------------------------- */

for (
    let i = 0;
    i < 5;
    i++
) {

    setTimeout(
        createHeart,
        i * 500
    );
}