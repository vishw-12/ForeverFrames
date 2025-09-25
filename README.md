# Forever Frames

Multi-page photography website starter — static HTML/CSS/JS. Ready for GitHub Pages.

## Structure
```
.
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── portfolio-weddings.html
├── portfolio-events.html
├── portfolio-portraits.html
├── booking.html
├── testimonials.html
├── contact.html
├── 404.html
├── partials/
│   ├── header.html
│   └── footer.html
├── assets/
│   ├── favicon.svg
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── robots.txt
└── sitemap.xml
```

## Usage
1. Replace placeholder text/photos (Unsplash links) with your own images in `index.html`, `portfolio-*.html`, etc.
2. Update contact email in `partials/footer.html` and `contact.html`.
3. Set up forms: replace `https://formspree.io/f/your-form-id` in `booking.html` and `contact.html` with your Formspree (or Netlify Forms) endpoint.
4. Update `sitemap.xml` and `robots.txt` with your real domain once live.

## Deploy to GitHub Pages
- Create a repo named **ForeverFrames**.
- Upload these files to the root of the repo.
- In **Settings → Pages**, set **Source** to **Deploy from a branch**, branch **main**, folder **/** (root).
- Wait a minute; your site will appear at: `https://<your-username>.github.io/ForeverFrames/`

> Note: Because this is a *project site*, keep all HTML files in the repo **root** so relative paths work.

## Customize
- Colors are defined in `:root` vars in `assets/css/style.css`.
- Navigation is loaded from `partials/header.html` and `partials/footer.html` via `assets/js/main.js` to avoid duplicating code.
- Add more pages by copying an existing page, editing the `<section>` content, and adding a link in `partials/header.html`.

Enjoy!
