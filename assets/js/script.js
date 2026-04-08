'use strict';

const root = document.documentElement;
const themeToggleBtn = document.querySelector('[data-theme-toggle]');
const navButtons = document.querySelectorAll('[data-nav-target]');
const panels = document.querySelectorAll('[data-page]');
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
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
});

const setActivePage = (target) => {
  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.page === target);
  });

  navButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.navTarget === target);
  });
};

navButtons.forEach((button) => {
  button.addEventListener('click', () => setActivePage(button.dataset.navTarget));
});

setActivePage('home');
