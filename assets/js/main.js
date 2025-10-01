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
// Portfolio filter functionality
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".portfolio-filters .btn");
  const cards = document.querySelectorAll(".portfolio-grid .card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
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
// 5. Magnetic hover effect
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

// 6. Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// 7. Lazy-load background
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

});
// Lightbox functionality
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
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

  function closeLightbox() {
    lightbox.classList.remove("show");
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % cards.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    openLightbox(currentIndex);
  }

  // Open lightbox on card click
  cards.forEach((card, index) => {
    card.addEventListener("click", e => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  // Button events
  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  // Close on background click
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Close on ESC
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
