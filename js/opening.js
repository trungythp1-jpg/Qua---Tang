/* =========================================
   OPENING
========================================= */

const giftData = getGiftData();


applyTheme(giftData.theme);


/* =========================================
   ELEMENTS
========================================= */

const openingPage =
    document.getElementById(
        "openingPage"
    );


const storyPage =
    document.getElementById(
        "storyPage"
    );


const receiverElement =
    document.getElementById(
        "openingReceiver"
    );


const openButton =
    document.getElementById(
        "openStoryButton"
    );


/* =========================================
   CHECK GIFT
========================================= */

const hasGift =
    new URLSearchParams(
        window.location.search
    ).has("t") ||
    new URLSearchParams(
        window.location.search
    ).has("to");


/* =========================================
   SHOW RECEIVER
========================================= */

if (receiverElement) {

    receiverElement.textContent =
        giftData.receiver;

}


/* =========================================
   OPEN STORY
========================================= */

function openStory() {

    openingPage.classList.add(
        "hidden"
    );


    storyPage.classList.remove(
        "hidden"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (typeof loadStory === "function") {

        loadStory();

    }

}


/* =========================================
   BUTTON
========================================= */

if (openButton) {

    openButton.addEventListener(
        "click",
        openStory
    );

}


/* =========================================
   HEART EFFECT
========================================= */

function createHeart() {

    const heart =
        document.createElement("div");


    heart.className =
        "floating-heart";


    heart.textContent =
        ["❤️", "💕", "💗", "💖"][

            Math.floor(
                Math.random() * 4
            )

        ];


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        14 +
        Math.random() * 20 +
        "px";


    heart.style.animationDuration =
        6 +
        Math.random() * 7 +
        "s";


    document
        .getElementById("hearts")
        .appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 14000);

}


setInterval(
    createHeart,
    900
);