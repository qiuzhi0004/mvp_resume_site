import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = resolve(import.meta.dirname, "..");

function usage() {
  return `
用法：
  node scripts/generate_portfolio_images.mjs [options]

选项：
  --input <path>         提示词 Markdown 路径（默认：../protfolio/1 简历中项目的图片需求.md）
  --out <dir>            输出目录（默认：../protfolio/generated_images_<YYYY-MM-DD>）
  --model <name>         OpenAI 图片模型（默认：gpt-image-1）
  --size <WxH>           生成尺寸（默认：1536x1024）
  --aspect <WxH>         裁切到固定比例（默认：16x10；传空则不裁切）
  --resize <WxH>         最终缩放到固定尺寸（默认：1600x1000；传空则不缩放）
  --only <prefix|regex>  仅生成匹配文件名的条目（如：p1_ 或 /p[12]_0[1-3]/）
  --limit <n>            只生成前 n 张（用于试跑）
  --skip-existing        若文件已存在则跳过
  --dry-run              只解析并打印，不生成、不写文件
`;
}

function parseWxH(value, label) {
  if (!value) return null;
  const m = /^(\d+)x(\d+)$/.exec(String(value).trim());
  if (!m) throw new Error(`${label} 格式错误：${value}（应为 WxH，例如 1536x1024）`);
  return { w: Number(m[1]), h: Number(m[2]) };
}

function parseMaybeRegex(value) {
  if (!value) return null;
  const s = String(value).trim();
  if (!s) return null;
  if (s.startsWith("/") && s.lastIndexOf("/") > 0) {
    const last = s.lastIndexOf("/");
    const body = s.slice(1, last);
    const flags = s.slice(last + 1) || "";
    return new RegExp(body, flags);
  }
  return s;
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) {
      args._.push(a);
      continue;
    }
    const key = a.slice(2);
    if (key === "skip-existing" || key === "dry-run") {
      args[key] = true;
      continue;
    }
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) throw new Error(`缺少参数：--${key}`);
    args[key] = next;
    i++;
  }
  return args;
}

function loadDotEnv(paths) {
  for (const p of paths) {
    try {
      const text = readFileSync(p, "utf8");
      const out = {};
      for (const line of text.split(/\r?\n/)) {
        const t = line.trim();
        if (!t || t.startsWith("#")) continue;
        const idx = t.indexOf("=");
        if (idx <= 0) continue;
        const k = t.slice(0, idx).trim();
        let v = t.slice(idx + 1).trim();
        if ((v.startsWith("\"") && v.endsWith("\"")) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
        out[k] = v;
      }
      return out;
    } catch {
      // ignore
    }
  }
  return {};
}

function getApiKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  const env = loadDotEnv([
    resolve(ROOT, "..", "protfolio", ".env"),
    resolve(ROOT, "..", ".env"),
    resolve(process.cwd(), ".env"),
  ]);
  return env.OPENAI_API_KEY || "";
}

function parsePromptMarkdown(md) {
  const items = [];
  const re =
    /^###\s+\d+\)\s+`([^`]+)`\s*\n\n\*\*提示词：\*\*\n([\s\S]*?)(?=\n\n###\s+\d+\)|\n\n#\s+项目|\n\n---|\n?$)/gm;
  let m;
  while ((m = re.exec(md))) {
    const filename = m[1].trim();
    const prompt = m[2].trim();
    if (!filename || !prompt) continue;
    items.push({ filename, prompt });
  }
  return items;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function openaiGeneratePng({ apiKey, model, prompt, size }) {
  const url = "https://api.openai.com/v1/images/generations";
  const body = { model, prompt, size, n: 1, response_format: "b64_json" };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`OpenAI 图片生成失败：HTTP ${res.status} ${text ? `- ${text.slice(0, 240)}` : ""}`);
  }

  const json = await res.json();
  const b64 = json?.data?.[0]?.b64_json;
  if (!b64) throw new Error("OpenAI 响应缺少 b64_json");
  return Buffer.from(b64, "base64");
}

function runSips(args) {
  const r = spawnSync("sips", args, { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`sips 失败：sips ${args.join(" ")}`);
}

function cropToAspect({ filePath, currentSize, aspect }) {
  if (!aspect) return;
  const w = currentSize.w;
  const h = currentSize.h;
  const targetRatio = aspect.w / aspect.h;
  const currentRatio = w / h;

  let cropW = w;
  let cropH = h;
  if (currentRatio > targetRatio) {
    cropW = Math.round(h * targetRatio);
    cropH = h;
  } else if (currentRatio < targetRatio) {
    cropW = w;
    cropH = Math.round(w / targetRatio);
  }

  if (cropW === w && cropH === h) return;
  runSips(["--cropToHeightWidth", String(cropH), String(cropW), filePath]);
}

function resizeTo({ filePath, size }) {
  if (!size) return;
  runSips(["-z", String(size.h), String(size.w), filePath]);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.h || args._.includes("help")) {
    console.log(usage());
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const inputPath = resolve(
    process.cwd(),
    args.input ?? resolve(ROOT, "..", "protfolio", "1 简历中项目的图片需求.md")
  );
  const outDir = resolve(process.cwd(), args.out ?? resolve(ROOT, "..", "protfolio", `generated_images_${today}`));

  const model = args.model ?? "gpt-image-1";
  const genSize = parseWxH(args.size ?? "1536x1024", "--size");
  const aspect = args.aspect === "" ? null : parseWxH(args.aspect ?? "16x10", "--aspect");
  const resize = args.resize === "" ? null : parseWxH(args.resize ?? "1600x1000", "--resize");
  const skipExisting = !!args["skip-existing"];
  const dryRun = !!args["dry-run"];
  const limit = args.limit ? Number(args.limit) : null;
  const only = parseMaybeRegex(args.only ?? "");

  const md = readFileSync(inputPath, "utf8");
  let items = parsePromptMarkdown(md);

  if (only) {
    items = items.filter((it) => {
      if (only instanceof RegExp) return only.test(it.filename);
      return it.filename.startsWith(String(only));
    });
  }
  if (limit && Number.isFinite(limit) && limit > 0) items = items.slice(0, limit);

  if (!items.length) {
    console.log("未匹配到任何图片条目。检查 --input / --only 参数。");
    return;
  }

  console.log(`将生成 ${items.length} 张图片`);
  console.log(`输入：${inputPath}`);
  console.log(`输出：${outDir}`);
  console.log(`模型：${model} ｜ 生成尺寸：${genSize.w}x${genSize.h} ｜ 裁切比例：${aspect ? `${aspect.w}x${aspect.h}` : "不裁切"} ｜ 缩放：${resize ? `${resize.w}x${resize.h}` : "不缩放"}`);

  if (dryRun) {
    for (const it of items.slice(0, Math.min(5, items.length))) console.log(`- ${it.filename}`);
    if (items.length > 5) console.log(`... (${items.length - 5} more)`);
    return;
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error(
      "缺少 OPENAI_API_KEY。请在环境变量或 .env（推荐：New_approch/protfolio/.env）里设置 OPENAI_API_KEY=...（不要把 key 发到聊天里）。"
    );
  }

  mkdirSync(outDir, { recursive: true });
  const manifestPath = resolve(outDir, "_manifest.json");
  const manifest = {
    source: inputPath,
    generatedAt: new Date().toISOString(),
    model,
    size: `${genSize.w}x${genSize.h}`,
    aspect: aspect ? `${aspect.w}x${aspect.h}` : null,
    resize: resize ? `${resize.w}x${resize.h}` : null,
    items: [],
  };

  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const outPath = resolve(outDir, it.filename);
    if (skipExisting && existsSync(outPath)) {
      console.log(`[${i + 1}/${items.length}] skip existing: ${it.filename}`);
      manifest.items.push({ ...it, path: outPath, skipped: true });
      continue;
    }

    console.log(`[${i + 1}/${items.length}] generate: ${it.filename}`);

    let png = null;
    let lastErr = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        png = await openaiGeneratePng({ apiKey, model, prompt: it.prompt, size: `${genSize.w}x${genSize.h}` });
        lastErr = null;
        break;
      } catch (e) {
        lastErr = e;
        const wait = 800 * Math.pow(2, attempt - 1);
        console.warn(`  attempt ${attempt} failed; retry in ${wait}ms`);
        await sleep(wait);
      }
    }
    if (!png) throw lastErr ?? new Error("生成失败");

    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, png);

    try {
      cropToAspect({ filePath: outPath, currentSize: genSize, aspect });
      resizeTo({ filePath: outPath, size: resize });
    } catch (e) {
      console.warn(`  post-process failed: ${String(e?.message ?? e)}`);
    }

    manifest.items.push({ ...it, path: outPath, skipped: false });
  }

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`完成。清单：${manifestPath}`);
}

main().catch((err) => {
  console.error(err?.stack || err);
  process.exitCode = 1;
});

