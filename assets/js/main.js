Skip to content
Navigation Menu
vishw-12
ForeverFrames

Type / to search
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
Commit f6572b9
vishw-12
vishw-12
authored
yesterday
·
·
Verified
Update main.js
main
1 parent 
b7079ee
 commit 
f6572b9
File tree
Filter files…
assets/js
main.js
1 file changed
+16
-0
lines changed
Search within code
 
‎assets/js/main.js‎
+16
Lines changed: 16 additions & 0 deletions
Original file line number	Diff line number	Diff line change
@@ -1,183 +1,199 @@
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
0 commit comments
Comments
0
 (0)
Comment
You're not receiving notifications from this thread.

Update main.js · vishw-12/ForeverFrames@f6572b9 
