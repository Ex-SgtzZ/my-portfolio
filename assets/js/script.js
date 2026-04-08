'use strict';

const root = document.documentElement;
const themeToggleBtn = document.querySelector('[data-theme-toggle]');
const menuToggleBtn = document.querySelector('[data-menu-toggle]');
const siteNav = document.querySelector('[data-site-nav]');
const THEME_STORAGE_KEY = 'portfolio-theme';

const setTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  if (themeToggleBtn) {
    themeToggleBtn.textContent = theme === 'dark' ? '☀' : '🌙';
    themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
};

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
setTheme(savedTheme === 'light' ? 'light' : 'dark');

themeToggleBtn?.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

menuToggleBtn?.addEventListener('click', () => {
  const isOpen = siteNav?.classList.toggle('open');
  menuToggleBtn.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

const navLinks = document.querySelectorAll('.site-nav a');
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', () => {
    siteNav?.classList.remove('open');
    menuToggleBtn?.setAttribute('aria-expanded', 'false');
  });
}
