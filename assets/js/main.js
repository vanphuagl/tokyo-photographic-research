"use strict";

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
