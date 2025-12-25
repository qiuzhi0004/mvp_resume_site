import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Minimal PDF generator with CJK support via built-in CID font (no embedding).
// Uses STSong-Light + UniGB-UCS2-H which is commonly supported by PDF viewers.

const ROOT = resolve(import.meta.dirname, "..");
const DATA_PATH = resolve(ROOT, "data", "resume.json");
const OUT_PATH = resolve(ROOT, "resume.pdf");

function isTodo(value) {
  if (value === null || value === undefined) return false;
  return String(value).trim().startsWith("TODO");
}

function safeText(value) {
  if (value === null || value === undefined) return "";
  const s = String(value).trim();
  if (!s || isTodo(s)) return "";
  return s;
}

function ucs2Hex(str) {
  // UTF-16BE with BOM (FEFF) as hex string for PDF hex literal.
  const buf = Buffer.from(str, "utf16le"); // LE
  // swap to BE
  for (let i = 0; i < buf.length; i += 2) {
    const a = buf[i];
    buf[i] = buf[i + 1];
    buf[i + 1] = a;
  }
  return Buffer.concat([Buffer.from([0xfe, 0xff]), buf]).toString("hex").toUpperCase();
}

function wrapText(text, maxChars) {
  const t = String(text).replace(/\s+/g, " ").trim();
  if (!t) return [];

  const lines = [];
  let cur = "";

  for (const ch of t) {
    if (cur.length >= maxChars) {
      lines.push(cur);
      cur = ch;
      continue;
    }
    cur += ch;
  }
  if (cur) lines.push(cur);
  return lines;
}

function formatRange(start, end) {
  const s = safeText(start);
  const e = safeText(end);
  if (s && e) return `${s} – ${e}`;
  if (s && !e) return `${s} – 至今`;
  if (!s && e) return e;
  return "";
}

function buildLines(data) {
  const lines = [];

  const basics = data.basics ?? {};
  const name = safeText(basics.name) || "（未填写姓名）";
  const headline = safeText(basics.headline);
  const location = safeText(basics.location);
  const email = safeText(basics.email);
  const phone = safeText(basics.phone);

  lines.push({ kind: "h1", text: headline ? `${name}｜${headline}` : name });
  const meta = [location, email, phone].filter(Boolean).join("｜");
  if (meta) lines.push({ kind: "meta", text: meta });

  const links = Array.isArray(basics.links) ? basics.links : [];
  const linkLines = links
    .map((l) => {
      const label = safeText(l?.label);
      const url = safeText(l?.url);
      if (!url) return "";
      return label ? `${label}: ${url}` : url;
    })
    .filter(Boolean);
  if (linkLines.length) {
    lines.push({ kind: "spacer" });
    lines.push({ kind: "h2", text: "链接" });
    for (const l of linkLines) lines.push({ kind: "bullet", text: l });
  }

  const highlights = Array.isArray(data.highlights) ? data.highlights : [];
  if (highlights.length) {
    lines.push({ kind: "spacer" });
    lines.push({ kind: "h2", text: "核心亮点" });
    for (const h of highlights) {
      const t = safeText(h);
      if (t) lines.push({ kind: "bullet", text: t });
    }
  }

  const experience = Array.isArray(data.experience) ? data.experience : [];
  if (experience.length) {
    lines.push({ kind: "spacer" });
    lines.push({ kind: "h2", text: "经历" });
    for (const it of experience) {
      const title = safeText(it?.title) || [safeText(it?.org), safeText(it?.role)].filter(Boolean).join("｜");
      const meta2 = [formatRange(it?.start, it?.end), safeText(it?.location)].filter(Boolean).join("｜");
      if (title) lines.push({ kind: "h3", text: title });
      if (meta2) lines.push({ kind: "meta", text: meta2 });
      const summary = Array.isArray(it?.summary) ? it.summary : [];
      const achievements = Array.isArray(it?.achievements) ? it.achievements : [];
      for (const b of [...summary, ...achievements]) {
        const t = safeText(b);
        if (t) lines.push({ kind: "bullet", text: t });
      }
      lines.push({ kind: "spacer-sm" });
    }
  }

  const projects = Array.isArray(data.projects) ? data.projects : [];
  if (projects.length) {
    lines.push({ kind: "spacer" });
    lines.push({ kind: "h2", text: "项目" });
    for (const p of projects) {
      const name = safeText(p?.name);
      if (name) lines.push({ kind: "h3", text: name });
      const context = safeText(p?.context);
      if (context) lines.push({ kind: "meta", text: `背景：${context}` });
      const actions = Array.isArray(p?.actions) ? p.actions : [];
      for (const a of actions) {
        const t = safeText(a);
        if (t) lines.push({ kind: "bullet", text: t });
      }
      const result = safeText(p?.result);
      if (result) lines.push({ kind: "meta", text: `结果：${result}` });
      const evidence = Array.isArray(p?.evidence) ? p.evidence : [];
      const ev = evidence
        .map((e) => {
          const label = safeText(e?.label);
          const url = safeText(e?.url);
          if (!url) return "";
          return label ? `${label}: ${url}` : url;
        })
        .filter(Boolean);
      if (ev.length) {
        lines.push({ kind: "meta", text: "证据：" });
        for (const l of ev) lines.push({ kind: "bullet", text: l });
      }
      const reflection = safeText(p?.reflection);
      if (reflection) lines.push({ kind: "meta", text: `复盘：${reflection}` });
      lines.push({ kind: "spacer-sm" });
    }
  }

  const skills = Array.isArray(data.skills) ? data.skills : [];
  if (skills.length) {
    lines.push({ kind: "spacer" });
    lines.push({ kind: "h2", text: "技能" });
    for (const g of skills) {
      const group = safeText(g?.group);
      if (group) lines.push({ kind: "h3", text: group });
      const items = Array.isArray(g?.items) ? g.items : [];
      for (const s of items) {
        const t = safeText(s);
        if (t) lines.push({ kind: "bullet", text: t });
      }
      lines.push({ kind: "spacer-sm" });
    }
  }

  const education = Array.isArray(data.education) ? data.education : [];
  const certs = Array.isArray(data.certifications) ? data.certifications : [];
  if (education.length || certs.length) {
    lines.push({ kind: "spacer" });
    lines.push({ kind: "h2", text: "教育 / 证书" });
    for (const e of education) {
      const school = safeText(e?.school);
      const degree = safeText(e?.degree);
      const major = safeText(e?.major);
      const range = formatRange(e?.start, e?.end);
      const meta = [degree, major, range].filter(Boolean).join("｜");
      if (school) lines.push({ kind: "h3", text: school });
      if (meta) lines.push({ kind: "meta", text: meta });
      lines.push({ kind: "spacer-sm" });
    }
    if (certs.length) {
      lines.push({ kind: "h3", text: "证书" });
      for (const c of certs) {
        const t = safeText(c);
        if (t) lines.push({ kind: "bullet", text: t });
      }
    }
  }

  return lines;
}

function generatePdf(lines) {
  const PAGE_W = 595.28; // A4
  const PAGE_H = 841.89;
  const M = 42; // margin
  const maxWidth = PAGE_W - M * 2;

  const styles = {
    h1: { size: 18, leading: 24 },
    h2: { size: 14, leading: 20 },
    h3: { size: 12, leading: 18 },
    meta: { size: 10, leading: 14 },
    body: { size: 11, leading: 16 },
  };

  function maxCharsFor(fontSize) {
    // Approx for CJK: ~1em per char; keep conservative for mixed text.
    return Math.max(16, Math.floor(maxWidth / (fontSize * 0.92)));
  }

  const pages = [];
  let y = PAGE_H - M;
  let cur = [];

  function newPage() {
    if (cur.length) pages.push(cur);
    cur = [];
    y = PAGE_H - M;
  }

  function pushLine(fontKey, text, opts = {}) {
    const s = styles[fontKey] ?? styles.body;
    const leading = opts.leading ?? s.leading;
    if (y - leading < M) newPage();
    cur.push({ fontSize: s.size, text, x: M, y, kind: fontKey });
    y -= leading;
  }

  function pushWrapped(fontKey, text, prefix = "") {
    const s = styles[fontKey] ?? styles.body;
    const maxChars = maxCharsFor(s.size) - prefix.length;
    const wrapped = wrapText(text, maxChars);
    if (!wrapped.length) return;
    for (let i = 0; i < wrapped.length; i++) {
      const t = i === 0 ? `${prefix}${wrapped[i]}` : `${" ".repeat(prefix.length)}${wrapped[i]}`;
      pushLine(fontKey, t);
    }
  }

  for (const l of lines) {
    if (l.kind === "spacer") {
      y -= 10;
      continue;
    }
    if (l.kind === "spacer-sm") {
      y -= 6;
      continue;
    }
    if (l.kind === "h1") {
      pushWrapped("h1", l.text);
      continue;
    }
    if (l.kind === "h2") {
      y -= 2;
      pushWrapped("h2", l.text);
      y -= 2;
      continue;
    }
    if (l.kind === "h3") {
      pushWrapped("h3", l.text);
      continue;
    }
    if (l.kind === "meta") {
      pushWrapped("meta", l.text);
      continue;
    }
    if (l.kind === "bullet") {
      pushWrapped("body", l.text, "• ");
      continue;
    }
    pushWrapped("body", l.text);
  }

  if (cur.length) pages.push(cur);

  // Build PDF objects with stable object IDs (so references are correct).
  const offsets = [0];
  const chunks = [];

  function escapePdfStringHex(text) {
    return `<${ucs2Hex(text)}>`;
  }

  const pageCount = pages.length;
  const pagesId = 4 + pageCount * 2;
  const catalogId = pagesId + 1;
  const totalObjects = catalogId;
  const objects = new Array(totalObjects + 1); // 1-based

  // Font objects (Type0 + CIDFontType0 for GB1).
  // Minimal descriptor; relies on viewer's built-in font support.
  objects[1] = `<< /Type /Font /Subtype /Type0 /BaseFont /STSong-Light /Encoding /UniGB-UCS2-H /DescendantFonts [2 0 R] >>`;
  objects[2] = `<< /Type /Font /Subtype /CIDFontType0 /BaseFont /STSong-Light
  /CIDSystemInfo << /Registry (Adobe) /Ordering (GB1) /Supplement 5 >>
  /FontDescriptor 3 0 R
>>`;
  objects[3] = `<< /Type /FontDescriptor /FontName /STSong-Light /Flags 4 /FontBBox [0 -200 1000 900]
  /ItalicAngle 0 /Ascent 880 /Descent -120 /CapHeight 700 /StemV 80
>>`;

  // Content + Page objects.
  for (let i = 0; i < pageCount; i++) {
    const contentId = 4 + i * 2;
    const pageId = contentId + 1;

    const ops = [];
    for (const line of pages[i]) {
      ops.push("BT");
      ops.push(`/F1 ${line.fontSize} Tf`);
      ops.push(`${line.x.toFixed(2)} ${line.y.toFixed(2)} Td`);
      ops.push(`${escapePdfStringHex(line.text)} Tj`);
      ops.push("ET");
    }
    const stream = ops.join("\n") + "\n";
    const bytes = Buffer.from(stream, "utf8");
    objects[contentId] = `<< /Length ${bytes.length} >>\nstream\n${stream}endstream`;

    objects[pageId] = `<< /Type /Page /Parent ${pagesId} 0 R
  /MediaBox [0 0 ${PAGE_W.toFixed(2)} ${PAGE_H.toFixed(2)}]
  /Resources << /Font << /F1 1 0 R >> >>
  /Contents ${contentId} 0 R
>>`;
  }

  // Pages root + Catalog.
  const kids = [];
  for (let i = 0; i < pageCount; i++) kids.push(`${5 + i * 2} 0 R`);
  objects[pagesId] = `<< /Type /Pages /Count ${pageCount} /Kids [${kids.join(" ")}] >>`;
  objects[catalogId] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;

  // Sanity check: every object filled.
  for (let i = 1; i <= totalObjects; i++) {
    if (!objects[i]) throw new Error(`Missing PDF object ${i}`);
  }

  // Write full PDF with xref.
  chunks.push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");

  let offset = chunks.join("").length;
  for (let objNum = 1; objNum <= totalObjects; objNum++) {
    offsets.push(offset);
    const objStr = `${objNum} 0 obj\n${objects[objNum]}\nendobj\n`;
    chunks.push(objStr);
    offset += Buffer.byteLength(objStr, "utf8");
  }

  const xrefOffset = offset;
  chunks.push(`xref\n0 ${totalObjects + 1}\n`);
  chunks.push(`0000000000 65535 f \n`);
  for (let i = 1; i < offsets.length; i++) {
    const o = offsets[i];
    chunks.push(`${String(o).padStart(10, "0")} 00000 n \n`);
  }
  chunks.push(
    `trailer\n<< /Size ${totalObjects + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`
  );

  return Buffer.from(chunks.join(""), "binary");
}

function main() {
  const data = JSON.parse(readFileSync(DATA_PATH, "utf8"));
  const lines = buildLines(data);
  const pdf = generatePdf(lines);
  writeFileSync(OUT_PATH, pdf);
  process.stdout.write(`Generated: ${OUT_PATH}\n`);
}

main();
