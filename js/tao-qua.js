/* =========================================
   TAO QUA
========================================= */

let selectedTheme =
    "romantic";


/* =========================================
   ELEMENTS
========================================= */

const coupleInput =
    document.getElementById(
        "couple"
    );


const receiverInput =
    document.getElementById(
        "receiver"
    );


const dateInput =
    document.getElementById(
        "startDate"
    );


const musicInput =
    document.getElementById(
        "music"
    );


const letterInput =
    document.getElementById(
        "letter"
    );


const createButton =
    document.getElementById(
        "createButton"
    );


const result =
    document.getElementById(
        "result"
    );


const generatedLink =
    document.getElementById(
        "generatedLink"
    );


const qrImage =
    document.getElementById(
        "qrImage"
    );


const copyButton =
    document.getElementById(
        "copyButton"
    );


const openButton =
    document.getElementById(
        "openButton"
    );


/* =========================================
   THEME SELECT
========================================= */

const themeButtons =
    document.querySelectorAll(
        ".theme-option"
    );


themeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                themeButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                selectedTheme =
                    button.dataset.theme;


                applyCreateTheme();

            }
        );

    }
);


/* =========================================
   APPLY PREVIEW THEME
========================================= */

function applyCreateTheme() {

    document.body.className =
        document.body.className
            .replace(
                /\btheme-\S+/g,
                ""
            )
            .trim();


    document.body.classList.add(
        "theme-" +
        selectedTheme
    );

}


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


    /* VALIDATE */

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


    /* PARAMS */

    const params =
        new URLSearchParams();


    params.set(
        "c",
        couple
    );


    params.set(
        "t",
        receiver
    );


    params.set(
        "d",
        date
    );


    if (music) {

        params.set(
            "m",
            music
        );

    }


    if (letter) {

        params.set(
            "l",
            letter
        );

    }


    params.set(
        "theme",
        selectedTheme
    );


    /* INDEX URL */

    const indexURL =
        new URL(
            "index.html",
            window.location.href
        );


    indexURL.search =
        params.toString();


    const finalURL =
        indexURL.toString();


    /* DISPLAY */

    generatedLink.value =
        finalURL;


    /* QR */

    qrImage.src =
        "https://api.qrserver.com/v1/create-qr-code/?" +
        "size=700x700" +
        "&margin=20" +
        "&data=" +
        encodeURIComponent(
            finalURL
        );


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
   COPY
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
   OPEN
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