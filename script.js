"use strict";


/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");


function closeMenu() {
  navMenu.classList.remove("active");

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Open navigation menu"
  );
}


function openMenu() {
  navMenu.classList.add("active");

  menuToggle.setAttribute(
    "aria-expanded",
    "true"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Close navigation menu"
  );
}


menuToggle.addEventListener("click", () => {

  const isOpen =
    navMenu.classList.contains("active");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }

});


/*
  Close the mobile menu after
  selecting a navigation link.
*/

navLinks.forEach((link) => {

  link.addEventListener("click", () => {
    closeMenu();
  });

});


/*
  Close menu when clicking outside it.
*/

document.addEventListener("click", (event) => {

  const clickedInsideMenu =
    navMenu.contains(event.target);

  const clickedToggle =
    menuToggle.contains(event.target);

  if (
    navMenu.classList.contains("active") &&
    !clickedInsideMenu &&
    !clickedToggle
  ) {
    closeMenu();
  }

});


/* =========================
   HEADER SCROLL STATE
========================= */

const header =
  document.querySelector(".site-header");


function updateHeader() {

  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

}


window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );


revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* =========================
   CONTACT FORM VALIDATION
========================= */

const form =
  document.querySelector("#contact-form");

const formStatus =
  document.querySelector("#form-status");


function showError(
  input,
  message
) {

  const group =
    input.closest(".form-group");

  const error =
    group.querySelector(".error-message");

  group.classList.add("invalid");

  error.textContent = message;

}


function clearError(input) {

  const group =
    input.closest(".form-group");

  const error =
    group.querySelector(".error-message");

  group.classList.remove("invalid");

  error.textContent = "";

}


function validateEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


function validateField(input) {

  const value =
    input.value.trim();

  clearError(input);

  if (!value) {

    showError(
      input,
      "This field is required."
    );

    return false;
  }


  if (
    input.type === "email" &&
    !validateEmail(value)
  ) {

    showError(
      input,
      "Please enter a valid email."
    );

    return false;
  }


  if (
    input.name === "message" &&
    value.length < 10
  ) {

    showError(
      input,
      "Please enter at least 10 characters."
    );

    return false;
  }


  return true;
}


const formInputs =
  form.querySelectorAll(
    "input, textarea"
  );


formInputs.forEach((input) => {

  input.addEventListener(
    "blur",
    () => validateField(input)
  );

  input.addEventListener(
    "input",
    () => {

      if (
        input.closest(".form-group")
          .classList.contains("invalid")
      ) {
        validateField(input);
      }

    }
  );

});


form.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();

    formStatus.textContent = "";
    formStatus.classList.remove("success");


    let isValid = true;


    formInputs.forEach((input) => {

      if (!validateField(input)) {
        isValid = false;
      }

    });


    if (!isValid) {

      formStatus.textContent =
        "Please fix the highlighted fields.";

      return;
    }


    /*
      There is no backend in this project.

      Instead of pretending that the message
      was actually sent, we show a demo state.
    */

    formStatus.textContent =
      "Demo form submitted successfully — no backend is connected.";

    formStatus.classList.add("success");

    form.reset();

    formInputs.forEach((input) => {
      clearError(input);
    });

  }
);


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      navMenu.classList.contains("active")
    ) {
      closeMenu();
      menuToggle.focus();
    }

  }
);
