'use strict';

const menuBtn = document.querySelector('[data-menu-btn]');
const nav = document.querySelector('[data-nav]');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });
}
