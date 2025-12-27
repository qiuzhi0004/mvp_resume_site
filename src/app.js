const LANG_STORAGE_KEY = "resumeLang";
const DATA_URL_BY_LANG = {
  zh: "./data/resume.json",
  en: "./data/resume.en.json",
};

const I18N = {
  zh: {
    "lang.switchToEnglish": "切换到英文",
    "lang.switchToChinese": "切换到中文",
    "common.present": "至今",
    "common.close": "关闭",
    "common.loadingFailedTitle": "加载失败：请用本地服务器预览",
    "common.loadingFailedSubtitle": "例如在该目录运行：python3 -m http.server 5173",
    "skipLink": "跳到正文",
    "nav.aria": "页面导航",
    "nav.hero": "概览",
    "nav.experience": "经历",
    "nav.projects": "项目",
    "nav.skills": "技能",
    "nav.education": "教育",
    "nav.contact": "联系",
    "nav.download": "下载",
    "section.experience": "经历",
    "section.skills": "技能",
    "section.bootcamp": "训练营",
    "section.bootcampDesc": "一些训练营照片：可拖拽摆放，点击聚焦。",
    "section.education": "教育 / 证书",
    "section.contact": "联系",
    "section.contactDesc": "含一键复制。",
    "section.download": "下载简历",
    "section.certificates": "证书展示",
    "section.certificatesDesc": "点击图片即可切换查看。",
    "hero.contact": "联系我",
    "hero.download": "下载简历",
    "hero.orbitText": "把简历当产品 · 快速交付 · 快速学习 · 构建 → 测量 → 迭代 · 保持好奇 · ",
    "download.ariaPdf": "下载简历 PDF",
    "download.clickHint": "点击即可下载（也可用页面顶部“下载”）。",
    "download.chip": "下载",
    "download.missingTitle": "下载 PDF 简历（待补充）",
    "download.missingMeta": "TODO：把 resume.pdf 放到站点目录，并在 data/resume.json 里更新 download.pdfPath。",
    "footer.lastUpdated": "最后更新：{date}",
    "footer.tagline": "结构优先的简历网站（MVP）",
    "experience.todoTitle": "TODO：补充经历",
    "experience.todoMeta": "公司 / 岗位 / 时间 / 关键成果",
    "experience.detailsTitle": "详细描述",
    "experience.keyResults": "关键成果",
    "experience.viewDetails": "点击查看详细描述",
    "contact.copyEmail": "复制邮箱",
    "contact.copyWechat": "复制微信号",
    "contact.copyPhone": "复制电话",
    "contact.openLink": "打开{label}",
    "contact.promptCopy": "复制以下内容：",
    "contact.copiedEmail": "已复制邮箱",
    "contact.copiedWechat": "已复制微信号",
    "contact.copiedPhone": "已复制电话",
    "contact.copyFailed": "复制失败（已打开手动复制）",
    "education.certifications": "证书",
    "portfolio.kicker": "Portfolio · Prototype / Demo / Pack（12件展品）",
    "portfolio.title": "vibe coding 的产品原型展示墙",
    "portfolio.listMode": "列表模式",
    "portfolio.galleryMode": "画廊模式",
    "portfolio.hudWheel": "滚轮/触控板：滑动浏览",
    "portfolio.hudDrag": "拖拽：滑动浏览",
    "portfolio.hudClickThumb": "点击缩略图：查看详情",
    "portfolio.searchPlaceholder": "搜索作品：原型 / demo / 模板 / 分享 / 动效 …",
    "portfolio.modalAria": "作品详情",
    "portfolio.sectionWhat": "这是什么",
    "portfolio.sectionHighlights": "亮点（小白也能懂）",
    "portfolio.sectionDeliverables": "你会看到什么交付物",
    "portfolio.sectionScreenshots": "页面截图",
    "portfolio.screenshotAlt": "页面截图",
    "portfolio.filterAll": "全部",
    "portfolio.filterPrototype": "原型",
    "portfolio.filterDemo": "Demo",
    "portfolio.filterPack": "资源包",
    "portfolio.typePrototype": "原型",
    "portfolio.typeDemo": "Demo",
    "portfolio.typePack": "资源包",
    "portfolio.count": "展示：{shown} / {total}",
    "skills.growth": "增长",
    "skills.product": "产品",
    "skills.data": "数据",
    "skills.tooling": "工具链",
    "skills.openHint": "点击展开技能点",
    "bootcamp.boardAria": "训练营照片墙",
    "bootcamp.photoAria": "训练营照片 {n}（拖拽摆放，点击聚焦）",
    "bootcamp.photoAlt": "训练营照片 {n}",
    "bootcamp.caption": "训练营 · {n}",
    "certificate.slideAria": "证书 {n}：点击切换",
    "certificate.slideTitle": "证书 · {n}",
    "blackHole.sectionAria": "黑洞可视化（CodePen 效果复刻）",
    "blackHole.title": "黑洞",
    "blackHole.hint": "点击并拖拽：旋转视角",
    "blackHole.toggleAuto": "切换自动旋转",
  },
  en: {
    "lang.switchToEnglish": "Switch to English",
    "lang.switchToChinese": "Switch to Chinese",
    "common.present": "Present",
    "common.close": "Close",
    "common.loadingFailedTitle": "Load failed: please preview with a local server",
    "common.loadingFailedSubtitle": "For example: python3 -m http.server 5173",
    "skipLink": "Skip to content",
    "nav.aria": "Page navigation",
    "nav.hero": "Overview",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.education": "Education",
    "nav.contact": "Contact",
    "nav.download": "Download",
    "section.experience": "Experience",
    "section.skills": "Skills",
    "section.bootcamp": "Bootcamp",
    "section.bootcampDesc": "Bootcamp photos: drag to rearrange, click to focus.",
    "section.education": "Education / Certifications",
    "section.contact": "Contact",
    "section.contactDesc": "Includes one-click copy.",
    "section.download": "Download CV",
    "section.certificates": "Certificates",
    "section.certificatesDesc": "Click a certificate to switch the view.",
    "hero.contact": "Contact",
    "hero.download": "Download CV",
    "hero.orbitText": "SHIP FAST · LEARN FASTER · BUILD → MEASURE → ITERATE · MAKE IT FUN · ",
    "download.ariaPdf": "Download resume PDF",
    "download.clickHint": "Click to download (also available in the header “Download”).",
    "download.chip": "Download",
    "download.missingTitle": "Download PDF (to be added)",
    "download.missingMeta": "TODO: Put resume.pdf in the site folder and update download.pdfPath in data/resume.json.",
    "footer.lastUpdated": "Last updated: {date}",
    "footer.tagline": "Structure-first resume site (MVP)",
    "experience.todoTitle": "TODO: Add experience",
    "experience.todoMeta": "Company / Role / Date / Key results",
    "experience.detailsTitle": "Details",
    "experience.keyResults": "Key results",
    "experience.viewDetails": "Click to view details",
    "contact.copyEmail": "Copy email",
    "contact.copyWechat": "Copy WeChat",
    "contact.copyPhone": "Copy phone",
    "contact.openLink": "Open {label}",
    "contact.promptCopy": "Copy the following:",
    "contact.copiedEmail": "Email copied",
    "contact.copiedWechat": "WeChat copied",
    "contact.copiedPhone": "Phone copied",
    "contact.copyFailed": "Copy failed (manual copy opened)",
    "education.certifications": "Certifications",
    "portfolio.kicker": "Portfolio · Prototype / Demo / Pack (12 exhibits)",
    "portfolio.title": "Vibe-coded Prototype Wall",
    "portfolio.listMode": "List",
    "portfolio.galleryMode": "Gallery",
    "portfolio.hudWheel": "Scroll: browse",
    "portfolio.hudDrag": "Drag: browse",
    "portfolio.hudClickThumb": "Click thumbnail: details",
    "portfolio.searchPlaceholder": "Search: prototype / demo / templates / share / motion…",
    "portfolio.modalAria": "Project details",
    "portfolio.sectionWhat": "What it is",
    "portfolio.sectionHighlights": "Highlights (plain English)",
    "portfolio.sectionDeliverables": "Deliverables",
    "portfolio.sectionScreenshots": "Screenshots",
    "portfolio.screenshotAlt": "Screenshot",
    "portfolio.filterAll": "All",
    "portfolio.filterPrototype": "Prototype",
    "portfolio.filterDemo": "Demo",
    "portfolio.filterPack": "Pack",
    "portfolio.typePrototype": "Prototype",
    "portfolio.typeDemo": "Demo",
    "portfolio.typePack": "Pack",
    "portfolio.count": "Shown: {shown} / {total}",
    "skills.growth": "Growth",
    "skills.product": "Product",
    "skills.data": "Data",
    "skills.tooling": "Tooling",
    "skills.openHint": "Click to expand",
    "bootcamp.boardAria": "Bootcamp photo board",
    "bootcamp.photoAria": "Bootcamp photo {n} (drag to rearrange, click to focus)",
    "bootcamp.photoAlt": "Bootcamp photo {n}",
    "bootcamp.caption": "Bootcamp · {n}",
    "certificate.slideAria": "Certificate {n}: click to switch",
    "certificate.slideTitle": "Certificate · {n}",
    "blackHole.sectionAria": "Black Hole Visualization (CodePen recreation)",
    "blackHole.title": "Black Hole",
    "blackHole.hint": "Click and drag to rotate view",
    "blackHole.toggleAuto": "Toggle automatic rotation",
  },
};

const SECTION_IDS = ["hero", "experience", "projects", "skills", "education", "contact", "download"];

const normalizeLang = (value) => {
  const raw = String(value ?? "")
    .trim()
    .toLowerCase();
  if (!raw) return null;
  if (raw === "zh" || raw.startsWith("zh-")) return "zh";
  if (raw === "en" || raw.startsWith("en-")) return "en";
  return null;
};

const getDeep = (obj, path) => {
  if (!obj || typeof obj !== "object") return undefined;
  // Support flat keys like "nav.hero" (preferred in this project).
  if (Object.prototype.hasOwnProperty.call(obj, path)) return obj[path];

  const parts = String(path ?? "")
    .split(".")
    .filter(Boolean);
  let cur = obj;
  for (const p of parts) {
    if (!cur || typeof cur !== "object" || !(p in cur)) return undefined;
    cur = cur[p];
  }
  return cur;
};

let CURRENT_LANG = "zh";

const t = (key, vars = null) => {
  const raw =
    getDeep(I18N[CURRENT_LANG], key) ??
    getDeep(I18N.zh, key) ??
    (typeof key === "string" ? key : String(key ?? ""));
  const str = typeof raw === "string" ? raw : String(raw ?? "");
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
};

const getInitialLang = () => {
  const fromQuery = (() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      return normalizeLang(sp.get("lang"));
    } catch {
      return null;
    }
  })();
  if (fromQuery) return fromQuery;

  const fromStorage = (() => {
    try {
      return normalizeLang(window.localStorage.getItem(LANG_STORAGE_KEY));
    } catch {
      return null;
    }
  })();
  if (fromStorage) return fromStorage;

  const fromNavigator = normalizeLang(navigator.language);
  if (fromNavigator) return fromNavigator;
  return "zh";
};

const setLanguage = (nextLang) => {
  const lang = normalizeLang(nextLang);
  if (!lang) return;
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // ignore
  }

  const url = new URL(window.location.href);
  if (lang === "zh") url.searchParams.delete("lang");
  else url.searchParams.set("lang", lang);
  window.location.href = url.toString();
};

const applyLanguageUI = () => {
  const html = document.documentElement;
  html.lang = CURRENT_LANG === "en" ? "en" : "zh-CN";
  html.dataset.lang = CURRENT_LANG;

  const toggle = document.getElementById("langToggle");
  if (toggle) {
    const next = CURRENT_LANG === "zh" ? "en" : "zh";
    toggle.textContent = next === "en" ? "EN" : "中文";
    toggle.setAttribute("aria-label", next === "en" ? t("lang.switchToEnglish") : t("lang.switchToChinese"));
    toggle.addEventListener("click", () => setLanguage(next));
  }

  const skip = document.getElementById("skipLink");
  if (skip) skip.textContent = t("skipLink");

  const nav = document.querySelector(".nav");
  if (nav) nav.setAttribute("aria-label", t("nav.aria"));
  if (nav) {
    const labelBySection = {
      hero: t("nav.hero"),
      experience: t("nav.experience"),
      projects: t("nav.projects"),
      skills: t("nav.skills"),
      education: t("nav.education"),
      contact: t("nav.contact"),
      download: t("nav.download"),
    };
    for (const a of nav.querySelectorAll("a[href^=\"#\"]")) {
      const id = a.getAttribute("href")?.slice(1);
      if (id && id in labelBySection) a.textContent = labelBySection[id];
    }
  }

  const setIdText = (id, key) => {
    const node = document.getElementById(id);
    if (node) node.textContent = t(key);
  };

  setIdText("experienceTitle", "section.experience");
  setIdText("skillsTitle", "section.skills");
  setIdText("bootcampTitle", "section.bootcamp");
  setIdText("educationTitle", "section.education");
  setIdText("contactTitle", "section.contact");
  setIdText("downloadTitle", "section.download");
  setIdText("certificateShowcaseTitle", "section.certificates");

  const bootcampDesc = document.querySelector("#bootcamp .section-desc");
  if (bootcampDesc) bootcampDesc.textContent = t("section.bootcampDesc");
  const contactDesc = document.querySelector("#contact .section-desc");
  if (contactDesc) contactDesc.textContent = t("section.contactDesc");
  const certDesc = document.querySelector("#photoSwitch .section-desc");
  if (certDesc) certDesc.textContent = t("section.certificatesDesc");

  const portrait = document.querySelector(".heroPortrait img");
  if (portrait instanceof HTMLImageElement) {
    portrait.alt = CURRENT_LANG === "en" ? "Portrait" : "个人照片";
  }

  const orbit = document.querySelector(".heroOrbitText textPath");
  if (orbit) {
    const base = getDeep(I18N.en, "hero.orbitText") ?? t("hero.orbitText");
    orbit.textContent = `${base}${base}`;
  }

  const projectsSection = document.getElementById("projects");
  if (projectsSection) projectsSection.setAttribute("aria-label", t("nav.projects"));

  const projectKicker = document.querySelector("#projects .moduleHeader .kicker");
  if (projectKicker) projectKicker.textContent = t("portfolio.kicker");
  const projectTitle = document.querySelector("#projects .moduleHeader .title");
  if (projectTitle) projectTitle.textContent = t("portfolio.title");
  const btnToList = document.getElementById("btnToList");
  if (btnToList) btnToList.textContent = t("portfolio.listMode");
  const btnToGallery = document.getElementById("btnToGallery");
  if (btnToGallery) btnToGallery.textContent = t("portfolio.galleryMode");

  const hudPills = [...document.querySelectorAll("#projects .hud .hudPill")];
  const hudText = [t("portfolio.hudWheel"), t("portfolio.hudDrag"), t("portfolio.hudClickThumb")];
  hudPills.forEach((pill, i) => {
    if (!hudText[i]) return;
    pill.textContent = hudText[i];
  });

  const searchInput = document.getElementById("searchInput");
  if (searchInput instanceof HTMLInputElement) {
    searchInput.placeholder = t("portfolio.searchPlaceholder");
  }

  const modalNode = document.querySelector("#modalMask .modal");
  if (modalNode) modalNode.setAttribute("aria-label", t("portfolio.modalAria"));
  const closeBtn = document.getElementById("mClose");
  if (closeBtn instanceof HTMLButtonElement) closeBtn.title = t("common.close");

  const bootcampBoard = document.getElementById("bootcampBoard");
  if (bootcampBoard) bootcampBoard.setAttribute("aria-label", t("bootcamp.boardAria"));

  document.querySelectorAll(".photo-switch-slide").forEach((slide, idx) => {
    slide.setAttribute("aria-label", t("certificate.slideAria", { n: idx + 1 }));
    const h3 = slide.querySelector("h3");
    if (h3) h3.textContent = t("certificate.slideTitle", { n: String(idx + 1).padStart(2, "0") });
  });

  const blackHoleSection = document.getElementById("blackHoleShowcase");
  if (blackHoleSection) blackHoleSection.setAttribute("aria-label", t("blackHole.sectionAria"));

  const info = document.getElementById("info");
  if (info) {
    const firstText = [...info.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
    if (firstText) firstText.textContent = t("blackHole.title");
    const hint = info.querySelector("span");
    if (hint) hint.textContent = t("blackHole.hint");
  }

  const autoRotateToggle = document.getElementById("autoRotateToggle");
  if (autoRotateToggle instanceof HTMLElement) autoRotateToggle.title = t("blackHole.toggleAuto");
};

CURRENT_LANG = getInitialLang();
applyLanguageUI();

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) continue;
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key.startsWith("on") && typeof value === "function") {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === "dataset" && typeof value === "object") {
      for (const [dkey, dval] of Object.entries(value)) {
        if (dval === null || dval === undefined) continue;
        node.dataset[dkey] = String(dval);
      }
    } else {
      node.setAttribute(key, String(value));
    }
  }
  for (const child of Array.isArray(children) ? children : [children]) {
    if (child === null || child === undefined) continue;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return node;
}

function formatRange(start, end) {
  if (!start && !end) return "";
  if (start && end) return `${start} – ${end}`;
  if (start && !end) return `${start} – ${t("common.present")}`;
  return `${end}`;
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function toast(message) {
  const node = document.getElementById("toast");
  if (!node) return;
  node.textContent = message;
  node.dataset.open = "true";
  window.clearTimeout(toast._t);
  toast._t = window.setTimeout(() => {
    node.dataset.open = "false";
  }, 1600);
}

let sharedModalController = null;

function getSharedModal() {
  if (sharedModalController) return sharedModalController;

  const modalMask = document.getElementById("modalMask");
  const mTitle = document.getElementById("mTitle");
  const mHook = document.getElementById("mHook");
  const mBody = document.getElementById("mBody");
  const mClose = document.getElementById("mClose");

  if (!modalMask || !mTitle || !mHook || !mBody || !mClose) return null;

  let lastFocus = null;

  const close = () => {
    if (!modalMask.classList.contains("show")) return;
    modalMask.classList.remove("show");
    modalMask.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    const toFocus = lastFocus;
    lastFocus = null;
    if (toFocus && typeof toFocus.focus === "function" && document.contains(toFocus)) {
      toFocus.focus();
    }
  };

  const open = ({ title = "", hook = "", body = "" } = {}) => {
    lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    mTitle.textContent = String(title ?? "");
    mHook.textContent = String(hook ?? "");

    if (typeof body === "string") {
      mBody.innerHTML = body;
    } else {
      const nodes = Array.isArray(body) ? body : [body];
      mBody.replaceChildren(...nodes.filter(Boolean));
    }

    modalMask.classList.add("show");
    modalMask.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    mClose.focus();
  };

  const isOpen = () => modalMask.classList.contains("show");

  mClose.addEventListener("click", close);
  modalMask.addEventListener("click", (e) => {
    if (e.target === modalMask) close();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  sharedModalController = { open, close, isOpen };
  return sharedModalController;
}

function makeLink(href, text) {
  return el("a", { href, target: "_blank", rel: "noreferrer", text: text ?? href });
}

function setText(id, text) {
  const node = document.getElementById(id);
  if (node) node.textContent = text;
}

function renderHero(data) {
  const basics = data.basics ?? {};
  const highlights = Array.isArray(data.highlights) ? data.highlights : [];

  const name = basics.name ?? "TODO：姓名";
  const headline = basics.headline ?? "TODO：一句话定位";
  const heroTitle = document.getElementById("heroTitle");
  if (heroTitle) {
    heroTitle.replaceChildren(
      el("span", { class: "hero-line hero-name reveal", style: "transition-delay: 0ms", text: name }),
      el("span", { class: "hero-line hero-line-muted reveal", style: "transition-delay: 80ms", text: headline })
    );
  }

  const summaryNode = document.getElementById("heroSummary");
  if (summaryNode) {
    const summaryText = String(
      highlights.find((h) => {
        const text = String(h ?? "").trim();
        if (!text) return false;
        return !/^\s*(关键词|Keywords)\s*[:：]/i.test(text);
      }) ?? ""
    ).trim();
    summaryNode.textContent = summaryText;
    summaryNode.classList.add("reveal");
    summaryNode.style.transitionDelay = "140ms";
    summaryNode.classList.toggle("is-empty", !summaryText);
  }

  const subtitleParts = [];
  if (basics.location) subtitleParts.push(basics.location);
  if (basics.email) subtitleParts.push(basics.email);
  if (basics.phone) subtitleParts.push(basics.phone);
  const heroSubtitle = document.getElementById("heroSubtitle");
  if (heroSubtitle) {
    const subtitleText = subtitleParts.length ? subtitleParts.join(" · ") : "";
    heroSubtitle.textContent = subtitleText;
    heroSubtitle.classList.add("reveal");
    heroSubtitle.style.transitionDelay = "220ms";
    heroSubtitle.classList.toggle("is-empty", !subtitleText);
  }

  const list = document.getElementById("heroHighlights");
  if (list) {
    list.replaceChildren();
    list.classList.add("is-empty");
  }

  const cta = document.getElementById("heroCta");
  const contactBtn = el("a", { class: "btn primary", href: "#contact", text: t("hero.contact") });
  const downloadBtn = el("a", { class: "btn", href: "#download", "data-download-link": "true", text: t("hero.download") });
  cta.replaceChildren(contactBtn, downloadBtn);
  cta.classList.add("reveal");
  cta.style.transitionDelay = "560ms";

  const brandText = document.getElementById("brandText");
  if (brandText) brandText.textContent = basics.name ?? "简历";
}

function applyDownloadLinks(pdfPath) {
  const hasPdf = !!pdfPath && String(pdfPath).trim() && !String(pdfPath).includes("TODO");
  const links = document.querySelectorAll("[data-download-link]");
  for (const a of links) {
    if (!(a instanceof HTMLAnchorElement)) continue;
    if (hasPdf) {
      a.setAttribute("href", pdfPath);
      a.setAttribute("download", "");
      a.setAttribute("aria-label", t("download.ariaPdf"));
    } else {
      a.setAttribute("href", "#download");
      a.removeAttribute("download");
      a.removeAttribute("aria-label");
    }
  }
}

function initReveal() {
  document.documentElement.classList.add("js");

  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const targets = Array.from(
    document.querySelectorAll(".section-head, .card, .download-row, details.card, .contact-actions")
  );

  for (const t of targets) t.classList.add("reveal");

  const revealables = Array.from(document.querySelectorAll(".reveal"));
  if (reduce || !("IntersectionObserver" in window)) {
    for (const el of revealables) el.classList.add("is-visible");
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-visible");
        obs.unobserve(e.target);
      }
    },
    { root: null, threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  for (const el of revealables) obs.observe(el);
}

function initExperienceTimeline(timelineRoot) {
  if (!timelineRoot) return;
  if (timelineRoot.dataset.timelineInit === "true") return;
  timelineRoot.dataset.timelineInit = "true";

  const OFFSET = 0.85;
  let obs = null;

  const getRows = () =>
    Array.from(timelineRoot.querySelectorAll(".cd-timeline__block"))
      .map((block) => {
        const img = block.querySelector(".cd-timeline__img");
        const content = block.querySelector(".cd-timeline__content");
        const opposite = block.querySelector(".cd-timeline__opposite");
        if (!img || !content) return null;
        return { block, img, content, opposite };
      })
      .filter(Boolean);

  const apply = () => {
    if (obs) obs.disconnect();
    obs = null;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const desktop = window.matchMedia?.("(min-width: 900px)")?.matches ?? false;
    const rows = getRows();

    for (const row of rows) {
      row.img.classList.remove("cd-timeline__img--hidden", "cd-timeline__img--bounce-in");
      row.content.classList.remove("cd-timeline__content--hidden", "cd-timeline__content--bounce-in");
      row.opposite?.classList.remove("cd-timeline__opposite--hidden", "cd-timeline__opposite--bounce-in");
    }

    if (reduce || !desktop || !("IntersectionObserver" in window)) return;

    obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const row = rows.find((r) => r.block === entry.target);
          if (!row) continue;
          if (!row.content.classList.contains("cd-timeline__content--hidden")) {
            obs?.unobserve(row.block);
            continue;
          }

          row.img.classList.remove("cd-timeline__img--hidden");
          row.content.classList.remove("cd-timeline__content--hidden");
          row.img.classList.add("cd-timeline__img--bounce-in");
          row.content.classList.add("cd-timeline__content--bounce-in");
          row.opposite?.classList.remove("cd-timeline__opposite--hidden");
          row.opposite?.classList.add("cd-timeline__opposite--bounce-in");
          obs?.unobserve(row.block);
        }
      },
      { root: null, threshold: 0.22, rootMargin: "0px 0px -10% 0px" }
    );

    for (const row of rows) {
      const shouldHide = row.block.getBoundingClientRect().top > window.innerHeight * OFFSET;
      if (!shouldHide) continue;
      row.img.classList.add("cd-timeline__img--hidden");
      row.content.classList.add("cd-timeline__content--hidden");
      row.opposite?.classList.add("cd-timeline__opposite--hidden");
      obs.observe(row.block);
    }
  };

  apply();

  const mqDesktop = window.matchMedia?.("(min-width: 900px)");
  const mqReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  if (mqDesktop?.addEventListener) mqDesktop.addEventListener("change", apply);
  else mqDesktop?.addListener?.(apply);
  if (mqReduce?.addEventListener) mqReduce.addEventListener("change", apply);
  else mqReduce?.addListener?.(apply);
}

function renderExperience(data) {
  const items = Array.isArray(data.experience) ? data.experience : [];
  const root = document.getElementById("experienceList");
  const modal = getSharedModal();

  if (!items.length) {
    root.classList.add("stack");
    root.classList.remove("cd-timeline", "js-cd-timeline");
    root.replaceChildren(
      el("div", { class: "card" }, [
        el("p", { class: "card-title", text: t("experience.todoTitle") }),
        el("p", { class: "card-meta", text: t("experience.todoMeta") }),
      ])
    );
    return;
  }

  root.classList.remove("stack");
  root.classList.add("cd-timeline", "js-cd-timeline");

  const ACCENT_PAIRS = [
    ["var(--c-pink)", "var(--c-cyan)"],
    ["var(--c-purple)", "var(--c-lime)"],
    ["var(--c-cyan)", "var(--c-yellow)"],
    ["var(--c-lime)", "var(--c-pink)"],
  ];

  const blocks = items.map((it, index) => {
    const [accent, accent2] = ACCENT_PAIRS[index % ACCENT_PAIRS.length];
    const titleText = it.title ?? `${it.org ?? "TODO：公司"}｜${it.role ?? "TODO：岗位"}`;
    const dateText = formatRange(it.start, it.end);
    const metaText = [it.location, !it.location ? it.role : null]
      .filter(Boolean)
      .join(CURRENT_LANG === "en" ? " | " : "｜");
    const summary = Array.isArray(it.summary) ? it.summary : [];
    const achievements = Array.isArray(it.achievements) ? it.achievements : [];
    const detailParagraphs = (
      Array.isArray(it.details) ? it.details : typeof it.details === "string" ? [it.details] : []
    )
      .map((p) => String(p ?? "").trim())
      .filter(Boolean);
    const orgKey = String(it.org ?? "").trim();
    const mark = orgKey ? orgKey.slice(0, 1).toUpperCase() : "•";
    const hasDetails = !!modal && detailParagraphs.length > 0;

    const openDetails = () => {
      if (!hasDetails) return;
      const hookParts = [metaText, dateText].filter(Boolean);
      modal.open({
        title: titleText,
        hook: hookParts.join(" · "),
        body: el("div", { class: "sec" }, [
          el("h3", { text: t("experience.detailsTitle") }),
          ...detailParagraphs.map((p) => el("p", { text: p })),
        ]),
      });
    };

    const onDetailsKeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDetails();
      }
    };

    const summaryBody = [
      el("div", { class: "cd-timeline__content-header" }, [
        el("h3", { class: "card-title", text: titleText }),
        dateText ? el("span", { class: "cd-timeline__date", text: dateText }) : null,
      ]),
      metaText ? el("p", { class: "card-meta", text: metaText }) : null,
      summary.length ? el("ul", { class: "list" }, summary.map((s) => el("li", { text: s }))) : null,
      achievements.length
        ? el("div", { class: "cd-timeline__section" }, [
            el("p", { class: "card-meta", text: t("experience.keyResults") }),
            el("ul", { class: "list" }, achievements.map((a) => el("li", { text: a }))),
          ])
        : null,
      hasDetails
        ? el("div", { class: "cd-timeline__expander", "aria-hidden": "true" }, [
            el("span", { text: t("experience.viewDetails") }),
            el("span", { class: "cd-timeline__expander-icon", "aria-hidden": "true", text: "⌄" }),
          ])
        : null,
    ];

    const content = el(
      "article",
      {
        class: "cd-timeline__content",
        ...(hasDetails
          ? {
              role: "button",
              tabindex: "0",
              dataset: { hasDetails: "true" },
              onclick: openDetails,
              onkeydown: onDetailsKeydown,
            }
          : {}),
      },
      summaryBody
    );

    return el("div", { class: "cd-timeline__block", dataset: { index } }, [
      el("div", { class: "cd-timeline__img", "aria-hidden": "true", style: `--tl-accent:${accent};--tl-accent2:${accent2};` }, [
        el("span", { class: "cd-timeline__mark", text: mark }),
      ]),
      content,
      dateText ? el("div", { class: "cd-timeline__opposite", text: dateText }) : null,
    ]);
  });

  root.replaceChildren(el("div", { class: "cd-timeline__container" }, blocks));
  initExperienceTimeline(root);
}

let portfolioProjectsInitialized = false;

function initPortfolioProjectsModule() {
  if (portfolioProjectsInitialized) return;

  const moduleRoot = document.getElementById("portfolio");
  const view3d = document.getElementById("view3d");
  const view2d = document.getElementById("view2d");
  const btnToList = document.getElementById("btnToList");
  const btnToGallery = document.getElementById("btnToGallery");
  const scene = document.getElementById("scene");
  const world = document.getElementById("world");
  const ribbon = document.getElementById("ribbon");

  const filters = document.getElementById("filters");
  const masonry = document.getElementById("masonry");
  const count = document.getElementById("count");
  const searchInput = document.getElementById("searchInput");
  const modal = getSharedModal();

  if (
    !moduleRoot ||
    !view3d ||
    !view2d ||
    !btnToList ||
    !btnToGallery ||
    !scene ||
    !world ||
    !ribbon ||
    !filters ||
    !masonry ||
    !count ||
    !searchInput ||
    !modal
  ) {
    return;
  }

  portfolioProjectsInitialized = true;

  /* ==========================
     12 works data (from 2 作品集模块 - 参考代码.html)
     ========================== */
  const projectsZh = [
    // Prototype (4)
    {
      id: "P01",
      type: "prototype",
      title: "Inspo Vault 灵感收藏夹",
      hook: "把“刷到的好东西”变成可管理的灵感资产：一键收藏、自动归类、随时找回。",
      tags: ["Prototype", "内容整理", "信息架构"],
      cover: { kind: "image", src: "prototype-picture/p1-1.png", badge: "Prototype" },
      gallery: { label: "灵感收藏夹", chips: ["Figma原型", "内容整理"] },
      detail: {
        what: "一个“收藏→归类→再利用”的原型：让用户收藏后不再丢失、也不再难找。",
        highlights: ["收藏动作极短：不打断阅读", "自动归类 + 标签体系：更像“灵感仓库”", "搜索与回访路径：把灵感变成可复用资产"],
        deliverables: ["高保真原型（流程）", "关键组件（卡片/标签/收藏反馈）", "交互细节说明"],
        images: ["prototype-picture/p1-2.png", "prototype-picture/p1-3.png"],
      },
    },
    {
      id: "P02",
      type: "prototype",
      title: "Challenge Hub 话题挑战活动页",
      hook: "规则一眼懂、投稿三步走、榜单刺激参与：把活动从“看热闹”变成“愿意投稿”。",
      tags: ["Prototype", "活动页", "运营氛围"],
      cover: { kind: "image", src: "prototype-picture/p2-1.png", badge: "Prototype" },
      gallery: { label: "话题挑战活动页", chips: ["活动结构", "投稿三步"] },
      detail: {
        what: "内容社区常见活动模板：让用户快速理解规则、轻松投稿，并愿意传播。",
        highlights: ["规则模块化：减少信息负担", "投稿路径压缩：一步一步引导完成", "榜单/优秀作品：增强参与动机"],
        deliverables: ["活动页原型", "投稿流程原型", "组件拆解（规则/榜单/CTA）"],
        images: ["prototype-picture/p2-2.png", "prototype-picture/p2-3.png"],
      },
    },
    {
      id: "P03",
      type: "prototype",
      title: "Collection Hub 专题合集页",
      hook: "把散落的内容串成“目录式攻略”：章节导航 + 继续阅读，让内容消费更像完成一件事。",
      tags: ["Prototype", "专题编排", "导航体验"],
      cover: { kind: "image", src: "prototype-picture/p3-1.png", badge: "Prototype" },
      gallery: { label: "专题合集页", chips: ["目录结构", "继续阅读"] },
      detail: {
        what: "专题页原型：把内容组织成可连续阅读的路径，提高“看完/收藏专题”的概率。",
        highlights: ["封面+章节列表：一眼理解全貌", "进度提示：降低中断成本", "收藏专题：把内容打包带走"],
        deliverables: ["专题页原型", "章节导航交互", "信息架构示意"],
        images: ["prototype-picture/p3-2.png", "prototype-picture/p3-3.png"],
      },
    },
    {
      id: "P04",
      type: "prototype",
      title: "Creator Brand Page 创作者名片页",
      hook: "让创作者像“个人品牌”被理解：精选合集、代表作、常见问题、合作入口一次讲清楚。",
      tags: ["Prototype", "个人品牌", "内容社区"],
      cover: { kind: "image", src: "prototype-picture/p4-1.png", badge: "Prototype" },
      gallery: { label: "创作者名片页", chips: ["品牌主页", "合集展示"] },
      detail: {
        what: "创作者主页原型：不仅展示内容，更让别人快速理解你擅长什么、怎么看你的代表作。",
        highlights: ["精选合集：降低发现成本", "代表作墙：建立信任", "合作入口：更像“可联系的品牌”"],
        deliverables: ["主页原型", "合集/代表作模块", "合作卡片组件"],
        images: ["prototype-picture/p4-2.png", "prototype-picture/p4-3.png"],
      },
    },

    // Demo (4)
    {
      id: "D01",
      type: "demo",
      title: "Masonry Card Kit 瀑布流卡片组件展厅",
      hook: "把内容社区常见卡片做成可复用组件：封面、标签、状态、hover 微交互一页看全。",
      tags: ["Demo", "Figma→Web", "组件库"],
      cover: { kind: "image", src: "prototype-picture/p5-1.png", badge: "Demo" },
      gallery: { label: "瀑布流卡片组件库", chips: ["可运行Demo", "组件展厅"] },
      detail: {
        what: "一个能跑的组件画廊：展示卡片布局、状态与细节，实现“设计→落地”的闭环。",
        highlights: ["卡片变体：不同封面/标签/信息密度", "状态体系：hover/active/空态占位", "可复用：更像轻量 design system"],
        deliverables: ["Web Demo 页面", "组件矩阵", "样式规范（可扩展）"],
        images: ["prototype-picture/p5-2.png", "prototype-picture/p5-3.png"],
      },
    },
    {
      id: "D02",
      type: "demo",
      title: "Micro-interactions Pack 微交互动效小剧场",
      hook: "收藏/关注/筛选标签 3 个动效：反馈明确但不打扰，让用户知道“我刚刚做成了什么”。",
      tags: ["Demo", "动效", "产品质感"],
      cover: { kind: "image", src: "prototype-picture/p6-1.png", badge: "Demo" },
      gallery: { label: "微交互动效合集", chips: ["可运行Demo", "动效配方"] },
      detail: {
        what: "3 个常用动效 Demo：用最小的动效成本，换最大“确定性反馈”。",
        highlights: ["收藏：轻确认+不抢戏", "关注：状态明确+可撤销感", "筛选：chip 切换+列表过渡"],
        deliverables: ["Web Demo", "动效分镜/帧", "动效节奏说明"],
        images: ["prototype-picture/p6-2.png", "prototype-picture/p6-3.png"],
      },
    },
    {
      id: "D03",
      type: "demo",
      title: "Share Card Generator 分享卡片生成器",
      hook: "切换主题色/布局/封面样式，一键生成更体面的分享卡片，适配传播场景。",
      tags: ["Demo", "传播表达", "模板生成"],
      cover: { kind: "image", src: "prototype-picture/p7-1.png", badge: "Demo" },
      gallery: { label: "分享卡片生成器", chips: ["模板切换", "传播表达"] },
      detail: {
        what: "一个可玩的小工具：让“分享出去”更像作品而不是广告。",
        highlights: ["多模板：不同信息结构", "主题色/布局切换：快速适配内容类型", "输出预览：一眼看出传播效果"],
        deliverables: ["Web Demo", "模板墙", "分享场景预览"],
        images: ["prototype-picture/p7-2.png", "prototype-picture/p7-3.png"],
      },
    },
    {
      id: "D04",
      type: "demo",
      title: "Landing First Screen Switcher 落地页首屏模板切换器",
      hook: "3 套“首屏秒懂价值”模板：强主视觉/强对比/强步骤，点击切换对比表达效率。",
      tags: ["Demo", "落地页", "转化表达"],
      cover: { kind: "image", src: "prototype-picture/p8-1.png", badge: "Demo" },
      gallery: { label: "落地页首屏模板", chips: ["模板对比", "秒懂价值"] },
      detail: {
        what: "专注首屏：让用户 3 秒内明白“这是干什么、对我有什么用、下一步点哪里”。",
        highlights: ["三种结构：适配不同产品/内容", "强调层级：减少理解成本", "可复用：当成落地页骨架"],
        deliverables: ["Web Demo", "首屏结构板", "移动端预览"],
        images: ["prototype-picture/p8-2.png", "prototype-picture/p8-3.png"],
      },
    },

    // Pack (4)
    {
      id: "K01",
      type: "pack",
      title: "Cover Style Library 封面风格库（10套）",
      hook: "攻略/清单/对比/测评/避雷/合集/流程…统一画风模板墙，套图就能出高级封面。",
      tags: ["Pack", "封面模板", "内容网感"],
      cover: { kind: "image", src: "prototype-picture/p9-1.png", badge: "Pack" },
      gallery: { label: "封面风格库", chips: ["10套模板", "内容网感"] },
      detail: {
        what: "内容社区封面模板库：统一视觉语言，让“看起来专业”变得可复制。",
        highlights: ["模板化：不同内容类型快速套用", "统一画风：整站更像品牌", "可扩展：新增类型也不破风格"],
        deliverables: ["封面模板墙", "单模板变体", "使用规范（简版）"],
        images: ["prototype-picture/p9-2.png", "prototype-picture/p9-3.png"],
      },
    },
    {
      id: "K02",
      type: "pack",
      title: "Topic Branding Mini-kit 话题视觉小套件",
      hook: "一个话题想做大就要像品牌：色板、字体层级、徽章、卡片样式一套打包。",
      tags: ["Pack", "视觉规范", "专题品牌"],
      cover: { kind: "image", src: "prototype-picture/p10-1.png", badge: "Pack" },
      gallery: { label: "话题视觉小套件", chips: ["视觉规范", "专题品牌"] },
      detail: {
        what: "把话题从“临时活动”做成“可持续品牌”：页面到卡片保持一致。",
        highlights: ["色板+层级：统一表达", "徽章/标签：强化识别", "组件复用：活动页/内容页通吃"],
        deliverables: ["Mini kit board", "组件集合", "话题页预览"],
        images: ["prototype-picture/p10-2.png", "prototype-picture/p10-3.png"],
      },
    },
    {
      id: "K03",
      type: "pack",
      title: "Community Stickers & Badges 社区贴纸与徽章包",
      hook: "点赞表情、成就徽章、挑战完成章…一套小东西把“社区氛围”拉满。",
      tags: ["Pack", "贴纸徽章", "社区感"],
      cover: { kind: "image", src: "prototype-picture/p11-1.png", badge: "Pack" },
      gallery: { label: "贴纸与徽章包", chips: ["社区氛围", "统一风格"] },
      detail: {
        what: "把“氛围感”做成可复用资产：在评论区、活动页、个人主页都能直接用。",
        highlights: ["统一线性风格：不杂乱", "层级清晰：适配不同密度界面", "应用场景：评论/活动/主页"],
        deliverables: ["贴纸徽章墙", "徽章等级示意", "应用场景 mock"],
        images: ["prototype-picture/p11-2.png", "prototype-picture/p11-3.png"],
      },
    },
    {
      id: "K04",
      type: "pack",
      title: "Motion Recipes 动效配方包（可复用规范）",
      hook: "进入/退出、弹层、收藏反馈、筛选切换…把动效做成可复用“配方卡”。",
      tags: ["Pack", "动效规范", "产品质感"],
      cover: { kind: "image", src: "prototype-picture/p12-1.png", badge: "Pack" },
      gallery: { label: "动效配方包", chips: ["节奏规范", "可复用"] },
      detail: {
        what: "用“配方卡”把动效讲清楚：做得快、做得稳、做得一致。",
        highlights: ["节奏统一：不忽快忽慢", "缓动克制：不抢内容", "可复用：组件级动效"],
        deliverables: ["动效配方卡", "分镜帧", "时间/缓动说明"],
        images: ["prototype-picture/p12-2.png", "prototype-picture/p12-3.png"],
      },
    },
  ];

  const projectsEn = [
    // Prototype (4)
    {
      id: "P01",
      type: "prototype",
      title: "Inspo Vault — Inspiration Saver",
      hook: "Turn interesting finds into reusable inspiration assets: one‑tap save, auto organize, easy retrieval.",
      tags: ["Prototype", "Content organization", "Information architecture"],
      cover: { kind: "image", src: "prototype-picture/p1-1.png", badge: "Prototype" },
      gallery: { label: "Inspiration Saver", chips: ["Figma prototype", "Organization"] },
      detail: {
        what: 'A prototype for “save → categorize → reuse”, so what you save doesn’t get lost and is easy to find again.',
        highlights: [
          "Super-fast save action that doesn’t interrupt reading",
          "Auto categorization + tags that feel like an “inspiration warehouse”",
          "Search + revisit paths that make inspiration reusable",
        ],
        deliverables: ["High-fidelity prototype (flows)", "Key components (card/tag/save feedback)", "Interaction notes"],
        images: ["prototype-picture/p1-2.png", "prototype-picture/p1-3.png"],
      },
    },
    {
      id: "P02",
      type: "prototype",
      title: "Challenge Hub — Topic Challenge Event Page",
      hook: "Rules at a glance, 3-step submission, leaderboard motivation: turn spectators into contributors.",
      tags: ["Prototype", "Event page", "Community vibe"],
      cover: { kind: "image", src: "prototype-picture/p2-1.png", badge: "Prototype" },
      gallery: { label: "Topic Challenge Page", chips: ["Event structure", "3-step submission"] },
      detail: {
        what: "A reusable event template for content communities: make rules clear, guide submission, and encourage sharing.",
        highlights: [
          "Modular rules blocks reduce cognitive load",
          "Step-by-step submission lowers friction",
          "Leaderboard + featured works increase motivation",
        ],
        deliverables: ["Event page prototype", "Submission flow prototype", "Component breakdown (rules/board/CTA)"],
        images: ["prototype-picture/p2-2.png", "prototype-picture/p2-3.png"],
      },
    },
    {
      id: "P03",
      type: "prototype",
      title: "Collection Hub — Curated Collection Landing",
      hook: "Turn scattered posts into a directory-like guide: chapter nav + continue reading makes content feel like finishing a task.",
      tags: ["Prototype", "Curation", "Navigation"],
      cover: { kind: "image", src: "prototype-picture/p3-1.png", badge: "Prototype" },
      gallery: { label: "Collection Landing", chips: ["Directory IA", "Continue reading"] },
      detail: {
        what: "A collection-page prototype that turns content into a continuous path, increasing completion and saves.",
        highlights: [
          "Cover + chapters communicate structure instantly",
          "Progress hints reduce the cost of interruptions",
          "Save the collection to take the guide with you",
        ],
        deliverables: ["Collection prototype", "Chapter navigation interaction", "IA sketch"],
        images: ["prototype-picture/p3-2.png", "prototype-picture/p3-3.png"],
      },
    },
    {
      id: "P04",
      type: "prototype",
      title: "Creator Brand Page — A Creator Profile that Feels Like a Brand",
      hook: "Help creators be understood like a brand: curated collections, signature works, FAQs, and a collab entry—at a glance.",
      tags: ["Prototype", "Personal brand", "Community"],
      cover: { kind: "image", src: "prototype-picture/p4-1.png", badge: "Prototype" },
      gallery: { label: "Creator Profile", chips: ["Brand page", "Work wall"] },
      detail: {
        what: "A creator profile prototype that showcases content and quickly explains what you’re great at and what to start with.",
        highlights: [
          "Curated collections lower discovery cost",
          "A signature-work wall builds trust",
          "A collab entry point makes it feel like a reachable brand",
        ],
        deliverables: ["Profile prototype", "Collections/signature-work modules", "Collaboration card component"],
        images: ["prototype-picture/p4-2.png", "prototype-picture/p4-3.png"],
      },
    },

    // Demo (4)
    {
      id: "D01",
      type: "demo",
      title: "Masonry Card Kit — Masonry Component Gallery",
      hook: "A runnable gallery of common content cards: covers, tags, states, and hover micro-interactions on one page.",
      tags: ["Demo", "Figma → Web", "Component library"],
      cover: { kind: "image", src: "prototype-picture/p5-1.png", badge: "Demo" },
      gallery: { label: "Masonry Card Kit", chips: ["Runnable demo", "Component gallery"] },
      detail: {
        what: "A runnable component gallery that demonstrates layouts, states, and details—closing the loop from design to implementation.",
        highlights: [
          "Card variants: cover, tags, information density",
          "State system: hover/active/empty placeholders",
          "Reusable: a lightweight mini design system",
        ],
        deliverables: ["Web demo page", "Component matrix", "Style guidelines (extensible)"],
        images: ["prototype-picture/p5-2.png", "prototype-picture/p5-3.png"],
      },
    },
    {
      id: "D02",
      type: "demo",
      title: "Micro-interactions Pack — Tiny Motion Playground",
      hook: "Three micro-interactions (save/follow/filter): clear feedback without distraction, so users know what just happened.",
      tags: ["Demo", "Motion", "Product polish"],
      cover: { kind: "image", src: "prototype-picture/p6-1.png", badge: "Demo" },
      gallery: { label: "Micro-interactions", chips: ["Runnable demo", "Motion recipes"] },
      detail: {
        what: "Three common interaction demos: minimal motion cost, maximum certainty feedback.",
        highlights: [
          "Save: light confirmation without stealing the spotlight",
          "Follow: clear state + a sense of undo",
          "Filter: chip toggle + list transition",
        ],
        deliverables: ["Web demo", "Storyboards/frames", "Timing and rhythm notes"],
        images: ["prototype-picture/p6-2.png", "prototype-picture/p6-3.png"],
      },
    },
    {
      id: "D03",
      type: "demo",
      title: "Share Card Generator — Share-ready Card Builder",
      hook: "Switch theme/layout/cover styles and generate a more presentable share card—made for distribution contexts.",
      tags: ["Demo", "Distribution", "Templates"],
      cover: { kind: "image", src: "prototype-picture/p7-1.png", badge: "Demo" },
      gallery: { label: "Share Card Generator", chips: ["Template switching", "Share-ready"] },
      detail: {
        what: "A playful tool that makes what you share look like a piece of work—not an ad.",
        highlights: [
          "Multiple templates for different information structures",
          "Theme/layout switching to fit content types quickly",
          "Output preview optimized for sharing scenarios",
        ],
        deliverables: ["Web demo", "Template wall", "Sharing scenario previews"],
        images: ["prototype-picture/p7-2.png", "prototype-picture/p7-3.png"],
      },
    },
    {
      id: "D04",
      type: "demo",
      title: "Landing First Screen Switcher — Hero Template Comparer",
      hook: "Three “value in 3 seconds” hero templates: visual-first / strong contrast / step-by-step. Click to switch and compare.",
      tags: ["Demo", "Landing page", "Conversion"],
      cover: { kind: "image", src: "prototype-picture/p8-1.png", badge: "Demo" },
      gallery: { label: "Hero Template Switcher", chips: ["Template comparison", "Value in 3s"] },
      detail: {
        what: "Focus on the first screen: help users understand what it is, why it matters, and what to click—within 3 seconds.",
        highlights: [
          "Three layouts for different products and content types",
          "Clear hierarchy reduces comprehension cost",
          "Reusable as a landing-page skeleton",
        ],
        deliverables: ["Web demo", "Hero structure board", "Mobile previews"],
        images: ["prototype-picture/p8-2.png", "prototype-picture/p8-3.png"],
      },
    },

    // Pack (4)
    {
      id: "K01",
      type: "pack",
      title: "Cover Style Library — 10 Cover Templates",
      hook: "A unified cover-template wall for guides/checklists/comparisons/reviews… swap content in and ship premium-looking covers.",
      tags: ["Pack", "Cover templates", "Content style"],
      cover: { kind: "image", src: "prototype-picture/p9-1.png", badge: "Pack" },
      gallery: { label: "Cover Style Library", chips: ["10 templates", "Consistent style"] },
      detail: {
        what: "A cover template library for content communities: make a “professional look” repeatable and easy to reuse.",
        highlights: [
          "Templatized: quick apply by content type",
          "Unified style makes the whole site feel like a brand",
          "Extensible: new types won’t break the system",
        ],
        deliverables: ["Template wall", "Per-template variants", "Quick usage guidelines"],
        images: ["prototype-picture/p9-2.png", "prototype-picture/p9-3.png"],
      },
    },
    {
      id: "K02",
      type: "pack",
      title: "Topic Branding Mini-kit — Visual System Starter",
      hook: "Make a topic scale like a brand: palette, typography hierarchy, badges, and card styles—all in one kit.",
      tags: ["Pack", "Visual system", "Topic branding"],
      cover: { kind: "image", src: "prototype-picture/p10-1.png", badge: "Pack" },
      gallery: { label: "Branding Mini-kit", chips: ["Visual system", "Topic branding"] },
      detail: {
        what: "Turn a topic from a one-off campaign into a sustainable brand—consistent from pages to cards.",
        highlights: [
          "Palette + hierarchy unify expression",
          "Badges/tags strengthen recognition",
          "Reusable components across event and content pages",
        ],
        deliverables: ["Mini-kit board", "Component set", "Topic page preview"],
        images: ["prototype-picture/p10-2.png", "prototype-picture/p10-3.png"],
      },
    },
    {
      id: "K03",
      type: "pack",
      title: "Community Stickers & Badges — Sticker/Badge Pack",
      hook: "Reactions, achievement badges, challenge completion marks… small assets that supercharge community vibes.",
      tags: ["Pack", "Stickers & badges", "Community feel"],
      cover: { kind: "image", src: "prototype-picture/p11-1.png", badge: "Pack" },
      gallery: { label: "Stickers & Badges", chips: ["Community vibe", "Unified style"] },
      detail: {
        what: "Make “vibe” a reusable asset: use it in comments, event pages, and profiles without reinventing visuals.",
        highlights: [
          "Consistent linear style stays clean, not noisy",
          "Clear hierarchy across dense and light UIs",
          "Use cases: comments / events / profiles",
        ],
        deliverables: ["Sticker & badge wall", "Badge level examples", "Use-case mocks"],
        images: ["prototype-picture/p11-2.png", "prototype-picture/p11-3.png"],
      },
    },
    {
      id: "K04",
      type: "pack",
      title: "Motion Recipes — Reusable Motion Specs",
      hook: "Enter/exit, modals, save feedback, filter transitions… package motion into reusable “recipe cards”.",
      tags: ["Pack", "Motion system", "Product polish"],
      cover: { kind: "image", src: "prototype-picture/p12-1.png", badge: "Pack" },
      gallery: { label: "Motion Recipes", chips: ["Rhythm spec", "Reusable"] },
      detail: {
        what: "Explain motion with recipe cards: build faster, stay stable, and keep interactions consistent.",
        highlights: [
          "Unified tempo: no random fast/slow",
          "Subtle easing: motion supports content, not fights it",
          "Reusable: component-level motion patterns",
        ],
        deliverables: ["Recipe cards", "Storyboard frames", "Timing/easing notes"],
        images: ["prototype-picture/p12-2.png", "prototype-picture/p12-3.png"],
      },
    },
  ];

  const projects = CURRENT_LANG === "en" ? projectsEn : projectsZh;

  const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

  function showList() {
    view3d.classList.remove("show");
    view2d.classList.add("show");
    btnToList.style.display = "none";
    if (!isMobile()) btnToGallery.style.display = "inline-block";
  }

  function showGallery() {
    view2d.classList.remove("show");
    view3d.classList.add("show");
    btnToGallery.style.display = "none";
    btnToList.style.display = "inline-block";
  }

  btnToList.onclick = showList;
  btnToGallery.onclick = showGallery;

  function applyResponsiveDefault() {
    if (isMobile()) {
      showList();
      btnToGallery.style.display = "none";
    } else {
      showGallery();
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function section(title, inner) {
    return `<div class="sec"><h3>${escapeHtml(title)}</h3>${inner}</div>`;
  }

  function ul(items) {
    return `<ul class="list">${(items || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`;
  }

  function shotGrid(images) {
    const list = (images || []).filter(Boolean);
    if (!list.length) return "";
    return `<div class="shotGrid">${list
      .map(
        (src) =>
          `<div class="shot"><img loading="lazy" alt="${escapeHtml(t("portfolio.screenshotAlt"))}" src="${escapeHtml(src)}"/></div>`
      )
      .join("")}</div>`;
  }

  function openModal(id) {
    const p = projects.find((x) => x.id === id);
    if (!p) return;

    const d = p.detail || {};
    const shots = d.images?.length ? section(t("portfolio.sectionScreenshots"), shotGrid(d.images)) : "";
    modal.open({
      title: p.title,
      hook: p.hook,
      body: `
      ${section(t("portfolio.sectionWhat"), `<p>${escapeHtml(d.what || "—")}</p>`)}
      ${section(t("portfolio.sectionHighlights"), ul(d.highlights || []))}
      ${section(t("portfolio.sectionDeliverables"), ul(d.deliverables || []))}
      ${shots}
    `,
    });
  }

  /* ==========================
     2D list rendering
     ========================== */
  const FILTERS = [
    { key: "all", label: t("portfolio.filterAll") },
    { key: "prototype", label: t("portfolio.filterPrototype") },
    { key: "demo", label: t("portfolio.filterDemo") },
    { key: "pack", label: t("portfolio.filterPack") },
  ];
  const state2d = { type: "all", keyword: "" };

  function renderFilters() {
    filters.innerHTML = FILTERS.map((f) => {
      const on = f.key === state2d.type ? "on" : "";
      return `<div class="filterChip ${on}" data-type="${f.key}">${escapeHtml(f.label)}</div>`;
    }).join("");

    [...filters.querySelectorAll(".filterChip")].forEach((chip) => {
      chip.onclick = () => {
        state2d.type = chip.dataset.type;
        renderFilters();
        renderMasonry();
      };
    });
  }

  function match2d(p) {
    const kw = (state2d.keyword || "").toLowerCase().trim();
    const typeOk = state2d.type === "all" || p.type === state2d.type;
    if (!typeOk) return false;
    if (!kw) return true;
    const hay = [p.title, p.hook, ...(p.tags || []), p.type].join(" ").toLowerCase();
    return hay.includes(kw);
  }

  function cssUrl(url) {
    return String(url || "").replaceAll("\\", "\\\\").replaceAll("'", "\\'");
  }

  function coverStyle(c) {
    if (c?.kind === "image" && c.src) {
      const src = cssUrl(c.src);
      return `background-image: url('${src}');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        background-color: rgba(0,0,0,.02);`;
    }
    if (c?.kind === "gradient") {
      return `background:
        radial-gradient(700px 240px at 20% 0%, rgba(255,255,255,.38), transparent 55%),
        linear-gradient(135deg, ${c.a}, ${c.b});`;
    }
    return `background: linear-gradient(135deg, rgba(122,92,255,.18), rgba(34,197,94,.12));`;
  }

  function renderMasonry() {
    const list = projects.filter(match2d);
    count.textContent = t("portfolio.count", { shown: list.length, total: projects.length });

    masonry.innerHTML = list
      .map(
        (p) => `
        <article class="card" data-id="${escapeHtml(p.id)}">
          <div class="cardCover" style="${coverStyle(p.cover)}"></div>
          <div class="cardBody">
            <h3 class="cardTitle">${escapeHtml(p.title)}</h3>
            <p class="cardHook">${escapeHtml(p.hook)}</p>
            <div class="miniRow">
              <span class="pill">${escapeHtml(typeLabel(p.type))}</span>
              <span class="tag">${escapeHtml(p.gallery?.chips?.[0] || "—")}</span>
              <span class="tag">${escapeHtml(p.gallery?.chips?.[1] || "—")}</span>
            </div>
            <div class="tagRow">
              ${(p.tags || [])
                .slice(0, 4)
                .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
                .join("")}
            </div>
          </div>
        </article>
      `
      )
      .join("");

    [...masonry.querySelectorAll(".card")].forEach((card) => {
      card.onclick = () => openModal(card.dataset.id);
    });
  }

  let searchTimer = null;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state2d.keyword = searchInput.value || "";
      renderMasonry();
    }, 120);
  });

  /* ==========================
     3D ribbon rendering + interaction
     ========================== */
  let frames3d = [];
	  const galleryState = {
	    scroll: 0,
	    tscroll: 0,
	    maxScroll: 0,
	    initialized: false,
	    dragging: false,
	    pressId: null,
	    pressIndex: -1,
	    startX: 0,
	    startTscroll: 0,
	    raf: null,
	    justDragged: false,
	    v: 0,
	  };

  let bound3d = false;

  function typeLabel(type) {
    if (type === "prototype") return t("portfolio.typePrototype");
    if (type === "demo") return t("portfolio.typeDemo");
    return t("portfolio.typePack");
  }

  function artGradientStyle(p) {
    const c = p.cover || { kind: "gradient", a: "#7a5cff", b: "#22c55e" };
    if (c.kind === "image" && c.src) {
      const src = cssUrl(c.src);
      return `background-image: url('${src}');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        background-color: rgba(0,0,0,.02);`;
    }
    if (c.kind === "gradient") {
      return `background:
        radial-gradient(700px 240px at 18% 0%, rgba(255,255,255,.38), transparent 55%),
        linear-gradient(135deg, ${c.a}, ${c.b});`;
    }
    return `background: linear-gradient(135deg, rgba(122,92,255,.18), rgba(34,197,94,.12));`;
  }

  function renderFrames3D() {
    ribbon.innerHTML = "";
    frames3d = [];

    projects.forEach((p, i) => {
      const frame = document.createElement("div");
      frame.className = "frame";
      frame.dataset.id = p.id;
      frame.dataset.index = String(i);

      frame.innerHTML = `
        <div class="frameInner">
          <div class="bezel">
            <div class="art" style="${artGradientStyle(p)}"></div>
            <div class="plaque">
              <div class="label">${escapeHtml(p.gallery?.label || p.title)}</div>
              <div class="chips">
                <div class="chip type">${escapeHtml(typeLabel(p.type))}</div>
                <div class="chip">${escapeHtml(p.gallery?.chips?.[0] || "")}</div>
              </div>
            </div>
          </div>
        </div>
      `;

      ribbon.appendChild(frame);
      frames3d.push(frame);
    });

    galleryState.maxScroll = Math.max(0, frames3d.length - 1);

    if (!galleryState.initialized) {
      const start = galleryState.maxScroll * 0.5;
      galleryState.scroll = start;
      galleryState.tscroll = start;
      galleryState.initialized = true;
    } else {
      galleryState.scroll = clamp(galleryState.scroll, 0, galleryState.maxScroll);
      galleryState.tscroll = clamp(galleryState.tscroll, 0, galleryState.maxScroll);
    }

    layoutRibbon();
  }

	  function layoutRibbon() {
	    if (!frames3d.length) return;

	    const w = world.clientWidth || 1120;
	    const stepX = Math.round(w * 0.26);
	    const stepY = -Math.round(w * 0.016);
	    const stepZ = -Math.round(w * 0.22);

	    const baseRy = -18;
	    const baseRx = 4;

	    const v = clamp(galleryState.v || 0, -1.6, 1.6);

	    frames3d.forEach((frame, i) => {
	      const d = i - galleryState.scroll;
	      const abs = Math.abs(d);

	      const x = d * stepX;
	      const y = d * stepY;
	      const z = d * stepZ;
	      const ry = baseRy - d * 2.6;
	      const rx = baseRx;
	      const rz = v * 4.2 * Math.max(0, 1 - abs * 0.65);

	      const scale = 1 - Math.min(abs * 0.05, 0.26);
	      const opacity = clamp(1 - abs * 0.18, 0, 1);
	      const blur = Math.min(abs * 0.9, 5);

	      frame.style.transform = `translate(-50%,-50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${ry}deg) rotateX(${rx}deg) rotateZ(${rz}deg) scale(${scale})`;
	      frame.style.opacity = opacity.toFixed(3);
	      frame.style.filter = blur ? `blur(${blur.toFixed(2)}px)` : "";
	      frame.style.pointerEvents = opacity < 0.08 ? "none" : "auto";
	      frame.style.zIndex = String(1000 - Math.round(d * 20));

	      if (abs < 0.45) frame.dataset.active = "true";
	      else delete frame.dataset.active;
	    });
	  }

	  function applyProjectFx() {
	    if (typeof window === "undefined") return;
	    if (!moduleRoot) return;
	    if (!view3d.classList.contains("show")) return;

	    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)")?.matches;
	    if (reduceMotion) {
	      moduleRoot.style.setProperty("--proj-bg-x", "0px");
	      moduleRoot.style.setProperty("--proj-bg-y", "0px");
	      moduleRoot.style.setProperty("--proj-bg-opacity", "0.62");
	      moduleRoot.style.setProperty("--proj-glow-x", "0px");
	      moduleRoot.style.setProperty("--proj-glow-opacity", "0.75");
	      return;
	    }

	    const v = clamp(galleryState.v || 0, -1.6, 1.6);
	    const vAbs = Math.abs(v);
	    const mid = galleryState.maxScroll ? galleryState.maxScroll * 0.5 : 0;
	    const baseX = (galleryState.scroll - mid) * -26;
	    const bgX = baseX + clamp(-v * 140, -180, 180);
	    const bgY = clamp(-vAbs * 18, -28, 0);

	    moduleRoot.style.setProperty("--proj-bg-x", `${bgX.toFixed(1)}px`);
	    moduleRoot.style.setProperty("--proj-bg-y", `${bgY.toFixed(1)}px`);
	    moduleRoot.style.setProperty("--proj-bg-opacity", (0.62 + Math.min(vAbs * 0.18, 0.2)).toFixed(3));
	    moduleRoot.style.setProperty("--proj-glow-x", `${clamp(-v * 90, -120, 120).toFixed(1)}px`);
	    moduleRoot.style.setProperty("--proj-glow-opacity", (0.75 + Math.min(vAbs * 0.12, 0.18)).toFixed(3));
	  }

	  function applyRibbon() {
	    const delta = galleryState.tscroll - galleryState.scroll;
	    galleryState.v += (delta - (galleryState.v || 0)) * 0.24;
	    galleryState.scroll += delta * 0.12;
	    galleryState.scroll = clamp(galleryState.scroll, 0, galleryState.maxScroll);
	    applyProjectFx();
	    layoutRibbon();
	  }

  function tick() {
    if (view3d.classList.contains("show")) applyRibbon();
    galleryState.raf = requestAnimationFrame(tick);
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function bind3DInteractions() {
    if (bound3d) return;
    bound3d = true;

    const shouldIgnoreKey = (el) => {
      if (!el) return false;
      const tag = (el.tagName || "").toLowerCase();
      return tag === "input" || tag === "textarea" || tag === "select" || el.isContentEditable;
    };

    scene.addEventListener(
      "wheel",
      (e) => {
        if (!view3d.classList.contains("show")) return;
        if (modal.isOpen()) return;
        e.preventDefault();
        const delta = (e.deltaY + e.deltaX) * 0.003;
        galleryState.tscroll = clamp(galleryState.tscroll + delta, 0, galleryState.maxScroll);
      },
      { passive: false }
    );

    scene.addEventListener(
      "click",
      (e) => {
        if (!galleryState.justDragged) return;
        e.preventDefault();
        e.stopPropagation();
        galleryState.justDragged = false;
      },
      true
    );

    scene.addEventListener("pointerdown", (e) => {
      if (!view3d.classList.contains("show")) return;
      if (modal.isOpen()) return;
      galleryState.dragging = true;
      galleryState.justDragged = false;
      const frame = e.target.closest?.(".frame");
      galleryState.pressId = frame?.dataset?.id || null;
      galleryState.pressIndex = frame?.dataset?.index ? Number(frame.dataset.index) : -1;
      galleryState.startX = e.clientX;
      galleryState.startTscroll = galleryState.tscroll;
      scene.setPointerCapture(e.pointerId);
    });

    scene.addEventListener("pointermove", (e) => {
      if (!galleryState.dragging) return;
      const dx = e.clientX - galleryState.startX;
      if (Math.abs(dx) > 6) galleryState.justDragged = true;
      galleryState.tscroll = clamp(galleryState.startTscroll - dx * 0.004, 0, galleryState.maxScroll);
    });

    scene.addEventListener("pointerup", () => {
      galleryState.dragging = false;
      if (!galleryState.justDragged && galleryState.pressId) {
        const index = Number.isFinite(galleryState.pressIndex) ? galleryState.pressIndex : -1;
        if (index >= 0) galleryState.tscroll = clamp(index, 0, galleryState.maxScroll);
        openModal(galleryState.pressId);
      }
      galleryState.pressId = null;
      galleryState.pressIndex = -1;
      if (galleryState.justDragged) setTimeout(() => (galleryState.justDragged = false), 0);
    });

    scene.addEventListener("pointercancel", () => {
      galleryState.dragging = false;
      galleryState.pressId = null;
      galleryState.pressIndex = -1;
      if (galleryState.justDragged) setTimeout(() => (galleryState.justDragged = false), 0);
    });

    window.addEventListener(
      "keydown",
      (e) => {
        if (!view3d.classList.contains("show")) return;
        if (shouldIgnoreKey(e.target)) return;

        if (e.code === "ArrowLeft" || e.code === "ArrowUp") {
          e.preventDefault();
          galleryState.tscroll = clamp(Math.round(galleryState.tscroll - 1), 0, galleryState.maxScroll);
        }
        if (e.code === "ArrowRight" || e.code === "ArrowDown") {
          e.preventDefault();
          galleryState.tscroll = clamp(Math.round(galleryState.tscroll + 1), 0, galleryState.maxScroll);
        }
      },
      { passive: false }
    );
  }

  function init() {
    applyResponsiveDefault();
    renderFilters();
    renderMasonry();

    if (!isMobile()) {
      renderFrames3D();
      if (!galleryState.raf) tick();
      bind3DInteractions();
    }
  }

  window.addEventListener("resize", () => {
    applyResponsiveDefault();

    if (!isMobile()) {
      if (!world.querySelector(".frame")) {
        renderFrames3D();
        if (!galleryState.raf) tick();
        bind3DInteractions();
      }
    }
  });

  init();
}

function renderProjects(_data) {
  initPortfolioProjectsModule();
}

function renderSkills(data) {
  const groups = Array.isArray(data.skills) ? data.skills : [];
  const root = document.getElementById("skillsGrid");
  if (!root) return;

  root.classList.remove("grid", "cols-2", "skills-accordion");
  root.classList.add("skills-goo-grid");

  const tokenize = (items) =>
    (Array.isArray(items) ? items : [])
      .flatMap((it) =>
        String(it ?? "")
          .split(/[、，,]/g)
          .map((s) => s.trim())
          .filter(Boolean)
      )
      .filter(Boolean);

  const getGroupTokens = (names) => {
    const nameSet = new Set((Array.isArray(names) ? names : [names]).map((n) => String(n ?? "").trim()));
    const found = groups.find((g) => nameSet.has(String(g?.group ?? "").trim()));
    const tokens = tokenize(found?.items ?? []);
    return tokens.length ? tokens : [];
  };

  const menus = [
    { key: "growth", label: t("skills.growth"), accent: "var(--c-pink)", glow: "rgba(122, 92, 255, 0.65)", items: getGroupTokens(["增长", "Growth"]) },
    { key: "product", label: t("skills.product"), accent: "var(--c-cyan)", glow: "rgba(34, 197, 94, 0.55)", items: getGroupTokens(["产品", "Product"]) },
    { key: "data", label: t("skills.data"), accent: "var(--c-purple)", glow: "rgba(96, 165, 250, 0.55)", items: getGroupTokens(["数据", "Data"]) },
    { key: "tooling", label: t("skills.tooling"), accent: "var(--c-lime)", glow: "rgba(245, 158, 11, 0.5)", items: getGroupTokens(["前沿工具链", "工具链", "工具链路", "工具", "Tooling", "Toolchain", "Tool Chain"]) },
  ];

  const toPositions = (n) => {
    const r = 78;
    if (!n) return [];
    if (n === 1) return [{ x: 0, y: -r }];
    const start = -Math.PI / 2;
    const step = (Math.PI * 2) / n;
    return Array.from({ length: n }, (_, i) => {
      const a = start + step * i;
      return { x: Math.round(Math.cos(a) * r * 100) / 100, y: Math.round(Math.sin(a) * r * 100) / 100 };
    });
  };

  const buildMenu = (menu) => {
    const id = `skillsGoo_${menu.key}`;
    const items = (menu.items?.length ? menu.items : ["TODO"]) .slice(0, 8);
    const positions = toPositions(items.length);

    const input = el("input", { class: "skills-goo-open", type: "checkbox", id });
    const label = el(
      "label",
      {
        class: "skills-goo-open-button",
        for: id,
        tabindex: "0",
        role: "button",
        "aria-expanded": "false",
        "aria-label": `${menu.label} · ${t("skills.openHint")}`,
      },
      [
        el("span", { class: "skills-goo-title", text: menu.label }),
      ]
    );

    const bubbles = items.map((text, i) => {
      const p = positions[i] ?? { x: 0, y: -108 };
      const dur = 180 + i * 100;
      return el("button", {
        class: "skills-goo-item",
        type: "button",
        text,
        style: `--tx:${p.x}px;--ty:${p.y}px;--dur:${dur}ms;`,
        "aria-label": text,
        tabindex: "-1",
      });
    });

    return el(
      "nav",
      {
        class: "skills-goo-menu",
        style: `--skills-accent:${menu.accent};--skills-glow:${menu.glow ?? "rgba(122, 92, 255, 0.6)"};`,
        "aria-label": CURRENT_LANG === "en" ? `${menu.label} skills` : `${menu.label}技能`,
        dataset: { key: menu.key },
      },
      [input, label, ...bubbles]
    );
  };

  root.replaceChildren(
    el("div", { class: "skills-goo-card" }, [
      el("div", { class: "skills-goo-layout" }, menus.map(buildMenu)),
    ])
  );

  initSkillsGoo(root);
}

function initSkillsGoo(root) {
  if (!root) return;
  if (root.dataset.skillsGooInit === "true") return;
  root.dataset.skillsGooInit = "true";

  const toggles = () => [...root.querySelectorAll(".skills-goo-open")];

  const sync = (toggle) => {
    const menu = toggle.closest(".skills-goo-menu");
    const label = menu?.querySelector(".skills-goo-open-button");
    const open = !!toggle.checked;
    menu?.setAttribute("data-open", open ? "true" : "false");
    label?.setAttribute("aria-expanded", open ? "true" : "false");

    const items = menu ? [...menu.querySelectorAll(".skills-goo-item")] : [];
    for (const it of items) it.tabIndex = open ? 0 : -1;
  };

  for (const t of toggles()) sync(t);

  for (const t of toggles()) {
    t.addEventListener("change", () => {
      sync(t);
    });
  }

  for (const label of root.querySelectorAll(".skills-goo-open-button")) {
    label.addEventListener("keydown", (e) => {
      if (e.code !== "Enter" && e.code !== "Space") return;
      e.preventDefault();
      const id = label.getAttribute("for");
      const input = id ? document.getElementById(id) : null;
      if (!(input instanceof HTMLInputElement)) return;
      input.checked = !input.checked;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }

  root.addEventListener("pointerdown", (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.closest(".skills-goo-menu")) return;
    for (const t of toggles()) {
      t.checked = false;
      sync(t);
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    for (const t of toggles()) {
      t.checked = false;
      sync(t);
    }
  });
}

function renderBootcamp(_data) {
  const board = document.getElementById("bootcampBoard");
  if (!board) return;
  if (board.dataset.init === "true") return;
  board.dataset.init = "true";

  const PHOTO_URLS = Array.from({ length: 11 }, (_, i) => `./other-photos/${i + 1}.png`);
  const photos = PHOTO_URLS.map((src, i) => {
    const index = i + 1;
    return el(
      "div",
      {
        class: "bootcamp-photo",
        role: "button",
        tabindex: "0",
        "aria-label": t("bootcamp.photoAria", { n: index }),
        dataset: { index },
      },
      [
        el("div", { class: "bootcamp-photo-inner" }, [
          el("img", {
            class: "bootcamp-photo-img",
            src,
            alt: t("bootcamp.photoAlt", { n: index }),
            loading: "lazy",
            decoding: "async",
            draggable: "false",
          }),
          el("div", { class: "bootcamp-photo-caption", text: t("bootcamp.caption", { n: index }) }),
        ]),
      ]
    );
  });

  board.replaceChildren(...photos);
  initBootcampPile(board, photos);
}

function initBootcampPile(board, items) {
  if (!board || !items?.length) return;
  if (board.dataset.pileInit === "true") return;
  board.dataset.pileInit = "true";
  board.addEventListener("dragstart", (e) => e.preventDefault());

  let z = 20;
  let active = null;
  const state = new Map();

  const rand = (min, max) => min + Math.random() * (max - min);
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const nowMs = () => (typeof performance !== "undefined" && performance.now ? performance.now() : Date.now());

  const getBounds = (item) => {
    const margin = 22;
    const w = item.offsetWidth || 220;
    const h = item.offsetHeight || 260;
    const maxX = Math.max(0, board.clientWidth / 2 - w / 2 - margin);
    const maxY = Math.max(0, board.clientHeight / 2 - h / 2 - margin);
    return { maxX, maxY };
  };

  const applyTransform = (item, s) => {
    item.style.setProperty("--x", `${s.x}px`);
    item.style.setProperty("--y", `${s.y}px`);
    item.style.setProperty("--r", `${s.r}deg`);
    item.style.setProperty("--s", String(s.s));
  };

  const ensureState = (item) => {
    if (state.has(item)) return state.get(item);
    const s = { x: 0, y: 0, r: 0, s: 1, drag: null };
    state.set(item, s);
    return s;
  };

  const stopInertia = (item) => {
    const s = ensureState(item);
    if (s.inertia?.raf) cancelAnimationFrame(s.inertia.raf);
    s.inertia = null;
    item.removeAttribute("data-inertia");
  };

  const startInertia = (item, vx, vy) => {
    stopInertia(item);
    if (!Number.isFinite(vx) || !Number.isFinite(vy)) return;

    const s = ensureState(item);
    const MAX_V = 2.2; // px/ms (~2200px/s)
    let velX = clamp(vx, -MAX_V, MAX_V);
    let velY = clamp(vy, -MAX_V, MAX_V);

    const SPEED_EPS = 0.018; // px/ms
    const BASE_FRICTION = 0.92; // per 16.67ms
    let lastT = nowMs();

    item.dataset.inertia = "true";

    const step = () => {
      const t = nowMs();
      const dt = Math.min(48, Math.max(0, t - lastT));
      lastT = t;

      const friction = Math.pow(BASE_FRICTION, dt / 16.67);
      velX *= friction;
      velY *= friction;

      const b = getBounds(item);
      const nextX = s.x + velX * dt;
      const nextY = s.y + velY * dt;

      const clampedX = clamp(nextX, -b.maxX, b.maxX);
      const clampedY = clamp(nextY, -b.maxY, b.maxY);

      // Hit the wall → stop that axis.
      if (clampedX !== nextX) velX = 0;
      if (clampedY !== nextY) velY = 0;

      s.x = clampedX;
      s.y = clampedY;
      applyTransform(item, s);

      if (Math.abs(velX) + Math.abs(velY) < SPEED_EPS) {
        stopInertia(item);
        return;
      }

      s.inertia = { raf: requestAnimationFrame(step) };
    };

    s.inertia = { raf: requestAnimationFrame(step) };
  };

  const scatter = () => {
    items.forEach((item) => {
      stopInertia(item);
      const b = getBounds(item);
      const s = ensureState(item);
      s.x = rand(-b.maxX, b.maxX);
      s.y = rand(-b.maxY, b.maxY);
      s.r = rand(-16, 16);
      s.s = rand(0.98, 1.04);
      applyTransform(item, s);
      item.style.zIndex = String(++z);
      item.dataset.active = "false";
    });
    board.dataset.focus = "false";
    active = null;
  };

  const deactivate = () => {
    if (!active) return;
    stopInertia(active);
    const prev = active.dataset.prev ? JSON.parse(active.dataset.prev) : null;
    const s = ensureState(active);
    if (prev) {
      s.x = Number(prev.x) || 0;
      s.y = Number(prev.y) || 0;
      s.r = Number(prev.r) || 0;
      s.s = Number(prev.s) || 1;
      applyTransform(active, s);
    }
    active.dataset.active = "false";
    active.removeAttribute("data-prev");
    active = null;
    board.dataset.focus = "false";
  };

  const activate = (item) => {
    if (active === item) {
      deactivate();
      return;
    }
    deactivate();
    stopInertia(item);

    const s = ensureState(item);
    item.dataset.prev = JSON.stringify({ x: s.x, y: s.y, r: s.r, s: s.s });

    s.x = 0;
    s.y = 0;
    s.r = 0;
    s.s = 1.9;
    applyTransform(item, s);
    item.style.zIndex = String(++z);
    item.dataset.active = "true";
    active = item;
    board.dataset.focus = "true";
  };

  const normalizeAll = () => {
    items.forEach((item) => {
      const s = ensureState(item);
      if (item.dataset.active === "true") return;
      const b = getBounds(item);
      const nx = clamp(s.x, -b.maxX, b.maxX);
      const ny = clamp(s.y, -b.maxY, b.maxY);
      if (nx === s.x && ny === s.y) return;
      s.x = nx;
      s.y = ny;
      applyTransform(item, s);
    });
  };

  scatter();

  // Re-scatter once layout is stable (images might affect sizing).
  requestAnimationFrame(() => requestAnimationFrame(scatter));

  items.forEach((item) => {
    const s = ensureState(item);

    item.addEventListener("pointerdown", (e) => {
      if (!(e instanceof PointerEvent)) return;
      if (!e.isPrimary) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.preventDefault();
      stopInertia(item);
      item.setPointerCapture(e.pointerId);
      item.style.zIndex = String(++z);
      item.dataset.dragging = "true";
      s.drag = {
        id: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        baseX: s.x,
        baseY: s.y,
        moved: false,
        lastX: e.clientX,
        lastY: e.clientY,
        lastT: nowMs(),
        vx: 0,
        vy: 0,
      };
    });

    item.addEventListener("pointermove", (e) => {
      if (!(e instanceof PointerEvent)) return;
      if (!s.drag || s.drag.id !== e.pointerId) return;
      e.preventDefault();

      const dx = e.clientX - s.drag.startX;
      const dy = e.clientY - s.drag.startY;
      const threshold = e.pointerType === "mouse" ? 2 : 8;
      if (!s.drag.moved && Math.hypot(dx, dy) > threshold) s.drag.moved = true;

      const t = nowMs();
      const dt = t - (s.drag.lastT || t);
      if (dt > 0) {
        const instVx = (e.clientX - s.drag.lastX) / dt;
        const instVy = (e.clientY - s.drag.lastY) / dt;
        const alpha = 0.35;
        s.drag.vx = (1 - alpha) * (s.drag.vx || 0) + alpha * instVx;
        s.drag.vy = (1 - alpha) * (s.drag.vy || 0) + alpha * instVy;
      }
      s.drag.lastX = e.clientX;
      s.drag.lastY = e.clientY;
      s.drag.lastT = t;

      if (item.dataset.active === "true") return;

      const b = getBounds(item);
      s.x = clamp(s.drag.baseX + dx, -b.maxX, b.maxX);
      s.y = clamp(s.drag.baseY + dy, -b.maxY, b.maxY);
      applyTransform(item, s);
    });

    const endDrag = (e) => {
      if (!(e instanceof PointerEvent)) return;
      if (!s.drag || s.drag.id !== e.pointerId) return;
      e.preventDefault();
      const moved = s.drag.moved;
      const vx = s.drag.vx || 0;
      const vy = s.drag.vy || 0;
      s.drag = null;
      item.removeAttribute("data-dragging");
      if (!moved) activate(item);
      else if (item.dataset.active !== "true") startInertia(item, vx, vy);
    };

    item.addEventListener("pointerup", endDrag);
    item.addEventListener("pointercancel", endDrag);

    item.addEventListener("keydown", (e) => {
      if (e.code === "Enter" || e.code === "Space") {
        e.preventDefault();
        activate(item);
      }
    });
  });

  board.addEventListener("pointerdown", (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.closest(".bootcamp-photo")) return;
    deactivate();
  });

  window.addEventListener("resize", () => {
    window.clearTimeout(normalizeAll._t);
    normalizeAll._t = window.setTimeout(normalizeAll, 120);
  });
}

function initPhotoSwitch() {
  const container = document.getElementById("photoSwitchContainer");
  if (!container) return;
  if (container.dataset.init === "true") return;
  container.dataset.init = "true";

  const slides = [...container.querySelectorAll(".photo-switch-slide")];
  if (!slides.length) return;

  const setActive = (target) => {
    slides.forEach((slide) => {
      const on = slide === target;
      slide.classList.toggle("active", on);
      slide.setAttribute("aria-pressed", on ? "true" : "false");
    });
  };

  const initial = slides.find((s) => s.classList.contains("active")) ?? slides[0];
  setActive(initial);

  slides.forEach((slide) => {
    slide.addEventListener("click", () => setActive(slide));
    slide.addEventListener("keydown", (e) => {
      if (e.code === "Enter" || e.code === "Space") {
        e.preventDefault();
        setActive(slide);
      }
    });
  });
}

function renderEducation(data) {
  const education = Array.isArray(data.education) ? data.education : [];
  const certs = Array.isArray(data.certifications) ? data.certifications : [];
  const root = document.getElementById("educationList");

  const blocks = [];

  if (education.length) {
    blocks.push(
      ...education.map((e) => {
        const meta = [e.school, e.degree, e.major, formatRange(e.start, e.end)]
          .filter(Boolean)
          .join(CURRENT_LANG === "en" ? " | " : "｜");
        return el("div", { class: "card" }, [
          el("p", { class: "card-title", text: e.school ?? (CURRENT_LANG === "en" ? "TODO: School" : "TODO：学校") }),
          el("p", { class: "card-meta", text: meta }),
        ]);
      })
    );
  } else {
    blocks.push(
      el("div", { class: "card" }, [
        el("p", { class: "card-title", text: CURRENT_LANG === "en" ? "TODO: Add education" : "TODO：补充教育经历" }),
        el("p", { class: "card-meta", text: CURRENT_LANG === "en" ? "School / Major / Degree / Dates" : "学校 / 专业 / 学位 / 时间" }),
      ])
    );
  }

  blocks.push(
    el("div", { class: "card" }, [
      el("p", { class: "card-title", text: t("education.certifications") }),
      certs.length
        ? el("ul", { class: "list" }, certs.map((c) => el("li", { text: c })))
        : el("p", { class: "card-meta", text: CURRENT_LANG === "en" ? "TODO: Add certifications (remove this card if none)" : "TODO：补充证书（如无可删除此项）" }),
    ])
  );

  root.replaceChildren(...blocks);
}

function renderContact(data) {
  const basics = data.basics ?? {};
  const links = Array.isArray(basics.links) ? basics.links : [];
  const root = document.getElementById("contactList");

  const icon = (name) => {
    // inline SVG; keep minimal for performance
    const common = 'viewBox="0 0 24 24" aria-hidden="true" focusable="false"';
    if (name === "email")
      return `<svg ${common}><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.2-8 5.3-8-5.3V6l8 5.3L20 6v2.2Z"/></svg>`;
    if (name === "phone")
      return `<svg ${common}><path fill="currentColor" d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.5 2.5.8 3.9.8.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.3 21 3 13.7 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.4.3 2.7.8 3.9.1.4.1.8-.2 1.1l-2.2 2.2Z"/></svg>`;
    if (name === "wechat")
      return `<svg ${common}><path fill="currentColor" d="M9.5 4C5.9 4 3 6.6 3 9.8c0 1.8.9 3.5 2.4 4.6L5 17l2.6-1.4c.6.1 1.2.2 1.9.2.1 0 .2 0 .3 0-.2-.6-.3-1.2-.3-1.8 0-3 2.8-5.5 6.3-5.8C14.9 5.7 12.4 4 9.5 4Zm9.7 7.2c-2.8 0-5.1 2-5.1 4.5 0 2.5 2.3 4.5 5.1 4.5.5 0 1.1-.1 1.6-.2L23 21l-.5-2.2c.9-.8 1.5-1.9 1.5-3.1 0-2.5-2.3-4.5-5.1-4.5Z"/></svg>`;
    if (name === "github")
      return `<svg ${common}><path fill="currentColor" d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.3-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.7.9.7 1.8V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/></svg>`;
    if (name === "linkedin")
      return `<svg ${common}><path fill="currentColor" d="M6.5 6.8A2 2 0 1 1 6.5 3a2 2 0 0 1 0 3.8ZM3.8 20.5h5.4V9.1H3.8v11.4ZM11.2 9.1h5.1v1.6h.1c.7-1.2 2.1-2 3.9-2 4.2 0 5 2.5 5 5.8v6h-5.4v-5.3c0-1.3 0-3-2.1-3s-2.4 1.3-2.4 2.9v5.4h-5.4V9.1Z"/></svg>`;
    if (name === "link")
      return `<svg ${common}><path fill="currentColor" d="M10.6 13.4a1 1 0 0 1 0-1.4l2.8-2.8a3 3 0 1 1 4.2 4.2l-1.5 1.5a1 1 0 1 1-1.4-1.4l1.5-1.5a1 1 0 1 0-1.4-1.4l-2.8 2.8a1 1 0 0 1-1.4 0Zm2.8 1.2a1 1 0 0 1 0 1.4l-2.8 2.8a3 3 0 1 1-4.2-4.2l1.5-1.5a1 1 0 1 1 1.4 1.4L8 15.9a1 1 0 1 0 1.4 1.4l2.8-2.8a1 1 0 0 1 1.4 0Z"/></svg>`;
    return `<svg ${common}><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.9 9h-3a15.7 15.7 0 0 0-1.1-5.1A8 8 0 0 1 19.9 11ZM12 4c1.1 0 2.6 2 3.4 7H8.6C9.4 6 10.9 4 12 4ZM4.1 13h3a15.7 15.7 0 0 0 1.1 5.1A8 8 0 0 1 4.1 13Zm3-2h-3a8 8 0 0 1 4.1-5.1A15.7 15.7 0 0 0 7.1 11Zm1.5 2h6.8c-.8 5-2.3 7-3.4 7s-2.6-2-3.4-7Zm7.2 5.1A15.7 15.7 0 0 0 16.9 13h3a8 8 0 0 1-4.1 5.1Z"/></svg>`;
  };

  const isMeaningful = (v) => v && String(v).trim() && !String(v).trim().startsWith("TODO");
  const actions = [];
  const todos = [];

  if (isMeaningful(basics.email)) {
    actions.push(
      el("button", {
        class: "icon-btn fx-btn",
        type: "button",
        "aria-label": t("contact.copyEmail"),
        title: t("contact.copyEmail"),
        onclick: async () => {
          const ok = await copyToClipboard(String(basics.email));
          if (!ok) window.prompt(t("contact.promptCopy"), String(basics.email));
          toast(ok ? t("contact.copiedEmail") : t("contact.copyFailed"));
        },
      })
    );
    actions[actions.length - 1].innerHTML = icon("email");
  } else {
    todos.push(CURRENT_LANG === "en" ? "Email" : "邮箱");
  }

  if (isMeaningful(basics.wechat)) {
    actions.push(
      el("button", {
        class: "icon-btn fx-btn",
        type: "button",
        "aria-label": t("contact.copyWechat"),
        title: t("contact.copyWechat"),
        onclick: async () => {
          const ok = await copyToClipboard(String(basics.wechat));
          if (!ok) window.prompt(t("contact.promptCopy"), String(basics.wechat));
          toast(ok ? t("contact.copiedWechat") : t("contact.copyFailed"));
        },
      })
    );
    actions[actions.length - 1].innerHTML = icon("wechat");
  } else if (basics.wechat) {
    // present but TODO
    todos.push(CURRENT_LANG === "en" ? "WeChat" : "微信号");
  }

  if (isMeaningful(basics.phone)) {
    actions.push(
      el("button", {
        class: "icon-btn fx-btn",
        type: "button",
        "aria-label": t("contact.copyPhone"),
        title: t("contact.copyPhone"),
        onclick: async () => {
          const ok = await copyToClipboard(String(basics.phone));
          if (!ok) window.prompt(t("contact.promptCopy"), String(basics.phone));
          toast(ok ? t("contact.copiedPhone") : t("contact.copyFailed"));
        },
      })
    );
    actions[actions.length - 1].innerHTML = icon("phone");
  }

  for (const l of links) {
    const label = (l?.label ?? (CURRENT_LANG === "en" ? "Link" : "链接")).toString().trim();
    const url = l?.url;
    if (!isMeaningful(url)) continue;
    const key = label.toLowerCase();
    const kind = key.includes("github") ? "github" : key.includes("linkedin") ? "linkedin" : "link";
    const a = el("a", {
      class: "icon-btn fx-btn",
      href: String(url),
      target: "_blank",
      rel: "noreferrer",
      "aria-label": t("contact.openLink", { label }),
      title: t("contact.openLink", { label }),
    });
    a.innerHTML = icon(kind);
    actions.push(a);
  }

  root.replaceChildren(
    el("div", { class: "card contact-card" }, [
      el("div", { class: "contact-actions", role: "list" }, actions.map((n) => el("div", { class: "contact-action", role: "listitem" }, n))),
      todos.length ? el("p", { class: "card-meta", text: `${CURRENT_LANG === "en" ? "TODO: Add " : "TODO：补充"}${todos.join(" / ")}` }) : null,
    ])
  );
}

function renderDownload(data) {
  const dl = data.download ?? {};
  const root = document.getElementById("downloadCard");

  const pdfPath = dl.pdfPath ?? null;
  if (!pdfPath || String(pdfPath).includes("TODO")) {
    root.replaceChildren(
      el("div", { class: "download-row" }, [
        el("div", {}, [
          el("p", { class: "card-title", text: t("download.missingTitle") }),
          el("p", { class: "card-meta", text: t("download.missingMeta") }),
        ]),
      ])
    );
    return;
  }

  const label = dl.label ?? (CURRENT_LANG === "en" ? "Download resume PDF" : "下载 PDF 简历");
  root.replaceChildren(
    el("a", { class: "download-row", href: pdfPath, download: "", "data-download-link": "true" }, [
      el("div", {}, [
        el("p", { class: "card-title", text: label }),
        el("p", { class: "card-meta", text: t("download.clickHint") }),
      ]),
      el("span", { class: "download-chip", "aria-hidden": "true", text: t("download.chip") }),
    ])
  );
}

function renderMeta(data) {
  const meta = data.meta ?? {};
  const parts = [];
  if (meta.lastUpdated) parts.push(t("footer.lastUpdated", { date: meta.lastUpdated }));
  parts.push(t("footer.tagline"));
  setText("footerMeta", parts.join(" · "));
}

function initActiveNav() {
  const nav = document.querySelector(".nav");
  if (!nav || !("IntersectionObserver" in window)) return;

  const linkById = new Map();
  for (const a of nav.querySelectorAll("a[href^=\"#\"]")) {
    const id = a.getAttribute("href")?.slice(1);
    if (id) linkById.set(id, a);
  }

  const setActive = (id) => {
    for (const [sid, a] of linkById.entries()) {
      if (sid === id) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    }
  };

  const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
  const obs = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    },
    { root: null, threshold: [0.2, 0.35, 0.5], rootMargin: "-20% 0px -70% 0px" }
  );
  for (const s of sections) obs.observe(s);
}

async function main() {
  let data = null;
  if (typeof window !== "undefined" && window.__RESUME_DATA__ && typeof window.__RESUME_DATA__ === "object") {
    data = window.__RESUME_DATA__;
  } else {
    const dataUrl = DATA_URL_BY_LANG[CURRENT_LANG] ?? DATA_URL_BY_LANG.zh;
    const res = await fetch(dataUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${dataUrl}: ${res.status}`);
    data = await res.json();
  }

  const basics = data.basics ?? {};
  const fallbackTitle = CURRENT_LANG === "en" ? "Resume" : "简历";
  document.title = `${basics.name ?? fallbackTitle}｜${basics.headline ?? fallbackTitle}`;

  renderHero(data);
  renderExperience(data);
  renderProjects(data);
  renderSkills(data);
  renderBootcamp(data);
  renderEducation(data);
  renderContact(data);
  renderDownload(data);
  renderMeta(data);
  initActiveNav();
  initPhotoSwitch();
  applyDownloadLinks(data.download?.pdfPath ?? null);
  initReveal();
}

main().catch((err) => {
  console.error(err);
  setText("heroTitle", t("common.loadingFailedTitle"));
  setText("heroSubtitle", t("common.loadingFailedSubtitle"));
});
