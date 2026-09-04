"use strict";

/* =========================================================
   TAO QUA
   LOVE STORY • DIGITAL GIFT
   VERSION 2
   ========================================================= */


/* =========================================================
   1. TRẠNG THÁI
   ========================================================= */

let selectedTheme = "romantic";
let selectedStyle = "glass";


/* =========================================================
   2. ELEMENTS
   ========================================================= */

const coupleInput =
    document.getElementById("couple");

const receiverInput =
    document.getElementById("receiver");

const dateInput =
    document.getElementById("startDate");

const musicInput =
    document.getElementById("music");

const letterInput =
    document.getElementById("letter");

const createButton =
    document.getElementById("createButton");

const result =
    document.getElementById("result");

const generatedLink =
    document.getElementById("generatedLink");

const qrImage =
    document.getElementById("qrImage");

const copyButton =
    document.getElementById("copyButton");

const openButton =
    document.getElementById("openButton");


const themeButtons =
    document.querySelectorAll(
        ".theme-option"
    );

const styleButtons =
    document.querySelectorAll(
        ".style-option"
    );


/* =========================================================
   3. THEME ANIMATION
   ========================================================= */

function refreshCardSelection(buttons, activeButton) {

    buttons.forEach(
        button => {

            button.classList.remove(
                "active"
            );

        }
    );


    activeButton.classList.add(
        "active"
    );

}


/* =========================================================
   4. CHỌN MÀU
   ========================================================= */

themeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const theme =
                    button.dataset.theme;


                const allowedThemes = [
                    "romantic",
                    "rose",
                    "purple",
                    "pink",
                    "night",
                    "sunset"
                ];


                if (
                    !allowedThemes.includes(
                        theme
                    )
                ) {

                    return;

                }


                selectedTheme =
                    theme;


                refreshCardSelection(
                    themeButtons,
                    button
                );


                applyCreateTheme();

            }
        );

    }
);


/* =========================================================
   5. CHỌN PHONG CÁCH
   ========================================================= */

styleButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const style =
                    button.dataset.style;


                const allowedStyles = [
                    "glass",
                    "luxury",
                    "sakura",
                    "cinematic",
                    "letter",
                    "minimal"
                ];


                if (
                    !allowedStyles.includes(
                        style
                    )
                ) {

                    return;

                }


                selectedStyle =
                    style;


                refreshCardSelection(
                    styleButtons,
                    button
                );


                applyCreateStyle();

            }
        );

    }
);


/* =========================================================
   6. ÁP DỤNG THEME
   ========================================================= */

function applyCreateTheme() {

    const themes = [
        "romantic",
        "rose",
        "purple",
        "pink",
        "night",
        "sunset"
    ];


    themes.forEach(
        theme => {

            document.body.classList.remove(
                "theme-" + theme
            );

        }
    );


    document.body.classList.add(
        "theme-" + selectedTheme
    );

}


/* =========================================================
   7. ÁP DỤNG STYLE
   ========================================================= */

function applyCreateStyle() {

    const styles = [
        "glass",
        "luxury",
        "sakura",
        "cinematic",
        "letter",
        "minimal"
    ];


    styles.forEach(
        style => {

            document.body.classList.remove(
                "style-" + style
            );

        }
    );


    document.body.classList.add(
        "style-" + selectedStyle
    );

}


/* =========================================================
   8. YOUTUBE ID
   ========================================================= */

function getYouTubeId(value) {

    if (!value) {

        return null;

    }


    const input =
        value.trim();


    /*
       ID trực tiếp
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

    } catch {

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
       youtu.be
    */

    if (
        hostname === "youtu.be"
    ) {

        const id =
            url.pathname
                .replace(
                    /^\/+/,
                    ""
                )
                .split("/")[0];


        if (
            /^[a-zA-Z0-9_-]{11}$/.test(
                id
            )
        ) {

            return id;

        }


        return null;

    }


    /*
       youtube.com
    */

    if (
        hostname === "youtube.com" ||
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
            watchId &&
            /^[a-zA-Z0-9_-]{11}$/.test(
                watchId
            )
        ) {

            return watchId;

        }


        /*
           shorts
           embed
           live
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


            const id =
                parts[1];


            if (
                (
                    type === "shorts" ||
                    type === "embed" ||
                    type === "live"
                ) &&
                /^[a-zA-Z0-9_-]{11}$/.test(
                    id
                )
            ) {

                return id;

            }

        }

    }


    return null;

}


/* =========================================================
   9. VALIDATE YOUTUBE
   ========================================================= */

function validateYouTubeInput() {

    if (!musicInput) {

        return true;

    }


    const music =
        musicInput.value.trim();


    /*
       Không nhập nhạc
       → cho phép
    */

    if (!music) {

        return true;

    }


    const youtubeId =
        getYouTubeId(
            music
        );


    if (!youtubeId) {

        alert(
            "Link YouTube chưa đúng.\n\n" +
            "Bạn có thể nhập:\n" +
            "• youtu.be/VIDEO_ID\n" +
            "• youtube.com/watch?v=VIDEO_ID\n" +
            "• youtube.com/shorts/VIDEO_ID\n" +
            "• youtube.com/embed/VIDEO_ID\n" +
            "• youtube.com/live/VIDEO_ID\n" +
            "• Hoặc nhập trực tiếp ID video."
        );


        musicInput.focus();


        return false;

    }


    return true;

}


/* =========================================================
   10. KIỂM TRA NGÀY
   ========================================================= */

function validateStartDate(date) {

    if (!date) {

        alert(
            "Bạn chưa chọn ngày bắt đầu."
        );


        dateInput?.focus();


        return false;

    }


    const selectedDate =
        new Date(
            date +
            "T00:00:00"
        );


    if (
        Number.isNaN(
            selectedDate.getTime()
        )
    ) {

        alert(
            "Ngày bắt đầu không hợp lệ."
        );


        dateInput?.focus();


        return false;

    }


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    if (
        selectedDate > today
    ) {

        alert(
            "Ngày bắt đầu không thể ở tương lai."
        );


        dateInput?.focus();


        return false;

    }


    return true;

}


/* =========================================================
   11. LẤY DỮ LIỆU
   ========================================================= */

function getFormData() {

    return {

        couple:
            coupleInput
                ? coupleInput.value.trim()
                : "",

        receiver:
            receiverInput
                ? receiverInput.value.trim()
                : "",

        date:
            dateInput
                ? dateInput.value
                : "",

        music:
            musicInput
                ? musicInput.value.trim()
                : "",

        letter:
            letterInput
                ? letterInput.value.trim()
                : ""

    };

}


/* =========================================================
   12. VALIDATE FORM
   ========================================================= */

function validateForm(data) {

    if (!data.couple) {

        alert(
            "Bạn chưa nhập tên hai người."
        );


        coupleInput?.focus();


        return false;

    }


    if (!data.receiver) {

        alert(
            "Bạn chưa nhập tên người nhận."
        );


        receiverInput?.focus();


        return false;

    }


    if (
        !validateStartDate(
            data.date
        )
    ) {

        return false;

    }


    if (
        !validateYouTubeInput()
    ) {

        return false;

    }


    return true;

}


/* =========================================================
   13. TẠO URL
   ========================================================= */

function buildGiftURL(data) {

    const params =
        new URLSearchParams();


    /*
       Couple
    */

    params.set(
        "c",
        data.couple
    );


    /*
       Receiver
    */

    params.set(
        "t",
        data.receiver
    );


    /*
       Start date
    */

    params.set(
        "d",
        data.date
    );


    /*
       Music
    */

    if (data.music) {

        params.set(
            "m",
            data.music
        );

    }


    /*
       Love letter
    */

    if (data.letter) {

        params.set(
            "l",
            data.letter
        );

    }


    /*
       Theme
    */

    params.set(
        "theme",
        selectedTheme
    );


    /*
       Style
    */

    params.set(
        "style",
        selectedStyle
    );


    /*
       Luôn tạo URL từ index.html
    */

    const indexURL =
        new URL(
            "index.html",
            window.location.href
        );


    indexURL.search =
        params.toString();


    return indexURL.toString();

}


/* =========================================================
   14. TẠO QR
   ========================================================= */

function createQRCode(url) {

    if (!qrImage) {

        return;

    }


    /*
       Hiển thị trạng thái tải
    */

    qrImage.alt =
        "Đang tạo mã QR...";


    /*
       QR Server
    */

    const qrURL =
        "https://api.qrserver.com/v1/create-qr-code/?" +
        "size=700x700" +
        "&margin=20" +
        "&data=" +
        encodeURIComponent(
            url
        );


    qrImage.onload =
        () => {

            qrImage.alt =
                "Mã QR món quà";

        };


    qrImage.onerror =
        () => {

            qrImage.alt =
                "Không thể tải mã QR. Vui lòng thử lại.";

        };


    qrImage.src =
        qrURL;

}


/* =========================================================
   15. HIỆN KẾT QUẢ
   ========================================================= */

function showResult(url) {

    if (!result) {

        return;

    }


    if (generatedLink) {

        generatedLink.value =
            url;

    }


    createQRCode(
        url
    );


    result.classList.remove(
        "hidden"
    );


    /*
       Cuộn đến kết quả
    */

    window.setTimeout(
        () => {

            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        80
    );

}


/* =========================================================
   16. NÚT TẠO QUÀ
   ========================================================= */

function createGift() {

    const data =
        getFormData();


    if (
        !validateForm(
            data
        )
    ) {

        return;

    }


    const finalURL =
        buildGiftURL(
            data
        );


    showResult(
        finalURL
    );


    /*
       Đổi trạng thái nút
       để người dùng biết đã tạo xong
    */

    if (createButton) {

        const originalText =
            createButton.dataset.originalText ||
            createButton.textContent;


        createButton.dataset.originalText =
            originalText;


        createButton.textContent =
            "✨ Đã tạo món quà";


        window.clearTimeout(
            createButton._resetTimer
        );


        createButton._resetTimer =
            window.setTimeout(
                () => {

                    createButton.textContent =
                        originalText;

                },
                2200
            );

        }

}


/* =========================================================
   17. COPY LINK
   ========================================================= */

async function copyGiftLink() {

    if (!generatedLink) {

        return;

    }


    const link =
        generatedLink.value.trim();


    if (!link) {

        alert(
            "Bạn hãy tạo món quà trước."
        );


        return;

    }


    let copied = false;


    /*
       Clipboard API
    */

    try {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(
                link
            );

            copied = true;

        }

    } catch {

        copied = false;

    }


    /*
       Fallback
    */

    if (!copied) {

        try {

            generatedLink.focus();

            generatedLink.select();

            generatedLink.setSelectionRange(
                0,
                generatedLink.value.length
            );


            copied =
                document.execCommand(
                    "copy"
                );

        } catch {

            copied = false;

        }

    }


    if (!copied) {

        alert(
            "Không thể tự động sao chép.\n\n" +
            "Bạn hãy nhấn giữ vào đường link để sao chép."
        );


        return;

    }


    /*
       Feedback
    */

    if (copyButton) {

        const oldText =
            copyButton.dataset.defaultText ||
            copyButton.textContent;


        copyButton.dataset.defaultText =
            oldText;


        copyButton.textContent =
            "✓ Đã sao chép";


        copyButton.classList.add(
            "copied"
        );


        window.clearTimeout(
            copyButton._resetTimer
        );


        copyButton._resetTimer =
            window.setTimeout(
                () => {

                    copyButton.textContent =
                        oldText;

                    copyButton.classList.remove(
                        "copied"
                    );

                },
                1800
            );

    }

}


/* =========================================================
   18. MỞ QUÀ
   ========================================================= */

function openGift() {

    if (!generatedLink) {

        return;

    }


    const link =
        generatedLink.value.trim();


    if (!link) {

        alert(
            "Bạn hãy tạo món quà trước."
        );


        return;

    }


    window.location.href =
        link;

}


/* =========================================================
   19. TẢI QR
   ========================================================= */

async function downloadQR() {

    if (!qrImage || !qrImage.src) {

        alert(
            "Bạn hãy tạo mã QR trước."
        );


        return;

    }


    try {

        /*
           Tải ảnh QR trực tiếp
        */

        const response =
            await fetch(
                qrImage.src
            );


        if (!response.ok) {

            throw new Error(
                "QR download failed"
            );

        }


        const blob =
            await response.blob();


        const blobURL =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            blobURL;


        link.download =
            "love-story-qr.png";


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        URL.revokeObjectURL(
            blobURL
        );


    } catch {

        /*
           Nếu trình duyệt chặn fetch
           mở ảnh QR để người dùng lưu thủ công.
        */

        window.open(
            qrImage.src,
            "_blank",
            "noopener"
        );

    }

}


/* =========================================================
   20. TẠO NÚT TẢI QR NẾU CHƯA CÓ
   ========================================================= */

function setupDownloadButton() {

    if (!qrImage) {

        return;

    }


    const qrWrapper =
        qrImage.closest(
            ".qr-wrapper"
        );


    if (!qrWrapper) {

        return;

    }


    /*
       Nếu sau này index đã có nút
       #downloadQR thì dùng nút đó.
    */

    let downloadButton =
        document.getElementById(
            "downloadQR"
        );


    /*
       Nếu chưa có thì tạo tự động.
    */

    if (!downloadButton) {

        downloadButton =
            document.createElement(
                "button"
            );


        downloadButton.id =
            "downloadQR";


        downloadButton.type =
            "button";


        downloadButton.className =
            "secondary-button";


        downloadButton.textContent =
            "⬇️ Tải mã QR";


        downloadButton.style.width =
            "100%";


        downloadButton.style.marginTop =
            "14px";


        qrWrapper.appendChild(
            downloadButton
        );

    }


    downloadButton.addEventListener(
        "click",
        downloadQR
    );

}


/* =========================================================
   21. INITIALIZE
   ========================================================= */

function initializeSelections() {

    /*
       Theme
    */

    let themeFound =
        false;


    themeButtons.forEach(
        button => {

            if (
                button.dataset.theme ===
                selectedTheme
            ) {

                button.classList.add(
                    "active"
                );

                themeFound =
                    true;

            } else {

                button.classList.remove(
                    "active"
                );

            }

        }
    );


    if (!themeFound) {

        selectedTheme =
            "romantic";

    }


    /*
       Style
    */

    let styleFound =
        false;


    styleButtons.forEach(
        button => {

            if (
                button.dataset.style ===
                selectedStyle
            ) {

                button.classList.add(
                    "active"
                );

                styleFound =
                    true;

            } else {

                button.classList.remove(
                    "active"
                );

            }

        }
    );


    if (!styleFound) {

        selectedStyle =
            "glass";

    }


    applyCreateTheme();

    applyCreateStyle();

}


/* =========================================================
   22. EVENTS
   ========================================================= */

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


/* =========================================================
   23. START
   ========================================================= */

initializeSelections();

setupDownloadButton();


/* =========================================================
   24. DEBUG
   ========================================================= */

console.log(
    "Love Story Gift Creator V2 loaded.",
    {
        theme: selectedTheme,
        style: selectedStyle
    }
);