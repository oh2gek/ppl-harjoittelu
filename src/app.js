/* PPL-harjoittelu - vanilla JS app (multiple choice version) */
(function () {
  "use strict";

  // Ikonit (Lucide-tyylisiä SVG-merkkejä)
  var ICONS = {
    plane:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
    scale:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>',
    gauge:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>',
    brain:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/></svg>',
    cloudSun:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/></svg>',
    compass:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    clipboard:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>',
    atom:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg>',
    radio:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/></svg>',
    fileText:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
    shieldCheck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
    clock:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    trending:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
    info:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
    rotate:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
    trash:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    chevronRight:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    moon:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
    sun:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
    barChart:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>',
    alert:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
    home:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
  };

  var MODULES = [
    { id: "010", name: "Ilmailun säädökset",                icon: "scale",     color: "amber" },
    { id: "020", name: "Lentokoneen yleistuntemus",         icon: "plane",     color: "cyan" },
    { id: "030", name: "Suoritusarvot ja lennonsuunnittelu",icon: "gauge",     color: "rose" },
    { id: "040", name: "Ihmisen suorituskyky",              icon: "brain",     color: "pink" },
    { id: "050", name: "Sääoppi",                           icon: "cloudSun",  color: "sky" },
    { id: "060", name: "Lentosuunnistus",                   icon: "compass",   color: "emerald" },
    { id: "070", name: "Lentotoiminta",                     icon: "clipboard", color: "orange" },
    { id: "080", name: "Lennonteoria",                      icon: "atom",      color: "violet" },
    { id: "090", name: "Radiopuhelinliikenne",              icon: "radio",      color: "red" }
  ];

  var QUESTIONS_PER_QUIZ = 20;
  var EXAM_PER_MODULE = 20;          // Trafi-simulaatio: 20 / moduuli
  var PASS_PERCENT = 75;             // 75 % läpäisyraja
  var PASS_NEEDED = Math.ceil(QUESTIONS_PER_QUIZ * PASS_PERCENT / 100); // 15 / 20
  var STORAGE_KEY = "ppl-harjoittelu:v2";
  var THEME_KEY = "ppl-harjoittelu:theme";
  var DISCLAIMER_KEY = "ppl-harjoittelu:disclaimer-accepted";
  var LETTERS = ["A", "B", "C", "D"];
  var APP_VERSION = "4.2.18";

  var PDF_FILES = {
    "010": "PPL010FIN 11102018.pdf",
    "020": "PPL020FIN 11102018.pdf",
    "030": "PPL030FIN 11102018.pdf",
    "040": "PPL040FIN 11102018.pdf",
    "050": "PPL050FIN 11102018.pdf",
    "060": "32089-PPL060FIN.pdf",
    "070": "PPL070FIN 01062018.pdf",
    "080": "PPL080FIN 11102018.pdf",
    "090": "PPL090FIN 11102018.pdf"
  };

  function isPictureQuestion(q) {
    if (!q || !q.statement) return false;
    var s = q.statement.toLowerCase();
    return /\bks\. lapl\/ppl/.test(s) ||
           /\bkatso lapl\/ppl/.test(s) ||
           /\bliite lapl\/ppl/.test(s) ||
           /\bliitte(essä|en) \(?lapl\/ppl/.test(s) ||
           /\bliitteen lapl\/ppl/.test(s) ||
           /\bliitettä lapl\/ppl/.test(s) ||
           /\bliitteen kuvaan/.test(s) ||
           /\bkuvan /.test(s) ||
           /\bkuvassa /.test(s) ||
           /\bkuva /.test(s);
  }

  function pdfLinkFor(q) {
    if (!q) return null;
    var src = q.source || "";
    // source may contain the PDF filename directly
    for (var mod in PDF_FILES) {
      if (src.indexOf(PDF_FILES[mod]) >= 0) {
        return "pdf/" + PDF_FILES[mod];
      }
    }
    // fallback: use module id from q.module
    if (q.module && PDF_FILES[q.module]) {
      return "pdf/" + PDF_FILES[q.module];
    }
    return null;
  }

  function imageRefFor(q) {
    if (!q || !q.statement) return null;
    var m = q.statement.match(/(?:LAPL\/PPL|PPL\s*\(A\))\s+(\d{3})-(\d{1,2})(?:-\d+)?/i);
    if (m) {
      var num = m[2].length === 1 ? "0" + m[2] : m[2];
      return "PNG/PPL " + m[1] + "-" + num + ".png";
    }
    return null;
  }

  /** @type {Object<string, Array>} */
  var data = {}; // module id -> questions array

  // ---------- Storage ----------
  function loadStorage() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultStorage();
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return defaultStorage();
      if (!parsed.modules) parsed.modules = {};
      if (!parsed.errorHistory) parsed.errorHistory = {};
      if (!parsed.examHistory) parsed.examHistory = [];
      if (!parsed.seenCount) parsed.seenCount = {};
      return parsed;
    } catch (e) {
      return defaultStorage();
    }
  }
  function defaultStorage() { return { modules: {}, errorHistory: {}, examHistory: [], seenCount: {} }; }
  function saveStorage(s) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch (e) { /* ignore */ }
  }

  // ---------- Data loading ----------
  function loadData() {
    var embedded = document.getElementById("ppl-data");
    if (embedded) {
      try {
        var parsed = JSON.parse(embedded.textContent || "null");
        if (parsed && typeof parsed === "object") {
          for (var k in parsed) {
            if (Object.prototype.hasOwnProperty.call(parsed, k)) data[k] = parsed[k];
          }
          if (Object.keys(data).length > 0) return Promise.resolve();
        }
      } catch (e) { /* fall through */ }
    }
    var promises = MODULES.map(function (m) {
      return fetch("data/" + m.id + ".json")
        .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
        .then(function (json) { data[m.id] = (json && json.questions) ? json.questions : []; })
        .catch(function () { data[m.id] = []; });
    });
    return Promise.all(promises).then(function () { /* done */ });
  }

  // ---------- Helpers ----------
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pickQuestions(moduleId, count, opts) {
    opts = opts || {};
    var pool = (data[moduleId] || []).slice();
    if (opts.random || pool.length === 0) {
      var randomShuffled = shuffle(pool);
      return randomShuffled.slice(0, count);
    }

    var s = loadStorage();
    var hist = s.errorHistory[moduleId] || {};
    var sc = s.seenCount[moduleId] || {};

    // 1) Pakota mukaan kysymykset, joita ei ole KOSKAAN kysytty tässä moduulissa.
    //    Tämä takaa, että kaikki kysymykset käydään läpi ennen kuin mitään toistetaan,
    //    riippumatta siitä kuinka suuri kysymyspankki on.
    var neverSeen = shuffle(pool.filter(function (q) { return !sc[q.id]; }));
    var picked = neverSeen.slice(0, count);
    var pickedIds = {};
    picked.forEach(function (q) { pickedIds[q.id] = true; });

    // 2) Jos tila jäi täytettäväksi, valitaan loput painotetulla satunnaisotannalla,
    //    joka suosii AGGRESSIIVISESTI vähiten nähtyjä ja useimmin väärin vastattuja kysymyksiä.
    if (picked.length < count) {
      var remaining = pool.filter(function (q) { return !pickedIds[q.id]; });
      var maxSeen = 0;
      remaining.forEach(function (q) {
        var n = sc[q.id] || 0;
        if (n > maxSeen) maxSeen = n;
      });
      var weighted = [];
      remaining.forEach(function (q) {
        weighted.push(q);
        var seenCount = sc[q.id] || 0;
        var wrongCount = hist[q.id] || 0;
        var gap = maxSeen - seenCount;
        // Neliöllinen + kerroin tekee painotuksesta huomattavasti aggressiivisemman:
        // mitä harvemmin nähty suhteessa muihin, sitä moninkertaisesti todennäköisemmin se osuu kohdalle.
        var relativeBonus = Math.max(0, Math.min(gap * gap * 3, 150));
        var errorBonus = Math.min(wrongCount * 2, 20);
        var extra = Math.min(relativeBonus + errorBonus, 180);
        for (var i = 0; i < extra; i++) weighted.push(q);
      });
      var shuffledWeighted = shuffle(weighted);
      var seenLocal = {};
      for (var i = 0; i < shuffledWeighted.length && picked.length < count; i++) {
        var wq = shuffledWeighted[i];
        if (pickedIds[wq.id] || seenLocal[wq.id]) continue;
        seenLocal[wq.id] = true;
        pickedIds[wq.id] = true;
        picked.push(wq);
      }
    }

    // Sekoitetaan lopullinen järjestys, jotta "koskaan ei kysytyt" -kysymykset
    // eivät aina ole harjoituksen alussa.
    return shuffle(picked);
  }

  function moduleStats(moduleId) {
    var s = loadStorage();
    var m = s.modules[moduleId];
    if (!m) return null;
    return {
      attempts: m.attempts || 0,
      lastScore: m.lastScore,
      lastPercent: m.lastPercent,
      lastDate: m.lastDate,
      bestPercent: m.bestPercent
    };
  }

  function recordResult(moduleId, score, total, wrongQuestions) {
    var s = loadStorage();
    var pct = Math.round((score / total) * 100);
    var prev = s.modules[moduleId] || { attempts: 0 };
    s.modules[moduleId] = {
      attempts: (prev.attempts || 0) + 1,
      lastScore: score,
      lastPercent: pct,
      lastDate: new Date().toISOString(),
      bestPercent: Math.max(prev.bestPercent || 0, pct)
    };
    var hist = s.errorHistory[moduleId] || {};
    wrongQuestions.forEach(function (q) {
      hist[q.id] = (hist[q.id] || 0) + 1;
    });
    s.errorHistory[moduleId] = hist;
    saveStorage(s);
  }

  function recordSeen(moduleId, q) {
    var s = loadStorage();
    var sc = s.seenCount[moduleId] || {};
    sc[q.id] = (sc[q.id] || 0) + 1;
    s.seenCount[moduleId] = sc;
    saveStorage(s);
  }

  function recordExamResult(exam, byModule, modulesPassed, modulesTotal) {
    var s = loadStorage();
    if (!Array.isArray(s.examHistory)) s.examHistory = [];
    var moduleResults = exam.modules.map(function (m) {
      var b = byModule[m.id];
      var pct = b && b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0;
      var needed = b && b.total > 0 ? Math.ceil(b.total * PASS_PERCENT / 100) : 0;
      return {
        moduleId: m.id,
        moduleName: m.name,
        total: b ? b.total : 0,
        correct: b ? b.correct : 0,
        percent: pct,
        passed: b ? (b.correct >= needed) : false
      };
    });
    s.examHistory.unshift({
      date: new Date().toISOString(),
      totalQ: exam.answers.length,
      totalCorrect: exam.answers.filter(function (a) { return a.correct; }).length,
      modulesPassed: modulesPassed,
      modulesTotal: modulesTotal,
      allPassed: (modulesPassed === modulesTotal),
      moduleResults: moduleResults
    });
    // Keep only last 50 exams
    if (s.examHistory.length > 50) s.examHistory = s.examHistory.slice(0, 50);
    saveStorage(s);
  }

  function svgIcon(name) {
    var span = document.createElement("span");
    span.className = "icon";
    span.innerHTML = ICONS[name] || "";
    return span;
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        var v = attrs[k];
        if (k === "class") node.className = v;
        else if (k === "html") node.innerHTML = v;
        else if (k.indexOf("on") === 0 && typeof v === "function") {
          node.addEventListener(k.substring(2), v);
        } else if (v === true) node.setAttribute(k, "");
        else if (v === false || v == null) { /* skip */ }
        else node.setAttribute(k, v);
      }
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(function (c) {
        if (c == null) return;
        if (typeof c === "string") node.appendChild(document.createTextNode(c));
        else node.appendChild(c);
      });
    }
    return node;
  }

  function setView(node) {
    var view = document.getElementById("view");
    view.innerHTML = "";
    view.appendChild(node);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  // Strip the leading "A. " / "B. " ... from option text (data file already includes it).
  function optionText(opt) {
    if (typeof opt !== "string") return "";
    return opt.replace(/^\s*[A-Da-d][\.\)]\s*/, "");
  }

  // ---------- Header ----------
  function renderHeaderActions() {
    var host = document.getElementById("header-actions");
    if (!host) return;
    host.innerHTML = "";
    var theme = localStorage.getItem(THEME_KEY) || "dark";
    var themeBtn = el("button", {
      class: "icon-btn",
      title: theme === "dark" ? "Vaihda vaaleaan teemaan" : "Vaihda tummaan teemaan",
      onclick: toggleTheme
    });
    themeBtn.innerHTML = ICONS[theme === "dark" ? "moon" : "sun"];
    var statsBtn = el("button", {
      class: "header-pill",
      onclick: renderStats
    });
    statsBtn.innerHTML = ICONS.barChart + "<span>Tilastot</span>";
    var homeBtn = el("button", {
      class: "icon-btn",
      title: "Etusivu",
      onclick: renderHome
    });
    homeBtn.innerHTML = ICONS.home;
    var helpBtn = el("button", {
      class: "header-pill",
      onclick: renderInstructions
    });
    helpBtn.innerHTML = ICONS.info + "<span>Ohjeet</span>";
    host.appendChild(homeBtn);
    host.appendChild(themeBtn);
    host.appendChild(statsBtn);
    host.appendChild(helpBtn);
  }

  function applyTheme() {
    var theme = localStorage.getItem(THEME_KEY) || "dark";
    if (theme === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
  }
  function toggleTheme() {
    var cur = localStorage.getItem(THEME_KEY) || "dark";
    localStorage.setItem(THEME_KEY, cur === "dark" ? "light" : "dark");
    applyTheme();
    renderHeaderActions();
  }

  // ---------- Disclaimer modal ----------
  function getTodayISO() {
    var d = new Date();
    return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  }

  function maybeShowDisclaimer() {
    var today = getTodayISO();
    if (localStorage.getItem(DISCLAIMER_KEY) === today) return;

    var root = document.getElementById("modal-root");
    if (!root) return;
    root.innerHTML = "";
    var modalIcon = el("div", { class: "modal-icon" });
    modalIcon.innerHTML = ICONS.alert;
    var acceptBtn = el("button", { class: "btn primary", onclick: function () {
      localStorage.setItem(DISCLAIMER_KEY, today);
      root.innerHTML = "";
    } }, "Ymmärrän ja jatkan");
    var modal = el("div", { class: "modal" }, [
      modalIcon,
      el("h2", null, "Tärkeä huomautus – lue ennen käyttöä"),
      el("p", null, "Tämä sovellus on tarkoitettu ainoastaan epäviralliseen kokeilukäyttöön ja itseopiskelun tueksi. Kysymykset ja vastaukset on koottu julkisista lähteistä ja saattavat sisältää virheitä, vanhentunutta tietoa tai puutteellisia selityksiä."),
      el("p", null, "Sovelluksen tekijä ei vastaa millään tavalla sen tuottamista tuloksista, virheellisistä vastauksista, mahdollisista vahingoista tai muista seurauksista. Sovellusta EI saa käyttää virallisessa lentokoulutuksessa, opetuksessa tai PPL-teoriakokeisiin valmistautumisessa ainoana lähteenä."),
      el("p", null, "Käytä virallisina lähteinä aina ilmailuviranomaisen (Traficom, EASA) julkaisuja, lentokoulun materiaaleja ja kouluttajiltasi saamaa opetusta."),
      el("p", null, "🔒 Tämä sovellus ei käytä evästeitä. Kaikki tieto (tilastot, harjoitushistoria, asetukset) tallennetaan vain selaimesi paikalliseen muistiin (localStorage), eikä sitä lähetetä minnekään."),
      el("p", { class: "terms-row" }, el("a", { href: "#", onclick: function (e) { e.preventDefault(); showTerms(); }, class: "terms-link" }, "Lue käyttöehdot →")),
      el("div", { class: "modal-actions" }, [acceptBtn])
    ]);
    var backdrop = el("div", { class: "modal-backdrop" }, modal);
    root.appendChild(backdrop);
  }

  // ---------- Terms modal ----------
  function showTerms() {
    var root = document.getElementById("modal-root");
    if (!root) return;
    var closeBtn = el("button", { class: "btn ghost", onclick: function () {
      root.innerHTML = "";
    } }, "Sulje");
    var modal = el("div", { class: "modal terms-modal" }, [
      el("h2", null, "Käyttöehdot"),
      el("p", null, "© Kaikki oikeudet pidätetään."),
      el("p", null, "1. Tämä sovellus on tarkoitettu ainoastaan yksityiseen, ei-kaupalliseen henkilökohtaiseen käyttöön ja itseopiskeluun PPL-teoriakokeeseen valmistautumista varten."),
      el("p", null, "2. Kaupallinen käyttö, myynti, vuokraus, lisensointi, jakelumalliin perustuva hyödyntäminen tai muu taloudellisen hyödyn tavoittelu on ehdottomasti kielletty ilman etukäteen saatua nimenomaista kirjallista lupaa."),
      el("p", null, "3. Sovellusta tai sen sisältöä ei saa julkaista, levittää tai upottaa osana kolmannen osapuolen palvelua, mukaan lukien sovelluskaupat (App Store, Google Play, Microsoft Store), verkkoalustat ja oppimisjärjestelmät."),
      el("p", null, "4. Kysymykset ja vastaukset on poimittu julkisista Traficomin PPL-kysymyspankeista. Niiden tekijänoikeudet ja immateriaalioikeudet kuuluvat alkuperäisille haltijoille. Käyttäjällä ei ole oikeutta väittää omakseen, muokata kaupallisiin tarkoituksiin tai edelleen levittää kysymyspankin sisältöä."),
      el("p", null, "5. Sovellus tarjotaan \"sellaisenaan\" ilman minkäänlaisia takuita. Tekijä ei vastaa virheellisistä vastauksista, tiedon puutteellisuudesta, mahdollisista vahingoista, välittömistä tai välillisistä menetyksistä tai muista sovelluksen käyttöön liittyvistä seurauksista."),
      el("p", null, "6. Sovellus EI ole virallinen oppimateriaali eikä hyväksytty lähteiden korvaaja. Käytä aina ilmailuviranomaisten (Traficom, EASA, ICAO) virallisia julkaisuja, lentokoulun materiaaleja ja kouluttajien opastusta."),
      el("p", null, "7. Sovellusta ei saa käyttää automatisoiduissa järjestelmissä, bottien, robottien tai vastaavien työkalujen kautta ilman lupaa."),
      el("p", null, "8. Sovellus ei käytä evästeitä (cookies) eikä muita seurantateknologioita. Kaikki tallennettava tieto (tilastot, harjoitushistoria, teema-asetus, kokeiden tulokset) säilytetään ainoastaan käyttäjän oman selaimen paikallisessa muistissa (localStorage), eikä sitä lähetetä palvelimelle tai kolmansille osapuolille."),
      el("p", null, "9. Käyttämällä tätä sovellusta hyväksyt nämä ehdot. Mikäli et hyväksy ehtoja, sinun on lopetettava sovelluksen käyttö välittömästi."),
      el("div", { class: "modal-actions" }, [closeBtn])
    ]);
    var backdrop = el("div", { class: "modal-backdrop" }, modal);
    root.appendChild(backdrop);
  }

  // ---------- Helpers for home view ----------
  function buildIcon(iconName, colorClass) {
    var span = el("div", { class: "module-icon " + colorClass });
    span.innerHTML = ICONS[iconName] || "";
    return span;
  }
  function buildStatIcon(iconName, colorClass) {
    var span = el("div", { class: "stat-icon " + colorClass });
    span.innerHTML = ICONS[iconName] || "";
    return span;
  }
  function formatRelativeTime(iso) {
    if (!iso) return null;
    var d = new Date(iso);
    if (isNaN(d.getTime())) return null;
    var now = new Date();
    var sameDay = d.toDateString() === now.toDateString();
    var hh = ("0" + d.getHours()).slice(-2);
    var mm = ("0" + d.getMinutes()).slice(-2);
    if (sameDay) return "Tänään " + hh + ":" + mm;
    var yest = new Date(now); yest.setDate(yest.getDate() - 1);
    if (d.toDateString() === yest.toDateString()) return "Eilen " + hh + ":" + mm;
    return d.toLocaleDateString("fi-FI") + " " + hh + ":" + mm;
  }

  // ---------- Views ----------
  function renderHome() {
    maybeShowDisclaimer();
    var totalQuestions = 0;
    var lastDate = null;
    var modulesPassed = 0;
    var s = loadStorage();
    MODULES.forEach(function (m) {
      var qs = data[m.id] || [];
      totalQuestions += qs.length;
      var st = s.modules[m.id];
      if (st && st.lastDate) {
        var d = new Date(st.lastDate);
        if (!lastDate || d > lastDate) lastDate = d;
      }
      if (st && (st.bestPercent || 0) >= PASS_PERCENT) modulesPassed++;
    });

    // ----- Hero -----
    var hero = el("div", { class: "hero" }, [
      el("div", { class: "hero-eyebrow" }, "Valmistaudu PPL-teoriakokeeseen"),
      el("h1", null, "Valitse harjoiteltava moduuli"),
      el("p", null, "Harjoittele monivalintakysymyksiä kaikista PPL-teoriakokeen moduuleista. Valitse A, B, C tai D – saat heti palautteen ja selitykset.")
    ]);

    // ----- Stats grid -----
    var stat1 = el("div", { class: "stat-card" }, [
      buildStatIcon("fileText", "cyan"),
      el("div", { class: "stat-body" }, [
        el("div", { class: "stat-label" }, "Kokonaiskysymyksiä"),
        el("div", { class: "stat-value" }, totalQuestions.toLocaleString("fi-FI")),
        el("div", { class: "stat-sub" }, "kaikissa moduuleissa")
      ])
    ]);
    var stat2 = el("div", { class: "stat-card" }, [
      buildStatIcon("shieldCheck", "emerald"),
      el("div", { class: "stat-body" }, [
        el("div", { class: "stat-label" }, "Läpäisyraja"),
        el("div", { class: "stat-value" }, PASS_PERCENT + " %"),
        el("div", { class: "stat-sub" }, "oikein vastattava")
      ])
    ]);
    var stat3 = el("div", { class: "stat-card" }, [
      buildStatIcon("clock", "violet"),
      el("div", { class: "stat-body" }, [
        el("div", { class: "stat-label" }, "Viimeisin aktiviteetti"),
        el("div", { class: "stat-value" }, lastDate ? formatRelativeTime(lastDate.toISOString()) : "–"),
        el("div", { class: "stat-sub" }, lastDate ? "Jatka harjoittelua" : "Aloita harjoittelu")
      ])
    ]);
    var totalMods = MODULES.length;
    var pctMods = Math.round((modulesPassed / totalMods) * 100);
    var stat4 = el("div", { class: "stat-card" }, [
      buildStatIcon("trending", "amber"),
      el("div", { class: "stat-body" }, [
        el("div", { class: "stat-label" }, "Kokonaisprogressi"),
        el("div", { class: "stat-value" }, modulesPassed + " / " + totalMods),
        el("div", { class: "stat-sub" }, pctMods + " % moduuleista suoritettu"),
        el("div", { class: "stat-progress" }, el("div", { style: "width:" + pctMods + "%" }))
      ])
    ]);
    var statsGrid = el("div", { class: "stats-grid" }, [stat1, stat2, stat3, stat4]);

    // ----- Info banner -----
    var bannerIcon = el("div", { class: "info-banner-icon" });
    bannerIcon.innerHTML = ICONS.info;
    var bannerTagIcon = el("span", null);
    bannerTagIcon.innerHTML = ICONS.fileText;
    var bannerText = el("div", null, "Yhdessä harjoituksessa on " + QUESTIONS_PER_QUIZ + " satunnaista monivalintakysymystä. Valitse A, B, C tai D – saat heti palautteen ja selityksen. Läpäisyraja: " + PASS_NEEDED + " / " + QUESTIONS_PER_QUIZ + " (" + PASS_PERCENT + " %).");
    var banner = el("div", { class: "info-banner" }, [
      el("div", { class: "info-banner-left" }, [bannerIcon, bannerText]),
      el("div", { class: "info-banner-tag" }, [bannerTagIcon, document.createTextNode("PPL-teoriakoeharjoittelu")])
    ]);

    // ----- Module grid -----
    var grid = el("div", { class: "module-grid" });
    MODULES.forEach(function (m) {
      var qs = data[m.id] || [];
      var stats = moduleStats(m.id);
      var canStart = qs.length >= 1;
      var pct = stats && stats.bestPercent != null ? stats.bestPercent : 0;
      var statsLine = stats
        ? "Viimeisin: " + (stats.lastPercent != null ? stats.lastPercent + " %" : "–")
          + " · Paras: " + (stats.bestPercent != null ? stats.bestPercent + " %" : "–")
          + " · Harjoituksia: " + (stats.attempts || 0)
        : null;
      var arrow = el("div", { class: "module-arrow" });
      arrow.innerHTML = ICONS.chevronRight;
      var btn = el("button", {
        class: "module-btn",
        disabled: !canStart,
        onclick: function () { canStart && renderQuiz(m.id, false); }
      }, [
        el("div", { class: "module-top" }, [
          buildIcon(m.icon, m.color),
          el("div", { class: "module-body" }, [
            el("div", { class: "module-num" }, m.id),
            el("div", { class: "module-name" }, m.name),
            el("div", { class: "module-meta" }, qs.length + " kysymystä"),
            statsLine ? el("div", { class: "module-stats" }, statsLine) : null
          ]),
          arrow
        ]),
        el("div", { class: "module-progress " + m.color }, el("div", { style: "width:" + pct + "%" }))
      ]);
      grid.appendChild(btn);
    });

    // ----- Action row -----
    var examIcon = el("div", { class: "action-icon" });
    examIcon.innerHTML = ICONS.plane;
    var examCard = el("button", { class: "action-card primary", onclick: confirmStartExam }, [
      examIcon,
      el("div", { class: "action-body" }, [
        el("div", { class: "action-title" }, "Trafi-koesimulaatio"),
        el("div", { class: "action-sub" }, "Valitse moduulit ja tee koesarja")
      ])
    ]);
    var reviewIcon = el("div", { class: "action-icon" });
    reviewIcon.innerHTML = ICONS.rotate;
    var reviewCard = el("button", { class: "action-card", onclick: openReviewPicker }, [
      reviewIcon,
      el("div", { class: "action-body" }, [
        el("div", { class: "action-title" }, "Kertaa virheet"),
        el("div", { class: "action-sub" }, "Harjoittele väärin vastattuja ja vähän kysyttyjä kysymyksiä")
      ])
    ]);
    var resetIcon = el("div", { class: "action-icon" });
    resetIcon.innerHTML = ICONS.trash;
    var resetCard = el("button", { class: "action-card", onclick: function () {
      if (confirm("Nollataanko kaikki harjoitustulokset ja virhehistoria?")) {
        saveStorage(defaultStorage());
        renderHome();
      }
    } }, [
      resetIcon,
      el("div", { class: "action-body" }, [
        el("div", { class: "action-title" }, "Nollaa tulokset"),
        el("div", { class: "action-sub" }, "Palauta kaikki tulokset nollaan")
      ])
    ]);
    var actionRow = el("div", { class: "action-row" }, [examCard, reviewCard, resetCard]);

    var helpCard = el("button", { class: "action-card", style: "opacity:0.85;", onclick: renderInstructions }, [
      el("div", { class: "action-icon" }, "📖"),
      el("div", { class: "action-body" }, [
        el("div", { class: "action-title" }, "Ohjeet ja käyttöehdot"),
        el("div", { class: "action-sub" }, "Tutustu sovelluksen ominaisuuksiin ja käyttöehtoihin")
      ])
    ]);

    var view = document.getElementById("view");
    view.innerHTML = "";
    view.appendChild(hero);
    view.appendChild(statsGrid);
    view.appendChild(banner);
    view.appendChild(grid);
    view.appendChild(actionRow);

    // ----- Picture question browser -----
    var testCard = el("button", { class: "action-card", style: "margin-top:14px;opacity:0.85;", onclick: renderPictureTest }, [
      el("div", { class: "action-icon" }, "🖼️"),
      el("div", { class: "action-body" }, [
        el("div", { class: "action-title" }, "Kuvakysymykset"),
        el("div", { class: "action-sub" }, "Valitse moduuli ja selaa kuvakysymykset satunnaisessa järjestyksessä")
      ])
    ]);
    // ----- Question bank browser -----
    var browseCard = el("button", { class: "action-card", style: "margin-top:14px;opacity:0.85;", onclick: renderBrowsePicker }, [
      el("div", { class: "action-icon" }, "📚"),
      el("div", { class: "action-body" }, [
        el("div", { class: "action-title" }, "Selaa kysymyspankkia"),
        el("div", { class: "action-sub" }, "Valitse moduuli ja katso kysymykset oikeine vastauksineen vastaamatta")
      ])
    ]);
    view.appendChild(el("div", { class: "action-row" }, [testCard, browseCard]));

    window.scrollTo({ top: 0 });
  }

  function renderStats() {
    var s = loadStorage();
    var rows = [];
    var totalAttempts = 0, totalBest = 0, modulesWithStats = 0;
    MODULES.forEach(function (m) {
      var st = s.modules[m.id];
      var qs = data[m.id] || [];
      var attempts = st ? (st.attempts || 0) : 0;
      var best = st ? (st.bestPercent != null ? st.bestPercent : null) : null;
      var last = st ? (st.lastPercent != null ? st.lastPercent : null) : null;
      var lastDate = st ? formatRelativeTime(st.lastDate) : null;
      if (attempts > 0) { totalAttempts += attempts; totalBest += (best || 0); modulesWithStats++; }
      rows.push(el("tr", { class: best != null && best >= PASS_PERCENT ? "row-pass" : (attempts > 0 ? "row-fail" : "") }, [
        el("td", null, m.id + " " + m.name),
        el("td", null, qs.length + ""),
        el("td", null, attempts + ""),
        el("td", null, last != null ? last + " %" : "–"),
        el("td", null, best != null ? best + " %" : "–"),
        el("td", null, lastDate || "–")
      ]));
    });
    var thead = el("thead", null, el("tr", null, [
      el("th", null, "Moduuli"),
      el("th", null, "Kysymyksiä"),
      el("th", null, "Harjoituksia"),
      el("th", null, "Viimeisin"),
      el("th", null, "Paras"),
      el("th", null, "Aika")
    ]));
    var tbody = el("tbody", null, rows);
    var avgBest = modulesWithStats > 0 ? Math.round(totalBest / modulesWithStats) : 0;

    var cardChildren = [
      el("h2", null, "Tilastot"),
      el("p", { class: "lead" }, "Yhteenveto kaikista moduuleista. Yhteensä " + totalAttempts + " harjoitusta, paras keskimäärin " + avgBest + " %."),
      el("table", { class: "exam-summary" }, [thead, tbody])
    ];

    var examHistory = (s.examHistory || []);
    if (examHistory.length > 0) {
      var examPassed = 0, examFailed = 0;
      examHistory.forEach(function (e) { if (e.allPassed) examPassed++; else examFailed++; });
      var examSummary = el("div", { class: "lead", style: "margin-bottom:10px;" },
        "Koesimulaatioita yhteensä " + examHistory.length + " kpl. Läpäisty " + examPassed + " / Hylätty " + examFailed + "."
      );
      var examRows = [];
      examHistory.slice(0, 10).forEach(function (e) {
        var modSummary = (e.moduleResults || []).map(function (mr) {
          return mr.moduleId + ": " + mr.correct + "/" + mr.total + (mr.passed ? " ✅" : " ❌");
        }).join(" · ");
        examRows.push(el("tr", { class: e.allPassed ? "row-pass" : "row-fail" }, [
          el("td", null, formatRelativeTime(e.date) || "–"),
          el("td", null, e.totalCorrect + " / " + e.totalQ),
          el("td", null, e.modulesPassed + "/" + e.modulesTotal + " moduulia"),
          el("td", { style: "font-size:0.85rem;" }, modSummary)
        ]));
      });
      var examThead = el("thead", null, el("tr", null, [
        el("th", null, "Aika"),
        el("th", null, "Pisteet"),
        el("th", null, "Tulos"),
        el("th", null, "Moduulit")
      ]));
      var examTbody = el("tbody", null, examRows);
      cardChildren.push(el("h3", { style: "margin-top:28px;" }, "🎯 Koesimulaatiot"));
      cardChildren.push(examSummary);
      cardChildren.push(el("table", { class: "exam-summary" }, [examThead, examTbody]));
    }

    cardChildren.push(el("div", { class: "btn-row", style: "margin-top:16px;" }, [
      el("button", { class: "btn primary", onclick: renderHome }, "← Takaisin etusivulle")
    ]));

    var card = el("div", { class: "card" }, cardChildren);
    setView(card);
  }

  function openReviewPicker() {
    var s = loadStorage();
    var available = MODULES.filter(function (m) {
      var hist = s.errorHistory[m.id] || {};
      return Object.keys(hist).length > 0 && (data[m.id] || []).length > 0;
    });
    if (available.length === 0) {
      alert("Ei vielä virhehistoriaa. Tee ensin tavallisia harjoituksia.");
      return;
    }
    var grid = el("div", { class: "module-grid" });
    available.forEach(function (m) {
      grid.appendChild(el("button", {
        class: "module-btn",
        onclick: function () { renderQuiz(m.id, true); }
      }, [
        el("div", { class: "num" }, m.id),
        el("div", { class: "name" }, m.name),
        el("div", { class: "meta" }, "Painottaa aiemmin väärin menneitä")
      ]));
    });
    var card = el("div", { class: "card" }, [
      el("h2", null, "Kertaa virheet"),
      el("p", { class: "lead" }, "Harjoitus painottaa kysymyksiä, joihin olet aiemmin vastannut väärin."),
      grid,
      el("div", { class: "btn-row", style: "margin-top:18px;" }, [
        el("button", { class: "btn ghost", onclick: renderHome }, "← Takaisin")
      ])
    ]);
    setView(card);
  }

  function renderQuiz(moduleId, reviewMode) {
    var module = MODULES.find(function (m) { return m.id === moduleId; });
    var pool = data[moduleId] || [];
    var n = Math.min(QUESTIONS_PER_QUIZ, pool.length);
    if (n < 1) {
      alert("Tässä moduulissa ei ole vielä kysymyksiä.");
      renderHome();
      return;
    }
    var quiz = {
      moduleId: moduleId,
      moduleName: module ? module.name : moduleId,
      questions: pickQuestions(moduleId, n, { reviewMode: !!reviewMode }),
      answers: [],
      index: 0
    };
    renderQuestion(quiz);
  }

  function renderQuestion(quiz) {
    var q = quiz.questions[quiz.index];
    recordSeen(quiz.moduleId, q);
    var total = quiz.questions.length;
    var num = quiz.index + 1;
    var pct = Math.round((quiz.index / total) * 100);

    var meta = el("div", { class: "quiz-meta" }, [
      el("div", null, quiz.moduleName + (q.number ? " · alkuperäinen kysymys #" + q.number : "")),
      el("div", null, "Kysymys " + num + " / " + total)
    ]);

    var progress = el("div", { class: "progress" }, el("div", { style: "width:" + pct + "%" }));
    var statement = el("div", { class: "statement" }, q.statement);

    var pdfLink = null;
    var imgEl = null;
    if (isPictureQuestion(q)) {
      var pdfHref = pdfLinkFor(q);
      if (pdfHref) {
        pdfLink = el("a", { class: "pdf-link", href: pdfHref, target: "_blank", rel: "noopener" }, "📎 Avaa kuva PDF:stä");
      }
      var imgRef = imageRefFor(q);
      if (imgRef) {
        imgEl = el("img", { src: imgRef, alt: "Kuvakysymys", style: "max-width:100%;border-radius:var(--radius);margin:12px auto 0;display:block;" });
      }
    }

    var feedback = el("div", { class: "feedback", style: "display:none" });
    var nextBtn = el("button", { class: "btn primary large", style: "display:none; margin-top:14px;" }, "Seuraava →");

    var answered = false;
    var optionButtons = [];
    var options = Array.isArray(q.options) ? q.options : [];
    var correctIndex = (typeof q.correctIndex === "number") ? q.correctIndex : -1;

    function handleAnswer(userIndex) {
      if (answered) return;
      answered = true;
      var correct = (userIndex === correctIndex);
      quiz.answers.push({ q: q, user: userIndex, correct: correct });

      var heading = correct ? "Oikein!" : "Väärin.";
      var oikeaLetter = (correctIndex >= 0 && correctIndex < LETTERS.length) ? LETTERS[correctIndex] : "?";
      var omaLetter = LETTERS[userIndex] || "?";
      feedback.className = "feedback " + (correct ? "correct" : "wrong");
      feedback.innerHTML = "";
      feedback.appendChild(el("h3", null, heading));
      feedback.appendChild(el("div", null,
        "Vastauksesi: " + omaLetter + (options[userIndex] ? " – " + optionText(options[userIndex]) : "") +
        ". Oikea vastaus: " + oikeaLetter + (options[correctIndex] ? " – " + optionText(options[correctIndex]) : "") + "."
      ));
      if (q.explanation) {
        feedback.appendChild(el("div", { class: "explanation", style: "margin-top:8px" }, "Selitys: " + q.explanation));
      }
      if (q.needsReview) {
        feedback.appendChild(el("div", { class: "review-note" },
          "Huomio: Tämän kysymyksen oikea vastaus on AI:n / placeholder-arvio ja vaatii ihmisen tarkistuksen" + (q.confidence ? " (luottamus: " + q.confidence + ")" : "") + "."));
      }
      feedback.style.display = "block";
      nextBtn.style.display = "inline-flex";

      // disable + highlight
      optionButtons.forEach(function (b, i) {
        b.disabled = true;
        b.style.opacity = "0.85";
        if (i === correctIndex) b.classList.add("opt-correct");
        if (i === userIndex && i !== correctIndex) b.classList.add("opt-wrong");
      });
    }

    var optsBox = el("div", { class: "options" });
    options.forEach(function (opt, i) {
      var btn = el("button", {
        class: "btn option",
        onclick: function () { handleAnswer(i); }
      }, [
        el("span", { class: "opt-letter" }, LETTERS[i] || ("" + (i + 1))),
        el("span", { class: "opt-text" }, optionText(opt))
      ]);
      optionButtons.push(btn);
      optsBox.appendChild(btn);
    });

    nextBtn.addEventListener("click", function () {
      quiz.index++;
      if (quiz.index >= quiz.questions.length) finishQuiz(quiz);
      else renderQuestion(quiz);
    });

    var topRow = el("div", { class: "btn-row", style: "margin-bottom:10px" }, [
      el("button", { class: "btn ghost", onclick: function () {
        if (confirm("Keskeytetäänkö harjoitus? Tulosta ei tallenneta.")) renderHome();
      } }, "← Lopeta")
    ]);

    var card = el("div", { class: "card" }, [
      topRow,
      meta,
      progress,
      statement,
      pdfLink,
      optsBox,
      feedback,
      nextBtn,
      imgEl
    ]);
    setView(card);
  }

  function finishQuiz(quiz) {
    var total = quiz.questions.length;
    var correct = quiz.answers.filter(function (a) { return a.correct; }).length;
    var pct = Math.round((correct / total) * 100);
    var wrong = quiz.answers.filter(function (a) { return !a.correct; });
    var passNeeded = Math.ceil(total * PASS_PERCENT / 100);
    var passed = correct >= passNeeded;
    var maxWrong = total - passNeeded;

    var verdictText;
    if (correct >= total - 2) verdictText = "Erinomainen tulos! Koe LÄPÄISTY ✅";
    else if (passed) verdictText = "Koe LÄPÄISTY ✅ (" + correct + "/" + total + ", väärin " + wrong.length + "/" + maxWrong + " sallitusta).";
    else verdictText = "Koe HYLÄTTY ❌ – tarvittiin vähintään " + passNeeded + "/" + total + " oikein (" + PASS_PERCENT + " %). Sait " + correct + "/" + total + ".";

    recordResult(quiz.moduleId, correct, total, wrong.map(function (a) { return a.q; }));

    var wrongList = el("div", { class: "wrong-list" });
    if (wrong.length === 0) {
      wrongList.appendChild(el("div", { class: "lead" }, "Ei virheitä – hienoa työtä!"));
    } else {
      wrong.forEach(function (a) {
        var ci = a.q.correctIndex;
        var oikea = (ci >= 0 && a.q.options && a.q.options[ci]) ? (LETTERS[ci] + " – " + optionText(a.q.options[ci])) : "?";
        var oma = (a.user >= 0 && a.q.options && a.q.options[a.user]) ? (LETTERS[a.user] + " – " + optionText(a.q.options[a.user])) : "?";
        var item = el("div", { class: "wrong-item" }, [
          el("div", { class: "stmt" }, a.q.statement),
          el("div", null, "Vastauksesi: " + oma),
          el("div", null, "Oikea vastaus: " + oikea),
          a.q.explanation ? el("div", { class: "meta", style: "margin-top:6px;" }, "Selitys: " + a.q.explanation) : null,
          a.q.needsReview ? el("div", { class: "review-note" }, "Vaatii ihmisen tarkistuksen.") : null
        ]);
        wrongList.appendChild(item);
      });
    }

    var card = el("div", { class: "card" }, [
      el("h2", null, "Tulos – " + quiz.moduleName),
      el("div", { class: "score-big" }, correct + " / " + total),
      el("div", { class: "score-pct" }, pct + " % oikein · läpäisyraja " + PASS_PERCENT + " %"),
      el("div", { class: "verdict " + (passed ? "pass" : "fail") }, verdictText),
      el("h3", null, "Väärin menneet kysymykset"),
      wrongList,
      el("div", { class: "btn-row", style: "margin-top:18px;" }, [
        el("button", { class: "btn primary", onclick: function () { renderQuiz(quiz.moduleId, false); } }, "Tee uusi harjoitus"),
        el("button", { class: "btn", onclick: renderHome }, "Palaa alkuvalikkoon")
      ])
    ]);
    setView(card);
  }

  // ---------- Trafi-koesimulaatio ----------
  function confirmStartExam() {
    var availableModules = MODULES.filter(function (m) { return (data[m.id] || []).length >= EXAM_PER_MODULE; });
    if (availableModules.length === 0) {
      alert("Ei riittävästi kysymyksiä koesimulaatioon.");
      return;
    }

    var selected = {};
    availableModules.forEach(function (m) { selected[m.id] = true; });

    function updateSummary() {
      var count = Object.keys(selected).filter(function (k) { return selected[k]; }).length;
      var totalQ = count * EXAM_PER_MODULE;
      var elSum = document.getElementById("exam-summary-text");
      if (elSum) elSum.textContent = count + " moduulia valittu · " + totalQ + " kysymystä yhteensä";
      var elBtn = document.getElementById("exam-start-btn");
      if (elBtn) elBtn.disabled = (count === 0);
    }

    var moduleChecks = el("div", { class: "module-list", style: "display:flex;flex-direction:column;gap:10px;margin-top:14px;" });
    availableModules.forEach(function (m) {
      var row = el("label", { style: "display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--surface-2);border-radius:var(--radius);cursor:pointer;" }, [
        el("input", {
          type: "checkbox",
          checked: true,
          style: "width:20px;height:20px;accent-color:var(--primary);cursor:pointer;",
          onchange: function (e) {
            selected[m.id] = e.target.checked;
            updateSummary();
          }
        }),
        el("div", { style: "flex:1;" }, [
          el("div", { style: "font-weight:600;" }, m.id + " " + m.name),
          el("div", { style: "font-size:0.85rem;opacity:0.8;" }, (data[m.id] || []).length + " kysymystä")
        ])
      ]);
      moduleChecks.appendChild(row);
    });

    var selectAllBtn = el("button", { class: "btn", style: "font-size:0.9rem;", onclick: function () {
      var inputs = moduleChecks.querySelectorAll('input[type="checkbox"]');
      inputs.forEach(function (inp) { inp.checked = true; selected[inp._moduleId] = true; });
      updateSummary();
    } }, "Valitse kaikki");
    var deselectAllBtn = el("button", { class: "btn", style: "font-size:0.9rem;", onclick: function () {
      var inputs = moduleChecks.querySelectorAll('input[type="checkbox"]');
      inputs.forEach(function (inp) { inp.checked = false; selected[inp._moduleId] = false; });
      updateSummary();
    } }, "Poista valinnat");

    // Store moduleId on inputs for select-all/deselect-all
    var _inputs = moduleChecks.querySelectorAll('input[type="checkbox"]');
    availableModules.forEach(function (m, i) { if (_inputs[i]) _inputs[i]._moduleId = m.id; });

    var startBtn = el("button", {
      id: "exam-start-btn",
      class: "btn primary",
      style: "width:100%;margin-top:16px;padding:14px;font-size:1.05rem;",
      onclick: function () {
        var chosen = availableModules.filter(function (m) { return selected[m.id]; });
        if (chosen.length === 0) return;
        startExam(chosen);
      }
    }, "Aloita koesimulaatio");

    var card = el("div", { class: "card" }, [
      el("div", { class: "btn-row", style: "margin-bottom:10px" }, [
        el("button", { class: "btn ghost", onclick: renderHome }, "← Takaisin")
      ]),
      el("h2", null, "🎯 Trafi-koesimulaatio"),
      el("p", { class: "lead" }, "Valitse moduulit, jotka haluat sisällyttää koesimulaatioon. Jokaisesta moduulista arvotaan " + EXAM_PER_MODULE + " kysymystä. Kaikkien osakokeiden on oltava ≥ " + PASS_PERCENT + " % läpäisty."),
      el("div", { class: "btn-row", style: "margin-bottom:8px;" }, [selectAllBtn, deselectAllBtn]),
      moduleChecks,
      el("div", { id: "exam-summary-text", style: "margin-top:12px;text-align:center;font-weight:600;opacity:0.9;" }, availableModules.length + " moduulia valittu · " + (availableModules.length * EXAM_PER_MODULE) + " kysymystä yhteensä"),
      startBtn
    ]);
    setView(card);
  }

  function startExam(availableModules) {
    var allQuestions = [];
    // Kysymykset pysyvät moduulikohtaisesti ryhmiteltynä, valittujen moduulien järjestyksessä.
    // Kunkin moduulin SISÄLLÄ kysymysjärjestys on satunnainen (pickQuestions shufflaa aina).
    availableModules.forEach(function (m) {
      var qs = pickQuestions(m.id, EXAM_PER_MODULE, { random: true });
      qs.forEach(function (q) {
        allQuestions.push({ moduleId: m.id, moduleName: m.name, q: q });
      });
    });
    var exam = {
      perModule: EXAM_PER_MODULE,
      modules: availableModules,
      items: allQuestions,
      answers: [],
      index: 0,
      introShownFor: {}
    };
    renderExamQuestion(exam);
  }

  function renderExamModuleIntro(exam, item) {
    var moduleOrder = exam.modules.map(function (m) { return m.id; }).indexOf(item.moduleId) + 1;
    var totalModules = exam.modules.length;
    var countInModule = exam.items.filter(function (it) { return it.moduleId === item.moduleId; }).length;
    var card = el("div", { class: "card", style: "text-align:center;" }, [
      el("div", { style: "font-size:2.4rem;margin-bottom:8px;" }, "🎯"),
      el("div", { class: "lead", style: "opacity:0.85;" }, "Osakoe " + moduleOrder + " / " + totalModules),
      el("h2", { style: "margin-top:4px;" }, item.moduleId + " · " + item.moduleName),
      el("p", { class: "lead" }, "Seuraavaksi " + countInModule + " kysymystä tästä moduulista. Läpäisyraja on " + PASS_PERCENT + " %."),
      el("button", { class: "btn primary large", style: "margin-top:18px;", onclick: function () { renderExamQuestion(exam); } }, "Aloita moduuli →")
    ]);
    setView(card);
  }

  function renderExamQuestion(exam) {
    var item = exam.items[exam.index];
    var q = item.q;

    if (!exam.introShownFor[item.moduleId]) {
      exam.introShownFor[item.moduleId] = true;
      renderExamModuleIntro(exam, item);
      return;
    }
    recordSeen(item.moduleId, q);
    var total = exam.items.length;
    var num = exam.index + 1;
    var pct = Math.round((exam.index / total) * 100);
    var numInModule = 1;
    for (var ii = 0; ii < exam.index; ii++) {
      if (exam.items[ii].moduleId === item.moduleId) numInModule++;
    }
    var totalInModule = exam.items.filter(function (it) { return it.moduleId === item.moduleId; }).length;

    var meta = el("div", { class: "quiz-meta" }, [
      el("div", null, "🎯 " + item.moduleId + " · " + item.moduleName + " (" + numInModule + " / " + totalInModule + ")"),
      el("div", null, "Kysymys " + num + " / " + total + " yhteensä")
    ]);
    var progress = el("div", { class: "progress" }, el("div", { style: "width:" + pct + "%" }));
    var statement = el("div", { class: "statement" }, q.statement);

    var pdfLink = null;
    var imgEl = null;
    if (isPictureQuestion(q)) {
      var pdfHref = pdfLinkFor(q);
      if (pdfHref) {
        pdfLink = el("a", { class: "pdf-link", href: pdfHref, target: "_blank", rel: "noopener" }, "📎 Avaa kuva PDF:stä");
      }
      var imgRef = imageRefFor(q);
      if (imgRef) {
        imgEl = el("img", { src: imgRef, alt: "Kuvakysymys", style: "max-width:100%;border-radius:var(--radius);margin:12px auto 0;display:block;" });
      }
    }

    var optionButtons = [];
    var options = Array.isArray(q.options) ? q.options : [];
    var selectedIndex = -1;
    var nextBtn = el("button", { class: "btn primary large", style: "margin-top:14px;", disabled: true },
      exam.index === total - 1 ? "Päätä koe →" : "Seuraava →");

    function select(i) {
      selectedIndex = i;
      optionButtons.forEach(function (b, j) {
        b.classList.toggle("opt-selected", j === i);
      });
      nextBtn.disabled = false;
    }

    var optsBox = el("div", { class: "options" });
    options.forEach(function (opt, i) {
      var btn = el("button", {
        class: "btn option",
        onclick: function () { select(i); }
      }, [
        el("span", { class: "opt-letter" }, LETTERS[i] || ("" + (i + 1))),
        el("span", { class: "opt-text" }, optionText(opt))
      ]);
      optionButtons.push(btn);
      optsBox.appendChild(btn);
    });

    nextBtn.addEventListener("click", function () {
      if (selectedIndex < 0) return;
      exam.answers.push({
        moduleId: item.moduleId,
        moduleName: item.moduleName,
        q: q,
        user: selectedIndex,
        correct: (selectedIndex === q.correctIndex)
      });
      exam.index++;
      if (exam.index >= total) finishExam(exam);
      else renderExamQuestion(exam);
    });

    var topRow = el("div", { class: "btn-row", style: "margin-bottom:10px" }, [
      el("button", { class: "btn ghost", onclick: function () {
        if (confirm("Keskeytetäänkö koe? Tulosta ei tallenneta.")) renderHome();
      } }, "← Keskeytä koe")
    ]);

    var card = el("div", { class: "card" }, [
      topRow,
      meta,
      progress,
      statement,
      pdfLink,
      optsBox,
      nextBtn,
      imgEl
    ]);
    setView(card);
  }

  function finishExam(exam) {
    // Ryhmittele moduuleittain
    var byModule = {};
    exam.modules.forEach(function (m) {
      byModule[m.id] = { module: m, total: 0, correct: 0, wrong: [] };
    });
    exam.answers.forEach(function (a) {
      var b = byModule[a.moduleId];
      if (!b) return;
      b.total++;
      if (a.correct) b.correct++;
      else b.wrong.push(a);
    });

    var totalQ = exam.answers.length;
    var totalCorrect = exam.answers.filter(function (a) { return a.correct; }).length;
    var totalPct = Math.round((totalCorrect / totalQ) * 100);
    var modulesPassed = 0;
    var modulesTotal = 0;

    // Tallenna moduulikohtaiset tulokset
    Object.keys(byModule).forEach(function (mid) {
      var b = byModule[mid];
      if (b.total === 0) return;
      modulesTotal++;
      var needed = Math.ceil(b.total * PASS_PERCENT / 100);
      if (b.correct >= needed) modulesPassed++;
      recordResult(mid, b.correct, b.total, b.wrong.map(function (a) { return a.q; }));
    });

    recordExamResult(exam, byModule, modulesPassed, modulesTotal);

    var allPassed = (modulesPassed === modulesTotal);
    var overallVerdict = el("div", { class: "verdict " + (allPassed ? "pass" : "fail") },
      allPassed
        ? "Kaikki " + modulesTotal + " moduulia LÄPÄISTY ✅ – simuloitu Trafin koesarja kokonaan läpäisty!"
        : "Koesarja HYLÄTTY ❌ – " + modulesPassed + "/" + modulesTotal + " moduulia läpäisty. Trafin teoriakokeessa kaikkien osakokeiden on oltava ≥ " + PASS_PERCENT + " %.");

    var summaryTable = el("table", { class: "exam-summary" });
    var thead = el("thead", null, el("tr", null, [
      el("th", null, "Moduuli"),
      el("th", null, "Pisteet"),
      el("th", null, "%"),
      el("th", null, "Tulos")
    ]));
    var tbody = el("tbody");
    exam.modules.forEach(function (m) {
      var b = byModule[m.id];
      if (!b || b.total === 0) return;
      var needed = Math.ceil(b.total * PASS_PERCENT / 100);
      var pPct = Math.round((b.correct / b.total) * 100);
      var pPass = b.correct >= needed;
      tbody.appendChild(el("tr", { class: pPass ? "row-pass" : "row-fail" }, [
        el("td", null, m.id + " " + m.name),
        el("td", null, b.correct + " / " + b.total),
        el("td", null, pPct + " %"),
        el("td", null, pPass ? "✅ LÄPI" : "❌ HYLÄTTY")
      ]));
    });
    summaryTable.appendChild(thead);
    summaryTable.appendChild(tbody);

    // Väärät kysymykset moduuleittain (yhdistetty lista, näytä selitys)
    var allWrong = exam.answers.filter(function (a) { return !a.correct; });
    var wrongSection = el("div", { class: "wrong-list" });
    if (allWrong.length === 0) {
      wrongSection.appendChild(el("div", { class: "lead" }, "Ei yhtään väärää vastausta – täydellinen koe!"));
    } else {
      allWrong.forEach(function (a) {
        var ci = a.q.correctIndex;
        var oikea = (ci >= 0 && a.q.options && a.q.options[ci]) ? (LETTERS[ci] + " – " + optionText(a.q.options[ci])) : "?";
        var oma = (a.user >= 0 && a.q.options && a.q.options[a.user]) ? (LETTERS[a.user] + " – " + optionText(a.q.options[a.user])) : "?";
        wrongSection.appendChild(el("div", { class: "wrong-item" }, [
          el("div", { class: "meta" }, a.moduleName),
          el("div", { class: "stmt" }, a.q.statement),
          el("div", null, "Vastauksesi: " + oma),
          el("div", null, "Oikea vastaus: " + oikea),
          a.q.explanation ? el("div", { class: "meta", style: "margin-top:6px;" }, "Selitys: " + a.q.explanation) : null,
          a.q.needsReview ? el("div", { class: "review-note" }, "Vaatii ihmisen tarkistuksen.") : null
        ]));
      });
    }

    var card = el("div", { class: "card" }, [
      el("h2", null, "🎯 Trafi-koesimulaatio – yhteenveto"),
      el("div", { class: "score-big" }, totalCorrect + " / " + totalQ),
      el("div", { class: "score-pct" }, totalPct + " % yhteensä · " + modulesPassed + "/" + modulesTotal + " moduulia läpäisty"),
      overallVerdict,
      el("h3", null, "Tulokset moduuleittain"),
      summaryTable,
      el("h3", { style: "margin-top:24px;" }, "Väärin menneet kysymykset (" + allWrong.length + " kpl)"),
      wrongSection,
      el("div", { class: "btn-row", style: "margin-top:18px;" }, [
        el("button", { class: "btn primary", onclick: confirmStartExam }, "Tee uusi koesimulaatio"),
        el("button", { class: "btn", onclick: renderHome }, "Palaa alkuvalikkoon")
      ])
    ]);
    setView(card);
  }

  // Picture question browser
  function renderPictureTest() {
    var modulePictureCounts = {};
    MODULES.forEach(function (m) {
      var qs = data[m.id] || [];
      qs.forEach(function (q) {
        if (isPictureQuestion(q) && imageRefFor(q)) {
          modulePictureCounts[m.id] = (modulePictureCounts[m.id] || 0) + 1;
        }
      });
    });

    var moduleOptions = [];
    MODULES.forEach(function (m) {
      var count = modulePictureCounts[m.id] || 0;
      if (count > 0) {
        moduleOptions.push({ id: m.id, name: m.name, count: count });
      }
    });

    if (moduleOptions.length === 0) {
      alert("Ei kuvakysymyksiä löytynyt.");
      renderHome();
      return;
    }

    var moduleList = el("div", { class: "module-list", style: "display:flex;flex-direction:column;gap:10px;margin-top:14px;" });

    var totalCount = moduleOptions.reduce(function (sum, o) { return sum + o.count; }, 0);
    var allBtn = el("button", {
      class: "btn primary",
      style: "text-align:left;padding:14px 16px;font-size:1.05rem;",
      onclick: function () { startPictureTest(null); }
    }, [
      el("div", null, "Kaikki moduulit"),
      el("div", { style: "font-size:0.85rem;opacity:0.8;" }, totalCount + " kuvakysymystä")
    ]);
    moduleList.appendChild(allBtn);

    moduleOptions.forEach(function (o) {
      var btn = el("button", {
        class: "btn",
        style: "text-align:left;padding:14px 16px;font-size:1.05rem;",
        onclick: function () { startPictureTest(o.id); }
      }, [
        el("div", null, o.name),
        el("div", { style: "font-size:0.85rem;opacity:0.8;" }, o.count + " kuvakysymystä")
      ]);
      moduleList.appendChild(btn);
    });

    var card = el("div", { class: "card" }, [
      el("div", { class: "btn-row", style: "margin-bottom:10px" }, [
        el("button", { class: "btn ghost", onclick: renderHome }, "← Takaisin")
      ]),
      el("h2", null, "Kuvakysymykset"),
      el("div", { style: "margin-bottom:8px;opacity:0.9;" }, "Valitse moduuli, jonka kuvakysymykset haluat tarkistaa:"),
      moduleList
    ]);
    setView(card);

    function startPictureTest(selectedModuleId) {
      var pictureQs = [];
      MODULES.forEach(function (m) {
        if (selectedModuleId && m.id !== selectedModuleId) return;
        var qs = data[m.id] || [];
        qs.forEach(function (q) {
          if (isPictureQuestion(q) && imageRefFor(q)) {
            pictureQs.push({ q: q, moduleId: m.id, moduleName: m.name });
          }
        });
      });
      if (pictureQs.length === 0) {
        alert("Ei kuvakysymyksiä valitussa moduulissa.");
        return;
      }
      var idx = 0;
      var testAnswers = {};

      function showAt(i) {
        var item = pictureQs[i];
        var q = item.q;
        var imgRef = imageRefFor(q);
        var pdfHref = pdfLinkFor(q);
        var meta = el("div", { class: "quiz-meta" }, [
          el("div", null, item.moduleName + (q.number ? " · kysymys #" + q.number : "")),
          el("div", null, "Kuva " + (i + 1) + " / " + pictureQs.length)
        ]);
        var statement = el("div", { class: "statement" }, q.statement);
        var imgEl = imgRef ? el("img", { src: imgRef, alt: "Kuvakysymys", style: "max-width:100%;border-radius:var(--radius);margin:12px auto 0;display:block;" }) : null;
        var pdfLink = pdfHref ? el("a", { class: "pdf-link", href: pdfHref, target: "_blank", rel: "noopener" }, "📎 Avaa kuva PDF:stä") : null;

        var options = Array.isArray(q.options) ? q.options : [];
        var correctIndex = (typeof q.correctIndex === "number") ? q.correctIndex : -1;
        var answered = testAnswers[q.id];
        var feedback = el("div", { class: "feedback", style: answered ? "display:block" : "display:none" });
        var optionButtons = [];

        function buildFeedback(userIdx) {
          var correct = (userIdx === correctIndex);
          var heading = correct ? "Oikein!" : "Väärin.";
          var oikeaLetter = (correctIndex >= 0 && correctIndex < LETTERS.length) ? LETTERS[correctIndex] : "?";
          var omaLetter = LETTERS[userIdx] || "?";
          feedback.className = "feedback " + (correct ? "correct" : "wrong");
          feedback.innerHTML = "";
          feedback.appendChild(el("h3", null, heading));
          feedback.appendChild(el("div", null,
            "Vastauksesi: " + omaLetter + (options[userIdx] ? " – " + optionText(options[userIdx]) : "") +
            ". Oikea vastaus: " + oikeaLetter + (options[correctIndex] ? " – " + optionText(options[correctIndex]) : "") + "."
          ));
          if (q.explanation) {
            feedback.appendChild(el("div", { class: "explanation", style: "margin-top:8px" }, "Selitys: " + q.explanation));
          }
        }

        var optsBox = el("div", { class: "options" });
        options.forEach(function (opt, j) {
          var btn = el("button", {
            class: "btn option",
            disabled: !!answered,
            onclick: function () {
              if (testAnswers[q.id]) return;
              var correct = (j === correctIndex);
              testAnswers[q.id] = { userIndex: j, correct: correct };
              buildFeedback(j);
              feedback.style.display = "block";
              optionButtons.forEach(function (b, k) {
                b.disabled = true;
                b.style.opacity = "0.85";
                if (k === correctIndex) b.classList.add("opt-correct");
                if (k === j && k !== correctIndex) b.classList.add("opt-wrong");
              });
            }
          }, [
            el("span", { class: "opt-letter" }, LETTERS[j] || ("" + (j + 1))),
            el("span", { class: "opt-text" }, optionText(opt))
          ]);
          if (answered) {
            btn.disabled = true;
            btn.style.opacity = "0.85";
            if (j === correctIndex) btn.classList.add("opt-correct");
            if (j === answered.userIndex && j !== correctIndex) btn.classList.add("opt-wrong");
          }
          optionButtons.push(btn);
          optsBox.appendChild(btn);
        });
        if (answered) buildFeedback(answered.userIndex);

        var navRow = el("div", { class: "btn-row", style: "margin-top:14px;" }, [
          el("button", { class: "btn", disabled: i <= 0, onclick: function () { if (i > 0) { idx--; showAt(idx); } } }, "← Edellinen"),
          el("button", { class: "btn", disabled: i >= pictureQs.length - 1, onclick: function () { if (i < pictureQs.length - 1) { idx++; showAt(idx); } } }, "Seuraava →")
        ]);
        var topRow = el("div", { class: "btn-row", style: "margin-bottom:10px" }, [
          el("button", { class: "btn ghost", onclick: renderPictureTest }, "← Takaisin moduulivalintaan")
        ]);
        var card = el("div", { class: "card" }, [
          topRow,
          meta,
          statement,
          pdfLink,
          optsBox,
          feedback,
          navRow,
          imgEl
        ]);
        setView(card);
      }
      showAt(idx);
    }
  }

  // ---------- Kysymyspankin selaus (ei vastaamista) ----------
  function renderBrowsePicker() {
    var availableModules = MODULES.filter(function (m) { return (data[m.id] || []).length > 0; });
    if (availableModules.length === 0) {
      alert("Kysymyksiä ei löytynyt.");
      renderHome();
      return;
    }

    var moduleList = el("div", { class: "module-list", style: "display:flex;flex-direction:column;gap:10px;margin-top:14px;" });
    availableModules.forEach(function (m) {
      var count = (data[m.id] || []).length;
      var btn = el("button", {
        class: "btn",
        style: "text-align:left;padding:14px 16px;font-size:1.05rem;",
        onclick: function () { startBrowse(m.id); }
      }, [
        el("div", null, m.id + " " + m.name),
        el("div", { style: "font-size:0.85rem;opacity:0.8;" }, count + " kysymystä")
      ]);
      moduleList.appendChild(btn);
    });

    var card = el("div", { class: "card" }, [
      el("div", { class: "btn-row", style: "margin-bottom:10px" }, [
        el("button", { class: "btn ghost", onclick: renderHome }, "← Takaisin")
      ]),
      el("h2", null, "📚 Selaa kysymyspankkia"),
      el("div", { style: "margin-bottom:8px;opacity:0.9;" }, "Valitse moduuli, jonka kysymykset haluat selata. Oikea vastaus näkyy suoraan – ei tarvitse vastata."),
      moduleList
    ]);
    setView(card);
  }

  function startBrowse(moduleId) {
    var module = MODULES.find(function (m) { return m.id === moduleId; });
    var pool = (data[moduleId] || []).slice().sort(function (a, b) { return (a.number || 0) - (b.number || 0); });
    if (pool.length === 0) {
      alert("Tässä moduulissa ei ole kysymyksiä.");
      return;
    }
    var idx = 0;

    function showAt(i) {
      var q = pool[i];
      var picture = isPictureQuestion(q);
      var imgRef = picture ? imageRefFor(q) : null;
      var pdfHref = picture ? pdfLinkFor(q) : null;

      var meta = el("div", { class: "quiz-meta" }, [
        el("div", null, (module ? module.name : moduleId) + (q.number ? " · kysymys #" + q.number : "")),
        el("div", null, "Kysymys " + (i + 1) + " / " + pool.length)
      ]);
      var statement = el("div", { class: "statement" }, q.statement);
      var imgEl = imgRef ? el("img", { src: imgRef, alt: "Kuvakysymys", style: "max-width:100%;border-radius:var(--radius);margin:12px auto 0;display:block;" }) : null;
      var pdfLink = pdfHref ? el("a", { class: "pdf-link", href: pdfHref, target: "_blank", rel: "noopener" }, "📎 Avaa kuva PDF:stä") : null;

      var options = Array.isArray(q.options) ? q.options : [];
      var correctIndex = (typeof q.correctIndex === "number") ? q.correctIndex : -1;

      var optsBox = el("div", { class: "options" });
      options.forEach(function (opt, j) {
        var isCorrect = (j === correctIndex);
        optsBox.appendChild(el("div", {
          class: "btn option" + (isCorrect ? " opt-correct" : ""),
          style: "cursor:default;"
        }, [
          el("span", { class: "opt-letter" }, LETTERS[j] || ("" + (j + 1))),
          el("span", { class: "opt-text" }, optionText(opt))
        ]));
      });

      var explanationEl = q.explanation ? el("div", { class: "explanation", style: "margin-top:10px" }, "Selitys: " + q.explanation) : null;
      var reviewNote = q.needsReview ? el("div", { class: "feedback wrong", style: "margin-top:10px;" }, "⚠️ Tätä kysymystä ei ole vielä tarkistettu (needsReview).") : null;

      var navRow = el("div", { class: "btn-row", style: "margin-top:14px;" }, [
        el("button", { class: "btn", disabled: i <= 0, onclick: function () { if (i > 0) { idx--; showAt(idx); } } }, "← Edellinen"),
        el("button", { class: "btn", disabled: i >= pool.length - 1, onclick: function () { if (i < pool.length - 1) { idx++; showAt(idx); } } }, "Seuraava →")
      ]);
      var topRow = el("div", { class: "btn-row", style: "margin-bottom:10px" }, [
        el("button", { class: "btn ghost", onclick: renderBrowsePicker }, "← Takaisin moduulivalintaan")
      ]);
      var card = el("div", { class: "card" }, [
        topRow,
        meta,
        statement,
        pdfLink,
        optsBox,
        explanationEl,
        reviewNote,
        navRow,
        imgEl
      ]);
      setView(card);
    }
    showAt(idx);
  }

  // ---------- Instructions / Ohjeet ----------
  function renderInstructions() {
    function section(title, children) {
      return el("div", { style: "margin-bottom:22px;" }, [
        el("h3", { style: "margin-bottom:8px;border-bottom:1px solid var(--border);padding-bottom:6px;" }, title)
      ].concat(children));
    }
    function paragraph(text) {
      return el("p", { style: "margin:0 0 10px 0;line-height:1.55;opacity:0.92;" }, text);
    }
    function bullet(text) {
      return el("li", { style: "margin-bottom:6px;line-height:1.5;" }, text);
    }

    var card = el("div", { class: "card" }, [
      el("div", { class: "btn-row", style: "margin-bottom:10px" }, [
        el("button", { class: "btn ghost", onclick: renderHome }, "← Takaisin etusivulle")
      ]),
      el("h2", null, "📖 Ohjeet ja käyttöehdot"),

      section("Käyttöehdot", [
        el("div", { style: "background:var(--surface-2);padding:14px 16px;border-radius:var(--radius);margin-bottom:12px;" }, [
          paragraph("© Kaikki oikeudet pidätetään."),
          paragraph("1. Tämä sovellus on tarkoitettu ainoastaan yksityiseen, ei-kaupalliseen henkilökohtaiseen käyttöön ja itseopiskeluun PPL-teoriakokeeseen valmistautumista varten."),
          paragraph("2. Kaupallinen käyttö, myynti, vuokraus, lisensointi, jakelumalliin perustuva hyödyntäminen tai muu taloudellisen hyödyn tavoittelu on ehdottomasti kielletty ilman etukäteen saatua nimenomaista kirjallista lupaa."),
          paragraph("3. Sovellusta tai sen sisältöä ei saa julkaista, levittää tai upottaa osana kolmannen osapuolen palvelua, mukaan lukien sovelluskaupat (App Store, Google Play, Microsoft Store), verkkoalustat ja oppimisjärjestelmät."),
          paragraph("4. Kysymykset ja vastaukset on poimittu julkisista Traficomin PPL-kysymyspankeista. Niiden tekijänoikeudet ja immateriaalioikeudet kuuluvat alkuperäisille haltijoille. Käyttäjällä ei ole oikeutta väittää omakseen, muokata kaupallisiin tarkoituksiin tai edelleen levittää kysymyspankin sisältöä."),
          paragraph("5. Sovellus tarjotaan \"sellaisenaan\" ilman minkäänlaisia takuita. Tekijä ei vastaa virheellisistä vastauksista, tiedon puutteellisuudesta, mahdollisista vahingoista, välittömistä tai välillisistä menetyksistä tai muista sovelluksen käyttöön liittyvistä seurauksista."),
          paragraph("6. Sovellus EI ole virallinen oppimateriaali eikä hyväksytty lähteiden korvaaja. Käytä aina ilmailuviranomaisten (Traficom, EASA, ICAO) virallisia julkaisuja, lentokoulun materiaaleja ja kouluttajien opastusta."),
          paragraph("7. Sovellusta ei saa käyttää automatisoiduissa järjestelmissä, bottien, robottien tai vastaavien työkalujen kautta ilman lupaa."),
          paragraph("8. Sovellus ei käytä evästeitä (cookies) eikä muita seurantateknologioita. Kaikki tallennettava tieto (tilastot, harjoitushistoria, teema-asetus, kokeiden tulokset) säilytetään ainoastaan käyttäjän oman selaimen paikallisessa muistissa (localStorage), eikä sitä lähetetä palvelimelle tai kolmansille osapuolille."),
          paragraph("9. Käyttämällä tätä sovellusta hyväksyt nämä ehdot. Mikäli et hyväksy ehtoja, sinun on lopetettava sovelluksen käyttö välittömästi.")
        ])
      ]),

      section("Sovelluksen yleiskuvaus", [
        paragraph("PPL-harjoittelu on offline-toimiva selainsovellus yksityislentäjän lupakirjan (PPL, LAPL) teoriakokeisiin valmistautumiseen. Sovellus ei lähetä tietoja internetiin ja ei käytä evästeitä – kaikki tulokset tallentuvat vain tämän selaimen paikalliseen muistiin (localStorage)."),
        paragraph("Sovellus sisältää kysymyksiä useista moduuleista. Jokaiseen kysymykseen on neljä vaihtoehtoa (A–D) ja useimpiin liittyy selitys.")
      ]),

      section("1. Moduuliharjoitukset", [
        paragraph("Etusivulla näet kaikki moduulit: Ilmailun säädökset, Lentokoneen yleistuntemus, Suoritusarvot ja lennonsuunnittelu, Ihmisen suorituskyky, Sääoppi, Lentosuunnistus, Lentotoiminta, Lennonteoria ja Radiopuhelinliikenne. Klikkaamalla moduulia aloitat 20 kysymyksen harjoituksen."),
        el("ul", { style: "margin:0 0 10px 18px;padding:0;" }, [
          bullet("Harjoituksessa näet heti, onko vastaus oikein vai väärin."),
          bullet("Selitys aukeaa automaattisesti oikean vastauksen yhteyteen."),
          bullet("Väärin vastatut kysymykset kertyvät virhehistoriaan."),
          bullet("Tulokset tallentuvat automaattisesti ja vaikuttavat tilastoihin.")
        ]),
        paragraph("Läpäisyraja on " + PASS_PERCENT + " % (" + PASS_NEEDED + " / " + QUESTIONS_PER_QUIZ + " oikein). Moduulin nimen alla näkyy viimeisin tuloksesi ja paras tuloksesi prosentteina.")
      ]),

      section("2. Trafi-koesimulaatio", [
        paragraph("Koesimulaatio jäljittelee virallista PPL-teoriakoetta. Voit valita, mitkä moduulit sisällytät kokeeseen. Jokaisesta valitusta moduulista arvotaan " + EXAM_PER_MODULE + " kysymystä."),
        el("ul", { style: "margin:0 0 10px 18px;padding:0;" }, [
          bullet("Kokeen aikana et näe oikeaa vastausta tai selitystä – vastaukset paljastuvat vasta lopussa."),
          bullet("Kaikkien valittujen moduulien on oltava läpäisty (≥ " + PASS_PERCENT + " %) jotta koko koesarja katsotaan läpäistyksi."),
          bullet("Tulokset tallentuvat Tilastot-sivun kohtaan \"Koesimulaatiot\"."),
          bullet("Voit keskeyttää kokeen, mutta keskeytettyä kokeelta ei tallenneta tulosta.")
        ])
      ]),

      section("3. Kertaa virheet", [
        paragraph("Tämä toiminto nostaa esiin kysymykset, joihin olet vastannut väärin aiemmissa harjoituksissa. Virhehistoria kertyy automaattisesti jokaisen harjoituksen ja koesimulaation jälkeen."),
        paragraph("Kertaus painottaa sekä useimmin väärin vastattuja kysymyksiä että aiemmin harvemmin nähtyjä kysymyksiä. Näin harjoittelu pysyy monipuolisena eikä toista vain samoja kysymyksiä.")
      ]),

      section("4. Kuvakysymykset", [
        paragraph("Kuvakysymyksissä näytetään liitteenä olevat kuvat (esim. sääkartat, lentokenttäkaaviot, radiokuviot). Voit selata kuvakysymyksiä moduuli kerrallaan."),
        paragraph("Jos kuva ei lataudu, kysymyksen yhteydessä on linkki avata kuva alkuperäisestä PDF-tiedostosta. Kuvakysymykset esitetään aina järjestyksessä (moduuli kerrallaan, kysymysnumeron mukaan).")
      ]),

      section("5. Tilastot", [
        paragraph("Tilastot-sivulla näet:"),
        el("ul", { style: "margin:0 0 10px 18px;padding:0;" }, [
          bullet("Jokaisen moduulin harjoitusmäärän, viimeisimmän ja parhaan tuloksen."),
          bullet("Koesimulaatiohistorian: läpäistyjen ja hylättyjen kokeiden määrän sekä yksityiskohtaiset tulokset viimeisimmistä kokeista."),
          bullet("Aikaleimat suhteellisessa muodossa (\"tunti sitten\", \"eilen\" jne.).")
        ])
      ]),

      section("6. Nollaa tulokset", [
        paragraph("\"Nollaa tulokset\" -toiminto tyhjentää kaikki harjoitustulokset, virhehistorian ja koesimulaatiohistorian pysyvästi. Tätä toimintoa ei voi perua."),
        paragraph("Huom: sovellus toimii täysin offline-tilassa, joten tietojen nollaus vaikuttaa vain tähän selaimeen.")
      ]),

      section("7. Ulkoasu ja teema", [
        paragraph("Yläpalkin kuvakkeista voit vaihtaa tumman ja vaalean teeman välillä. Valinta tallentuu selaimen muistiin.")
      ]),

      section("Vinkkejä tehokkaaseen harjoitteluun", [
        el("ul", { style: "margin:0 0 10px 18px;padding:0;" }, [
          bullet("Aloita yhdestä moduulista kerrallaan ja yritä saada tasaisesti ≥ " + PASS_PERCENT + " % tuloksia ennen seuraavaan siirtymistä."),
          bullet("Käytä \"Kertaa virheet\" -toimintoa säännöllisesti – se vahvistaa heikkoja kohtia."),
          bullet("Tee koesimulaatioita vasta, kun olet harjoitellut kaikki moduulit läpi."),
          bullet("Tarkista kuvakysymykset erikseen, jos et ole varma kuvien sisällöstä."),
          bullet("Älä luota pelkästään sovellukseen – lue myös viralliset oppikirjat ja kysy kouluttajalta.")
        ])
      ]),

      section("Muutoshistoria", [
        paragraph("Katso sovelluksen kaikki versiomuutokset ja korjaukset: "),
        el("button", { class: "btn ghost", style: "margin-top:4px;", onclick: renderChangelog }, "📝 Avaa Changelog")
      ]),

      el("div", { class: "btn-row", style: "margin-top:18px;" }, [
        el("button", { class: "btn primary", onclick: renderHome }, "← Takaisin etusivulle")
      ])
    ]);
    setView(card);
  }

  // ---------- Changelog ----------
  function markdownToHtml(md) {
    var lines = md.split(/\r?\n/);
    var out = [];
    var inList = false;
    function closeList() { if (inList) { out.push("</ul>"); inList = false; } }
    function inlineBold(s) { return s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); }
    lines.forEach(function (line) {
      var s = line.trim();
      if (s.indexOf("# ") === 0) {
        closeList();
        out.push('<h2 style="margin-top:0">' + s.slice(2) + "</h2>");
      } else if (s.indexOf("## ") === 0) {
        closeList();
        out.push('<h3 style="margin-top:18px;margin-bottom:6px;border-bottom:1px solid var(--border);padding-bottom:4px;">' + s.slice(3) + "</h3>");
      } else if (s.indexOf("### ") === 0) {
        closeList();
        out.push('<h4 style="margin-top:12px;margin-bottom:4px;color:var(--accent)">' + s.slice(4) + "</h4>");
      } else if (s.indexOf("- ") === 0) {
        if (!inList) { out.push('<ul style="margin:0 0 8px 18px;padding:0;line-height:1.55;">'); inList = true; }
        out.push('<li style="margin-bottom:4px;">' + inlineBold(s.slice(2)) + "</li>");
      } else if (s === "") {
        closeList();
        out.push("<br>");
      } else {
        closeList();
        out.push('<p style="margin:0 0 8px 0;line-height:1.55;">' + inlineBold(s) + "</p>");
      }
    });
    closeList();
    return out.join("\n");
  }

  function renderChangelog() {
    var contentDiv = el("div", {
      style: "max-height:70vh;overflow-y:auto;padding-right:8px;"
    });

    var card = el("div", { class: "card" }, [
      el("div", { class: "btn-row", style: "margin-bottom:10px" }, [
        el("button", { class: "btn ghost", onclick: renderHome }, "← Takaisin etusivulle")
      ]),
      el("h2", null, "📝 Changelog"),
      el("p", { class: "lead" }, "Sovelluksen muutoshistoria, uusin ensin."),
      contentDiv
    ]);
    setView(card);

    if (typeof CHANGELOG_HTML !== "undefined" && CHANGELOG_HTML) {
      contentDiv.innerHTML = CHANGELOG_HTML;
      return;
    }

    contentDiv.innerHTML = "<p>Ladataan changelogia…</p>";
    fetch("CHANGELOG.md")
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
      .then(function (md) { contentDiv.innerHTML = markdownToHtml(md); })
      .catch(function () { contentDiv.innerHTML = "<p>Changelog ei saatavilla.</p>"; });
  }

  // Expose globally for HTML onclick handlers
  window.showTerms = showTerms;

  // ---------- Boot ----------
  document.addEventListener("DOMContentLoaded", function () {
    var versionEl = document.getElementById("app-version");
    if (versionEl) versionEl.textContent = "v" + APP_VERSION;
    applyTheme();
    renderHeaderActions();
    var view = document.getElementById("view");
    view.appendChild(el("div", { class: "card" }, "Ladataan kysymysdataa…"));
    loadData().then(renderHome).catch(function (err) {
      view.innerHTML = "";
      view.appendChild(el("div", { class: "card warn-banner" },
        "Kysymysdatan lataus epäonnistui: " + (err && err.message ? err.message : err) +
        ". Jos avaat tiedoston suoraan tuplaklikkaamalla (file://), selain saattaa estää JSON-tiedostojen latauksen. Käytä yhden tiedoston versiota PPL-harjoittelu.html, tai aja paikallinen palvelin: python -m http.server 8000."));
    });
  });
})();
