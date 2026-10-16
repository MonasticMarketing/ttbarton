/* ttbarton.com — brief introduction overlay, homepage only.
   Loaded synchronously (no defer) so it paints before the page content.
   The markup ships hidden, so no-JS visitors and crawlers never see it. */
(function () {
  "use strict";

  if (location.pathname !== "/") return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var loader = document.querySelector(".intro-loader");
  if (!loader) return;

  loader.hidden = false;
  document.documentElement.classList.add("intro-active");

  var finished = false;

  function finish() {
    if (finished) return;
    finished = true;
    loader.hidden = true;
    document.documentElement.classList.remove("intro-active");
    document.querySelectorAll("[data-intro-inert]").forEach(function (el) {
      el.inert = false;
      el.removeAttribute("data-intro-inert");
    });
    document.removeEventListener("keydown", onKey);
  }

  function onKey(event) {
    if (event.key === "Escape") finish();
  }

  var skip = loader.querySelector(".intro-skip");
  if (skip) skip.addEventListener("click", finish);
  document.addEventListener("keydown", onKey);

  /* Keep the page behind the overlay out of the tab order while it shows */
  document.addEventListener("DOMContentLoaded", function () {
    if (finished) return;
    document.querySelectorAll(
      "body > header, body > main, body > footer, body > .skip-link"
    ).forEach(function (el) {
      el.inert = true;
      el.setAttribute("data-intro-inert", "");
    });
  }, { once: true });

  /* Matches the CSS exit timing: 3.15s hold + 0.45s fade */
  setTimeout(finish, 3600);
})();
