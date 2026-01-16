README.txt — System Design Flashcards (Android + Desktop)

What is this?
A mobile-friendly flashcards app for System Design interview concepts (20 cards) with:
- Tap-to-flip card (Android safe)
- Bigger answer font
- Difficulty filter (Basic / Intermediate / Advanced)
- Shuffle mode
- Timer mode (per card)
- Review missed cards
- Installable PWA on Android when hosted over HTTPS (GitHub Pages)

Package contents (must match):
index.html
style.css
script.js
manifest.webmanifest
sw.js
data/system-design-cards.js
icons/icon-192.png
icons/icon-512.png
icons/icon-512-maskable.png
README.txt

Important:
Do NOT open index.html by double-clicking (file://). Install and PWA features require http/https.

OPTION A — Run locally (desktop)
1) Open folder in VS Code
2) Install extension: Live Server
3) Right-click index.html → Open with Live Server

OPTION B — Host on GitHub Pages (best for sharing)
1) Create GitHub repo (public recommended)
2) Upload all files/folders exactly as-is (root)
3) Repo → Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /(root)
4) Your site will be:
   https://<username>.github.io/<repo>/

Android install steps
1) Open the GitHub Pages link in Chrome
2) Use Chrome menu → Install app
   (Install button may also appear inside the app if Chrome fires the install event)
3) App appears on home screen and runs in standalone mode

Troubleshooting — Install option not visible
Check these URLs load (no 404):
/manifest.webmanifest
/sw.js
/data/system-design-cards.js
/icons/icon-192.png

Troubleshooting — updates not showing
Service worker caches content. Bump CACHE_NAME in sw.js (e.g., v2) and redeploy.
