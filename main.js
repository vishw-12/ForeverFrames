
// Inject header & footer, handle mobile nav
async function inject(partial, targetId){
  try {
    const res = await fetch(`partials/${partial}.html`);
    const html = await res.text();
    document.getElementById(targetId).innerHTML = html;

    if(partial === "header"){
      const toggle = document.querySelector(".nav-toggle");
      const nav = document.getElementById("nav");
      toggle?.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        nav.classList.toggle("show");
      });
    }
  } catch (e){
    console.warn("Failed to inject partial:", partial, e);
  }
}

inject("header", "site-header");
inject("footer", "site-footer");
