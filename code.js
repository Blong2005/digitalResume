"use strict";

/* ==================================================================
   CONTENT — edit these arrays to update the site.
   - links: [{ label, href }] become buttons on the card
   - image: path in /assets (opens in the lightbox). If the file is
     missing, the card falls back to the gradient placeholder.
   - thumb: CSS gradient used when there is no image
================================================================== */

/* ---------- Development (GitHub first, then coursework) ---------- */
const devProjects = [

  {
    title: "Most dangerous neighborhood in Pittsburgh",
    meta: ["GitHub", "Python"],
    description: "Final project for CMPINF0001, written in Python.",
    tags: ["Python", "Coursework"],
    image: "pittMap.png",
    links: [{ label: "View code ↗", href: "https://github.com/Blong2005/WorstHoodinTheBurgh" }],
    thumb: "linear-gradient(120deg, #3b341f 0%, #85cb33 100%)",
  },
  {
    title: "Autocomplete Engine",
    meta: ["Coursework", "Fall 2025"],
    description:
      "A Java autocomplete engine that uses a trie to store and search large dictionaries, with a backend that predicts words from user history.",
    tags: ["Java", "Tries", "Data structures"],
    image: "autocomplete.png",
    links: [],
    thumb: "linear-gradient(150deg, #3b341f 0%, #a5cbc3 100%)",
  },
  {
    title: "Word Search Solver",
    meta: ["Coursework", "Spring 2025"],
    description:
      "A Java program that reads a word search from text input and finds every listed word using recursive backtracking, saving each location.",
    tags: ["Java", "Recursion", "Backtracking"],
    image: "wordSearch.jpg",
    links: [],
    thumb: "linear-gradient(110deg, #a5cbc3 0%, #3b341f 100%)",
  },
  {
    title: "Fictional Company Website - Astrocruise",
    meta: ["Team project", "Spring 2024"],
    description:
      "A team-built site for a fictional space transportation company, focused on visual design, layout and interactivity.",
    tags: ["HTML", "JavaScript", "Tailwind CSS"],
    image: "astrocruise.png",
    links: [],
    thumb: "linear-gradient(140deg, #100b00 0%, #85cb33 130%)",
  },
];

/* ---------- Digital media ---------- */
const designProjects = [
  {
    title: "Mock Advertisement",
    meta: ["Print ad", "Short form"],
    description:
      "A beach-themed ad for Ghost Energy's Orange Cream flavor, pairing a tropical photo backdrop with a warm, hand-lettered tagline.",
    tags: ["Layout", "Typography", "Compositing"],
    image: "orangeGhostAd.jpg",
    alt: "Advertisement showing an Orange Cream Ghost energy drink can on a sandy beach under palm trees with the headline 'Energy that takes you somewhere.'",
    thumb: "linear-gradient(135deg, #a5cbc3 0%, #EFFFC8 100%)",
  },
  {
    title: "Infographic",
    meta: ["Two-page spread", "Short form"],
    description:
      "A magazine spread with an oversized slab-serif headline, a drop cap, two text columns and an illustration of a student stepping over a red line.",
    tags: ["InDesign", "Editorial", "Typography"],
    image: "2pageSpread.jpg",
    alt: "Two-page magazine spread titled 'Testing the Limits' with body text on the left and an illustration of a student stepping over a red line in a school hallway on the right.",
    thumb: "linear-gradient(135deg, #3b341f 0%, #a5cbc3 100%)",
  },
  {
    title: "What the Flock?",
    meta: ["Infographic", "Short form"],
    description:
      "An infographic explaining Flock Safety's license plate reader cameras, where they are deployed, and documented cases of misuse.",
    tags: ["Infographic", "Information design", "Pixel type"],
    image: "flockInfo.jpg",
    alt: "Dark green infographic titled 'What the Flock?' with orange-outlined panels explaining Flock cameras, a map of camera locations, examples of abuse and a map of misuse.",
    thumb: "linear-gradient(135deg, #100b00 0%, #85cb33 100%)",
  },
  {
    title: "Analyzing Good Design",
    meta: ["InDesign", "Design Beginnings"],
    description:
      "A graphic analyzing the design elements of a piece of my choosing, the Invincible #70 cover, built in Adobe InDesign to get more comfortable with the software.",
    tags: ["InDesign", "Contrast", "Repetition", "Alignment"],
    image: "goodDesign.jpg",
    alt: "Graphic titled 'Good Design' showing the Invincible #70 comic cover with callouts explaining contrast, repetition and alignment.",
    thumb: "linear-gradient(135deg, #a5cbc3 0%, #3b341f 100%)",
  },


];

/* ---------- Work experience (most recent first) ---------- */
const jobs = [
  {
    role: "Crew Member",
    org: "Panera Bread",
    dates: "June 2026 – Present",
    bullets: [
      "Balanced customer service, order accuracy and cleanliness during high-volume rushes while maintaining a full course load.",
      "Trained on multiple stations (line, register, prep), collaborating with a rotating team of dozens.",
    ],
  },
  {
    role: "Camp Counselor / Afterschool Employee",
    org: "Regional Engagement Center",
    dates: "June 2023 – August 2025",
    bullets: [
      "Worked in a small team to prepare and serve multiple warm, nutritious meals a day to a class of over 50 kids.",
      "Supervised campers and led activities, games and field trips throughout the summer camp.",
    ],
  },
];

/* ==================================================================
   RENDERING
================================================================== */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function createMedia(project) {
  const hasImage = Boolean(project.image);
  const hasLink = project.links && project.links.length > 0;
  const canZoom = hasImage;

  // Choose the wrapper element: button (lightbox), link, or plain div
  let wrap;
  if (canZoom) {
    wrap = el("button", "card-media");
    wrap.type = "button";
    wrap.setAttribute("aria-label", `View ${project.title} full size`);
  } else if (hasLink) {
    wrap = el("a", "card-media is-placeholder");
    wrap.href = project.links[0].href;
    wrap.rel = "noopener";
    wrap.setAttribute("aria-label", `${project.title}: ${project.links[0].label}`);
  } else {
    wrap = el("div", "card-media is-placeholder");
    wrap.setAttribute("aria-hidden", "true");
  }

  const showPlaceholder = () => {
    wrap.classList.add("is-placeholder");
    wrap.style.background = project.thumb;
    wrap.replaceChildren(document.createTextNode(project.title));
    if (wrap.tagName === "BUTTON") {
      wrap.disabled = true;
      wrap.setAttribute("aria-label", project.title);
    }
  };

  if (hasImage) {
    const img = new Image();
    img.src = project.image;
    img.alt = project.alt || "";
    img.loading = "lazy";
    img.addEventListener("error", showPlaceholder);
    wrap.appendChild(img);
    const hint = el("span", "zoom-hint", "+");
    hint.setAttribute("aria-hidden", "true");
    wrap.appendChild(hint);

    wrap.addEventListener("click", () => {
      if (!wrap.disabled) openLightbox(project);
    });
  } else {
    wrap.style.background = project.thumb;
    wrap.appendChild(document.createTextNode(project.title));
  }
  return wrap;
}

function createCard(project) {
  const li = el("li", "card");

  li.appendChild(createMedia(project));

  const body = el("div", "card-body");

  const meta = el("p", "meta");
  (project.meta || []).forEach((m) => meta.appendChild(el("span", "", m)));
  body.appendChild(meta);

  body.appendChild(el("h3", "", project.title));
  body.appendChild(el("p", "card-desc", project.description));

  if (project.tags && project.tags.length) {
    const tags = el("ul", "tags");
    project.tags.forEach((t) => tags.appendChild(el("li", "", t)));
    body.appendChild(tags);
  }

  if (project.links && project.links.length) {
    const links = el("div", "card-links");
    project.links.forEach((l) => {
      const a = el("a", "", l.label);
      a.href = l.href;
      a.rel = "noopener";
      links.appendChild(a);
    });
    body.appendChild(links);
  }

  li.appendChild(body);
  return li;
}

function renderGrid(id, projects) {
  const grid = document.getElementById(id);
  projects.forEach((p) => grid.appendChild(createCard(p)));
}

function renderJobs() {
  const list = document.getElementById("exp-list");
  jobs.forEach((job) => {
    const li = el("li", "exp");
    li.appendChild(el("p", "exp-dates", job.dates));

    const body = el("div");
    const h3 = el("h3", "", job.role);
    body.appendChild(h3);
    body.appendChild(el("p", "exp-org", job.org));

    const ul = el("ul");
    job.bullets.forEach((b) => ul.appendChild(el("li", "", b)));
    body.appendChild(ul);

    li.appendChild(body);
    list.appendChild(li);
  });
}

renderGrid("dev-grid", devProjects);
renderGrid("design-grid", designProjects);
renderJobs();

/* ------------------------- Lightbox ------------------------------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

function openLightbox(project) {
  lightboxImg.src = project.image;
  lightboxImg.alt = project.alt || project.title;
  lightboxCaption.textContent = project.title;
  if (typeof lightbox.showModal === "function") lightbox.showModal();
  else lightbox.setAttribute("open", "");
}

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
// Click on the dark backdrop closes it
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.close();
});

/* ---------------------- Reveal on scroll -------------------------- */
const cards = document.querySelectorAll(".card");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  cards.forEach((c) => observer.observe(c));
} else {
  cards.forEach((c) => c.classList.add("is-visible"));
}

/* ----------------------------- Footer ----------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();