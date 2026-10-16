# Iñigo Agunod — Personal Portfolio

A cream-and-olive portfolio inspired by the Dantora visual direction. Built with plain HTML, CSS, and JavaScript. No package installation, framework, external fonts, analytics, or build step.

## Run locally

Open `index.html` directly, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.

## Edit

- `index.html`: biography, project descriptions, navigation, and certificate cards.
- `styles.css`: colors, responsive layouts, and subtle CSS animation. Related blocks are commented.
- `script.js`: certificate viewer, footer year, and animation pausing.
- `assets/certificates/`: WebP copies of the four supplied certificates. `-thumb` files are small gallery previews; the larger files load only on demand.

To add a certificate, add a readable full-size WebP and a smaller thumbnail, then copy a certificate article in `index.html`. Set its title, issuer, date, actual award type, image dimensions, and descriptive alt text. The `data-certificate` attribute enables the viewer. Without JavaScript, the link still opens the document.

## Performance and accessibility

System fonts, no runtime dependencies, lazy-loaded thumbnails, explicit image dimensions, transform-only decorative animation, animation pausing offscreen and in background tabs, reduced-motion support, semantic headings, keyboard focus indicators, native disclosure panels, and a native dialog with Escape dismissal.

The certificate originals remain unmodified in the owner's uploads. These web copies preserve the full document framing. Award types are participation, appreciation, and course completion; no professional vendor certification is claimed.

## Hosting

Serve this folder with any static host, including an Nginx server or GitHub Pages. For GitHub Pages, select the `main` branch and `/ (root)` under repository Settings → Pages. Pushing the files alone does not enable hosting.

## Verification

JavaScript syntax, HTML structure, local asset references, certificate metadata, and image sizes were checked during creation. Browser-based visual and performance testing still needs to be performed on a real desktop and mobile device; no frame-rate or Lighthouse score is claimed.
