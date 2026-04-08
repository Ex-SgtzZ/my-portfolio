import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';

const HOST = '127.0.0.1';
const PORT = 4173;
const ROOT = process.cwd();
const OUTPUT_DIR = join(ROOT, 'artifacts', 'screenshots');

const contentTypeMap = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

const safePath = (urlPath) => {
  const cleanPath = urlPath.split('?')[0].split('#')[0];
  const requested = cleanPath === '/' ? '/index.html' : cleanPath;
  const resolved = normalize(join(ROOT, requested));
  if (!resolved.startsWith(ROOT)) return join(ROOT, 'index.html');
  return resolved;
};

const server = createServer(async (req, res) => {
  try {
    let filePath = safePath(req.url || '/');
    if (!existsSync(filePath)) filePath = join(ROOT, 'index.html');

    const body = await readFile(filePath);
    const ext = extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': contentTypeMap[ext] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Server error');
  }
});

const saveScreenshots = async () => {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  try {
    const desktop = await browser.newPage({ viewport: { width: 1440, height: 1024 } });
    await desktop.goto(`http://${HOST}:${PORT}`, { waitUntil: 'networkidle' });
    await desktop.screenshot({ path: join(OUTPUT_DIR, 'redesign-desktop.png'), fullPage: true });

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobile.goto(`http://${HOST}:${PORT}`, { waitUntil: 'networkidle' });
    await mobile.screenshot({ path: join(OUTPUT_DIR, 'redesign-mobile.png'), fullPage: true });
  } finally {
    await browser.close();
  }
};

server.listen(PORT, HOST, async () => {
  try {
    await saveScreenshots();
    console.log('Saved screenshots to artifacts/screenshots');
    process.exitCode = 0;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('Executable doesn\'t exist')) {
      console.warn('Playwright browser binary is unavailable in this environment. Skipping screenshot generation.');
      process.exitCode = 0;
    } else {
      console.error('Screenshot generation failed:', error);
      process.exitCode = 1;
    }
  } finally {
    server.close();
  }
});
