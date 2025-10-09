/* =========================
   ForeverFrames — Main JS (clean & fast)
   - No background preload/flair
   - Keeps all interactions
   ========================= */

(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => r.querySelectorAll(s);

  // 1) Mobile nav toggle
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = $(".nav-toggle");
    const nav = $("#nav");
    toggle?.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("show");
    });
  });

  // 2) Navbar scroll shadow
  const header = $(".site-header");
  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  // 3) Reveal animations
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // 4) Hero parallax (desktop only)
  const pv = $(".hero-visual");
  if (pv && window.matchMedia("(pointer: fine)").matches) {
    let rafId = null;
    pv.addEventListener("mousemove", e => {
      const rect = pv.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        pv.querySelectorAll(".card-photo").forEach((el, i) => {
          const depth = (i + 1) * 6;
          el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
        });
      });
    });
  }

  // 5) Portfolio filter
  document.addEventListener("DOMContentLoaded", () => {
    const filterBtns = $$(".portfolio-filters .btn");
    const cards = $$(".portfolio-grid .card");
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        cards.forEach(card => {
          const cat = card.dataset.category;
          if (filter === "all" || cat === filter) card.classList.remove("hide");
          else card.classList.add("hide");
        });
      });
    });
  });

  // 6) Magnetic hover (buttons)
  document.querySelectorAll(".btn-magnetic").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0,0)";
    });
  });

  // 7) Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 8) Lightbox (only where present)
  document.addEventListener("DOMContentLoaded", () => {
    const lightbox = $("#lightbox");
    if (!lightbox) return;

    const lightboxImg = $(".lightbox-img");
    const caption = $(".lightbox-caption");
    const closeBtn = $(".lightbox-close");
    const prevBtn = $(".lightbox-prev");
    const nextBtn = $(".lightbox-next");
    const cards = $$(".portfolio-grid .card");

    let currentIndex = 0;

    function openLightbox(index) {
      const img = cards[index].querySelector("img");
      lightboxImg.src = img.src;
      caption.textContent = img.alt || "";
      lightbox.classList.add("show");
      currentIndex = index;
    }
    function closeLightbox(){ lightbox.classList.remove("show"); }
    function showNext(){ currentIndex = (currentIndex + 1) % cards.length; openLightbox(currentIndex); }
    function showPrev(){ currentIndex = (currentIndex - 1 + cards.length) % cards.length; openLightbox(currentIndex); }

    // Only intercept clicks for cards *without* href (so portfolio.html can still navigate)
    cards.forEach((card, index) => {
      card.addEventListener("click", e => {
        if (!card.getAttribute("href")) {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });

    closeBtn?.addEventListener("click", closeLightbox);
    nextBtn?.addEventListener("click", showNext);
    prevBtn?.addEventListener("click", showPrev);
    lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", e => {
      if (!lightbox.classList.contains("show")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    });
  });

  // 9) Star rating (testimonials form)
  document.addEventListener("DOMContentLoaded", () => {
    const starContainers = document.querySelectorAll(".star-input");
    starContainers.forEach(container => {
      const stars = container.querySelectorAll("span");
      stars.forEach((star, index) => {
        star.addEventListener("click", () => {
          stars.forEach(s => s.classList.remove("active"));
          for (let i = 0; i <= index; i++) stars[i].classList.add("active");
          container.dataset.rating = String(index + 1);
        });
        star.addEventListener("mouseover", () => {
          stars.forEach((s, i) => { s.style.color = i <= index ? "#ffd700" : "#888"; });
        });
        star.addEventListener("mouseleave", () => {
          stars.forEach(s => { s.style.color = s.classList.contains("active") ? "#ffd700" : "#fff"; });
        });
      });
    });
  });

  // 10) Scroll-to-top
  document.addEventListener("DOMContentLoaded", () => {
    const scrollBtn = document.getElementById("scrollTopBtn");
    if (!scrollBtn) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) scrollBtn.classList.add("show");
      else scrollBtn.classList.remove("show");
    }, { passive: true });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
})();
