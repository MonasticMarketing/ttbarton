/* ttbarton.com — navigation drawer, briefing modal, scroll progress, reveals */
(function () {
  "use strict";

  /* Open a <details> target when linked to by hash. */
  function openHashTarget() {
    var el = document.getElementById(location.hash.slice(1));
    if (el instanceof HTMLDetailsElement) el.open = true;
  }
  openHashTarget();
  addEventListener("hashchange", openHashTarget);

  /* --- Dialogs ----------------------------------------------------------- */
  var lastTrigger = null;

  function closeDialog(dialog) {
    dialog.close();
    document.body.classList.remove("dialog-open");
    if (lastTrigger && lastTrigger.isConnected && lastTrigger.getClientRects().length) {
      lastTrigger.focus();
    }
  }

  document.querySelectorAll("[data-open]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var dialog = document.getElementById(trigger.dataset.open);
      if (!dialog) return;
      /* A trigger inside another dialog (nav drawer, briefing) swaps to the new one */
      var parentDialog = trigger.closest("dialog");
      if (parentDialog && parentDialog.open) parentDialog.close();
      lastTrigger = trigger;
      dialog.showModal();
      document.body.classList.add("dialog-open");
      /* Third-party embeds only load once the dialog is actually opened */
      var lazyFrame = dialog.querySelector("iframe[data-src]");
      if (lazyFrame && !lazyFrame.getAttribute("src")) {
        lazyFrame.setAttribute("src", lazyFrame.dataset.src);
      }
      if (dialog.id === "overview") {
        chapterIndex = 0;
        renderChapter();
      }
    });
  });

  document.querySelectorAll("dialog").forEach(function (dialog) {
    /* Keep Tab focus inside the dialog. */
    dialog.addEventListener("keydown", function (event) {
      if (event.key !== "Tab") return;
      var focusable = [].slice
        .call(dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]'))
        .filter(function (el) { return el.getClientRects().length > 0; });
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        if (last) last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        if (first) first.focus();
      }
    });

    var closer = dialog.querySelector("[data-close]");
    if (closer) closer.addEventListener("click", function () { closeDialog(dialog); });

    dialog.addEventListener("cancel", function (event) {
      event.preventDefault();
      closeDialog(dialog);
    });

    /* Click outside the dialog box closes it. */
    dialog.addEventListener("click", function (event) {
      if (event.target !== dialog) return;
      var box = dialog.getBoundingClientRect();
      var outside =
        event.clientX < box.left || event.clientX > box.right ||
        event.clientY < box.top || event.clientY > box.bottom;
      if (outside) closeDialog(dialog);
    });

    dialog.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { closeDialog(dialog); });
    });
  });

  /* --- 60 second briefing ------------------------------------------------ */
  var chapterIndex = 0;
  var chapters = [].slice.call(document.querySelectorAll("[data-chapter]"));
  var prevButton = document.querySelector("[data-prev]");
  var nextButton = document.querySelector("[data-next]");
  var lastChapter = chapters.length - 1;

  function renderChapter() {
    if (!chapters.length) return;
    chapters.forEach(function (chapter, i) {
      chapter.hidden = i !== chapterIndex;
      var heading = chapter.querySelector("h2");
      if (heading) heading.id = i === chapterIndex ? "overview-title" : "chapter-title-" + i;
    });
    document.querySelectorAll("[data-progress]").forEach(function (bar, i) {
      bar.classList.toggle("active", i <= chapterIndex);
    });
    var step = document.querySelector("[data-step]");
    if (step) {
      step.textContent = "0" + (chapterIndex + 1) + " / 0" + chapters.length;
    }
    if (prevButton) prevButton.disabled = chapterIndex === 0;
    if (nextButton) {
      nextButton.textContent = chapterIndex === lastChapter ? "Finish briefing ✓" : "Next chapter →";
    }
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      chapterIndex = Math.max(0, chapterIndex - 1);
      renderChapter();
    });
  }
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      if (chapterIndex === lastChapter) {
        closeDialog(document.getElementById("overview"));
      } else {
        chapterIndex++;
        renderChapter();
      }
    });
  }
  var overview = document.getElementById("overview");
  if (overview) {
    overview.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight" && chapterIndex < lastChapter) { chapterIndex++; renderChapter(); }
      if (event.key === "ArrowLeft" && chapterIndex > 0) { chapterIndex--; renderChapter(); }
    });
  }

  /* --- Scroll reveals ---------------------------------------------------- */
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll("[data-reveal]").forEach(function (el) { observer.observe(el); });

  /* --- Scroll progress & header state ------------------------------------ */
  var ticking = false;
  var progress = document.querySelector(".scroll-progress");
  var header = document.querySelector(".site-header");

  function onScrollFrame() {
    var scrollable = document.documentElement.scrollHeight - innerHeight;
    if (progress) {
      progress.style.transform = "scaleX(" + (scrollable > 0 ? scrollY / scrollable : 0) + ")";
    }
    if (header) header.classList.toggle("scrolled", scrollY > 30);
    ticking = false;
  }

  addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(onScrollFrame);
    },
    { passive: true }
  );
  onScrollFrame();
})();
