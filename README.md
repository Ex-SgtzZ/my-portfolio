# My Portfolio

## Automatic screenshots with Codex

This repository includes a Codex-friendly screenshot workflow.

### One-time setup

```bash
npm install
npx playwright install chromium
```

### Generate screenshots

```bash
npm run screenshot
```

The script will:
- start a local static server,
- open the portfolio with Playwright,
- capture desktop + mobile screenshots automatically.

Output files are written to:
- `artifacts/screenshots/about-desktop.png`
- `artifacts/screenshots/portfolio-desktop.png`
- `artifacts/screenshots/blog-mobile.png`
