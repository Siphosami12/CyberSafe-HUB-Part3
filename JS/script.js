"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // Automatically update the footer year
    const yearElements = document.querySelectorAll("#currentYear, .current-year");
    const currentYear = new Date().getFullYear();

    yearElements.forEach(function (element) {
        element.textContent = currentYear;
    });

    // Mobile navigation menu
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", function () {
            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        mainNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                mainNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                menuToggle.textContent = "☰";
            });
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 650) {
                mainNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            }
        });
    }

    // FAQ: keep only one answer open at a time
    const faqItems = document.querySelectorAll(".faq-list details");

    faqItems.forEach(function (item) {
        item.addEventListener("toggle", function () {
            if (item.open) {
                faqItems.forEach(function (otherItem) {
                    if (otherItem !== item) {
                        otherItem.open = false;
                    }
                });
            }
        });
    });

    // Contact form validation
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const nameField = document.getElementById("name");
            const emailField = document.getElementById("email");
            const subjectField = document.getElementById("subject");
            const messageField = document.getElementById("message");

            if (!nameField || !emailField || !subjectField || !messageField) {
                if (formMessage) {
                    formMessage.textContent =
                        "Please check that all contact form fields are correctly set up.";
                }
                return;
            }

            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const subject = subjectField.value.trim();
            const message = messageField.value.trim();

            if (!name || !email || !subject || !message) {
                if (formMessage) {
                    formMessage.textContent = "Please complete all fields.";
                }
                return;
            }

            if (formMessage) {
                formMessage.textContent =
                    "Your form has passed validation. A message-sending service must be configured to send your message.";
            }
        });
    }

    // Prevent empty search submissions
    const searchForms = document.querySelectorAll("[data-search-form]");

    searchForms.forEach(function (form) {
        form.addEventListener("submit", function (event) {
            const searchInput = form.querySelector(
                'input[type="search"], input[name="search"]'
            );

            if (searchInput && !searchInput.value.trim()) {
                event.preventDefault();
                searchInput.focus();
            }
        });
    });

    // Mark JavaScript as enabled
    document.documentElement.classList.add("js-enabled");

});


