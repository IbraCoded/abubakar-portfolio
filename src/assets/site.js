/* Site behaviour: menu, scroll state, reveals, project filters, lightbox, contact form.
   Every feature degrades gracefully: without JavaScript, pages, links and images still work. */
(() => {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- header border on scroll ---------- */
  const header = $("[data-header]");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- mobile menu ---------- */
  const toggle = $("[data-menu-toggle]");
  const nav = $("#site-nav");
  if (toggle && nav) {
    const label = $(".menu-toggle-label", toggle);
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      if (label) label.textContent = open ? "Close" : "Menu";
      if (open) $("a", nav)?.focus();
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    window.matchMedia("(min-width: 761px)").addEventListener("change", (e) => e.matches && setOpen(false));
  }

  /* ---------- reveal on scroll ---------- */
  const reveals = $$("[data-reveal]");
  if (reveals.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  /* ---------- work filters ---------- */
  const filterBar = $("[data-filters]");
  const grid = $("[data-filter-grid]");
  if (filterBar && grid) {
    filterBar.hidden = false;
    const buttons = $$("[data-filter]", filterBar);
    const cards = $$("[data-categories]", grid);
    const status = $("[data-filter-status]");
    const apply = (cat, updateUrl) => {
      if (!buttons.some((b) => b.dataset.filter === cat)) cat = "all";
      let shown = 0;
      cards.forEach((card) => {
        const match = cat === "all" || card.dataset.categories.split(" ").includes(cat);
        card.hidden = !match;
        if (match) shown++;
      });
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === cat)));
      if (status) {
        const name = buttons.find((b) => b.dataset.filter === cat)?.firstChild.textContent.trim();
        status.textContent = `Showing ${shown} project${shown === 1 ? "" : "s"}${cat === "all" ? "" : ` in ${name}`}.`;
      }
      if (updateUrl) {
        const url = new URL(location.href);
        if (cat === "all") url.searchParams.delete("category");
        else url.searchParams.set("category", cat);
        history.replaceState(null, "", url);
      }
    };
    buttons.forEach((b) => b.addEventListener("click", () => apply(b.dataset.filter, true)));
    apply(new URLSearchParams(location.search).get("category") || "all", false);
  }

  /* ---------- lightbox ---------- */
  const zoomLinks = $$("[data-lightbox]");
  if (zoomLinks.length) {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.hidden = true;
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Image viewer");
    box.innerHTML = `
      <div class="lb-bar">
        <span class="lb-count" aria-live="polite"></span>
        <div class="lb-actions">
          <button type="button" class="lb-btn lb-zoom" aria-pressed="false">Actual size</button>
          <button type="button" class="lb-btn lb-close" aria-label="Close image viewer">Close ✕</button>
        </div>
      </div>
      <div class="lb-stage">
        <img alt="">
        <button type="button" class="lb-btn lb-nav lb-prev" aria-label="Previous image">←</button>
        <button type="button" class="lb-btn lb-nav lb-next" aria-label="Next image">→</button>
      </div>
      <p class="lb-caption"></p>`;
    document.body.appendChild(box);

    const stage = $(".lb-stage", box);
    const image = $("img", box);
    const caption = $(".lb-caption", box);
    const count = $(".lb-count", box);
    const zoomBtn = $(".lb-zoom", box);
    const single = zoomLinks.length === 1;
    let index = 0;
    let opener = null;

    if (single) $$(".lb-nav", box).forEach((b) => (b.hidden = true));

    const setZoom = (on) => {
      stage.classList.toggle("is-zoomed", on);
      zoomBtn.setAttribute("aria-pressed", String(on));
      zoomBtn.textContent = on ? "Fit to screen" : "Actual size";
    };

    const show = (i) => {
      index = (i + zoomLinks.length) % zoomLinks.length;
      const link = zoomLinks[index];
      const thumb = $("img", link);
      setZoom(false);
      image.src = link.getAttribute("href");
      image.width = Number(link.dataset.w) || 0;
      image.height = Number(link.dataset.h) || 0;
      image.alt = thumb?.alt || "";
      const fig = link.closest("figure");
      caption.textContent = fig?.querySelector("figcaption")?.textContent || thumb?.alt || "";
      count.textContent = single ? "" : `${index + 1} / ${zoomLinks.length}`;
      // warm the next image
      const nxt = zoomLinks[(index + 1) % zoomLinks.length];
      if (nxt && !single) new Image().src = nxt.getAttribute("href");
    };

    const open = (i, from) => {
      opener = from;
      show(i);
      box.hidden = false;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => box.classList.add("is-open"));
      $(".lb-close", box).focus();
    };
    const close = () => {
      box.classList.remove("is-open");
      box.hidden = true;
      document.body.style.overflow = "";
      image.removeAttribute("src");
      opener?.focus();
    };

    zoomLinks.forEach((link, i) =>
      link.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return; // allow open-in-new-tab
        e.preventDefault();
        open(i, link);
      })
    );
    $(".lb-close", box).addEventListener("click", close);
    $(".lb-prev", box).addEventListener("click", () => show(index - 1));
    $(".lb-next", box).addEventListener("click", () => show(index + 1));
    zoomBtn.addEventListener("click", () => setZoom(!stage.classList.contains("is-zoomed")));
    stage.addEventListener("click", (e) => {
      if (e.target === stage) close();
    });

    box.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft" && !single) show(index - 1);
      else if (e.key === "ArrowRight" && !single) show(index + 1);
      else if (e.key === "Tab") {
        const focusables = $$("button:not([hidden])", box);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // swipe between images on touch screens
    let startX = null;
    stage.addEventListener("touchstart", (e) => (startX = e.touches.length === 1 ? e.touches[0].clientX : null), { passive: true });
    stage.addEventListener(
      "touchend",
      (e) => {
        if (startX === null || single || stage.classList.contains("is-zoomed")) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 60) show(index + (dx < 0 ? 1 : -1));
        startX = null;
      },
      { passive: true }
    );
  }

  /* ---------- contact form ---------- */
  const form = $("[data-contact-form]");
  if (form) {
    const status = $("[data-form-status]", form);
    const fields = {
      name: $("#cf-name", form),
      email: $("#cf-email", form),
      message: $("#cf-message", form),
    };
    const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    const check = (key) => {
      const el = fields[key];
      const ok = key === "email" ? validEmail(el.value.trim()) : el.value.trim().length > 1;
      const err = $(`#cf-${key}-error`, form);
      el.setAttribute("aria-invalid", String(!ok));
      if (ok) el.removeAttribute("aria-describedby");
      else el.setAttribute("aria-describedby", err.id);
      err.hidden = ok;
      return ok;
    };
    Object.keys(fields).forEach((k) => fields[k].addEventListener("blur", () => fields[k].value && check(k)));

    const setStatus = (text, isError = false) => {
      status.textContent = text;
      status.classList.toggle("is-error", isError);
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const results = Object.keys(fields).map(check);
      if (results.includes(false)) {
        const firstBad = Object.keys(fields)[results.indexOf(false)];
        fields[firstBad].focus();
        setStatus("Please check the highlighted fields.", true);
        return;
      }
      if ($('[name="_gotcha"]', form).value) return; // bot

      const data = new FormData(form);
      const subject = `${data.get("subject")} — from ${data.get("name")}`;

      if (form.hasAttribute("data-endpoint")) {
        const btn = $("button[type=submit]", form);
        btn.disabled = true;
        setStatus("Sending…");
        try {
          const res = await fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } });
          if (!res.ok) throw new Error(String(res.status));
          form.reset();
          setStatus("Thank you — your message has been sent. I’ll reply by email.");
        } catch {
          setStatus(`Sorry, the message couldn’t be sent. Please email ${form.dataset.email} directly.`, true);
        } finally {
          btn.disabled = false;
        }
        return;
      }

      const body = `${data.get("message")}\n\n— ${data.get("name")}\n${data.get("email")}`;
      window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus(`Your email app should now open with the message ready to send. If it doesn’t, email ${form.dataset.email} directly.`);
    });
  }

  /* ---------- print button (CV) ---------- */
  const printBtn = $("[data-print]");
  if (printBtn) {
    printBtn.hidden = false;
    printBtn.addEventListener("click", () => window.print());
  }
})();
