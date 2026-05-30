# 🎨 Spotify-Light Spicetify Theme

[![GPLv3 License](https://img.shields.io/badge/license-GPLv3-blue.svg)](LICENSE)
[![Spicetify Compatibility](https://img.shields.io/badge/spicetify-v2.x-purple.svg)](https://spicetify.app/)

A premium, modern **glassmorphic light theme profile** for the Spotify desktop client, designed to replace Spotify's default black aesthetic with a crisp, tactile, HSL-harmonized light mode. Built on top of [Spicetify](https://spicetify.app/).

---

## ✨ Features

- **Harmony Aesthetics:** Crisp off-white panels (`#FAFAFC`) with soft warm sidebars and premium violet-to-indigo gradient accents.
- **Glassmorphic Player Controls:** Translucent now-playing bar (`rgba(255,255,255,0.95)`) leveraging backdrop blur filters.
- **Sleek Custom Cards:** 14px rounded borders with tactile hover lifts and subtle drop shadows.
- **Soothing Lavender Lyrics:** Replaces dark lyric screens with a soothing, highly legible lavender-to-blue gradient view.
- **Full Component Styling:** Meticulously skins tooltips, dropdowns, context menus, checkboxes, input controls, scrollbars, and dialog modals.
- **Responsive Micro-animations:** Smooth ease-in-out transitions on all clickables, album arts, and tracks.

---

## 💻 Installation

### Prerequisites
Spicetify **does not** support the Microsoft Store sandboxed version of Spotify. You must install the official desktop client:
1. **Uninstall UWP Spotify:** Search for Spotify in your Start menu, right-click, and select **Uninstall**.
2. **Download Desktop Client:** Grab the standalone setup from the [Spotify official download page](https://www.spotify.com/download) and install it.
3. **Install Spicetify-cli:** Open PowerShell (non-administrator) and run:
   ```powershell
   iwr -useb https://raw.githubusercontent.com/spicetify/cli/main/install.ps1 | iex
   ```
4. **Initialize Spicetify:** Run `spicetify backup apply` in your terminal to create a backup of the client.

### Applying the Theme
1. Open PowerShell and navigate to your Spicetify Themes directory:
   ```powershell
   cd "$env:APPDATA\spicetify\Themes"
   ```
2. Clone this repository directly as `Spotify-Light`:
   ```powershell
   git clone https://github.com/blip-cmd/spotify-light Spotify-Light
   ```
3. Set the theme in your configuration and apply:
   ```powershell
   spicetify config current_theme Spotify-Light
   spicetify config color_scheme light
   spicetify apply
   ```

---

## 🎨 Customizing & Development

If you want to edit color codes or visual parameters:
- **Change Colors:** Modify color tokens inside `color.ini`.
- **Change Styles:** Modify styles inside `user.css`.
- **Apply Changes:** Compile your changes by running:
  ```powershell
  spicetify apply
  ```

---

## 🤝 Contributing

We welcome open-source contributions! Whether you want to fix a layout bug, propose a new color scheme, or refine micro-animations, please read [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

---

## 📄 License

Distributed under the **GNU General Public License v3.0** (Copyleft). Anyone who modifies and distributes this software must also release their modifications under this same copyleft license and state the original as source. See [LICENSE](LICENSE) for details.




