/* =========================================================
   TAO QUA
   LOVE STORY • DIGITAL GIFT
   ========================================================= */


/* =========================================================
   1. TRẠNG THÁI LỰA CHỌN
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


/* =========================================================
   3. KIỂM TRA ELEMENT BẮT BUỘC
   ========================================================= */

if (!createButton) {
    console.error(
        "Không tìm thấy #createButton"
    );
}


/* =========================================================
   4. THEME SELECT
   ========================================================= */

const themeButtons =
    document.querySelectorAll(
        ".theme-option"
    );


themeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                /*
                   Bỏ active ở tất cả màu
                */

                themeButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                /*
                   Active màu đang chọn
                */

                button.classList.add(
                    "active"
                );


                /*
                   Lưu theme
                */

                selectedTheme =
                    button.dataset.theme ||
                    "romantic";


                /*
                   Cập nhật preview
                */

                applyCreateTheme();

            }
        );

    }
);


/* =========================================================
   5. STYLE SELECT
   ========================================================= */

const styleButtons =
    document.querySelectorAll(
        ".style-option"
    );


styleButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                /*
                   Bỏ active ở tất cả phong cách
                */

                styleButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                /*
                   Active phong cách đang chọn
                */

                button.classList.add(
                    "active"
                );


                /*
                   Lưu style
                */

                selectedStyle =
                    button.dataset.style ||
                    "glass";


                /*
                   Cập nhật preview
                */

                applyCreateStyle();

            }
        );

    }
);


/* =========================================================
   6. ÁP DỤNG THEME CHO TRANG TẠO QUÀ
   ========================================================= */

function applyCreateTheme() {

    /*
       Xóa theme cũ
    */

    document.body.classList.remove(
        "theme-romantic",
        "theme-rose",
        "theme-purple",
        "theme-pink",
        "theme-night",
        "theme-sunset"
    );


    /*
       Thêm theme hiện tại
    */

    document.body.classList.add(
        "theme-" +
        selectedTheme
    );

}


/* =========================================================
   7. ÁP DỤNG STYLE CHO TRANG TẠO QUÀ
   ========================================================= */

function applyCreateStyle() {

    /*
       Xóa style cũ
    */

    document.body.classList.remove(
        "style-glass",
        "style-luxury",
        "style-sakura",
        "style-cinematic",
        "style-letter",
        "style-minimal"
    );


    /*
       Thêm style hiện tại
    */

    document.body.classList.add(
        "style-" +
        selectedStyle
    );

}


/* =========================================================
   8. KHỞI TẠO PREVIEW
   ========================================================= */

applyCreateTheme();

applyCreateStyle();


/* =========================================================
   9. YOUTUBE VALIDATOR
   ========================================================= */

function getYouTubeId(value) {

    if (!value) {

        return null;

    }


    const input =
        value.trim();


    /*
       Trường hợp nhập trực tiếp ID
       Ví dụ:
       dQw4w9WgXcQ
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
       -----------------------------------------
       youtu.be/VIDEO_ID
       -----------------------------------------
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
       -----------------------------------------
       youtube.com
       -----------------------------------------
    */

    if (
        hostname === "youtube.com" ||
        hostname.endsWith(
            ".youtube.com"
        )
    ) {

        /*
           watch?v=VIDEO_ID
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
           /shorts/VIDEO_ID
           /embed/VIDEO_ID
           /live/VIDEO_ID
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
   10. KIỂM TRA LINK YOUTUBE
   ========================================================= */

function validateYouTubeInput() {

    const music =
        musicInput.value.trim();


    /*
       Không nhập nhạc
       → vẫn cho tạo quà
    */

    if (!music) {

        return true;

    }


    /*
       Có nhập → phải là YouTube hợp lệ
    */

    const youtubeId =
        getYouTubeId(
            music
        );


    if (!youtubeId) {

        alert(
            "Link YouTube chưa đúng.\n\n" +
            "Bạn có thể nhập:\n" +
            "• https://youtu.be/VIDEO_ID\n" +
            "• https://www.youtube.com/watch?v=VIDEO_ID\n" +
            "• https://www.youtube.com/shorts/VIDEO_ID\n" +
            "• https://www.youtube.com/embed/VIDEO_ID\n" +
            "• Hoặc nhập trực tiếp ID video."
        );


        musicInput.focus();


        return false;

    }


    return true;

}


/* =========================================================
   11. TẠO QUÀ
   ========================================================= */

function createGift() {

    /*
       -----------------------------------------
       LẤY DỮ LIỆU
       -----------------------------------------
    */

    const couple =
        coupleInput
            ? coupleInput.value.trim()
            : "";


    const receiver =
        receiverInput
            ? receiverInput.value.trim()
            : "";


    const date =
        dateInput
            ? dateInput.value
            : "";


    const music =
        musicInput
            ? musicInput.value.trim()
            : "";


    const letter =
        letterInput
            ? letterInput.value.trim()
            : "";


    /*
       -----------------------------------------
       KIỂM TRA TÊN HAI NGƯỜI
       -----------------------------------------
    */

    if (!couple) {

        alert(
            "Bạn chưa nhập tên hai người."
        );


        if (coupleInput) {

            coupleInput.focus();

        }


        return;

    }


    /*
       -----------------------------------------
       KIỂM TRA NGƯỜI NHẬN
       -----------------------------------------
    */

    if (!receiver) {

        alert(
            "Bạn chưa nhập tên người nhận."
        );


        if (receiverInput) {

            receiverInput.focus();

        }


        return;

    }


    /*
       -----------------------------------------
       KIỂM TRA NGÀY
       -----------------------------------------
    */

    if (!date) {

        alert(
            "Bạn chưa chọn ngày bắt đầu."
        );


        if (dateInput) {

            dateInput.focus();

        }


        return;

    }


    /*
       -----------------------------------------
       KIỂM TRA NGÀY KHÔNG Ở TƯƠNG LAI
       -----------------------------------------
    */

    const selectedDate =
        new Date(
            date +
            "T00:00:00"
        );


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    if (
        isNaN(
            selectedDate.getTime()
        )
    ) {

        alert(
            "Ngày bắt đầu không hợp lệ."
        );


        dateInput.focus();


        return;

    }


    if (
        selectedDate > today
    ) {

        alert(
            "Ngày bắt đầu không thể ở tương lai."
        );


        dateInput.focus();


        return;

    }


    /*
       -----------------------------------------
       KIỂM TRA YOUTUBE
       -----------------------------------------
    */

    if (
        !validateYouTubeInput()
    ) {

        return;

    }


    /*
       -----------------------------------------
       TẠO PARAMS
       -----------------------------------------
    */

    const params =
        new URLSearchParams();


    /*
       Tên hai người
       c
    */

    params.set(
        "c",
        couple
    );


    /*
       Người nhận
       t
    */

    params.set(
        "t",
        receiver
    );


    /*
       Ngày bắt đầu
       d
    */

    params.set(
        "d",
        date
    );


    /*
       YouTube
       m

       Chỉ thêm nếu người dùng có nhập.
    */

    if (music) {

        params.set(
            "m",
            music
        );

    }


    /*
       Lời yêu thương
       l
    */

    if (letter) {

        params.set(
            "l",
            letter
        );

    }


    /*
       Màu
       theme
    */

    params.set(
        "theme",
        selectedTheme
    );


    /*
       Phong cách
       style
    */

    params.set(
        "style",
        selectedStyle
    );


    /*
       -----------------------------------------
       TẠO URL
       -----------------------------------------
    */

    const indexURL =
        new URL(
            "index.html",
            window.location.href
        );


    indexURL.search =
        params.toString();


    const finalURL =
        indexURL.toString();


    /*
       -----------------------------------------
       HIỂN THỊ LINK
       -----------------------------------------
    */

    if (generatedLink) {

        generatedLink.value =
            finalURL;

    }


    /*
       -----------------------------------------
       TẠO QR
       -----------------------------------------
    */

    if (qrImage) {

        qrImage.src =
            "https://api.qrserver.com/v1/create-qr-code/?" +
            "size=700x700" +
            "&margin=20" +
            "&data=" +
            encodeURIComponent(
                finalURL
            );

    }


    /*
       -----------------------------------------
       HIỆN KẾT QUẢ
       -----------------------------------------
    */

    if (result) {

        result.classList.remove(
            "hidden"
        );


        result.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================================================
   12. NÚT TẠO QUÀ
   ========================================================= */

if (createButton) {

    createButton.addEventListener(
        "click",
        createGift
    );

}


/* =========================================================
   13. SAO CHÉP LINK
   ========================================================= */

if (copyButton) {

    copyButton.addEventListener(
        "click",
        async () => {

            const link =
                generatedLink
                    ? generatedLink.value
                    : "";


            if (!link) {

                return;

            }


            try {

                /*
                   Cách hiện đại
                */

                await navigator.clipboard.writeText(
                    link
                );


            } catch (error) {

                /*
                   Fallback cho trình duyệt
                */

                if (generatedLink) {

                    generatedLink.focus();

                    generatedLink.select();

                    document.execCommand(
                        "copy"
                    );

                }

            }


            /*
               Thông báo đã copy
            */

            const oldText =
                copyButton.textContent;


            copyButton.textContent =
                "✅ Đã sao chép";


            setTimeout(
                () => {

                    copyButton.textContent =
                        oldText ||
                        "📋 Sao chép";

                },
                1800
            );

        }
    );

}


/* =========================================================
   14. MỞ MÓN QUÀ
   ========================================================= */

if (openButton) {

    openButton.addEventListener(
        "click",
        () => {

            const link =
                generatedLink
                    ? generatedLink.value
                    : "";


            if (!link) {

                alert(
                    "Bạn hãy tạo món quà trước."
                );


                return;

            }


            window.location.href =
                link;

        }
    );

}


/* =========================================================
   15. ĐẢM BẢO ACTIVE BAN ĐẦU
   ========================================================= */

function initializeSelections() {

    /*
       Theme
    */

    themeButtons.forEach(
        button => {

            if (
                button.dataset.theme ===
                selectedTheme
            ) {

                button.classList.add(
                    "active"
                );

            }

        }
    );


    /*
       Style
    */

    styleButtons.forEach(
        button => {

            if (
                button.dataset.style ===
                selectedStyle
            ) {

                button.classList.add(
                    "active"
                );

            }

        }
    );


    applyCreateTheme();

    applyCreateStyle();

}


initializeSelections();


/* =========================================================
   16. LOG KIỂM TRA
   ========================================================= */

console.log(
    "Love Story Gift Creator loaded.",
    {
        theme: selectedTheme,
        style: selectedStyle
    }
);