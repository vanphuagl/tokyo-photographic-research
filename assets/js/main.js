"use strict";

/* --------------------------- resize mobile 100vh -------------------------- */
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty(
    "--app-height",
    `${document.documentElement.clientHeight}px`
  );
};
window.addEventListener("resize", appHeight);
appHeight();

/* ------------------------------ home loading ------------------------------ */

$(window).on("load", function () {
  setTimeout(() => {
    $(".c-loading__logo").fadeIn("slow");
  }, 1000);
  setTimeout(() => {
    $(".c-loading__logo").fadeOut("slow");
  }, 2000);
  setTimeout(() => {
    $(".c-loading").fadeOut();
  }, 3000);
});

/* --------------------------------- barbajs -------------------------------- */
const delay = (n) => {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
};

const pageTransition = () => {
  const tl = gsap.timeline();
  tl.to(".barba-screen", {
    duration: 1.2,
    width: "100%",
    left: "0%",
    ease: "Expo.easeInOut",
  });

  tl.to(".barba-screen", {
    duration: 1,
    width: "100%",
    left: "100%",
    ease: "Expo.easeInOut",
    delay: 0.3,
  });
  tl.set(".barba-screen", { left: "-100%" });
};

const contentAnimation = () => {
  // scroll top
  $("html, body").animate({ scrollTop: 0 }, "slow");
  $("body").removeClass("active");

  // show content
  const tl = gsap.timeline();
  tl.from(".animate-this", {
    duration: 1,
    opacity: 0,
    stagger: 0.4,
    delay: 1,
  });

  // play swiper
  swiperFunction();
};

$(function () {
  barba.init({
    sync: true,

    transitions: [
      {
        async leave(data) {
          const done = this.async();
          pageTransition();
          await delay(1000);
          done();
        },

        async enter(data) {
          contentAnimation();
        },

        async once(data) {
          contentAnimation();
        },
      },
    ],
  });
});

/* ------------------------------ refresh page ------------------------------ */

["pageshow", "load"].forEach(function (evt) {
  window.addEventListener(evt, function () {
    document.body.classList.remove("fadeout");
  });
});

/* ----------------------------- scroll logo scale ----------------------------- */

window.onscroll = function () {
  scrollFunction();
};

const scrollFunction = () => {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    document.querySelector(".c-header__logo").classList.add("is-scale");
  } else {
    document.querySelector(".c-header__logo").classList.remove("is-scale");
  }
};

/* ---------------------- add event on multiple element --------------------- */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/* ------------------------- modal subscribe toggle ------------------------- */

const [modalTogglers, modal, overlay] = [
  document.querySelectorAll("[data-modal-toggler]"),
  document.querySelector("[data-modal]"),
  document.querySelector("[data-overlay]"),
];

const toggleModal = () => {
  modal.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
};
addEventOnElements(modalTogglers, "click", toggleModal);

/* ------------------------- mobile nav menu toggle ------------------------- */

const [navTogglers, navLinks, navbar, navIcon] = [
  document.querySelectorAll("[data-nav-toggler]"),
  document.querySelectorAll("[data-nav-link]"),
  document.querySelector("[data-navbar]"),
  document.querySelector("[data-icon]"),
];

const toggleNav = () => {
  navbar.classList.toggle("active");
  navIcon.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElements(navTogglers, "click", toggleNav);

const closeNav = () => {
  navbar.classList.remove("active");
  navIcon.classList.remove("active");
  document.body.classList.remove("active");
};

addEventOnElements(navLinks, "click", closeNav);

/* ------------------------------- tab switch ------------------------------- */
$(document).on("click", ".tab-link", function () {
  let tabID = $(this).attr("data-tab");

  $(this).addClass("active").siblings().removeClass("active");
  $("#tab-" + tabID)
    .addClass("active")
    .siblings()
    .removeClass("active");
});

/* --------------------------------- swiper --------------------------------- */
const deactiveButton = () => {
  if ($(".button-swiper").hasClass("swiper-button-disabled")) {
    $(".button-swiper").removeClass("swiper-button-disabled");
    $(".button-swiper").attr("aria-disabled", "false");
    $(".button-swiper").removeAttr("disabled");
  }
};

const swiperFunction = () => {
  const swiper = new Swiper(".swiperDetail", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    speed: 700,
    slidesPerView: 1.2,
    breakpoints: {
      0: {
        spaceBetween: 10,
        draggable: true,
      },
      1023: {
        spaceBetween: 20,
        draggable: false,
      },
    },
    on: {
      beforeInit: function () {
        let numOfSlides =
          this.wrapperEl.querySelectorAll(".swiper-slide").length;
        document.querySelector(".slider-total").innerHTML = "/" + numOfSlides;
      },
    },
  });

  // deactive button control
  deactiveButton();
  swiper.on("slideNextTransitionEnd", function () {
    deactiveButton();
  });
  swiper.on("slidePrevTransitionEnd", function () {
    deactiveButton();
  });
};

/* ------------------------------ custom cursor ----------------------------- */

const cursorPrev = document.querySelector(".cursor-prev");
const cursorNext = document.querySelector(".cursor-next");

function mousemoveHandler(e) {
  const target = e.target;
  const tl = gsap.timeline({
    defaults: {
      x: e.clientX,
      y: e.clientY,
      ease: "power2.out",
    },
  });

  if (
    document.querySelector(".swiper-button-next") &&
    document.querySelector(".swiper-button-prev")
  ) {
    // hover section slider
    if (
      target.tagName.toLowerCase() === "button" &&
      target.closest(".swiper-button-next")
    ) {
      tl.to(cursorPrev, {
        opacity: 0,
      }).to(
        cursorNext,
        {
          opacity: 1,
        },
        "-=0.5"
      );
    } else if (
      target.tagName.toLowerCase() === "button" &&
      target.closest(".swiper-button-prev")
    ) {
      tl.to(cursorPrev, {
        opacity: 1,
      }).to(
        cursorNext,
        {
          opacity: 0,
        },
        "-=0.5"
      );
    } else {
      tl.to(".cursor", {
        opacity: 0,
      });
    }
  }
}

function mouseleaveHandler() {
  if (document.querySelector(".cursor")) {
    gsap.to(".cursor", {
      opacity: 0,
    });
  }
}

document.addEventListener("mousemove", mousemoveHandler);
document.addEventListener("mouseleave", mouseleaveHandler);

/* ---------------------- catch select href not working --------------------- */

$(function () {
  let isIOS =
    (/iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
    !window.MSStream;
  if (isIOS) {
    $("a").on("click touchend", function () {
      let link = $(this).attr("href");
      let target = $(this).attr("target");
      if (target === "_blank") {
        window.open(link, "blank"); // opens in new window as requested
        return false; // prevent anchor click
      }
    });
  }
});

/* -------------------------------- 404 page -------------------------------- */

gsap.from(".p-404__wrapper > span", 1.5, {
  top: "-100vh",
  ease: "bounce.out",
  delay: 1,
  stagger: 0.2,
});
