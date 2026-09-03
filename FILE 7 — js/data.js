/* =========================================
   DATA
========================================= */

function getGiftData() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return {

        couple:
            params.get("c") ||
            params.get("couple") ||
            "Anh & Em",


        receiver:
            params.get("t") ||
            params.get("to") ||
            "Em",


        date:
            params.get("d") ||
            params.get("date") ||
            "",


        music:
            params.get("m") ||
            params.get("music") ||
            "",


        letter:
            params.get("l") ||
            params.get("letter") ||
            "Cảm ơn em vì đã xuất hiện trong cuộc đời anh.\n\nAnh mong rằng chúng ta sẽ luôn nắm tay nhau và cùng viết tiếp câu chuyện này. ❤️",


        theme:
            params.get("theme") ||
            "romantic"

    };

}


/* =========================================
   APPLY THEME
========================================= */

function applyTheme(theme) {

    const validThemes = [
        "romantic",
        "rose",
        "purple",
        "pink",
        "night",
        "sunset"
    ];


    if (!validThemes.includes(theme)) {

        theme = "romantic";

    }


    document.body.className =
        document.body.className
            .replace(
                /\btheme-\S+/g,
                ""
            )
            .trim();


    document.body.classList.add(
        "theme-" + theme
    );

}