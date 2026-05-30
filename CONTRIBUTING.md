# 🤝 Contributing to Spotify-Light

Thank you for showing interest in contributing to **Spotify-Light**! Open-source contributions from developers like you help make this theme incredibly robust and visually stunning for everyone.

By participating in this project, you agree to abide by our standards. Here is a guide to help you get started with contributing.

---

## 🧭 How to Contribute

### 1. Reporting Bugs
- If you find a component that is not correctly themed, has bad contrast, or displays dark blocks, please search our [Issues](https://github.com/blip-cmd/spotify-light/issues) page to see if it has already been reported.
- If it hasn't, open a new issue. Be sure to include:
  - Your operating system.
  - Your Spotify client version and Spicetify version.
  - A clear screenshot pointing out the un-themed or misaligned component.

### 2. Proposing Features / Visual Tweeks
- Want to add a new sub-color scheme (e.g. `pastel-teal`, `rose-dawn`)? Or suggest a better transition animation?
- Open an Issue first to discuss the feature with the community so we can align on design continuity.

### 3. Submitting Pull Requests (PRs)
Once you are ready to make a change:
1. **Fork** the repository to your own GitHub account.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/spotify-light.git
   ```
3. Create a descriptive branch for your changes:
   ```bash
   git checkout -b feature/cool-new-animation
   # or
   git checkout -b fix/context-menu-contrast
   ```
4. Perform your modifications in `color.ini` or `user.css`.
5. Test your changes locally on your Spotify client by running `spicetify apply`.
6. Commit your changes with clear, concise commit messages.
7. Push your branch to your fork and submit a **Pull Request** to our `main` branch.

---

## 🎨 Styles & Guidelines

To ensure the codebase remains clean, readable, and easy to maintain, please follow these guidelines:

### 1. CSS Standard
- Use descriptive comments to organize sections inside `user.css`.
- Avoid hardcoded colors in `user.css`. Use Spicetify's mapped variable names (e.g., `var(--spice-main)`, `var(--spice-button)`) so that color changes are handled automatically.
- Keep animations light and performant. Use hardware-accelerated properties (`transform`, `opacity`) and smooth easing values (`cubic-bezier`).
- Maintain formatting with 2-space indentation and clean rulesets.

### 2. Color Schemes
- If adding a new color scheme, append it directly as a new block inside `color.ini` (e.g., `[teal-dream]`). Make sure all 15 variables are defined and mapped properly.




