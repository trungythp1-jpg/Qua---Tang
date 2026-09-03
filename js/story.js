/* =========================================
   LOVE STORY
   ========================================= */


/* =========================================
   1. LẤY DỮ LIỆU TỪ URL
   ========================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


const coupleName =
    params.get("c") ||
    "Trung Trang";


const receiverName =
    params.get("t") ||
    "Em";


const startDate =
    params.get("d") ||
    "2018-03-04";


const musicUrl =
    params.get("m") ||
    "";


const loveLetter =
    params.get("l") ||
    "Cảm ơn em vì đã xuất hiện trong cuộc đời anh.\n\nMong rằng chúng ta sẽ luôn ở bên nhau và cùng viết tiếp câu chuyện này. ❤️";


const selectedTheme =
    params.get("theme") ||
    "romantic";


const selectedStyle =
    params.get("style") ||
    "glass";


/* =========================================
   2. LẤY ELEMENT
   ========================================= */

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


const musicSection =
    document.getElementById(
        "musicSection"
    );


const youtubePlayer =
    document.getElementById(
        "youtubePlayer"
    );


/* =========================================
   3. ÁP DỤNG THEME + STYLE
   ========================================= */

function applyVisualTheme() {

    const safeThemes = [
        "romantic",
        "rose",
        "purple",
        "pink",
        "night",
        "sunset"
    ];


    const safeStyles = [
        "glass",
        "luxury",
        "sakura",
        "cinematic",
        "letter",
        "minimal"
    ];


    const theme =
        safeThemes.includes(
            selectedTheme
        )
            ? selectedTheme
            : "romantic";


    const style =
        safeStyles.includes(
            selectedStyle
        )
            ? selectedStyle
            : "glass";


    document.body.classList.add(
        "theme-" + theme
    );


    document.body.classList.add(
        "style-" + style
    );

}


applyVisualTheme();


/* =========================================
   4. HIỂN THỊ THÔNG TIN
   ========================================= */

receiverNameEl.textContent =
    receiverName;


coupleNameEl.textContent =
    coupleName;


loveLetterEl.textContent =
    loveLetter;


/* =========================================
   5. NGÀY LOCAL
   ========================================= */

function parseLocalDate(
    dateString
) {

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
        isNaN(
            date.getTime()
        )
    ) {

        return null;

    }


    /*
       Kiểm tra ngày thực tế.
       Ví dụ 31/02 không được chấp nhận.
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


/* =========================================
   6. FORMAT NGÀY
   ========================================= */

function formatDate(
    dateString
) {

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
        ).padStart(
            2,
            "0"
        );


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const year =
        date.getFullYear();


    return (
        day +
        "/" +
        month +
        "/" +
        year
    );

}


startDateTextEl.textContent =
    formatDate(
        startDate
    );


/* =========================================
   7. TÍNH NĂM / THÁNG / NGÀY / GIỜ
   ========================================= */

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
            start.getSeconds()
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
                start.getSeconds()
            );

    }


    let months =
        (
            now.getFullYear() -
            anniversary.getFullYear()
        ) *
            12
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
            anniversary.getSeconds()
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
                anniversary.getSeconds()
            );

    }


    let remaining =
        now -
        monthPoint;


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


/* =========================================
   8. COUNTER
   ========================================= */

function updateCounter() {

    const start =
        parseLocalDate(
            startDate
        );


    if (!start) {

        return;

    }


    const now =
        new Date();


    const ids = [
        "years",
        "months",
        "days",
        "hours",
        "minutes",
        "seconds",
        "totalDays"
    ];


    if (
        start > now
    ) {

        ids.forEach(
            id => {

                const el =
                    document.getElementById(
                        id
                    );


                if (el) {

                    el.textContent =
                        id === "seconds"
                            ? "00"
                            : "0";

                }

            }
        );


        return;

    }


    const difference =
        calculateCalendarDifference(
            start,
            now
        );


    document.getElementById(
        "years"
    ).textContent =
        difference.years;


    document.getElementById(
        "months"
    ).textContent =
        difference.months;


    document.getElementById(
        "days"
    ).textContent =
        difference.days;


    document.getElementById(
        "hours"
    ).textContent =
        difference.hours;


    document.getElementById(
        "minutes"
    ).textContent =
        difference.minutes;


    document.getElementById(
        "seconds"
    ).textContent =
        String(
            difference.seconds
        ).padStart(
            2,
            "0"
        );


    /*
       Tổng số ngày thực tế
    */

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


    document.getElementById(
        "totalDays"
    ).textContent =
        totalDays.toLocaleString(
            "vi-VN"
        );

}


updateCounter();


setInterval(
    updateCounter,
    1000
);


/* =========================================
   9. YOUTUBE
   ========================================= */

function getYouTubeId(
    value
) {

    if (!value) {

        return null;

    }


    const input =
        value.trim();


    /*
       ID YouTube 11 ký tự
    */

    if (
        /^[a-zA-Z0-9_-]{11}$/.test(
            input
        )
    ) {

        return input;

    }


    let url;


    try {

        url =
            new URL(
                input
            );

    } catch (error) {

        return null;

    }


    const hostname =
        url.hostname
            .replace(
                /^www\./,
                ""
            )
            .toLowerCase();


    /*
       youtu.be/VIDEO_ID
    */

    if (
        hostname ===
            "youtu.be"
    ) {

        const id =
            url.pathname
                .replace(
                    /^\/+/,
                    ""
                )
                .split("/")[0];


        return isValidYouTubeId(
            id
        )
            ? id
            : null;

    }


    /*
       youtube.com
    */

    if (
        hostname ===
            "youtube.com" ||
        hostname.endsWith(
            ".youtube.com"
        )
    ) {

        /*
           watch?v=
        */

        const watchId =
            url.searchParams.get(
                "v"
            );


        if (
            isValidYouTubeId(
                watchId
            )
        ) {

            return watchId;

        }


        /*
           /shorts/ID
           /embed/ID
           /live/ID
        */

        const parts =
            url.pathname
                .split("/")
                .filter(Boolean);


        if (
            parts.length >= 2
        ) {

            const type =
                parts[0];


            if (
                type === "shorts" ||
                type === "embed" ||
                type === "live"
            ) {

                const id =
                    parts[1];


                if (
                    isValidYouTubeId(
                        id
                    )
                ) {

                    return id;

                }

            }

        }

    }


    return null;

}


/* =========================================
   10. KIỂM TRA YOUTUBE ID
   ========================================= */

function isValidYouTubeId(
    id
) {

    return (
        typeof id ===
            "string" &&
        /^[a-zA-Z0-9_-]{11}$/.test(
            id
        )
    );

}


/* =========================================
   11. KHỞI TẠO YOUTUBE
   ========================================= */

function setupYouTube() {

    if (
        !musicSection ||
        !youtubePlayer
    ) {

        return;

    }


    const youtubeId =
        getYouTubeId(
            musicUrl
        );


    /*
       Không có nhạc
    */

    if (!youtubeId) {

        musicSection.style.display =
            "none";

        return;

    }


    /*
       Có nhạc
    */

    youtubePlayer.src =
        "https://www.youtube.com/embed/" +
        youtubeId +
        "?rel=0" +
        "&modestbranding=1" +
        "&playsinline=1";


    musicSection.style.display =
        "";

}


setupYouTube();


/* =========================================
   12. MỞ CÂU CHUYỆN
   ========================================= */

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


/* =========================================
   13. TRẠNG THÁI BAN ĐẦU
   ========================================= */

storyPage.style.display =
    "block";


document.body.style.overflow =
    "hidden";


/* =========================================
   14. TIM BAY
   ========================================= */

const heartsContainer =
    document.getElementById(
        "heartsContainer"
    );


function createHeart() {

    if (
        !heartsContainer
    ) {

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
        duration * 1000 +
        500
    );

}


setInterval(
    createHeart,
    1200
);


/* =========================================
   15. TIM BAN ĐẦU
   ========================================= */

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