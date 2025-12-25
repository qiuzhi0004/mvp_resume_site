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
    root.replaceChildren(
      el("div", { class: "filters" }, [
        el("span", { class: "filters-label", text: "标签筛选" }),
        el("span", { class: "filters-hint", text: "TODO：在 data/resume.json 的 projects[].tags 添加标签后启用" }),
      ])
    );
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

  const rows = [];

  if (basics.email) {
    rows.push({ label: "邮箱", value: basics.email, href: `mailto:${basics.email}`, copy: basics.email });
  } else {
    rows.push({ label: "邮箱", value: "TODO：邮箱", href: null, copy: null });
  }

  if (basics.wechat) {
    const v = String(basics.wechat);
    const isTodo = v.startsWith("TODO");
    rows.push({ label: "微信", value: v, href: null, copy: isTodo ? null : v });
  }

  if (basics.phone) {
    rows.push({ label: "电话", value: basics.phone, href: `tel:${basics.phone}`, copy: basics.phone });
  } else {
    rows.push({ label: "电话", value: "TODO：电话（可选）", href: null, copy: null });
  }

  for (const l of links) {
    rows.push({ label: l.label ?? "链接", value: l.url ?? "TODO：链接", href: l.url ?? null, copy: l.url ?? null });
  }

  const kvs = el("div", { class: "kvs" });
  for (const r of rows) {
    const valueNode = r.href ? makeLink(r.href, r.value) : el("span", { text: r.value });
    const copyBtn =
      r.copy && r.copy.startsWith("TODO") !== true
        ? el("button", {
            class: "btn",
            type: "button",
            text: "复制",
            onclick: async () => {
              const ok = await copyToClipboard(r.copy);
              if (!ok) window.prompt("复制以下内容：", r.copy);
              toast(ok ? "已复制" : "复制失败（已打开手动复制）");
            },
          })
        : null;

    kvs.append(
      el("div", { class: "kv" }, [
        el("span", { class: "k", text: r.label }),
        el("span", { class: "v" }, [valueNode, copyBtn ? el("span", { style: "margin-left: 10px;" }, copyBtn) : null]),
      ])
    );
  }

  root.replaceChildren(el("div", { class: "card" }, kvs));
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
