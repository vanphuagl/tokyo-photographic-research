"use strict";

// refresh page

["pageshow", "load"].forEach(function (evt) {
  window.addEventListener(evt, function () {
    document.body.classList.remove("fadeout");
  });
});

// loading page

const tl = gsap.timeline();

window.addEventListener("load", function () {
  tl.to(".c-loading__logo svg", {
    width: "261.973px",
    height: "85px",
    top: "30px",
    left: "30px",
    duration: 2,
    delay: 1.5,
  })
    .set(".c-loading__logo", { pointerEvents: "all", delay: 0.4 })
    .set(".c-loading", { pointerEvents: "none", delay: 0.2 })
    .to(".c-header, .c-footer, main", {
      opacity: 1,
      duration: 1,
      stagger: 0.25,
      delay: 0.4,
    });
});

// add event on multiple element

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

// mdaol subscribe toggle
const [modalTogglers, modal, overlay] = [
  document.querySelectorAll("[data-modal-toggler]"),
  document.querySelector("[data-modal]"),
  document.querySelector("[data-overlay]"),
];

const toggleModal = function () {
  modal.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
};
addEventOnElements(modalTogglers, "click", toggleModal);
