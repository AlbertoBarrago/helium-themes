/* ============================================================
   Tokyo Punk // Tokyo Node start screen
   Real data only: local clock, network state, session start.
   Custom background image persisted via chrome.storage.local
   (falls back to localStorage when opened outside an extension).
   ============================================================ */

(function () {
  "use strict";

  /* --- Storage wrapper: chrome.storage.local when available --- */
  const store = {
    async get(key) {
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        return new Promise((resolve) => {
          chrome.storage.local.get(key, (result) => resolve(result[key]));
        });
      }
      try {
        return JSON.parse(localStorage.getItem("tp:" + key));
      } catch (e) {
        return undefined;
      }
    },
    async set(key, value) {
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        return new Promise((resolve) => {
          chrome.storage.local.set({ [key]: value }, resolve);
        });
      }
      try {
        localStorage.setItem("tp:" + key, JSON.stringify(value));
      } catch (e) {
        /* storage full or unavailable: ignore, keep in-memory state */
      }
    },
  };

  const CFG = (typeof window.TOKYO_CONFIG === "object" && window.TOKYO_CONFIG) || {};

  const DEFAULTS = {
    image: null, // data URL or remote URL
    imageOpacity: CFG.imageOpacity != null ? CFG.imageOpacity : 35,
    tokyoBg: CFG.tokyoBg != null ? CFG.tokyoBg : true,
    searchEngine: CFG.searchEngine || "https://www.google.com/search?q=",
    quickLinks: Array.isArray(CFG.quickLinks) && CFG.quickLinks.length
      ? CFG.quickLinks
      : [
          { name: "GitHub", url: "https://github.com" },
          { name: "YouTube", url: "https://youtube.com" },
          { name: "Reddit", url: "https://reddit.com" },
          { name: "Hacker News", url: "https://news.ycombinator.com" },
          { name: "X", url: "https://x.com" },
        ],
  };

  const els = {
    bg: document.getElementById("bg"),
    bgImage: document.getElementById("bg-image"),
    clock: document.getElementById("clock"),
    network: document.getElementById("network"),
    session: document.getElementById("session"),
    searchForm: document.getElementById("search-form"),
    searchInput: document.getElementById("search-input"),
    gear: document.getElementById("gear"),
    settings: document.getElementById("settings"),
    settingsClose: document.getElementById("settings-close"),
    imageFile: document.getElementById("image-file"),
    imageUrl: document.getElementById("image-url"),
    imageUrlApply: document.getElementById("image-url-apply"),
    imageOpacity: document.getElementById("image-opacity"),
    opacityValue: document.getElementById("opacity-value"),
    tokyoBg: document.getElementById("tokyo-bg"),
    searchEngine: document.getElementById("search-engine"),
    clearImage: document.getElementById("clear-image"),
    quicklinks: document.getElementById("quicklinks"),
    qlEditor: document.getElementById("quicklinks-editor"),
    qlName: document.getElementById("ql-name"),
    qlUrl: document.getElementById("ql-url"),
    qlAdd: document.getElementById("ql-add"),
  };

  let state = { ...DEFAULTS };

  /* ============================================================
     Config: titolo e brand dal file config.js
     ============================================================ */
  function applyConfig() {
    if (CFG.title) document.title = CFG.title;
    if (CFG.brand) {
      const he = document.querySelector(".brand-he");
      const ium = document.querySelector(".brand-ium");
      const sep = document.querySelector(".brand-sep");
      if (he && CFG.brand.he != null) he.textContent = CFG.brand.he;
      if (ium && CFG.brand.ium != null) ium.textContent = CFG.brand.ium;
      if (sep && CFG.brand.sep != null) sep.textContent = CFG.brand.sep;
    }
  }

  /* ============================================================
     Clock (real local time)
     ============================================================ */
  function tickClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    els.clock.textContent = hh + ":" + mm + ":" + ss;
  }

  /* ============================================================
     Network state (real online/offline)
     ============================================================ */
  function updateNetwork() {
    const online = navigator.onLine;
    els.network.textContent = online ? "ONLINE" : "OFFLINE";
    els.network.classList.toggle("online", online);
    els.network.classList.toggle("offline", !online);
  }

  /* ============================================================
     Session (real: when this start screen was opened)
     ============================================================ */
  function updateSession() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    els.session.textContent = hh + ":" + mm;
  }

  /* ============================================================
     Background rendering
     ============================================================ */
  function applyBackground() {
    els.bg.style.display = state.tokyoBg ? "" : "none";

    if (state.image) {
      els.bgImage.style.backgroundImage = "url('" + state.image.replace(/'/g, "\\'") + "')";
      els.bgImage.style.opacity = state.imageOpacity / 100;
      els.bgImage.classList.add("is-visible");
    } else {
      els.bgImage.style.backgroundImage = "";
      els.bgImage.classList.remove("is-visible");
    }
  }

  /* ============================================================
     Search
     ============================================================ */
  els.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = els.searchInput.value.trim();
    if (!q) return;
    window.location.href = state.searchEngine + encodeURIComponent(q);
  });

  /* ============================================================
     Quick links
     ============================================================ */
  function glyphFor(name) {
    return (name || "?").trim().charAt(0).toUpperCase();
  }

  function renderQuickLinks() {
    els.quicklinks.textContent = "";
    state.quickLinks.forEach((link) => {
      const a = document.createElement("a");
      a.className = "quicklink";
      a.href = link.url;
      a.title = link.name;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      const g = document.createElement("span");
      g.className = "ql-glyph";
      g.textContent = glyphFor(link.name);

      const t = document.createElement("span");
      t.textContent = link.name;

      a.appendChild(g);
      a.appendChild(t);
      els.quicklinks.appendChild(a);
    });
  }

  function renderQuickLinksEditor() {
    els.qlEditor.textContent = "";
    if (!state.quickLinks.length) {
      const empty = document.createElement("div");
      empty.className = "ql-empty";
      empty.textContent = "No quick links yet.";
      els.qlEditor.appendChild(empty);
      return;
    }
    state.quickLinks.forEach((link, i) => {
      const row = document.createElement("div");
      row.className = "ql-item";

      const name = document.createElement("span");
      name.className = "ql-item-name";
      name.textContent = link.name;

      const url = document.createElement("span");
      url.className = "ql-item-url";
      url.textContent = link.url;

      const del = document.createElement("button");
      del.className = "ql-del";
      del.type = "button";
      del.title = "Remove " + link.name;
      del.setAttribute("aria-label", "Remove " + link.name);
      del.textContent = "\u00d7";
      del.addEventListener("click", () => {
        state.quickLinks.splice(i, 1);
        persistQuickLinks();
        renderQuickLinks();
        renderQuickLinksEditor();
      });

      row.appendChild(name);
      row.appendChild(url);
      row.appendChild(del);
      els.qlEditor.appendChild(row);
    });
  }

  function persistQuickLinks() {
    store.set("quickLinks", state.quickLinks);
  }

  function addQuickLink() {
    const name = els.qlName.value.trim();
    const url = els.qlUrl.value.trim();
    if (!name || !url) return;
    state.quickLinks.push({ name, url });
    els.qlName.value = "";
    els.qlUrl.value = "";
    persistQuickLinks();
    renderQuickLinks();
    renderQuickLinksEditor();
  }

  els.qlAdd.addEventListener("click", addQuickLink);
  els.qlUrl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addQuickLink();
  });

  /* ============================================================
     Settings panel
     ============================================================ */
  function openSettings() {
    els.settings.hidden = false;
    els.imageOpacity.value = state.imageOpacity;
    els.opacityValue.textContent = state.imageOpacity + "%";
    els.tokyoBg.checked = state.tokyoBg;
    els.searchEngine.value = state.searchEngine;
    renderQuickLinksEditor();
  }

  function closeSettings() {
    els.settings.hidden = true;
  }

  els.gear.addEventListener("click", openSettings);
  els.settingsClose.addEventListener("click", closeSettings);
  els.settings.addEventListener("click", (e) => {
    if (e.target === els.settings) closeSettings();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !els.settings.hidden) closeSettings();
  });

  /* --- Custom image: file upload --- */
  els.imageFile.addEventListener("change", () => {
    const file = els.imageFile.files && els.imageFile.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      state.image = reader.result;
      applyBackground();
      store.set("image", state.image);
    };
    reader.readAsDataURL(file);
  });

  /* --- Custom image: remote URL --- */
  els.imageUrlApply.addEventListener("click", () => {
    const url = els.imageUrl.value.trim();
    if (!url) return;
    state.image = url;
    applyBackground();
    store.set("image", state.image);
  });

  /* --- Image opacity --- */
  els.imageOpacity.addEventListener("input", () => {
    state.imageOpacity = Number(els.imageOpacity.value);
    els.opacityValue.textContent = state.imageOpacity + "%";
    applyBackground();
    store.set("imageOpacity", state.imageOpacity);
  });

  /* --- Tokyo abstract background toggle --- */
  els.tokyoBg.addEventListener("change", () => {
    state.tokyoBg = els.tokyoBg.checked;
    applyBackground();
    store.set("tokyoBg", state.tokyoBg);
  });

  /* --- Search engine --- */
  els.searchEngine.addEventListener("change", () => {
    state.searchEngine = els.searchEngine.value;
    store.set("searchEngine", state.searchEngine);
  });

  /* --- Clear image --- */
  els.clearImage.addEventListener("click", () => {
    state.image = null;
    els.imageFile.value = "";
    els.imageUrl.value = "";
    applyBackground();
    store.set("image", null);
  });

  /* ============================================================
     Init
     ============================================================ */
  (async function init() {
    const saved = await Promise.all([
      store.get("image"),
      store.get("imageOpacity"),
      store.get("tokyoBg"),
      store.get("searchEngine"),
      store.get("quickLinks"),
    ]);

    if (saved[0] != null) state.image = saved[0];
    if (saved[1] != null) state.imageOpacity = saved[1];
    if (saved[2] != null) state.tokyoBg = saved[2];
    if (saved[3] != null) state.searchEngine = saved[3];
    if (saved[4] != null) state.quickLinks = saved[4];

    applyBackground();
    applyConfig();
    renderQuickLinks();
    tickClock();
    updateNetwork();
    updateSession();

    setInterval(tickClock, 1000);
    window.addEventListener("online", updateNetwork);
    window.addEventListener("offline", updateNetwork);

    // Focus the search input on load (desktop only).
    if (window.matchMedia("(pointer: fine)").matches) {
      els.searchInput.focus();
    }
  })();
})();
