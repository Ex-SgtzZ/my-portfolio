# Zayden's Portfolio

A single-page personal portfolio with section navigation, project filtering, blog previews, and a theme toggle.

## Features

- **Section-based navigation** (About, Resume, Portfolio, Blog, Contact)
- **Top notification banner** with per-section update text
- **Theme toggle**
  - **Dark mode:** black UI with **bright red** accents
  - **Light mode:** dark-red + white palette
- **Portfolio tabs** (Work Showcase + Tech Stack)
- **Codex screenshot command** for automated captures

## Quick start

1. Open `index.html` in your browser.
2. Use the nav buttons to switch sections.
3. Use the **Light mode / Dark mode** button in the navbar to switch themes.

## Customize the notification banner

Edit `sectionNotifications` in:
- `assets/js/script.js`

You can control each section with:
- `enabled: true/false`
- custom `message`
- custom `lastUpdated`

## Customize theme colors

Edit CSS variables in:
- `assets/css/style.css`

Theme scopes:
- `:root` = default dark theme
- `html[data-theme="light"]` = light theme overrides

## Optional: Codex automatic screenshots

If your environment allows npm package downloads:

```bash
npm install
npx playwright install chromium
npm run screenshot
```

Screenshots are saved to `artifacts/screenshots/`.
