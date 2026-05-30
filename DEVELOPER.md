# Spotify-Light — Developer & Maintenance Guide

This document provides instructions for developers (including yourself) on how to maintain, test, update, and deploy **Spotify-Light** and its associated landing page.

---

## 📂 Project Architecture

```
spotify-theme-repo/
├── .gitattributes         # Forces linguist to analyze HTML/JS in docs/
├── LICENSE                # GNU GPLv3 copyleft license
├── README.md              # Public repository documentation
├── CONTRIBUTING.md        # Open-source contribution rules
├── DEVELOPER.md           # This document (maintenance guide)
├── color.ini              # Spicetify theme color definitions
├── user.css               # Spicetify theme styling rules
└── docs/                  # Landing page assets (deployed on Vercel)
    ├── index.html         # SEO-optimized semantic landing page
    ├── styles.css         # Glassmorphic purple-lavender layouts
    └── script.js          # Slide transitions & stats tracking logic
```

---

## ⚡ Live Statistics & Tracking Architecture

The website uses a hybrid serverless tracking system:

### 1. ZIP Downloads (GitHub Releases API)
- **Source:** Dynamic fetch on `https://api.github.com/repos/blip-cmd/spotify-light/releases`.
- **Target:** Accumulates the `download_count` of all assets (like `Spotify-Light.zip`) across all tags.
- **Maintenance:** Creating a new GitHub Release with an attached asset will automatically increment this counter on the website when users download the new asset.

### 2. PowerShell Installs (CountAPI)
- **Source:** Persistent key-value store using Miles Hilliard's public CountAPI.
- **Key:** `spotify-light-custom-installs-key`
- **Endpoints:**
  - **Get Value:** `https://countapi.mileshilliard.com/api/v1/get/spotify-light-custom-installs-key`
  - **Hit Value:** `https://countapi.mileshilliard.com/api/v1/hit/spotify-light-custom-installs-key`
  - **Reset/Set Value:** `https://countapi.mileshilliard.com/api/v1/set/spotify-light-custom-installs-key?value=0`

---

## 🛠️ Local Development & Testing

To test modifications to the landing page locally:

1. **Start a local HTTP server** inside the `/docs` directory:
   ```bash
   npx http-server docs
   ```
2. **Access local preview:**
   - Open your browser to `http://127.0.0.1:8080`.

---

## 🚀 Deployment Workflows

### 1. Deploying Landing Page Modifications
When you make changes to `/docs` and want to push them live to production:

```bash
# Deploys changes to Vercel production edge
npx vercel --yes --prod --cwd docs
```

### 2. Committing Changes & Synced Releases
To cleanly snapshot a development state for public/private history:

```bash
# 1. Stage and commit changes
git add .
git commit -m "feat: Describe your new changes here"

# 2. Push code updates to main branch
git push origin main

# 3. Tag a new release checkpoint
git tag -a v1.1.0 -m "Release description"
git push origin v1.1.0
```

Once tagged, navigate to **GitHub Repository > Releases > Draft a New Release**, select the tag `v1.1.0`, name it `v1.1.0`, write your release notes, zip up the `color.ini` and `user.css` files, attach it as an asset named `Spotify-Light.zip`, and publish it!
