const root = document.documentElement;

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--mouse-x", `${event.clientX}px`);
  root.style.setProperty("--mouse-y", `${event.clientY}px`);
});

const cards = document.querySelectorAll(".project-card");
const portraitCard = document.querySelector(".portrait-card");

cards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 4}deg)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

if (portraitCard) {
  portraitCard.addEventListener("pointermove", (event) => {
    const rect = portraitCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    portraitCard.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
  });

  portraitCard.addEventListener("pointerleave", () => {
    portraitCard.style.transform = "";
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
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const subject = encodeURIComponent(`Portfolio contact - ${name}`);
    const body = encodeURIComponent(
      `Naam: ${name}\nE-mail: ${email}\n\nBericht:\n${message}`,
    );

    window.location.href = `mailto:curvers.jef@gmail.com?subject=${subject}&body=${body}`;
    formMessage.textContent = "Je mailprogramma wordt geopend met je bericht.";
  });
}
