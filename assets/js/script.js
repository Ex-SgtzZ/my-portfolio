'use strict';

const techStackGroups = [
  {
    title: "Frontend Development",
    items: [
      { icon: "⚛", name: "React", iconClass: "react" },
      { icon: "V", name: "Vue", iconClass: "vue" },
      { icon: "TS", name: "TypeScript", iconClass: "ts" }
    ]
  },
  {
    title: "Backend Development",
    items: [
      { icon: "N", name: "Node.js", iconClass: "node" },
      { icon: "Py", name: "Python", iconClass: "python" },
      { icon: "J", name: "Java", iconClass: "java" }
    ]
  }
];

const renderTechStack = function () {
  const techStackRoot = document.querySelector("[data-tech-stack]");

  if (!techStackRoot) {
    return;
  }

  const groupsHtml = techStackGroups.map(function (group) {
    const itemsHtml = group.items.map(function (item) {
      return `
        <li class="tech-item">
          <div class="tech-icon ${item.iconClass}" aria-hidden="true">${item.icon}</div>
          <p class="tech-name">${item.name}</p>
        </li>
      `;
    }).join("");

    return `
      <div class="tech-stack-group">
        <h4 class="h4 tech-stack-subtitle">${group.title}</h4>
        <ul class="tech-stack-list">
          ${itemsHtml}
        </ul>
      </div>
    `;
  }).join("");

  techStackRoot.innerHTML = groupsHtml;
}

renderTechStack();



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
