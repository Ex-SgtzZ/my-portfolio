'use strict';

const root = document.documentElement;
const themeToggleBtn = document.querySelector('[data-theme-toggle]');
const THEME_STORAGE_KEY = 'portfolio-theme';

const setTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  if (themeToggleBtn) {
    const isDark = theme === 'dark';
    themeToggleBtn.textContent = isDark ? '☀' : '🌙';
    themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
};

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
setTheme(savedTheme === 'light' ? 'light' : 'dark');

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}
