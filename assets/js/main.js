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
// ===== Navbar scroll effect
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// 2. Reveal animations (on scroll)
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  })
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 3. Hero parallax effect
const pv = document.querySelector('.hero-visual');
let rafId = null;
function onMouseMove(e){
  if(!pv) return;
  const rect = pv.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(()=>{
    pv.querySelectorAll('.card-photo').forEach((el, i)=>{
      const depth = (i+1) * 6;
      el.style.transform = `translate(${x*depth}px, ${y*depth}px)`;
    });
  });
}
pv?.addEventListener('mousemove', onMouseMove);

// 4. Magnetic hover effect on buttons
document.querySelectorAll('.btn-magnetic').forEach(btn=>{
  btn.addEventListener('mousemove', e=>{
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${x*0.06}px, ${y*0.06}px)`;
  });
  btn.addEventListener('mouseleave', ()=> btn.style.transform = 'translate(0,0)');
});

// 5. Dynamic footer year
document.getElementById('year').textContent = new Date().getFullYear();

// 6. Lazy-load background image with fade-in
window.addEventListener("load", () => {
  const bgUrl = "assets/img/lens-bg.jpg"; // optimized JPG
  const img = new Image();
  img.src = bgUrl;
  img.onload = () => {
    document.body.style.setProperty(
      "background-image",
      `url('${bgUrl}')`
    );
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
  };
});

