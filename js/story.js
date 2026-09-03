/* =========================================================
   LOVE STORY — STORY ENGINE
   Version: Premium Stable V2
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     DOM READY
     ======================================================= */

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initLoveStory,
      {
        once: true
      }
    );

  } else {

    initLoveStory();

  }



  /* =======================================================
     MAIN
     ======================================================= */

  function initLoveStory() {

    try {

      /*
       * Đọc dữ liệu từ URL
       *
       * c     = couple
       * t     = receiver
       * d     = date
       * m     = youtube
       * l     = love letter
       * theme = color theme
       * style = visual style
       */

      const params =
        new URLSearchParams(
          window.location.search
        );


      /* -----------------------------------------------------
         DATA
         ----------------------------------------------------- */

      const couple =
        cleanText(
          params.get("c"),
          "Chun Chan"
        );


      const receiver =
        cleanText(
          params.get("t"),
          "em"
        );


      const startDate =
        params.get("d") || "";


      const youtubeUrl =
        params.get("m") || "";


      const loveLetter =
        cleanText(
          params.get("l"),
          "Anh Yêu Em ❤️"
        );


      const theme =
        safeTheme(
          params.get("theme")
        );


      const style =
        safeStyle(
          params.get("style")
        );


      /* -----------------------------------------------------
         DOM
         ----------------------------------------------------- */

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


      /*
       * QUAN TRỌNG:
       *
       * Chỉ còn #letterContent.
       *
       * Không tìm #loveLetter nữa.
       */

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
       * CHỈ GHI THƯ VÀO #letterContent
       */

      if (letterContent) {

        letterContent.textContent =
          loveLetter;

      }


      if (startDateElement) {

        const formatted =
          formatDate(
            startDate
          );


        startDateElement.textContent =
          formatted || "Chưa xác định";

      }


      /* =====================================================
         INITIAL OPENING
         ===================================================== */

      setupInitialOpening(
        openingScreen,
        storyContent
      );


      /* =====================================================
         OPEN GIFT
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


    } catch (error) {

      console.error(
        "LOVE STORY: Không thể khởi tạo Story.",
        error
      );

    }

  }



  /* =========================================================
     CLEAN TEXT
     ========================================================= */

  function cleanText(
    value,
    fallback
  ) {

    if (
      value === null ||
      value === undefined
    ) {

      return fallback;

    }


    const text =
      String(value).trim();


    if (!text) {

      return fallback;

    }


    return text;

  }



  /* =========================================================
     INITIAL OPENING
     ========================================================= */

  function setupInitialOpening(
    openingScreen,
    storyContent
  ) {

    /*
     * Opening luôn xuất hiện
     * khi trang được tải.
     */

    if (openingScreen) {

      openingScreen.style.display =
        "flex";

      openingScreen.style.visibility =
        "visible";

      openingScreen.style.opacity =
        "1";

      openingScreen.style.pointerEvents =
        "auto";

      openingScreen.classList.remove(
        "opening-hidden"
      );

      openingScreen.setAttribute(
        "aria-hidden",
        "false"
      );

    }


    /*
     * Story bị ẩn hoàn toàn
     * cho tới khi bấm mở quà.
     */

    if (storyContent) {

      storyContent.hidden =
        true;

      storyContent.classList.remove(
        "story-visible"
      );

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


    /*
     * Chống chạy hàm mở 2 lần
     * do click + touch.
     */

    let opened =
      false;


    function openGift(event) {

      if (event) {

        event.preventDefault();
        event.stopPropagation();

      }


      /*
       * Nếu đã mở rồi thì bỏ qua.
       */

      if (opened) {

        return;

      }


      opened =
        true;


      console.log(
        "LOVE STORY: Đã mở món quà."
      );


      /* -----------------------------------------------------
         KHÓA NÚT
         ----------------------------------------------------- */

      openGiftButton.disabled =
        true;

      openGiftButton.setAttribute(
        "aria-disabled",
        "true"
      );

      openGiftButton.style.pointerEvents =
        "none";


      /* -----------------------------------------------------
         HIỆN STORY
         ----------------------------------------------------- */

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


      /* -----------------------------------------------------
         ẨN OPENING
         ----------------------------------------------------- */

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


        /*
         * Xóa khỏi layout sau animation.
         */

        setTimeout(
          function () {

            openingScreen.style.display =
              "none";

          },
          500
        );

      }


      /* -----------------------------------------------------
         VỀ ĐẦU STORY
         ----------------------------------------------------- */

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }


    /* =======================================================
       CLICK
       ======================================================= */

    openGiftButton.addEventListener(
      "click",
      openGift,
      {
        passive: false
      }
    );


    /* =======================================================
       TOUCH
       ======================================================= */

    openGiftButton.addEventListener(
      "touchend",
      openGift,
      {
        passive: false
      }
    );


    /* =======================================================
       KEYBOARD
       ======================================================= */

    openGiftButton.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          openGift(event);

        }

      }
    );

  }



  /* =========================================================
     APPLY VISUAL THEME
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
     * Xóa theme/style cũ.
     */

    const classes =
      Array.from(
        body.classList
      );


    classes.forEach(
      function (className) {

        if (
          className.indexOf(
            "theme-"
          ) === 0 ||
          className.indexOf(
            "style-"
          ) === 0
        ) {

          body.classList.remove(
            className
          );

        }

      }
    );


    /*
     * Theme màu.
     */

    body.classList.add(
      "theme-" + theme
    );


    /*
     * Visual style.
     */

    body.classList.add(
      "style-" + style
    );


    /*
     * Data attributes.
     */

    body.dataset.theme =
      theme;

    body.dataset.style =
      style;

  }



  /* =========================================================
     SAFE THEME
     ========================================================= */

  function safeTheme(
    theme
  ) {

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

  function safeStyle(
    style
  ) {

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
      String(dateString)
        .split("-");


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
      !Number.isInteger(year) ||
      !Number.isInteger(month) ||
      !Number.isInteger(day)
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


    /*
     * Kiểm tra ngày thực tế.
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


    /*
     * Không có ngày.
     */

    if (!startDate) {

      setCounterValue(
        years,
        "0"
      );

      setCounterValue(
        months,
        "0"
      );

      setCounterValue(
        days,
        "0"
      );

      setCounterValue(
        hours,
        "00"
      );

      setCounterValue(
        minutes,
        "00"
      );

      setCounterValue(
        seconds,
        "00"
      );

      setCounterValue(
        totalDays,
        "0"
      );

      return;

    }


    function updateCounter() {

      const now =
        new Date();


      /*
       * Nếu ngày bắt đầu ở tương lai.
       */

      if (
        now.getTime() <
        startDate.getTime()
      ) {

        setCounterValue(
          years,
          "0"
        );

        setCounterValue(
          months,
          "0"
        );

        setCounterValue(
          days,
          "0"
        );

        setCounterValue(
          hours,
          "00"
        );

        setCounterValue(
          minutes,
          "00"
        );

        setCounterValue(
          seconds,
          "00"
        );

        setCounterValue(
          totalDays,
          "0"
        );

        return;

      }


      /* -----------------------------------------------------
         TOTAL DAYS
         ----------------------------------------------------- */

      const milliseconds =
        now.getTime() -
        startDate.getTime();


      const total =
        Math.floor(
          milliseconds /
          86400000
        );


      setCounterValue(
        totalDays,
        formatNumber(
          total
        )
      );


      /* -----------------------------------------------------
         CALENDAR DIFFERENCE
         ----------------------------------------------------- */

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
       * Nếu ngày hiện tại nhỏ hơn
       * ngày bắt đầu.
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
       * Nếu tháng hiện tại nhỏ hơn
       * tháng bắt đầu.
       */

      if (m < 0) {

        y--;

        m += 12;

      }


      /*
       * Tính giờ/phút/giây.
       */

      const todayStart =
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          startDate.getHours(),
          startDate.getMinutes(),
          startDate.getSeconds(),
          0
        );


      let timeDifference =
        now.getTime() -
        todayStart.getTime();


      /*
       * Chưa tới giờ bắt đầu
       * trong ngày hiện tại.
       */

      if (
        timeDifference < 0
      ) {

        d--;

        timeDifference +=
          86400000;


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


        if (m < 0) {

          y--;

          m += 12;

        }

      }


      /*
       * Bảo vệ giá trị âm.
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


      /*
       * Giờ.
       */

      const totalSeconds =
        Math.floor(
          timeDifference /
          1000
        );


      const hh =
        Math.floor(
          totalSeconds /
          3600
        );


      const mm =
        Math.floor(
          (
            totalSeconds %
            3600
          ) / 60
        );


      const ss =
        totalSeconds %
        60;


      /* -----------------------------------------------------
         WRITE TO DOM
         ----------------------------------------------------- */

      setCounterValue(
        years,
        String(y)
      );


      setCounterValue(
        months,
        String(m)
      );


      setCounterValue(
        days,
        String(d)
      );


      setCounterValue(
        hours,
        String(hh)
          .padStart(
            2,
            "0"
          )
      );


      setCounterValue(
        minutes,
        String(mm)
          .padStart(
            2,
            "0"
          )
      );


      setCounterValue(
        seconds,
        String(ss)
          .padStart(
            2,
            "0"
          )
      );

    }


    /*
     * Chạy ngay.
     */

    updateCounter();


    /*
     * Chạy mỗi giây.
     */

    window.setInterval(
      updateCounter,
      1000
    );

  }



  /* =========================================================
     SET COUNTER VALUE
     ========================================================= */

  function setCounterValue(
    element,
    value
  ) {

    if (!element) {

      return;

    }


    element.textContent =
      value;

  }



  /* =========================================================
     NUMBER FORMAT
     ========================================================= */

  function formatNumber(
    number
  ) {

    return Number(
      number
    ).toLocaleString(
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
     * ID trực tiếp.
     */

    if (
      /^[A-Za-z0-9_-]{11}$/.test(
        value
      )
    ) {

      return value;

    }


    /*
     * URL.
     */

    let url;


    try {

      url =
        new URL(
          value
        );

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


    /* -------------------------------------------------------
       YOUTU.BE
       ------------------------------------------------------- */

    if (
      hostname === "youtu.be"
    ) {

      const parts =
        url.pathname
          .split("/")
          .filter(Boolean);


      const id =
        parts[0];


      if (
        id &&
        /^[A-Za-z0-9_-]{11}$/.test(
          id
        )
      ) {

        return id;

      }

    }


    /* -------------------------------------------------------
       YOUTUBE.COM
       ------------------------------------------------------- */

    if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "music.youtube.com"
    ) {


      /*
       * watch?v=ID
       */

      const watchId =
        url.searchParams.get(
          "v"
        );


      if (
        watchId &&
        /^[A-Za-z0-9_-]{11}$/.test(
          watchId
        )
      ) {

        return watchId;

      }


      /*
       * shorts
       * embed
       * live
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
            /^[A-Za-z0-9_-]{11}$/.test(
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



  /* =========================================================
     YOUTUBE PLAYER
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
     * Không có video.
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
     * Có video.
     */

    musicSection.style.display =
      "";


    const embedUrl =
      "https://www.youtube.com/embed/" +
      encodeURIComponent(
        youtubeId
      ) +
      "?rel=0" +
      "&modestbranding=1" +
      "&playsinline=1";


    youtubePlayer.src =
      embedUrl;


    youtubePlayer.setAttribute(
      "allow",
      [
        "accelerometer",
        "autoplay",
        "clipboard-write",
        "encrypted-media",
        "gyroscope",
        "picture-in-picture",
        "web-share"
      ].join("; ")
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
     * Không tạo hiệu ứng quá mạnh
     * trên mobile.
     */

    const isMobile =
      window.matchMedia &&
      window.matchMedia(
        "(max-width: 600px)"
      ).matches;


    const interval =
      isMobile
        ? 2600
        : 1800;


    function createHeart() {

      /*
       * Giới hạn số lượng tim
       * đang tồn tại.
       */

      if (
        container.children.length >=
        (isMobile ? 5 : 8)
      ) {

        return;

      }


      const heart =
        document.createElement(
          "span"
        );


      heart.className =
        "floating-heart";


      heart.textContent =
        "♥";


      heart.setAttribute(
        "aria-hidden",
        "true"
      );


      heart.style.left =
        (
          Math.random() * 100
        ) + "%";


      heart.style.animationDuration =
        (
          5 +
          Math.random() * 6
        ) + "s";


      heart.style.fontSize =
        (
          12 +
          Math.random() * 18
        ) + "px";


      heart.style.opacity =
        (
          0.25 +
          Math.random() * 0.5
        ).toFixed(2);


      container.appendChild(
        heart
      );


      window.setTimeout(
        function () {

          if (
            heart &&
            heart.parentNode
          ) {

            heart.remove();

          }

        },
        12000
      );

    }


    /*
     * Tạo tim đầu tiên sau khi trang load.
     */

    window.setTimeout(
      createHeart,
      1200
    );


    /*
     * Sau đó tạo định kỳ.
     */

    window.setInterval(
      createHeart,
      interval
    );

  }

})();