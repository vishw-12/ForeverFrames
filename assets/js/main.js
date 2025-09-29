/* =========================================================
   ForeverFrames Main JS
   Shared interactions for all pages
   ========================================================= */

// ---------- NAVBAR SCROLL EFFECT ----------
window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 10);
});

// ---------- MOBILE NAV TOGGLE ----------
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true" || false;
    navToggle.setAttribute("aria-expanded", !expanded);
    navMenu.classList.toggle("show");
  });
}

// ---------- REVEAL ON SCROLL ----------
const revealEls = document.querySelectorAll(".reveal");
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.9;
  revealEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) el.classList.add("show");
  });
};
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ---------- AUTO YEAR IN FOOTER ----------
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ---------- OPTIONAL: PARALLAX FOR HERO IMAGES ----------
const heroPhotos = document.querySelectorAll(".card-photo");
if (heroPhotos.length) {
  window.addEventListener("mousemove", (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 10; // tilt range
    const y = (e.clientY / innerHeight - 0.5) * 10;
    heroPhotos.forEach((photo, i) => {
      const depth = (i + 1) * 4; // stagger layers
      photo.style.transform = `translate(${x / depth}%, ${y / depth}%)`;
    });
  });
}
