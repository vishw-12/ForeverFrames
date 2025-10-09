/* =========================
   ForeverFrames Main Script
   (fast, unified, no background delays)
   ========================= */

(() => {
  // Helpers
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => r.querySelectorAll(s);

  /* 1) Mobile nav toggle */
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = $('.nav-toggle');
    const nav = $('#nav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('show');
      }, { passive: true });
    }
  });

  /* 2) Navbar scroll effect (passive & tiny work) */
  const header = $('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* 3) Reveal animations (IO) */
  document.addEventListener('DOMContentLoaded', () => {
    const targets = $$('.reveal');
    if (!targets.length) return;
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach(el => io.observe(el));
  });

  /* 4) Hero parallax (disabled on touch/smaller screens) */
  document.addEventListener('DOMContentLoaded', () => {
    const pv = $('.hero-visual');
    if (!pv) return;

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isSmall = window.innerWidth < 1024;
    if (isCoarse || isSmall) return;

    let rafId = null;
    const onMouseMove = (e) => {
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
    };
    pv.addEventListener('mousemove', onMouseMove);
  });

  /* 5) Portfolio filters (event delegation) */
  document.addEventListener('DOMContentLoaded', () => {
    const filtersWrap = $('.portfolio-filters');
    const gridCards = $$('.portfolio-grid .card');
    if (!filtersWrap || !gridCards.length) return;

    filtersWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      $$('.portfolio-filters .btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      gridCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* 6) Magnetic hover (lightweight) */
  document.addEventListener('DOMContentLoaded', () => {
    $$('.btn-magnetic').forEach(btn => {
      const onMove = (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
      };
      const onLeave = () => { btn.style.transform = 'translate(0,0)'; };
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
    });
  });

  /* 7) Footer year */
  document.addEventListener('DOMContentLoaded', () => {
    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
  });

  /* 8) REMOVE SLOW BACKGROUND LAZY-LOAD
        (We now rely on the CSS gradient/noise which is instant.)
        — Deleted the old window.load image-swap block. */

  /* 9) Lightbox — only where it exists, and only for cards WITHOUT href */
  document.addEventListener('DOMContentLoaded', () => {
    const lightbox = $('#lightbox');
    if (!lightbox) return;

    const lightboxImg  = $('.lightbox-img');
    const caption      = $('.lightbox-caption');
    const closeBtn     = $('.lightbox-close');
    const prevBtn      = $('.lightbox-prev');
    const nextBtn      = $('.lightbox-next');
    const cards        = $$('.portfolio-grid .card');

    if (!cards.length || !lightboxImg || !caption) return;

    let currentIndex = 0;

    function openLightbox(index) {
      const img = cards[index].querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      caption.textContent = img.alt || '';
      lightbox.classList.add('show');
      currentIndex = index;
    }
    const closeLightbox = () => lightbox.classList.remove('show');
    const showNext = () => openLightbox((currentIndex + 1) % cards.length);
    const showPrev = () => openLightbox((currentIndex - 1 + cards.length) % cards.length);

    cards.forEach((card, index) => {
      card.addEventListener('click', (e) => {
        // If the card is a navigation link (has href), let it navigate.
        if (card.getAttribute('href')) return;
        e.preventDefault();
        openLightbox(index);
      });
    });

    closeBtn?.addEventListener('click', closeLightbox);
    nextBtn?.addEventListener('click', showNext);
    prevBtn?.addEventListener('click', showPrev);

    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('show')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  });

  /* 10) Star rating (testimonials form) */
  document.addEventListener('DOMContentLoaded', () => {
    const starContainers = $$('.star-input');
    if (!starContainers.length) return;

    starContainers.forEach(container => {
      const stars = container.querySelectorAll('span');
      stars.forEach((star, index) => {
        star.addEventListener('click', () => {
          stars.forEach(s => s.classList.remove('active'));
          for (let i = 0; i <= index; i++) stars[i].classList.add('active');
          container.dataset.rating = String(index + 1);
        });
        star.addEventListener('mouseover', () => {
          stars.forEach((s, i) => { s.style.color = i <= index ? '#ffd700' : '#888'; });
        });
        star.addEventListener('mouseleave', () => {
          stars.forEach(s => { s.style.color = s.classList.contains('active') ? '#ffd700' : '#fff'; });
        });
      });
    });
  });

  /* 11) Scroll to top (if present) */
  document.addEventListener('DOMContentLoaded', () => {
    const btn = $('#scrollTopBtn');
    if (!btn) return;
    const onScroll = () => {
      if (window.scrollY > 400) btn.classList.add('show');
      else btn.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  });

  /* ---- IMPORTANT: remove any lens animation triggers ----
     We do NOT force-start animations for .lens-ring anymore.
     (CSS handles subtle animation; no double-trigger.)
  */
})();
