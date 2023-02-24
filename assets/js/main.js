"use strict";

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
  var tl = gsap.timeline();
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
  var tl = gsap.timeline();
  tl.from(".animate-this", {
    duration: 2,
    opacity: 0,
    stagger: 0.4,
    delay: 1,
  });
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

/* -------------------- // add event on multiple element -------------------- */

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

/* ---------------------------------- slick --------------------------------- */

const $slider = $(".js-detail");
$(window).on("load", function () {
  if ($slider.length) {
    let currentSlide;
    let slidesCount;
    let sliderCounter = document.createElement("div");
    sliderCounter.classList.add("slider__counter");

    let updateSliderCounter = function (slick, currentIndex) {
      currentSlide = slick.slickCurrentSlide() + 1;
      slidesCount = slick.slideCount;
      // $(sliderCounter).text(currentSlide + '/' +slidesCount)
      $(sliderCounter).text("/" + slidesCount);
    };

    $slider.on("init", function (event, slick) {
      $slider.append(sliderCounter);
      updateSliderCounter(slick);
    });

    // $slider.on('afterChange', function(event, slick, currentSlide) {
    //   updateSliderCounter(slick, currentSlide);
    // });

    $slider.slick({
      dots: false,
      infinite: false,
      arrows: true,
      outerEdgeLimit: true,
      slidesToShow: 1,
      variableWidth: true,
      draggable: false,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            arrows: false,
            draggable: true,
          },
        },
      ],
    });
  }
});

// custom cursor

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

  // hover section slider
  if (
    target.tagName.toLowerCase() === "button" &&
    target.closest(".slick-next")
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
    target.closest(".slick-prev")
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

function mouseleaveHandler() {
  gsap.to(".cursor", {
    opacity: 0,
  });
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
