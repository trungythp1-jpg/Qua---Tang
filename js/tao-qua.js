"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const coupleInput = document.getElementById("couple");
    const receiverInput = document.getElementById("receiver");
    const startDateInput = document.getElementById("startDate");
    const musicInput = document.getElementById("music");
    const letterInput = document.getElementById("letter");

    const createButton = document.getElementById("createButton");

    const result = document.getElementById("result");
    const generatedLink = document.getElementById("generatedLink");
    const copyButton = document.getElementById("copyButton");
    const openButton = document.getElementById("openButton");
    const qrImage = document.getElementById("qrImage");

    const previewScreen = document.getElementById("previewScreen");
    const previewReceiver = document.getElementById("previewReceiver");
    const previewCouple = document.getElementById("previewCouple");
    const previewDate = document.getElementById("previewDate");
    const previewDays = document.getElementById("previewDays");
    const previewHours = document.getElementById("previewHours");
    const previewMinutes = document.getElementById("previewMinutes");
    const previewLetter = document.getElementById("previewLetter");
    const previewStyleName = document.getElementById("previewStyleName");

    let selectedTheme = "romantic";
    let selectedStyle = "glass";

    let generatedGiftURL = "";


    /* =====================================================
       CONSTANTS
       ===================================================== */

    const VALID_THEMES = [
        "romantic",
        "rose",
        "purple",
        "pink",
        "night",
        "sunset"
    ];

    const VALID_STYLES = [
        "glass",
        "luxury",
        "sakura",
        "cinematic",
        "letter",
        "minimal"
    ];


    const STYLE_NAMES = {
        glass: "GLASS ROMANCE",
        luxury: "LUXURY LOVE",
        sakura: "SAKURA DREAM",
        cinematic: "CINEMATIC",
        letter: "LOVE LETTER",
        minimal: "MINIMAL LOVE"
    };


    /* =====================================================
       THEME SELECTION
       ===================================================== */

    document.querySelectorAll(".theme-option").forEach(button => {

        button.addEventListener("click", () => {

            const theme = button.dataset.theme;

            if (!VALID_THEMES.includes(theme)) {
                return;
            }

            selectedTheme = theme;

            document.querySelectorAll(".theme-option")
                .forEach(item => item.classList.remove("active"));

            button.classList.add("active");

            updatePreview();

        });

    });


    /* =====================================================
       STYLE SELECTION
       ===================================================== */

    document.querySelectorAll(".style-option").forEach(button => {

        button.addEventListener("click", () => {

            const style = button.dataset.style;

            if (!VALID_STYLES.includes(style)) {
                return;
            }

            selectedStyle = style;

            document.querySelectorAll(".style-option")
                .forEach(item => item.classList.remove("active"));

            button.classList.add("active");

            updatePreview();

        });

    });


    /* =====================================================
       LIVE INPUT
       ===================================================== */

    [
        coupleInput,
        receiverInput,
        startDateInput,
        musicInput,
        letterInput
    ].forEach(input => {

        if (!input) return;

        input.addEventListener("input", updatePreview);
        input.addEventListener("change", updatePreview);

    });


    /* =====================================================
       DATE FORMAT
       ===================================================== */

    function parseLocalDate(value) {

        if (!value) return null;

        const parts = value.split("-").map(Number);

        if (parts.length !== 3) return null;

        const [year, month, day] = parts;

        const date = new Date(
            year,
            month - 1,
            day
        );

        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day
        ) {
            return null;
        }

        return date;
    }


    function formatDate(date) {

        if (!date) return "Chưa chọn ngày";

        return [
            String(date.getDate()).padStart(2, "0"),
            String(date.getMonth() + 1).padStart(2, "0"),
            date.getFullYear()
        ].join("/");
    }


    /* =====================================================
       COUNTER
       ===================================================== */

    function calculateTotalDays(date) {

        if (!date) return 0;

        const now = new Date();

        if (date > now) return 0;

        const diff =
            now.getTime() - date.getTime();

        return Math.floor(
            diff / 86400000
        );
    }


    function calculateTime(date) {

        if (!date) {

            return {
                days: 0,
                hours: 0,
                minutes: 0
            };

        }

        const now = new Date();

        if (date > now) {

            return {
                days: 0,
                hours: 0,
                minutes: 0
            };

        }

        const diff =
            now.getTime() - date.getTime();

        const days =
            Math.floor(diff / 86400000);

        const hours =
            Math.floor(
                (diff % 86400000) / 3600000
            );

        const minutes =
            Math.floor(
                (diff % 3600000) / 60000
            );

        return {
            days,
            hours,
            minutes
        };

    }


    /* =====================================================
       LIVE PREVIEW
       ===================================================== */

    function updatePreview() {

        if (!previewScreen) return;

        const couple =
            coupleInput?.value.trim() ||
            "Anh & Em";

        const receiver =
            receiverInput?.value.trim() ||
            "em";

        const letter =
            letterInput?.value.trim() ||
            "Anh Yêu Em ❤️";

        const date =
            parseLocalDate(
                startDateInput?.value
            );


        /* NAME */

        previewReceiver.textContent = receiver;
        previewCouple.textContent = couple;


        /* DATE */

        previewDate.textContent =
            date
                ? formatDate(date)
                : "Chưa chọn ngày";


        /* COUNTER */

        const counter =
            calculateTime(date);

        previewDays.textContent =
            counter.days;

        previewHours.textContent =
            String(counter.hours)
                .padStart(2, "0");

        previewMinutes.textContent =
            String(counter.minutes)
                .padStart(2, "0");


        /* LETTER */

        previewLetter.textContent =
            letter;


        /* THEME */

        VALID_THEMES.forEach(theme => {

            previewScreen.classList.remove(
                `preview-theme-${theme}`
            );

        });

        previewScreen.classList.add(
            `preview-theme-${selectedTheme}`
        );


        /* STYLE */

        VALID_STYLES.forEach(style => {

            previewScreen.classList.remove(
                `preview-style-${style}`
            );

        });

        previewScreen.classList.add(
            `preview-style-${selectedStyle}`
        );


        previewStyleName.textContent =
            STYLE_NAMES[selectedStyle] ||
            selectedStyle.toUpperCase();

    }


    /* =====================================================
       YOUTUBE PARSER
       ===================================================== */

    function extractYouTubeId(value) {

        if (!value) return null;

        const input = value.trim();

        /* Raw ID */

        if (/^[A-Za-z0-9_-]{11}$/.test(input)) {
            return input;
        }


        try {

            const url = new URL(input);

            const host =
                url.hostname
                    .toLowerCase()
                    .replace(/^www\./, "");


            if (
                host === "youtu.be"
            ) {

                const id =
                    url.pathname
                        .split("/")
                        .filter(Boolean)[0];

                return /^[A-Za-z0-9_-]{11}$/.test(id)
                    ? id
                    : null;
            }


            if (
                host === "youtube.com" ||
                host === "m.youtube.com"
            ) {

                /* watch?v= */

                const watchID =
                    url.searchParams.get("v");

                if (
                    watchID &&
                    /^[A-Za-z0-9_-]{11}$/.test(watchID)
                ) {
                    return watchID;
                }


                /* shorts */

                const shorts =
                    url.pathname.match(
                        /^\/shorts\/([A-Za-z0-9_-]{11})/
                    );

                if (shorts) {
                    return shorts[1];
                }


                /* embed */

                const embed =
                    url.pathname.match(
                        /^\/embed\/([A-Za-z0-9_-]{11})/
                    );

                if (embed) {
                    return embed[1];
                }


                /* live */

                const live =
                    url.pathname.match(
                        /^\/live\/([A-Za-z0-9_-]{11})/
                    );

                if (live) {
                    return live[1];
                }

            }

        } catch (error) {

            return null;

        }

        return null;
    }


    /* =====================================================
       VALIDATE DATE
       ===================================================== */

    function validateStartDate() {

        const date =
            parseLocalDate(
                startDateInput.value
            );

        if (!date) {

            alert("Vui lòng chọn ngày bắt đầu yêu.");

            return false;
        }


        const now = new Date();

        now.setHours(23, 59, 59, 999);

        if (date > now) {

            alert("Ngày bắt đầu yêu không thể ở tương lai.");

            return false;
        }

        return true;

    }


    /* =====================================================
       CREATE URL
       ===================================================== */

    function buildGiftURL() {

        const url =
            new URL(
                "index.html",
                window.location.href
            );

        url.searchParams.set(
            "c",
            coupleInput.value.trim()
        );

        url.searchParams.set(
            "t",
            receiverInput.value.trim()
        );

        url.searchParams.set(
            "d",
            startDateInput.value
        );

        url.searchParams.set(
            "m",
            extractYouTubeId(
                musicInput.value.trim()
            )
        );

        url.searchParams.set(
            "l",
            letterInput.value.trim()
        );

        url.searchParams.set(
            "theme",
            selectedTheme
        );

        url.searchParams.set(
            "style",
            selectedStyle
        );

        return url.href;

    }


    /* =====================================================
       QR
       ===================================================== */

    function createQRCode(url) {

        if (!qrImage) return;

        qrImage.src =
            "https://api.qrserver.com/v1/create-qr-code/" +
            "?size=700x700" +
            "&margin=20" +
            "&data=" +
            encodeURIComponent(url);

    }


    /* =====================================================
       CREATE GIFT
       ===================================================== */

    function createGift() {

        const couple =
            coupleInput.value.trim();

        const receiver =
            receiverInput.value.trim();

        const music =
            musicInput.value.trim();

        const letter =
            letterInput.value.trim();


        if (!couple) {

            alert("Vui lòng nhập tên hai người.");

            coupleInput.focus();

            return;
        }


        if (!receiver) {

            alert("Vui lòng nhập tên người nhận.");

            receiverInput.focus();

            return;
        }


        if (!validateStartDate()) {
            return;
        }


        if (!music) {

            alert("Vui lòng nhập link YouTube.");

            musicInput.focus();

            return;
        }


        const youtubeID =
            extractYouTubeId(music);

        if (!youtubeID) {

            alert(
                "Link YouTube không hợp lệ.\n\n" +
                "Bạn có thể dùng link youtu.be, watch?v=, " +
                "shorts, embed, live hoặc ID video 11 ký tự."
            );

            musicInput.focus();

            return;
        }


        if (!letter) {

            alert("Bạn hãy viết một lời muốn nói ❤️");

            letterInput.focus();

            return;
        }


        generatedGiftURL =
            buildGiftURL();


        generatedLink.value =
            generatedGiftURL;


        createQRCode(
            generatedGiftURL
        );


        result.classList.remove("hidden");


        result.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    /* =====================================================
       COPY
       ===================================================== */

    async function copyGiftLink() {

        if (!generatedGiftURL) return;

        try {

            await navigator.clipboard.writeText(
                generatedGiftURL
            );

            const oldText =
                copyButton.textContent;

            copyButton.textContent =
                "✅ Đã sao chép!";

            setTimeout(() => {

                copyButton.textContent =
                    oldText;

            }, 1800);

        } catch (error) {

            generatedLink.focus();
            generatedLink.select();

            document.execCommand("copy");

            copyButton.textContent =
                "✅ Đã sao chép!";

            setTimeout(() => {

                copyButton.textContent =
                    "📋 Sao chép link";

            }, 1800);

        }

    }


    /* =====================================================
       OPEN
       ===================================================== */

    function openGift() {

        if (!generatedGiftURL) return;

        window.location.href =
            generatedGiftURL;

    }


    /* =====================================================
       EVENTS
       ===================================================== */

    if (createButton) {

        createButton.addEventListener(
            "click",
            createGift
        );

    }


    if (copyButton) {

        copyButton.addEventListener(
            "click",
            copyGiftLink
        );

    }


    if (openButton) {

        openButton.addEventListener(
            "click",
            openGift
        );

    }


    /* =====================================================
       INITIAL PREVIEW
       ===================================================== */

    updatePreview();

});