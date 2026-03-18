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

// portfolio sub-tab variables
const portfolioTabBtns = document.querySelectorAll("[data-portfolio-tab-btn]");
const portfolioPanels = document.querySelectorAll("[data-portfolio-tab-panel]");

for (let i = 0; i < portfolioTabBtns.length; i++) {
  portfolioTabBtns[i].addEventListener("click", function () {
    const target = this.dataset.target;

    for (let j = 0; j < portfolioTabBtns.length; j++) {
      portfolioTabBtns[j].classList.remove("active");
    }

    for (let j = 0; j < portfolioPanels.length; j++) {
      const isTarget = portfolioPanels[j].dataset.portfolioTabPanel === target;
      portfolioPanels[j].classList.toggle("active", isTarget);
    }

    this.classList.add("active");
  });
}

// blog modal variables
const blogItems = document.querySelectorAll("[data-blog-item]");
const blogOpenBtns = document.querySelectorAll("[data-blog-open-btn]");
const blogModalContainer = document.querySelector("[data-blog-modal-container]");
const blogModalCloseBtn = document.querySelector("[data-blog-modal-close-btn]");
const blogOverlay = document.querySelector("[data-blog-overlay]");
const blogModalTitle = document.querySelector("[data-blog-modal-title]");
const blogModalText = document.querySelector("[data-blog-modal-text]");
const blogModalReadMoreBtn = document.querySelector("[data-blog-modal-read-more-btn]");

const BLOG_PREVIEW_LENGTH = 90;
const BLOG_MODAL_PREVIEW_LENGTH = 220;
let activeBlogFullText = "";
let isBlogModalExpanded = false;

const makeBlogSnippet = function (text, limit) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= limit) return normalized;
  return `${normalized.slice(0, limit).trimEnd()}...`;
}

const updateBlogModalContent = function () {
  if (isBlogModalExpanded) {
    blogModalText.textContent = activeBlogFullText;
    blogModalReadMoreBtn.textContent = "Show less";
  } else {
    blogModalText.textContent = makeBlogSnippet(activeBlogFullText, BLOG_MODAL_PREVIEW_LENGTH);
    blogModalReadMoreBtn.textContent = "Read more";
  }
}

const closeBlogModal = function () {
  if (!blogModalContainer) return;
  blogModalContainer.classList.remove("active");
  isBlogModalExpanded = false;
}

const openBlogModal = function (item) {
  if (!item || !blogModalContainer) return;

  const titleElement = item.querySelector(".blog-item-title");
  const textElement = item.querySelector("[data-blog-text]");

  activeBlogFullText = textElement?.dataset.blogFullText || textElement?.textContent || "";
  blogModalTitle.textContent = titleElement?.textContent || "Blog Post";
  isBlogModalExpanded = false;
  updateBlogModalContent();
  blogModalContainer.classList.add("active");
}

for (let i = 0; i < blogItems.length; i++) {
  const textElement = blogItems[i].querySelector("[data-blog-text]");
  const fullText = textElement?.textContent || "";

  if (textElement) {
    textElement.dataset.blogFullText = fullText.replace(/\s+/g, " ").trim();
    textElement.textContent = makeBlogSnippet(textElement.dataset.blogFullText, BLOG_PREVIEW_LENGTH);
  }

  blogItems[i].addEventListener("click", function (event) {
    if (event.target.closest("[data-blog-open-btn]")) return;
    openBlogModal(blogItems[i]);
  });
}

for (let i = 0; i < blogOpenBtns.length; i++) {
  blogOpenBtns[i].addEventListener("click", function (event) {
    event.stopPropagation();
    openBlogModal(this.closest("[data-blog-item]"));
  });
}

if (blogModalReadMoreBtn) {
  blogModalReadMoreBtn.addEventListener("click", function () {
    isBlogModalExpanded = !isBlogModalExpanded;
    updateBlogModalContent();
  });
}

if (blogModalCloseBtn) blogModalCloseBtn.addEventListener("click", closeBlogModal);
if (blogOverlay) blogOverlay.addEventListener("click", closeBlogModal);



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
