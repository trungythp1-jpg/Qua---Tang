/* =========================================
   LOVE STORY
   ========================================= */


/* -----------------------------------------
   Lấy dữ liệu từ URL
----------------------------------------- */

const params = new URLSearchParams(
    window.location.search
);

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
   THEME + STYLE
----------------------------------------- */

/*
   6 màu
*/
const allowedThemes = [
    "romantic",
    "rose",
    "purple",
    "pink",
    "night",
    "sunset"
];


/*
   6 phong cách
*/
const allowedStyles = [
    "glass",
    "luxury",
    "sakura",
    "cinematic",
    "letter",
    "minimal"
];


/*
   Lấy theme từ URL
   Nếu không hợp lệ → romantic
*/
const selectedTheme =
    allowedThemes.includes(
        params.get("theme")
    )
        ? params.get("theme")
        : "romantic";


/*
   Lấy style từ URL
   Nếu không hợp lệ → glass
*/
const selectedStyle =
    allowedStyles.includes(
        params.get("style")
    )
        ? params.get("style")
        : "glass";


/*
   Áp dụng giao diện vào BODY
*/
document.body.classList.add(
    "theme-" + selectedTheme,
    "style-" + selectedStyle
);


/* -----------------------------------------
   Lấy các phần tử HTML
----------------------------------------- */

const openingScreen =
    document.getElementById(
        "openingScreen"
    );

const storyPage =
    document.getElementById(
        "storyPage"
    );

const openStoryBtn =
    document.getElementById(
        "openStoryBtn"
    );

const receiverNameEl =
    document.getElementById(
        "receiverName"
    );

const coupleNameEl =
    document.getElementById(
        "coupleName"
    );

const startDateTextEl =
    document.getElementById(
        "startDateText"
    );

const loveLetterEl =
    document.getElementById(
        "loveLetter"
    );


/* -----------------------------------------
   Hiển thị thông tin
----------------------------------------- */

if (receiverNameEl) {

    receiverNameEl.textContent =
        receiverName;

}

if (coupleNameEl) {

    coupleNameEl.textContent =
        coupleName;

}

if (loveLetterEl) {

    loveLetterEl.textContent =
        loveLetter;

}


/* -----------------------------------------
   Chuyển ngày YYYY-MM-DD
   thành ngày local
----------------------------------------- */

function parseLocalDate(dateString) {

    if (
        typeof dateString !== "string"
    ) {
        return null;
    }


    const parts =
        dateString.split("-");


    if (
        parts.length !== 3
    ) {
        return null;
    }


    const year =
        Number(parts[0]);

    const month =
        Number(parts[1]);

    const day =
        Number(parts[2]);


    if (
        !Number.isInteger(year) ||
        !Number.isInteger(month) ||
        !Number.isInteger(day)
    ) {
        return null;
    }


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


    if (
        isNaN(date.getTime())
    ) {
        return null;
    }


    /*
       Kiểm tra ngày thực tế.
       Ví dụ 2026-02-31 không được
       tự động biến thành tháng 3.
    */
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return null;
    }


    return date;
}


/* -----------------------------------------
   Hiển thị ngày
----------------------------------------- */

function formatDate(dateString) {

    const date =
        parseLocalDate(
            dateString
        );


    if (!date) {

        return dateString;

    }


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const year =
        date.getFullYear();


    return (
        `${day}/${month}/${year}`
    );
}


if (startDateTextEl) {

    startDateTextEl.textContent =
        formatDate(startDate);

}


/* -----------------------------------------
   Tính số năm / tháng / ngày / giờ...
----------------------------------------- */

function calculateCalendarDifference(
    start,
    now
) {

    if (
        now < start
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


    /* -------------------------------
       Tính số năm hoàn chỉnh
    ------------------------------- */

    let years =
        now.getFullYear() -
        start.getFullYear();


    let anniversary =
        new Date(

            start.getFullYear() +
                years,

            start.getMonth(),

            start.getDate(),

            start.getHours(),

            start.getMinutes(),

            start.getSeconds(),

            start.getMilliseconds()

        );


    if (
        anniversary > now
    ) {

        years--;


        anniversary =
            new Date(

                start.getFullYear() +
                    years,

                start.getMonth(),

                start.getDate(),

                start.getHours(),

                start.getMinutes(),

                start.getSeconds(),

                start.getMilliseconds()

            );

    }


    /* -------------------------------
       Tính số tháng hoàn chỉnh
    ------------------------------- */

    let months =
        (
            now.getFullYear() -
            anniversary.getFullYear()
        ) * 12
        +
        (
            now.getMonth() -
            anniversary.getMonth()
        );


    let monthPoint =
        new Date(

            anniversary.getFullYear(),

            anniversary.getMonth() +
                months,

            anniversary.getDate(),

            anniversary.getHours(),

            anniversary.getMinutes(),

            anniversary.getSeconds(),

            anniversary.getMilliseconds()

        );


    if (
        monthPoint > now
    ) {

        months--;


        monthPoint =
            new Date(

                anniversary.getFullYear(),

                anniversary.getMonth() +
                    months,

                anniversary.getDate(),

                anniversary.getHours(),

                anniversary.getMinutes(),

                anniversary.getSeconds(),

                anniversary.getMilliseconds()

            );

    }


    /* -------------------------------
       Phần thời gian còn lại
    ------------------------------- */

    let remaining =
        now - monthPoint;


    const SECOND =
        1000;

    const MINUTE =
        SECOND * 60;

    const HOUR =
        MINUTE * 60;

    const DAY =
        HOUR * 24;


    const days =
        Math.floor(
            remaining / DAY
        );


    remaining %= DAY;


    const hours =
        Math.floor(
            remaining / HOUR
        );


    remaining %= HOUR;


    const minutes =
        Math.floor(
            remaining / MINUTE
        );


    remaining %= MINUTE;


    const seconds =
        Math.floor(
            remaining / SECOND
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


/* -----------------------------------------
   Hàm cập nhật một phần tử
----------------------------------------- */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }
}


/* -----------------------------------------
   Cập nhật bộ đếm
----------------------------------------- */

function updateCounter() {

    const start =
        parseLocalDate(
            startDate
        );


    if (!start) {

        setText(
            "years",
            "0"
        );

        setText(
            "months",
            "0"
        );

        setText(
            "days",
            "0"
        );

        setText(
            "hours",
            "0"
        );

        setText(
            "minutes",
            "0"
        );

        setText(
            "seconds",
            "00"
        );

        setText(
            "totalDays",
            "0"
        );

        return;
    }


    const now =
        new Date();


    /* -----------------------------------
       Nếu ngày bắt đầu ở tương lai
    ----------------------------------- */

    if (
        start > now
    ) {

        setText(
            "years",
            "0"
        );

        setText(
            "months",
            "0"
        );

        setText(
            "days",
            "0"
        );

        setText(
            "hours",
            "0"
        );

        setText(
            "minutes",
            "0"
        );

        setText(
            "seconds",
            "00"
        );

        setText(
            "totalDays",
            "0"
        );

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


    setText(
        "years",
        difference.years
    );


    setText(
        "months",
        difference.months
    );


    setText(
        "days",
        difference.days
    );


    setText(
        "hours",
        difference.hours
    );


    setText(
        "minutes",
        difference.minutes
    );


    setText(
        "seconds",
        String(
            difference.seconds
        ).padStart(2, "0")
    );


    /* -----------------------------------
       TỔNG SỐ NGÀY
    ----------------------------------- */

    const totalMilliseconds =
        now - start;


    const totalDays =
        Math.floor(
            totalMilliseconds /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    setText(
        "totalDays",
        totalDays.toLocaleString(
            "vi-VN"
        )
    );
}


/* -----------------------------------------
   Chạy counter
----------------------------------------- */

updateCounter();


const counterInterval =
    setInterval(
        updateCounter,
        1000
    );


/* -----------------------------------------
   Mở câu chuyện
----------------------------------------- */

if (
    openStoryBtn &&
    openingScreen
) {

    openStoryBtn.addEventListener(
        "click",
        function () {

            openingScreen.classList.add(
                "hide"
            );


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

}


/* -----------------------------------------
   Khởi tạo trạng thái
----------------------------------------- */

if (storyPage) {

    storyPage.style.display =
        "block";

}


/*
   Khi mở trực tiếp gift URL,
   khóa scroll để người nhận
   tập trung vào màn hình mở quà.
*/
if (
    openingScreen &&
    !openingScreen.classList.contains(
        "hide"
    )
) {

    document.body.style.overflow =
        "hidden";

}


/* -----------------------------------------
   Tim bay
----------------------------------------- */

const heartsContainer =
    document.getElementById(
        "heartsContainer"
    );


function createHeart() {

    if (!heartsContainer) {

        return;

    }


    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "floating-heart";


    heart.textContent =
        Math.random() > 0.5
            ? "❤️"
            : "💕";


    heart.style.left =
        Math.random() * 100 +
        "%";


    heart.style.fontSize =
        (
            14 +
            Math.random() * 18
        ) +
        "px";


    const duration =
        6 +
        Math.random() * 7;


    heart.style.animationDuration =
        duration +
        "s";


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


/* -----------------------------------------
   Tim bay định kỳ
----------------------------------------- */

const heartInterval =
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