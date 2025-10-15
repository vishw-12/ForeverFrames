/* =========================
  ForeverFrames Main Script
  Handles nav, animations, parallax, buttons
  ========================= */

// 1. Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle?.addEventListener('click', () => {
const expanded = toggle.getAttribute('aria-expanded') === 'true';
toggle.setAttribute('aria-expanded', String(!expanded));
nav.classList.toggle('show');
});

// 2. Navbar scroll effect
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
header.classList.toggle('scrolled', window.scrollY > 20);
});

// 3. Reveal animations
const io = new IntersectionObserver((entries) => {
entries.forEach(e => {
if (e.isIntersecting) {
e.target.classList.add('show');
io.unobserve(e.target);
}
});
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 4. Hero parallax effect
const pv = document.querySelector('.hero-visual');
let rafId = null;
function onMouseMove(e) {
if (!pv) return;
const rect = pv.getBoundingClientRect();
const x = (e.clientX - rect.left) / rect.width - 0.5;
const y = (e.clientY - rect.top) / rect.height - 0.5;
cancelAnimationFrame(rafId);
rafId = requestAnimationFrame(() => {
pv.querySelectorAll('.card-photo').forEach((el, i) => {
const depth = (i + 1) * 6;
el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
});
});
}
pv?.addEventListener('mousemove', onMouseMove);

// 5. Portfolio filter functionality
document.addEventListener("DOMContentLoaded", () => {
const filterBtns = document.querySelectorAll(".portfolio-filters .btn");
const cards = document.querySelectorAll(".portfolio-grid .card");

filterBtns.forEach(btn => {
btn.addEventListener("click", () => {
filterBtns.forEach(b => b.classList.remove("active"));
btn.classList.add("active");

const filter = btn.getAttribute("data-filter");

cards.forEach(card => {
const category = card.getAttribute("data-category");
if (filter === "all" || category === filter) {
card.classList.remove("hide");
} else {
card.classList.add("hide");
}
});
});
});
});

// 6. Magnetic hover effect
document.querySelectorAll('.btn-magnetic').forEach(btn => {
btn.addEventListener('mousemove', e => {
const r = btn.getBoundingClientRect();
const x = e.clientX - r.left - r.width / 2;
const y = e.clientY - r.top - r.height / 2;
btn.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
});
btn.addEventListener('mouseleave', () => {
btn.style.transform = 'translate(0,0)';
});
});

// 7. Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// 8. Lazy-load background
window.addEventListener("load", () => {
const bgUrl = "assets/images/lens.jpg";
const img = new Image();
img.src = bgUrl;
img.onload = () => {
document.body.style.setProperty("background-image", `url('${bgUrl}')`);
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundAttachment = "fixed";
};
});

// 9. Lightbox functionality
document.addEventListener("DOMContentLoaded", () => {
const lightbox = document.getElementById("lightbox");
if (!lightbox) return; // skip if not on portfolio detail page

const lightboxImg = document.querySelector(".lightbox-img");
const caption = document.querySelector(".lightbox-caption");
const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");
const cards = document.querySelectorAll(".portfolio-grid .card");

let currentIndex = 0;

function openLightbox(index) {
const img = cards[index].querySelector("img");
lightboxImg.src = img.src;
caption.textContent = img.alt;
lightbox.classList.add("show");
currentIndex = index;
}

function closeLightbox() { lightbox.classList.remove("show"); }
function showNext() { currentIndex = (currentIndex + 1) % cards.length; openLightbox(currentIndex); }
function showPrev() { currentIndex = (currentIndex - 1 + cards.length) % cards.length; openLightbox(currentIndex); }

// Open lightbox
cards.forEach((card, index) => {
card.addEventListener("click", e => {
// Only open lightbox if card has NO href (so your portfolio.html can still redirect)
if (!card.getAttribute("href")) {
e.preventDefault();
openLightbox(index);
}
});
});

// Controls
closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => {
if (e.key === "Escape") closeLightbox();
if (e.key === "ArrowRight") showNext();
if (e.key === "ArrowLeft") showPrev();
});
});
// ===== Interactive Star Rating =====
document.addEventListener("DOMContentLoaded", () => {
const starContainers = document.querySelectorAll(".star-input");

starContainers.forEach(container => {
const stars = container.querySelectorAll("span");
stars.forEach((star, index) => {
star.addEventListener("click", () => {
// Clear all stars
stars.forEach(s => s.classList.remove("active"));
// Highlight selected and previous ones
for (let i = 0; i <= index; i++) {
stars[i].classList.add("active");
}
// Store rating value in container
container.dataset.rating = index + 1;
});

// Optional hover effect
star.addEventListener("mouseover", () => {
stars.forEach((s, i) => {
s.style.color = i <= index ? "#ffd700" : "#888";
});
});

star.addEventListener("mouseleave", () => {
stars.forEach((s, i) => {
s.style.color = s.classList.contains("active") ? "#ffd700" : "#fff";
});
});
});
});
});
// ===== Scroll to Top Button =====
document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
/* =========================
   Optimized Loader & Smoothness Fix
   ========================= */

// Preload background first
const preloadBg = new Image();
preloadBg.src = "assets/images/bg-gradient.jpg";

// Once DOM is ready, start light animations
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("ready");
});

// Hero fade-in after background is loaded
preloadBg.onload = () => {
  requestAnimationFrame(() => {
    document.body.classList.add("bg-loaded");
  });
};

// Disable parallax or heavy transforms on small screens
if (window.innerWidth < 768) {
  document.querySelectorAll(".card-photo").forEach(el => {
    el.style.transform = "none";
  });
}
// Smooth height transition after filtering
const grid = document.querySelector('.portfolio-grid');
if (grid) {
  const observer = new MutationObserver(() => {
    grid.style.transition = 'min-height 0.4s ease';
    grid.style.minHeight = `${grid.scrollHeight}px`;
    setTimeout(() => (grid.style.minHeight = ''), 400);
  });
  observer.observe(grid, { childList: true, subtree: true });
}
// Highlight current nav link based on URL
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav a");

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
// Dynamic viewport height fix for mobile Safari / Chrome
function setVhUnit() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setVhUnit);
window.addEventListener('orientationchange', setVhUnit);
setVhUnit();
// ===== Responsive Parallax Disable / Reset =====
function disableParallaxIfMobile() {
  const isSmall = window.innerWidth < 1024; // disable on iPad & mobile
  const cards = document.querySelectorAll(".card-photo");

  if (isSmall) {
    cards.forEach(el => el.style.transform = "none");
    pv?.removeEventListener("mousemove", onMouseMove);
  } else {
    pv?.addEventListener("mousemove", onMouseMove);
  }
}

window.addEventListener("resize", disableParallaxIfMobile);
window.addEventListener("orientationchange", disableParallaxIfMobile);
disableParallaxIfMobile();
window.addEventListener("load", () => {
  const heroVisual = document.querySelector(".hero-visual");
  setTimeout(() => heroVisual.classList.add("loaded"), 1800);
});
window.addEventListener("load", () => {
  setTimeout(() => document.querySelector(".hero-visual").classList.add("loaded"), 1800);
});
