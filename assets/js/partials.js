// Inject header and footer into pages
async function loadPartials() {
  const header = await fetch("header.html").then(r => r.text());
  const footer = await fetch("footer.html").then(r => r.text());

  document.getElementById("site-header").innerHTML = header;
  document.getElementById("site-footer").innerHTML = footer;

  // re-run your main.js scripts after injection (like nav toggle, year update)
  if (typeof initMainScripts === "function") {
    initMainScripts();
  }
}
loadPartials();
