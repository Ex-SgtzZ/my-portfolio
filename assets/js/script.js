'use strict';



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

const getShortPreview = function (text) {
  const maxPreviewChars = 90;
  const normalizedText = text.replace(/\s+/g, " ").trim();

  if (normalizedText.length <= maxPreviewChars) {
    return normalizedText;
  }

  return normalizedText.slice(0, maxPreviewChars).trimEnd() + "...";
}

const blogTextBlocks = document.querySelectorAll("[data-blog-text]");
for (let i = 0; i < blogTextBlocks.length; i++) {
  const fullText = blogTextBlocks[i].textContent.trim();
  blogTextBlocks[i].setAttribute("data-blog-full-text", fullText);
  blogTextBlocks[i].textContent = getShortPreview(fullText);
}

const blogModalFunc = function () {
  blogModalContainer.classList.toggle("active");
  blogOverlay.classList.toggle("active");
}

const openBlogModal = function (blogItem) {
  const blogImg = blogItem.querySelector("[data-blog-img]");
  const blogCategory = blogItem.querySelector("[data-blog-category]");
  const blogDate = blogItem.querySelector("[data-blog-date]");
  const blogTitle = blogItem.querySelector("[data-blog-title]");
  const blogText = blogItem.querySelector("[data-blog-text]");

  blogModalImg.src = blogImg.src;
  blogModalImg.alt = blogImg.alt;
  blogModalCategory.textContent = blogCategory.textContent;
  blogModalDate.textContent = blogDate.textContent;
  blogModalDate.setAttribute("datetime", blogDate.getAttribute("datetime"));
  blogModalTitle.textContent = blogTitle.textContent;
  blogModalText.textContent = blogText.getAttribute("data-blog-full-text");

  blogModalFunc();
}

for (let i = 0; i < blogItems.length; i++) {
  blogItems[i].addEventListener("click", function () {
    openBlogModal(this);
  });

  const blogOpenBtn = blogItems[i].querySelector("[data-blog-open-btn]");
  blogOpenBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    openBlogModal(blogItems[i]);
  });
}

blogModalCloseBtn.addEventListener("click", blogModalFunc);
blogOverlay.addEventListener("click", blogModalFunc);

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
const metricCertifications = document.querySelector("[data-metric-certifications]");
const metricProjectTracks = document.querySelector("[data-metric-project-tracks]");
const metricRecentTimeline = document.querySelector("[data-metric-recent-timeline]");
const workShowcaseUpdated = document.querySelector("[data-work-showcase-updated]");

const getVisiblePortfolioItems = function () {
  const visibleItems = [];

  for (let i = 0; i < filterItems.length; i++) {
    if (filterItems[i].classList.contains("active")) {
      visibleItems.push(filterItems[i]);
    }
  }

  return visibleItems;
}

const getItemYears = function (projectItem) {
  const itemText = projectItem.textContent || "";
  const yearMatches = itemText.match(/\b(19|20)\d{2}\b/g);
  const years = [];

  if (!yearMatches) return years;

  for (let i = 0; i < yearMatches.length; i++) {
    years.push(Number(yearMatches[i]));
  }

  return years;
}

const updateWorkShowcaseStats = function () {
  if (!metricCertifications || !metricProjectTracks || !metricRecentTimeline || !workShowcaseUpdated) return;

  const visibleItems = getVisiblePortfolioItems();
  let certificationCount = 0;
  const projectTrackCategories = new Set();
  const allYears = [];

  for (let i = 0; i < visibleItems.length; i++) {
    const category = visibleItems[i].dataset.category || "";

    if (category === "certifications" || category === "legacy certifications") {
      certificationCount += 1;
    }

    if (category === "projects" || category === "past projects") {
      projectTrackCategories.add(category);
    }

    const years = getItemYears(visibleItems[i]);
    for (let j = 0; j < years.length; j++) {
      allYears.push(years[j]);
    }
  }

  metricCertifications.textContent = String(certificationCount);
  metricProjectTracks.textContent = String(projectTrackCategories.size);

  if (allYears.length) {
    const minYear = Math.min(...allYears);
    const maxYear = Math.max(...allYears);
    metricRecentTimeline.textContent = minYear === maxYear ? String(minYear) : `${minYear}-${maxYear}`;
  } else {
    metricRecentTimeline.textContent = "—";
  }

  const updatedText = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date());
  workShowcaseUpdated.textContent = `Last updated: ${updatedText}`;
}

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

  updateWorkShowcaseStats();

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

updateWorkShowcaseStats();



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

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
