/* ============================================
   HAMBURGER MENU
   ============================================ */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* ============================================
   DARK / LIGHT THEME TOGGLE
   ============================================ */
(function () {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", initial);

  window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  });
})();

/* ============================================
   SCROLL REVEAL
   ============================================ */
window.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
});

/* ============================================
   SHOW ALL / SHOW LESS — limited grids
   ============================================ */
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".limited-grid").forEach((grid) => {
    const count = grid.querySelectorAll(".grid-item").length;
    grid.setAttribute("data-count", count);
  });

  document.querySelectorAll(".show-all-btn").forEach((btn) => {
    const targetId = btn.getAttribute("data-target");
    const grid = document.getElementById(targetId);
    if (!grid) return;
    btn.addEventListener("click", () => {
      const isExpanded = grid.classList.toggle("expanded");
      btn.textContent = isExpanded ? "Show less" : "Show all";
    });
  });
});

/* ============================================
   LIGHTBOX (fullscreen zoom for gallery / model items)
   ============================================ */
window.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const content = lightbox.querySelector(".lightbox-content");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  function openLightbox(node) {
    content.innerHTML = "";
    content.appendChild(node);
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    content.innerHTML = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".zoom-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const type = btn.getAttribute("data-type");

      if (type === "image") {
        const src = btn.getAttribute("data-src");
        const alt = btn.getAttribute("data-alt") || "";
        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        openLightbox(img);
      } else if (type === "model") {
        const src = btn.getAttribute("data-src");
        const alt = btn.getAttribute("data-alt") || "";
        const mv = document.createElement("model-viewer");
        mv.setAttribute("src", src);
        mv.setAttribute("alt", alt);
        mv.setAttribute("camera-controls", "");
        mv.setAttribute("auto-rotate", "");
        mv.setAttribute("shadow-intensity", "1");
        openLightbox(mv);
      }
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});
