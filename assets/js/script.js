'use strict';


const root = document.documentElement;
const themeToggleBtn = document.querySelector("[data-theme-toggle]");
const notificationToggleBtn = document.querySelector("[data-notification-toggle]");
const THEME_STORAGE_KEY = "portfolio-theme";
const NOTIFICATION_STORAGE_KEY = "portfolio-notifications-enabled";

const setTheme = function (theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  if (themeToggleBtn) {
    themeToggleBtn.textContent = theme === "dark" ? "☀" : "🌙";
    themeToggleBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
}

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
setTheme(savedTheme === "light" ? "light" : "dark");

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    const currentTheme = root.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
}

let notificationsEnabled = localStorage.getItem(NOTIFICATION_STORAGE_KEY) !== "false";

const updateNotificationToggleButton = function () {
  if (!notificationToggleBtn) {
    return;
  }

  notificationToggleBtn.textContent = notificationsEnabled ? "🔔" : "🔕";
  notificationToggleBtn.setAttribute("aria-label", notificationsEnabled ? "Disable notifications" : "Enable notifications");
}

updateNotificationToggleButton();



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);




// blog modal variables
const blogItems = document.querySelectorAll("[data-blog-item]");
const blogModalContainer = document.querySelector("[data-blog-modal-container]");
const blogModalCloseBtn = document.querySelector("[data-blog-modal-close-btn]");
const blogOverlay = document.querySelector("[data-blog-overlay]");
const blogModalImg = document.querySelector("[data-blog-modal-img]");
const blogModalCategory = document.querySelector("[data-blog-modal-category]");
const blogModalDate = document.querySelector("[data-blog-modal-date]");
const blogModalTitle = document.querySelector("[data-blog-modal-title]");
const blogModalText = document.querySelector("[data-blog-modal-text]");

const getThreeSentencePreview = function (text) {
  const maxPreviewChars = 180;
  const normalizedText = text.replace(/\s+/g, " ").trim();
  const sentences = normalizedText.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) || [normalizedText];
  const sentencePreview = sentences.slice(0, 3).join(" ").trim();

  if (sentencePreview.length <= maxPreviewChars) {
    return sentencePreview;
  }

  return sentencePreview.slice(0, maxPreviewChars).trimEnd() + "...";
}

const blogTextBlocks = document.querySelectorAll("[data-blog-text]");
for (let i = 0; i < blogTextBlocks.length; i++) {
  const fullText = blogTextBlocks[i].textContent.trim();
  blogTextBlocks[i].setAttribute("data-blog-full-text", fullText);
  blogTextBlocks[i].textContent = getThreeSentencePreview(fullText);
}

const blogModalFunc = function () {
  blogModalContainer.classList.toggle("active");
  blogOverlay.classList.toggle("active");
}

for (let i = 0; i < blogItems.length; i++) {
  blogItems[i].addEventListener("click", function () {
    const blogImg = this.querySelector("[data-blog-img]");
    const blogCategory = this.querySelector("[data-blog-category]");
    const blogDate = this.querySelector("[data-blog-date]");
    const blogTitle = this.querySelector("[data-blog-title]");
    const blogText = this.querySelector("[data-blog-text]");

    blogModalImg.src = blogImg.src;
    blogModalImg.alt = blogImg.alt;
    blogModalCategory.textContent = blogCategory.textContent;
    blogModalDate.textContent = blogDate.textContent;
    blogModalDate.setAttribute("datetime", blogDate.getAttribute("datetime"));
    blogModalTitle.textContent = blogTitle.textContent;
    blogModalText.textContent = blogText.getAttribute("data-blog-full-text");

    blogModalFunc();
  });
}

blogModalCloseBtn.addEventListener("click", blogModalFunc);
blogOverlay.addEventListener("click", blogModalFunc);

// portfolio tab variables
const portfolioTabButtons = document.querySelectorAll("[data-portfolio-tab]");
const portfolioPanels = document.querySelectorAll("[data-portfolio-panel]");

for (let i = 0; i < portfolioTabButtons.length; i++) {
  portfolioTabButtons[i].addEventListener("click", function () {
    const selectedTab = this.dataset.portfolioTab;

    for (let j = 0; j < portfolioTabButtons.length; j++) {
      portfolioTabButtons[j].classList.remove("active");
    }

    for (let j = 0; j < portfolioPanels.length; j++) {
      if (portfolioPanels[j].dataset.portfolioPanel === selectedTab) {
        portfolioPanels[j].classList.add("active");
      } else {
        portfolioPanels[j].classList.remove("active");
      }
    }

    this.classList.add("active");
  });
}

// tech stack modal variables
const techItems = document.querySelectorAll("[data-tech-item]");
const techModalContainer = document.querySelector("[data-tech-modal-container]");
const techModalCloseBtn = document.querySelector("[data-tech-modal-close-btn]");
const techOverlay = document.querySelector("[data-tech-overlay]");
const techModalTitle = document.querySelector("[data-tech-modal-title]");
const techModalLevel = document.querySelector("[data-tech-modal-level]");
const techModalText = document.querySelector("[data-tech-modal-text]");

const techModalFunc = function () {
  techModalContainer.classList.toggle("active");
  techOverlay.classList.toggle("active");
}

for (let i = 0; i < techItems.length; i++) {
  techItems[i].setAttribute("role", "button");
  techItems[i].setAttribute("tabindex", "0");

  const openTechModal = function () {
    techModalTitle.textContent = techItems[i].dataset.techName;
    techModalLevel.textContent = `${techItems[i].dataset.techLevel}%`;
    techModalText.textContent = techItems[i].dataset.techBlurb;
    techModalFunc();
  }

  techItems[i].addEventListener("click", openTechModal);
  techItems[i].addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openTechModal();
    }
  });
}

if (techModalCloseBtn && techOverlay) {
  techModalCloseBtn.addEventListener("click", techModalFunc);
  techOverlay.addEventListener("click", techModalFunc);
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const notificationBanner = document.querySelector("[data-notification-banner]");
const notificationBannerText = document.querySelector("[data-notification-text]");

const sectionNotifications = {
  about: {
    enabled: true,
    message: "About section updated",
    lastUpdated: "April 7, 2026"
  },
  resume: {
    enabled: true,
    message: "Resume refreshed",
    lastUpdated: "April 7, 2026"
  },
  portfolio: {
    enabled: true,
    message: "Portfolio projects updated",
    lastUpdated: "April 7, 2026"
  },
  blog: {
    enabled: true,
    message: "Blog posts updated",
    lastUpdated: "April 7, 2026"
  },
  contact: {
    enabled: false,
    message: "Contact details updated",
    lastUpdated: "April 7, 2026"
  }
};

const updateNotificationBanner = function (sectionKey) {
  if (!notificationBanner || !notificationBannerText) {
    return;
  }

  if (!notificationsEnabled) {
    notificationBanner.classList.remove("active");
    return;
  }

  const bannerConfig = sectionNotifications[sectionKey];

  if (!bannerConfig || !bannerConfig.enabled) {
    notificationBanner.classList.remove("active");
    return;
  }

  notificationBannerText.textContent = `${bannerConfig.message} — Last updated: ${bannerConfig.lastUpdated}`;
  notificationBanner.classList.add("active");
};

if (notificationToggleBtn) {
  notificationToggleBtn.addEventListener("click", function () {
    notificationsEnabled = !notificationsEnabled;
    localStorage.setItem(NOTIFICATION_STORAGE_KEY, notificationsEnabled);
    updateNotificationToggleButton();

    const activeLink = document.querySelector("[data-nav-link].active");
    updateNotificationBanner(activeLink ? activeLink.dataset.navTarget : "about");
  });
}

const setActivePage = function (targetPage) {
  for (let i = 0; i < pages.length; i++) {
    pages[i].classList.toggle("active", pages[i].dataset.page === targetPage);
  }

  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].classList.toggle("active", navigationLinks[i].dataset.navTarget === targetPage);
  }

  updateNotificationBanner(targetPage);
  window.scrollTo(0, 0);
};

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.dataset.navTarget;
    setActivePage(targetPage);
  });
}

const defaultActiveLink = document.querySelector("[data-nav-link].active");
setActivePage(defaultActiveLink ? defaultActiveLink.dataset.navTarget : "about");
