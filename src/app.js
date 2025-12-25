const DATA_URL = "./data/resume.json";
const SECTION_IDS = ["hero", "experience", "projects", "skills", "education", "contact", "download"];

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
  if (start && !end) return `${start} – 至今`;
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

  const title = `${basics.name ?? "TODO：姓名"}｜${basics.headline ?? "TODO：一句话定位"}`;
  setText("heroTitle", title);

  const subtitleParts = [];
  if (basics.location) subtitleParts.push(basics.location);
  if (basics.email) subtitleParts.push(basics.email);
  if (basics.phone) subtitleParts.push(basics.phone);
  setText("heroSubtitle", subtitleParts.length ? subtitleParts.join("｜") : "TODO：补充基本信息（地点/邮箱/电话）");

  const list = document.getElementById("heroHighlights");
  list.replaceChildren(
    ...highlights.slice(0, 5).map((h) => el("li", { text: h }))
  );

  const cta = document.getElementById("heroCta");
  const contactBtn = el("a", { class: "btn primary", href: "#contact", text: "联系我" });
  const downloadBtn = el("a", { class: "btn", href: "#download", "data-download-link": "true", text: "下载简历" });
  cta.replaceChildren(contactBtn, downloadBtn);

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
      a.setAttribute("aria-label", "下载简历 PDF");
    } else {
      a.setAttribute("href", "#download");
      a.removeAttribute("download");
      a.removeAttribute("aria-label");
    }
  }
}

function renderExperience(data) {
  const items = Array.isArray(data.experience) ? data.experience : [];
  const root = document.getElementById("experienceList");

  if (!items.length) {
    root.replaceChildren(
      el("div", { class: "card" }, [
        el("p", { class: "card-title", text: "TODO：补充经历" }),
        el("p", { class: "card-meta", text: "公司 / 岗位 / 时间 / 关键成果" }),
      ])
    );
    return;
  }

  root.replaceChildren(
    ...items.map((it) => {
      const meta = [it.org, it.role, formatRange(it.start, it.end), it.location].filter(Boolean).join("｜");
      const summary = Array.isArray(it.summary) ? it.summary : [];
      const achievements = Array.isArray(it.achievements) ? it.achievements : [];
      return el("article", { class: "card" }, [
        el("h3", { class: "card-title", text: it.title ?? `${it.org ?? "TODO：公司"}｜${it.role ?? "TODO：岗位"}` }),
        el("p", { class: "card-meta", text: meta }),
        summary.length ? el("ul", { class: "list" }, summary.map((s) => el("li", { text: s }))) : null,
        achievements.length
          ? el("div", {}, [
              el("p", { class: "card-meta", text: "关键成果" }),
              el("ul", { class: "list" }, achievements.map((a) => el("li", { text: a }))),
            ])
          : null,
      ]);
    })
  );
}

function normalizeTag(tag) {
  if (!tag) return "";
  const t = String(tag).trim();
  if (!t) return "";
  if (/^todo/i.test(t) || t.startsWith("TODO")) return "";
  return t;
}

function collectTags(projects) {
  const tagSet = new Set();
  for (const p of projects) {
    const tags = Array.isArray(p.tags) ? p.tags : [];
    for (const t of tags.map(normalizeTag).filter(Boolean)) tagSet.add(t);
  }
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b, "zh-CN"));
}

function renderProjectControls({ tags, activeTag, onChange }) {
  const root = document.getElementById("projectsControls");
  if (!root) return;

  if (!tags.length) {
    root.replaceChildren();
    return;
  }

  const select = el(
    "select",
    {
      class: "select",
      "aria-label": "按项目标签筛选",
      onchange: (e) => onChange(e.target.value),
    },
    [
      el("option", { value: "", text: "全部项目" }),
      ...tags.map((t) => el("option", { value: t, text: t, selected: t === activeTag ? "selected" : null })),
    ]
  );

  root.replaceChildren(
    el("div", { class: "filters" }, [
      el("span", { class: "filters-label", text: "标签筛选" }),
      select,
      activeTag ? el("button", { class: "btn", type: "button", text: "清除", onclick: () => onChange("") }) : null,
    ])
  );
}

function renderProjects(data) {
  const items = Array.isArray(data.projects) ? data.projects : [];
  const root = document.getElementById("projectsGrid");
  root.classList.add("cols-2");

  const tags = collectTags(items);
  const state = { activeTag: "" };
  const render = () => {
    const filtered = state.activeTag
      ? items.filter((p) => (Array.isArray(p.tags) ? p.tags : []).map(normalizeTag).includes(state.activeTag))
      : items;

    renderProjectControls({
      tags,
      activeTag: state.activeTag,
      onChange: (t) => {
        state.activeTag = t;
        render();
      },
    });

    if (!filtered.length) {
      root.replaceChildren(
        el("div", { class: "card" }, [
          el("p", { class: "card-title", text: "没有匹配的项目" }),
          el("p", { class: "card-meta", text: "尝试清除筛选条件。" }),
        ])
      );
      return;
    }

    root.replaceChildren(
      ...filtered.map((p) => {
        const evidence = Array.isArray(p.evidence) ? p.evidence : [];
        const actions = Array.isArray(p.actions) ? p.actions : [];
        const screenshots = Array.isArray(p.screenshots) ? p.screenshots : [];
        const tags = (Array.isArray(p.tags) ? p.tags : []).map(normalizeTag).filter(Boolean);

        const links =
          evidence.length || screenshots.length
            ? el("div", { class: "pill-row" }, [
                ...evidence.map((l) => el("span", { class: "pill" }, makeLink(l.url, l.label))),
                ...screenshots.map((s) =>
                  el("span", { class: "pill" }, makeLink(s.url, s.label ?? "截图"))
                ),
              ])
            : el("p", { class: "card-meta", text: "证据：TODO（补充链接/截图）" });

        const tagRow = tags.length
          ? el("div", { class: "pill-row" }, tags.map((t) => el("span", { class: "pill", text: t })))
          : null;

        // <details>/<summary> is keyboard-accessible and degrades well.
        const summary = el("summary", { class: "project-summary" }, [
          el("div", { class: "project-summary-top" }, [
            el("h3", { class: "card-title", text: p.name ?? "TODO：项目名称" }),
            el("span", { class: "project-chevron", "aria-hidden": "true", text: "" }),
          ]),
          p.result
            ? el("p", { class: "card-meta", text: `结果：${p.result}` })
            : el("p", { class: "card-meta", text: "结果：TODO" }),
          tagRow,
        ]);

        return el("details", { class: "card project", open: null }, [
          summary,
          el("div", { class: "project-body" }, [
            p.context
              ? el("p", { class: "card-meta", text: `背景：${p.context}` })
              : el("p", { class: "card-meta", text: "背景：TODO" }),
            actions.length
              ? el("ul", { class: "list" }, actions.map((a) => el("li", { text: a })))
              : el("ul", { class: "list" }, [el("li", { text: "动作：TODO" })]),
            links,
            p.reflection ? el("p", { class: "card-meta", text: `复盘：${p.reflection}` }) : null,
          ]),
        ]);
      })
    );
  };

  if (!items.length) {
    root.replaceChildren(
      el("div", { class: "card" }, [
        el("p", { class: "card-title", text: "TODO：补充项目/作品" }),
        el("p", { class: "card-meta", text: "建议包含：链接 / 截图 / 成果 / 复盘" }),
      ])
    );
    return;
  }

  render();
}

function renderSkills(data) {
  const groups = Array.isArray(data.skills) ? data.skills : [];
  const root = document.getElementById("skillsGrid");
  root.classList.add("cols-2");

  if (!groups.length) {
    root.replaceChildren(
      el("div", { class: "card" }, [
        el("p", { class: "card-title", text: "TODO：补充技能分组" }),
        el("p", { class: "card-meta", text: "例如：产品能力 / 数据与增长 / 工具与技术 / 沟通与影响力" }),
      ])
    );
    return;
  }

  root.replaceChildren(
    ...groups.map((g) => {
      const items = Array.isArray(g.items) ? g.items : [];
      return el("section", { class: "card" }, [
        el("h3", { class: "card-title", text: g.group ?? "TODO：分组名" }),
        items.length ? el("ul", { class: "list" }, items.map((it) => el("li", { text: it }))) : el("p", { class: "card-meta", text: "TODO：补充条目" }),
      ]);
    })
  );
}

function renderEducation(data) {
  const education = Array.isArray(data.education) ? data.education : [];
  const certs = Array.isArray(data.certifications) ? data.certifications : [];
  const root = document.getElementById("educationList");

  const blocks = [];

  if (education.length) {
    blocks.push(
      ...education.map((e) => {
        const meta = [e.school, e.degree, e.major, formatRange(e.start, e.end)].filter(Boolean).join("｜");
        return el("div", { class: "card" }, [
          el("p", { class: "card-title", text: e.school ?? "TODO：学校" }),
          el("p", { class: "card-meta", text: meta }),
        ]);
      })
    );
  } else {
    blocks.push(
      el("div", { class: "card" }, [
        el("p", { class: "card-title", text: "TODO：补充教育经历" }),
        el("p", { class: "card-meta", text: "学校 / 专业 / 学位 / 时间" }),
      ])
    );
  }

  blocks.push(
    el("div", { class: "card" }, [
      el("p", { class: "card-title", text: "证书" }),
      certs.length ? el("ul", { class: "list" }, certs.map((c) => el("li", { text: c }))) : el("p", { class: "card-meta", text: "TODO：补充证书（如无可删除此项）" }),
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
        class: "icon-btn",
        type: "button",
        "aria-label": "复制邮箱",
        title: "复制邮箱",
        onclick: async () => {
          const ok = await copyToClipboard(String(basics.email));
          if (!ok) window.prompt("复制以下内容：", String(basics.email));
          toast(ok ? "已复制邮箱" : "复制失败（已打开手动复制）");
        },
      })
    );
    actions[actions.length - 1].innerHTML = icon("email");
  } else {
    todos.push("邮箱");
  }

  if (isMeaningful(basics.wechat)) {
    actions.push(
      el("button", {
        class: "icon-btn",
        type: "button",
        "aria-label": "复制微信号",
        title: "复制微信号",
        onclick: async () => {
          const ok = await copyToClipboard(String(basics.wechat));
          if (!ok) window.prompt("复制以下内容：", String(basics.wechat));
          toast(ok ? "已复制微信号" : "复制失败（已打开手动复制）");
        },
      })
    );
    actions[actions.length - 1].innerHTML = icon("wechat");
  } else if (basics.wechat) {
    // present but TODO
    todos.push("微信号");
  }

  if (isMeaningful(basics.phone)) {
    actions.push(
      el("button", {
        class: "icon-btn",
        type: "button",
        "aria-label": "复制电话",
        title: "复制电话",
        onclick: async () => {
          const ok = await copyToClipboard(String(basics.phone));
          if (!ok) window.prompt("复制以下内容：", String(basics.phone));
          toast(ok ? "已复制电话" : "复制失败（已打开手动复制）");
        },
      })
    );
    actions[actions.length - 1].innerHTML = icon("phone");
  }

  for (const l of links) {
    const label = (l?.label ?? "链接").toString().trim();
    const url = l?.url;
    if (!isMeaningful(url)) continue;
    const key = label.toLowerCase();
    const kind = key.includes("github") ? "github" : key.includes("linkedin") ? "linkedin" : "link";
    const a = el("a", {
      class: "icon-btn",
      href: String(url),
      target: "_blank",
      rel: "noreferrer",
      "aria-label": `打开${label}`,
      title: `打开${label}`,
    });
    a.innerHTML = icon(kind);
    actions.push(a);
  }

  root.replaceChildren(
    el("div", { class: "card contact-card" }, [
      el("div", { class: "contact-actions", role: "list" }, actions.map((n) => el("div", { class: "contact-action", role: "listitem" }, n))),
      todos.length ? el("p", { class: "card-meta", text: `TODO：补充${todos.join(" / ")}` }) : null,
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
          el("p", { class: "card-title", text: "下载 PDF 简历（待补充）" }),
          el("p", { class: "card-meta", text: "TODO：把 resume.pdf 放到站点目录，并在 data/resume.json 里更新 download.pdfPath。" }),
        ]),
      ])
    );
    return;
  }

  const label = dl.label ?? "下载 PDF 简历";
  root.replaceChildren(
    el("a", { class: "download-row", href: pdfPath, download: "", "data-download-link": "true" }, [
      el("div", {}, [
        el("p", { class: "card-title", text: label }),
        el("p", { class: "card-meta", text: "点击即可下载（也可用页面顶部“下载”）。" }),
      ]),
      el("span", { class: "download-chip", "aria-hidden": "true", text: "下载" }),
    ])
  );
}

function renderMeta(data) {
  const meta = data.meta ?? {};
  const parts = [];
  if (meta.lastUpdated) parts.push(`Last updated: ${meta.lastUpdated}`);
  parts.push("结构优先的简历网站（MVP）");
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
    const res = await fetch(DATA_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${DATA_URL}: ${res.status}`);
    data = await res.json();
  }

  const basics = data.basics ?? {};
  document.title = `${basics.name ?? "简历"}｜${basics.headline ?? "Resume"}`;

  renderHero(data);
  renderExperience(data);
  renderProjects(data);
  renderSkills(data);
  renderEducation(data);
  renderContact(data);
  renderDownload(data);
  renderMeta(data);
  initActiveNav();
  applyDownloadLinks(data.download?.pdfPath ?? null);
}

main().catch((err) => {
  console.error(err);
  setText("heroTitle", "加载失败：请用本地服务器预览");
  setText("heroSubtitle", "例如在该目录运行：python3 -m http.server 5173");
});
