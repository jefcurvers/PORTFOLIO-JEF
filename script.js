const root = document.documentElement;
const pointerFine = window.matchMedia("(hover: hover) and (pointer: fine)");
const hasTouchInput = window.matchMedia("(any-pointer: coarse)");

if (pointerFine.matches && !hasTouchInput.matches) {
  window.addEventListener("pointermove", (event) => {
    root.style.setProperty("--mouse-x", `${event.clientX}px`);
    root.style.setProperty("--mouse-y", `${event.clientY}px`);
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    document.body.classList.toggle("menu-open", !isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }
  });
}

const huboSlides = document.querySelectorAll(".hubo-slide");
const huboDots = document.querySelectorAll(".slider-dot");

huboDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const targetSlide = dot.dataset.slide;

    huboSlides.forEach((slide, index) => {
      slide.classList.toggle("active", String(index) === targetSlide);
    });

    huboDots.forEach((item, index) => {
      item.classList.toggle("active", String(index) === targetSlide);
    });
  });
});

const form = document.querySelector("#contactForm");
const formMessage = document.querySelector("#form-message");

if (form && formMessage) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const submitButton = form.querySelector("button[type='submit']");

    formMessage.textContent = "Sending...";
    submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Form submission failed.");
      }

      form.reset();
      formMessage.textContent = "Message sent. I will get back to you soon.";
    } catch (error) {
      formMessage.textContent = "Something went wrong. Please try again or email me directly.";
    } finally {
      submitButton.disabled = false;
    }
  });
}
