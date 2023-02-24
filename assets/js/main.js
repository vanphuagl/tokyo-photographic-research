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
    delay: 0.4,
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
        breakpoint: 1024,
        settings: {
          arrows: false,
          draggable: true,
        },
      },
    ],
  });
}
