/* ============================================================
   Tokyo Punk // Tokyo Node start screen
   Real data only: local clock, network state, manual timer.
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
    timerToggle: document.getElementById("timer-toggle"),
    timerReset: document.getElementById("timer-reset"),
    searchForm: document.getElementById("search-form"),
    searchInput: document.getElementById("search-input"),
    gear: document.getElementById("gear"),
    settings: document.getElementById("settings"),
    settingsClose: document.getElementById("settings-close"),
    drunk: document.getElementById("drunk"),
    drunkPop: document.getElementById("drunk-pop"),
    drunkText: document.getElementById("drunk-text"),
    drunkAuthor: document.getElementById("drunk-author"),
    drunkAgain: document.getElementById("drunk-again"),
    drunkClose: document.getElementById("drunk-close"),
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
    if (CFG.favicon) {
      let link = document.querySelector("link[rel='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = CFG.favicon;
    }
    if (CFG.brand) {
      const he = document.querySelector(".brand-he");
      const ium = document.querySelector(".brand-ium");
      const sep = document.querySelector(".brand-sep");
      if (he && CFG.brand.he != null) he.textContent = CFG.brand.he;
      if (ium && CFG.brand.ium != null) ium.textContent = CFG.brand.ium;
      if (sep && CFG.brand.sep != null) sep.textContent = CFG.brand.sep;
    }
    // Brand cliccabile: "albz" apre brandUrl
    const ium = document.querySelector(".brand-ium");
    if (ium) {
      if (CFG.brandUrl) {
        ium.style.cursor = "pointer";
        ium.title = CFG.brandUrl;
        ium.setAttribute("data-link", "true");
        ium.onclick = () => {
          window.open(CFG.brandUrl, "_blank", "noopener");
        };
      } else {
        ium.style.cursor = "default";
        ium.title = "";
        ium.removeAttribute("data-link");
        ium.onclick = null;
      }
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
     Timer (manual stopwatch: click on the value = start/pause,
     buttons below = start/pause + reset). Persisted as { base,
     startedAt } so the total survives reloads; a reload while
     running folds the elapsed into base and pauses.
     ============================================================ */
  const timer = { base: 0, startedAt: null };

  function timerElapsedMs() {
    return timer.base + (timer.startedAt != null ? Date.now() - timer.startedAt : 0);
  }

  function renderTimer() {
    const total = Math.floor(timerElapsedMs() / 1000);
    const hh = String(Math.floor(total / 3600)).padStart(2, "0");
    const mm = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const ss = String(total % 60).padStart(2, "0");
    els.session.textContent = hh + ":" + mm + ":" + ss;
    els.session.classList.toggle("running", timer.startedAt != null);
    els.timerToggle.textContent = timer.startedAt != null ? "STOP" : "START";
  }

  function persistTimer() {
    store.set("timer", { base: timer.base, startedAt: timer.startedAt });
  }

  function toggleTimer() {
    if (timer.startedAt != null) {
      timer.base = timerElapsedMs();
      timer.startedAt = null;
    } else {
      timer.startedAt = Date.now();
    }
    persistTimer();
    renderTimer();
  }

  function resetTimer() {
    timer.base = 0;
    timer.startedAt = null;
    persistTimer();
    renderTimer();
  }

  els.session.addEventListener("click", toggleTimer);
  els.timerToggle.addEventListener("click", toggleTimer);
  els.timerReset.addEventListener("click", resetTimer);
  els.session.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleTimer();
    }
  });

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
     Quote of the day (stabile per tutta la giornata)
     ============================================================ */
  function applyQuote() {
    const el = document.getElementById("quote");
    if (!el) return;
    const list = Array.isArray(CFG.quotes) ? CFG.quotes : [];
    if (CFG.showQuote === false || !list.length) {
      el.hidden = true;
      return;
    }
    const now = new Date();
    const dayKey = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
    let hash = 0;
    for (let i = 0; i < dayKey.length; i++) {
      hash = (hash * 31 + dayKey.charCodeAt(i)) >>> 0;
    }
    el.textContent = list[hash % list.length];
    el.hidden = false;
  }

  /* ============================================================
     "I feel drunk": random famous quote or joke
     ============================================================ */
  function showDrunk() {
    const famous = Array.isArray(CFG.famousQuotes) ? CFG.famousQuotes : [];
    const jokes = Array.isArray(CFG.jokes) ? CFG.jokes : [];
    const pool = [];
    famous.forEach((q) => pool.push({ text: q.text, author: q.author }));
    jokes.forEach((j) => pool.push({ text: j, author: null }));
    if (!pool.length) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    els.drunkText.textContent = pick.text;
    if (pick.author) {
      els.drunkAuthor.textContent = "\u2014 " + pick.author;
      els.drunkAuthor.hidden = false;
    } else {
      els.drunkAuthor.hidden = true;
    }
    els.drunkPop.hidden = false;
  }

  function closeDrunk() {
    els.drunkPop.hidden = true;
  }

  els.drunk.addEventListener("click", showDrunk);
  els.drunkAgain.addEventListener("click", showDrunk);
  els.drunkClose.addEventListener("click", closeDrunk);
  els.drunkPop.addEventListener("click", (e) => {
    if (e.target === els.drunkPop) closeDrunk();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !els.drunkPop.hidden) closeDrunk();
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
      store.get("timer"),
    ]);

    if (saved[0] != null) state.image = saved[0];
    if (saved[1] != null) state.imageOpacity = saved[1];
    if (saved[2] != null) state.tokyoBg = saved[2];
    if (saved[3] != null) state.searchEngine = saved[3];
    if (saved[4] != null) state.quickLinks = saved[4];
    if (saved[5] != null && typeof saved[5] === "object") {
      timer.base = Number(saved[5].base) || 0;
      if (typeof saved[5].startedAt === "number") {
        // Reloaded while running: fold the elapsed into base and pause, so
        // the value is exact from first paint and a stop can never jump
        // ahead of what was displayed. Time counts only while a new tab
        // page is actually alive (Chrome may discard background ones).
        timer.base += Math.max(0, Date.now() - saved[5].startedAt);
      }
      timer.startedAt = null;
    }

    applyBackground();
    applyConfig();
    applyQuote();
    renderQuickLinks();
    tickClock();
    updateNetwork();
    renderTimer();

    setInterval(function () {
      tickClock();
      renderTimer();
    }, 1000);
    window.addEventListener("online", updateNetwork);
    window.addEventListener("offline", updateNetwork);

    // Focus the search input on load (desktop only).
    if (window.matchMedia("(pointer: fine)").matches) {
      els.searchInput.focus();
    }
  })();
})();
