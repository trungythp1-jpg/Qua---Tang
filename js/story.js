/* =========================================================
   LOVE STORY — STORY ENGINE
   Version: Premium Stable V2
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     DOM READY
     ======================================================= */

  document.addEventListener(
    "DOMContentLoaded",
    initLoveStory
  );


  /* =======================================================
     MAIN
     ======================================================= */

  function initLoveStory() {

    const params =
      new URLSearchParams(
        window.location.search
      );


    /* =====================================================
       DATA
       ===================================================== */

    const couple =
      params.get("c") ||
      "Chun Chan";


    const receiver =
      params.get("t") ||
      "em";


    const startDate =
      params.get("d") ||
      "";


    const youtubeUrl =
      params.get("m") ||
      "";


    const loveLetter =
      params.get("l") ||
      "Anh Yêu Em ❤️";


    const theme =
      safeTheme(
        params.get("theme")
      );


    const style =
      safeStyle(
        params.get("style")
      );


    /* =====================================================
       DOM
       ===================================================== */

    const openingScreen =
      document.getElementById(
        "openingScreen"
      );


    const openingReceiver =
      document.getElementById(
        "openingReceiver"
      );


    const openGiftButton =
      document.getElementById(
        "openGiftButton"
      );


    const storyContent =
      document.getElementById(
        "storyContent"
      );


    const coupleName =
      document.getElementById(
        "coupleName"
      );


    const heroReceiver =
      document.getElementById(
        "heroReceiver"
      );


    const startDateElement =
      document.getElementById(
        "startDate"
      );


    const letterContent =
      document.getElementById(
        "letterContent"
      );


    const musicSection =
      document.getElementById(
        "musicSection"
      );


    const youtubePlayer =
      document.getElementById(
        "youtubePlayer"
      );


    /* =====================================================
       APPLY THEME + STYLE
       ===================================================== */

    applyVisualTheme(
      theme,
      style
    );


    /* =====================================================
       FILL CONTENT
       ===================================================== */

    if (openingReceiver) {

      openingReceiver.textContent =
        receiver;
    }


    if (coupleName) {

      coupleName.textContent =
        couple;
    }


    if (heroReceiver) {

      heroReceiver.textContent =
        receiver;
    }


    /*
      CHỈ CÓ MỘT NƠI NHẬN NỘI DUNG THƯ
    */

    if (letterContent) {

      letterContent.textContent =
        loveLetter;
    }


    if (startDateElement) {

      startDateElement.textContent =
        formatDate(
          startDate
        );
    }


    /* =====================================================
       INITIAL OPENING STATE
       ===================================================== */

    prepareOpening(
      openingScreen,
      storyContent
    );


    /* =====================================================
       OPEN BUTTON
       ===================================================== */

    setupOpeningButton(
      openingScreen,
      openGiftButton,
      storyContent
    );


    /* =====================================================
       COUNTER
       ===================================================== */

    setupCounter(
      startDate
    );


    /* =====================================================
       YOUTUBE
       ===================================================== */

    setupYouTube(
      youtubeUrl,
      musicSection,
      youtubePlayer
    );


    /* =====================================================
       FLOATING HEARTS
       ===================================================== */

    setupFloatingHearts();

  }



  /* =========================================================
     PREPARE OPENING
     ========================================================= */

  function prepareOpening(
    openingScreen,
    storyContent
  ) {

    if (openingScreen) {

      openingScreen.style.display =
        "flex";

      openingScreen.style.visibility =
        "visible";

      openingScreen.style.opacity =
        "1";

      openingScreen.style.pointerEvents =
        "auto";

      openingScreen.setAttribute(
        "aria-hidden",
        "false"
      );
    }


    if (storyContent) {

      storyContent.hidden =
        true;

      storyContent.style.display =
        "none";

      storyContent.style.visibility =
        "hidden";

      storyContent.style.opacity =
        "0";

      storyContent.style.pointerEvents =
        "none";

      storyContent.setAttribute(
        "aria-hidden",
        "true"
      );
    }

  }



  /* =========================================================
     OPENING BUTTON
     ========================================================= */

  function setupOpeningButton(
    openingScreen,
    openGiftButton,
    storyContent
  ) {

    if (!openGiftButton) {

      console.error(
        "LOVE STORY: Không tìm thấy #openGiftButton"
      );

      return;
    }


    let opened =
      false;


    function openGift(event) {

      if (event) {

        event.preventDefault();

        event.stopPropagation();
      }


      /*
        Chặn mở nhiều lần
      */

      if (opened) {

        return;
      }


      opened =
        true;


      /* ===================================================
         KHÓA NÚT
         =================================================== */

      openGiftButton.disabled =
        true;

      openGiftButton.setAttribute(
        "aria-disabled",
        "true"
      );

      openGiftButton.style.pointerEvents =
        "none";


      /* ===================================================
         HIỆN STORY
         =================================================== */

      if (storyContent) {

        storyContent.hidden =
          false;

        storyContent.removeAttribute(
          "hidden"
        );

        storyContent.style.display =
          "block";

        storyContent.style.visibility =
          "visible";

        storyContent.style.opacity =
          "1";

        storyContent.style.pointerEvents =
          "auto";

        storyContent.classList.add(
          "story-visible"
        );

        storyContent.setAttribute(
          "aria-hidden",
          "false"
        );
      }


      /* ===================================================
         ẨN OPENING
         =================================================== */

      if (openingScreen) {

        openingScreen.classList.add(
          "opening-hidden"
        );

        openingScreen.style.opacity =
          "0";

        openingScreen.style.visibility =
          "hidden";

        openingScreen.style.pointerEvents =
          "none";

        openingScreen.setAttribute(
          "aria-hidden",
          "true"
        );


        setTimeout(
          function () {

            openingScreen.style.display =
              "none";

          },
          500
        );
      }


      /* ===================================================
         VỀ ĐẦU TRANG
         =================================================== */

      window.scrollTo({
        top: 0,
        behavior: "instant"
      });

    }


    /* =====================================================
       CLICK
       ===================================================== */

    openGiftButton.addEventListener(
      "click",
      openGift,
      {
        passive: false
      }
    );


    /* =====================================================
       TOUCH
       ===================================================== */

    let touchStarted =
      false;


    openGiftButton.addEventListener(
      "touchstart",
      function (event) {

        touchStarted =
          true;

        openGift(event);

      },
      {
        passive: false
      }
    );


    openGiftButton.addEventListener(
      "touchend",
      function (event) {

        if (touchStarted) {

          event.preventDefault();

          event.stopPropagation();

          touchStarted =
            false;
        }

      },
      {
        passive: false
      }
    );


    /* =====================================================
       KEYBOARD
       ===================================================== */

    openGiftButton.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openGift(event);
        }

      }
    );

  }



  /* =========================================================
     THEME + STYLE
     ========================================================= */

  function applyVisualTheme(
    theme,
    style
  ) {

    const body =
      document.body;


    if (!body) {

      return;
    }


    /*
      Xóa theme/style cũ
    */

    Array.from(
      body.classList
    ).forEach(
      function (className) {

        if (
          className.indexOf("theme-") === 0 ||
          className.indexOf("style-") === 0
        ) {

          body.classList.remove(
            className
          );
        }

      }
    );


    /*
      Thêm theme
    */

    body.classList.add(
      "theme-" + theme
    );


    /*
      Thêm style
    */

    body.classList.add(
      "style-" + style
    );


    /*
      Data attributes
    */

    body.dataset.theme =
      theme;

    body.dataset.style =
      style;

  }



  /* =========================================================
     SAFE THEME
     ========================================================= */

  function safeTheme(theme) {

    const themes = [

      "romantic",
      "rose",
      "purple",
      "pink",
      "night",
      "sunset"

    ];


    if (
      themes.indexOf(theme) !== -1
    ) {

      return theme;
    }


    return "romantic";
  }



  /* =========================================================
     SAFE STYLE
     ========================================================= */

  function safeStyle(style) {

    const styles = [

      "glass",
      "luxury",
      "sakura",
      "cinematic",
      "letter",
      "minimal"

    ];


    if (
      styles.indexOf(style) !== -1
    ) {

      return style;
    }


    return "glass";
  }



  /* =========================================================
     DATE PARSER
     ========================================================= */

  function parseLocalDate(
    dateString
  ) {

    if (!dateString) {

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
      !year ||
      !month ||
      !day
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
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {

      return null;
    }


    return date;

  }



  /* =========================================================
     FORMAT DATE
     ========================================================= */

  function formatDate(
    dateString
  ) {

    const date =
      parseLocalDate(
        dateString
      );


    if (!date) {

      return "";
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



  /* =========================================================
     COUNTER
     ========================================================= */

  function setupCounter(
    startDateString
  ) {

    const startDate =
      parseLocalDate(
        startDateString
      );


    const years =
      document.getElementById(
        "years"
      );


    const months =
      document.getElementById(
        "months"
      );


    const days =
      document.getElementById(
        "days"
      );


    const hours =
      document.getElementById(
        "hours"
      );


    const minutes =
      document.getElementById(
        "minutes"
      );


    const seconds =
      document.getElementById(
        "seconds"
      );


    const totalDays =
      document.getElementById(
        "totalDays"
      );


    if (!startDate) {

      if (totalDays) {

        totalDays.textContent =
          "0";
      }

      return;
    }


    function updateCounter() {

      const now =
        new Date();


      /* ===================================================
         NGÀY TỔNG
         =================================================== */

      const milliseconds =
        Math.max(
          0,
          now.getTime() -
          startDate.getTime()
        );


      const total =
        Math.floor(
          milliseconds /
          86400000
        );


      if (totalDays) {

        totalDays.textContent =
          formatNumber(
            total
          );
      }


      /* ===================================================
         CALENDAR DIFFERENCE
         =================================================== */

      let y =
        now.getFullYear() -
        startDate.getFullYear();


      let m =
        now.getMonth() -
        startDate.getMonth();


      let d =
        now.getDate() -
        startDate.getDate();


      /*
        Giờ bắt đầu trong ngày
      */

      const startToday =
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          startDate.getHours(),
          startDate.getMinutes(),
          startDate.getSeconds()
        );


      let timeDiff =
        now.getTime() -
        startToday.getTime();


      /*
        Nếu chưa tới giờ bắt đầu
      */

      if (timeDiff < 0) {

        d--;

        timeDiff +=
          86400000;
      }


      /*
        Xử lý ngày âm
      */

      if (d < 0) {

        m--;

        const previousMonth =
          new Date(
            now.getFullYear(),
            now.getMonth(),
            0
          );


        d +=
          previousMonth.getDate();
      }


      /*
        Xử lý tháng âm
      */

      if (m < 0) {

        y--;

        m += 12;
      }


      /*
        Không cho âm
      */

      y =
        Math.max(
          0,
          y
        );


      m =
        Math.max(
          0,
          m
        );


      d =
        Math.max(
          0,
          d
        );


      /* ===================================================
         GIỜ / PHÚT / GIÂY
         =================================================== */

      const totalSeconds =
        Math.floor(
          Math.max(
            0,
            timeDiff
          ) / 1000
        );


      const hh =
        Math.floor(
          totalSeconds / 3600
        );


      const mm =
        Math.floor(
          (totalSeconds % 3600) /
          60
        );


      const ss =
        totalSeconds % 60;


      /* ===================================================
         WRITE
         =================================================== */

      if (years) {

        years.textContent =
          y;
      }


      if (months) {

        months.textContent =
          m;
      }


      if (days) {

        days.textContent =
          d;
      }


      if (hours) {

        hours.textContent =
          String(hh)
            .padStart(
              2,
              "0"
            );
      }


      if (minutes) {

        minutes.textContent =
          String(mm)
            .padStart(
              2,
              "0"
            );
      }


      if (seconds) {

        seconds.textContent =
          String(ss)
            .padStart(
              2,
              "0"
            );
      }

    }


    updateCounter();


    setInterval(
      updateCounter,
      1000
    );

  }



  /* =========================================================
     NUMBER FORMAT
     ========================================================= */

  function formatNumber(
    number
  ) {

    return Number(number)
      .toLocaleString(
        "vi-VN"
      );

  }



  /* =========================================================
     YOUTUBE ID
     ========================================================= */

  function extractYouTubeId(
    input
  ) {

    if (!input) {

      return null;
    }


    const value =
      String(input)
        .trim();


    /*
      Raw ID
    */

    if (
      /^[A-Za-z0-9_-]{11}$/
        .test(value)
    ) {

      return value;
    }


    let url;


    try {

      url =
        new URL(value);

    } catch (error) {

      return null;
    }


    const hostname =
      url.hostname
        .toLowerCase()
        .replace(
          /^www\./,
          ""
        );


    /*
      youtu.be
    */

    if (
      hostname === "youtu.be"
    ) {

      const id =
        url.pathname
          .split("/")
          .filter(Boolean)[0];


      if (
        id &&
        /^[A-Za-z0-9_-]{11}$/
          .test(id)
      ) {

        return id;
      }
    }


    /*
      youtube.com
    */

    if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "music.youtube.com"
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
        /^[A-Za-z0-9_-]{11}$/
          .test(watchId)
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


      const types = [
        "shorts",
        "embed",
        "live"
      ];


      if (
        parts.length >= 2 &&
        types.indexOf(
          parts[0]
        ) !== -1
      ) {

        const id =
          parts[1];


        if (
          /^[A-Za-z0-9_-]{11}$/
            .test(id)
        ) {

          return id;
        }
      }
    }


    return null;

  }



  /* =========================================================
     YOUTUBE SETUP
     ========================================================= */

  function setupYouTube(
    youtubeUrl,
    musicSection,
    youtubePlayer
  ) {

    if (
      !musicSection ||
      !youtubePlayer
    ) {

      return;
    }


    const youtubeId =
      extractYouTubeId(
        youtubeUrl
      );


    /*
      Không có video
    */

    if (!youtubeId) {

      musicSection.style.display =
        "none";

      youtubePlayer.removeAttribute(
        "src"
      );

      return;
    }


    /*
      Có video
    */

    musicSection.style.display =
      "";


    youtubePlayer.src =
      "https://www.youtube.com/embed/" +
      youtubeId +
      "?rel=0" +
      "&modestbranding=1" +
      "&playsinline=1";


    youtubePlayer.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    );


    youtubePlayer.setAttribute(
      "allowfullscreen",
      ""
    );

  }



  /* =========================================================
     FLOATING HEARTS
     ========================================================= */

  function setupFloatingHearts() {

    const container =
      document.getElementById(
        "heartsContainer"
      );


    if (!container) {

      return;
    }


    /*
      Không tạo quá nhiều tim
      trên iPhone.
    */

    function createHeart() {

      /*
        Nếu trang đang hidden,
        không tạo thêm.
      */

      const heart =
        document.createElement(
          "span"
        );


      heart.className =
        "floating-heart";


      heart.textContent =
        "♥";


      heart.style.left =
        Math.random() *
        100 +
        "%";


      heart.style.animationDuration =
        5 +
        Math.random() * 6 +
        "s";


      heart.style.fontSize =
        12 +
        Math.random() * 18 +
        "px";


      heart.style.opacity =
        0.25 +
        Math.random() * 0.5;


      container.appendChild(
        heart
      );


      setTimeout(
        function () {

          heart.remove();

        },
        12000
      );

    }


    setInterval(
      createHeart,
      1800
    );

  }

})();