/* =========================================
   TAO QUA
   ========================================= */

let selectedTheme = "romantic";
let selectedStyle = "glass";


/* =========================================
   ELEMENTS
   ========================================= */

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


/* =========================================
   THEME SELECT
   ========================================= */

const themeButtons =
    document.querySelectorAll(".theme-option");

themeButtons.forEach(button => {

    button.addEventListener("click", () => {

        themeButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedTheme =
            button.dataset.theme;

        applyCreateTheme();

    });

});


/* =========================================
   STYLE SELECT
   ========================================= */

const styleButtons =
    document.querySelectorAll(".style-option");

styleButtons.forEach(button => {

    button.addEventListener("click", () => {

        styleButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedStyle =
            button.dataset.style;

        applyCreateTheme();

    });

});


/* =========================================
   APPLY PREVIEW
   ========================================= */

function applyCreateTheme() {

    /*
       Xóa theme/style cũ
       nhưng giữ nguyên các class khác
    */

    document.body.className =
        document.body.className
            .replace(/\btheme-\S+/g, "")
            .replace(/\bstyle-\S+/g, "")
            .replace(/\s+/g, " ")
            .trim();


    /*
       Thêm màu được chọn
    */

    document.body.classList.add(
        "theme-" + selectedTheme
    );


    /*
       Thêm phong cách được chọn
    */

    document.body.classList.add(
        "style-" + selectedStyle
    );

}


/* =========================================
   INITIAL PREVIEW
   ========================================= */

applyCreateTheme();


/* =========================================
   CREATE LINK
   ========================================= */

function createGift() {

    const couple =
        coupleInput.value.trim();

    const receiver =
        receiverInput.value.trim();

    const date =
        dateInput.value;

    const music =
        musicInput.value.trim();

    const letter =
        letterInput.value.trim();


    /* =====================================
       VALIDATE
       ===================================== */

    if (!couple) {

        alert(
            "Bạn chưa nhập tên hai người."
        );

        coupleInput.focus();

        return;
    }


    if (!receiver) {

        alert(
            "Bạn chưa nhập tên người nhận."
        );

        receiverInput.focus();

        return;
    }


    if (!date) {

        alert(
            "Bạn chưa chọn ngày bắt đầu."
        );

        dateInput.focus();

        return;
    }


    /* =====================================
       PARAMS
       ===================================== */

    const params =
        new URLSearchParams();


    /*
       Tên hai người
    */

    params.set(
        "c",
        couple
    );


    /*
       Người nhận
    */

    params.set(
        "t",
        receiver
    );


    /*
       Ngày bắt đầu
    */

    params.set(
        "d",
        date
    );


    /*
       YouTube
    */

    if (music) {

        params.set(
            "m",
            music
        );

    }


    /*
       Lời nhắn
    */

    if (letter) {

        params.set(
            "l",
            letter
        );

    }


    /*
       MÀU SẮC
    */

    params.set(
        "theme",
        selectedTheme
    );


    /*
       PHONG CÁCH
    */

    params.set(
        "style",
        selectedStyle
    );


    /* =====================================
       INDEX URL
       ===================================== */

    const indexURL =
        new URL(
            "index.html",
            window.location.href
        );


    indexURL.search =
        params.toString();


    const finalURL =
        indexURL.toString();


    /* =====================================
       DISPLAY LINK
       ===================================== */

    generatedLink.value =
        finalURL;


    /* =====================================
       QR CODE
       ===================================== */

    qrImage.src =
        "https://api.qrserver.com/v1/create-qr-code/?" +
        "size=700x700" +
        "&margin=20" +
        "&data=" +
        encodeURIComponent(finalURL);


    /* =====================================
       SHOW RESULT
       ===================================== */

    result.classList.remove(
        "hidden"
    );


    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================
   CREATE BUTTON
   ========================================= */

createButton.addEventListener(
    "click",
    createGift
);


/* =========================================
   COPY LINK
   ========================================= */

copyButton.addEventListener(
    "click",
    async () => {

        try {

            await navigator.clipboard.writeText(
                generatedLink.value
            );


            copyButton.textContent =
                "✅ Đã sao chép";


            setTimeout(
                () => {

                    copyButton.textContent =
                        "📋 Sao chép";

                },
                1800
            );


        } catch (error) {

            generatedLink.select();

            document.execCommand(
                "copy"
            );

            copyButton.textContent =
                "✅ Đã sao chép";

        }

    }
);


/* =========================================
   OPEN GIFT
   ========================================= */

openButton.addEventListener(
    "click",
    () => {

        if (
            generatedLink.value
        ) {

            window.location.href =
                generatedLink.value;

        }

    }
);