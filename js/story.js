/* =========================================
   STORY
========================================= */


/* =========================================
   LOAD STORY
========================================= */

function loadStory() {

    document.getElementById(
        "storyCouple"
    ).textContent =
        giftData.couple;


    document.getElementById(
        "storyDate"
    ).textContent =
        formatDate(
            giftData.date
        );


    document.getElementById(
        "storyLetter"
    ).textContent =
        giftData.letter;


    document.getElementById(
        "storySignature"
    ).textContent =
        "— " +
        getFirstName(
            giftData.couple
        ) +
        " ❤️";


    loadYoutube();


    startCounter();

}


/* =========================================
   DATE
========================================= */

function formatDate(dateString) {

    if (!dateString) {

        return "";

    }


    const parts =
        dateString.split("-");


    if (parts.length !== 3) {

        return dateString;

    }


    return (
        parts[2] +
        "/" +
        parts[1] +
        "/" +
        parts[0]
    );

}


/* =========================================
   NAME
========================================= */

function getFirstName(couple) {

    if (!couple) {

        return "Anh";

    }


    const names =
        couple.split("&");


    return (
        names[0] ||
        "Anh"
    ).trim();

}


/* =========================================
   YOUTUBE ID
========================================= */

function getYoutubeId(url) {

    if (!url) {

        return "";

    }


    url = url.trim();


    /* Người dùng nhập thẳng ID */

    if (
        /^[a-zA-Z0-9_-]{11}$/
            .test(url)
    ) {

        return url;

    }


    try {

        const parsed =
            new URL(url);


        const host =
            parsed.hostname
                .replace(
                    "www.",
                    ""
                );


        /* youtu.be */

        if (
            host === "youtu.be"
        ) {

            return parsed.pathname
                .split("/")
                .filter(Boolean)[0] || "";

        }


        /* youtube.com */

        if (
            host === "youtube.com" ||
            host === "m.youtube.com"
        ) {

            const videoId =
                parsed.searchParams.get(
                    "v"
                );


            if (videoId) {

                return videoId;

            }


            const paths =
                parsed.pathname
                    .split("/")
                    .filter(Boolean);


            const type =
                paths[0];


            if (
                type === "shorts" ||
                type === "embed" ||
                type === "live"
            ) {

                return paths[1] || "";

            }

        }

    } catch (error) {

        return "";

    }


    return "";

}


/* =========================================
   LOAD YOUTUBE
========================================= */

function loadYoutube() {

    const section =
        document.getElementById(
            "musicSection"
        );


    const frame =
        document.getElementById(
            "youtubeFrame"
        );


    const id =
        getYoutubeId(
            giftData.music
        );


    if (!id) {

        section.classList.add(
            "hidden"
        );

        return;

    }


    frame.src =
        "https://www.youtube.com/embed/" +
        id +
        "?autoplay=0&rel=0";

}