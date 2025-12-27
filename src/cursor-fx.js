(() => {
  const ROOT_ID = "cursorFx";
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (document.getElementById(ROOT_ID)) return;

  const mm = (q) => (window.matchMedia ? window.matchMedia(q) : null);
  const prefersReduce = mm("(prefers-reduced-motion: reduce)")?.matches;
  const finePointer = mm("(pointer: fine)")?.matches;
  const hoverCapable = mm("(hover: hover)")?.matches;
  if (prefersReduce || !finePointer || !hoverCapable) return;

  const root = document.createElement("div");
  root.id = ROOT_ID;
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = '<div class="cursorFx__ring"></div><div class="cursorFx__dot"></div>';
  document.body.appendChild(root);
  document.body.classList.add("has-cursor-fx");

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const isTextTarget = (node) => {
    const el = node && node.nodeType === 1 ? node : null;
    const target = el?.closest?.("input, textarea, [contenteditable]");
    if (!target) return false;
    if (target instanceof HTMLInputElement) {
      const type = String(target.type || "").toLowerCase();
      const nonText = new Set(["button", "submit", "reset", "checkbox", "radio", "range", "color", "file"]);
      return !nonText.has(type);
    }
    return true;
  };

  const isInteractiveTarget = (node) => {
    const el = node && node.nodeType === 1 ? node : null;
    return !!el?.closest?.('a, button, .btn, .fx-btn, [role="button"], [data-cursor="hover"]');
  };

  let tx = window.innerWidth * 0.5;
  let ty = window.innerHeight * 0.5;
  let rx = tx;
  let ry = ty;
  let dx = tx;
  let dy = ty;

  let lastTx = tx;
  let lastTy = ty;
  let lastT = 0;
  let raf = 0;
  let visible = false;

  const pulse = (x, y) => {
    const p = document.createElement("div");
    p.className = "cursorFx__pulse";
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    root.appendChild(p);
    p.addEventListener(
      "animationend",
      () => {
        p.remove();
      },
      { once: true },
    );
  };

  const setVars = (x, y, ringX, ringY, rotDeg, sx, sy) => {
    root.style.setProperty("--cx", `${x}px`);
    root.style.setProperty("--cy", `${y}px`);
    root.style.setProperty("--rx", `${ringX}px`);
    root.style.setProperty("--ry", `${ringY}px`);
    root.style.setProperty("--rot", `${rotDeg}deg`);
    root.style.setProperty("--sx", String(sx));
    root.style.setProperty("--sy", String(sy));
  };

  const tick = (now) => {
    raf = requestAnimationFrame(tick);
    if (!lastT) lastT = now;
    const dt = clamp(now - lastT, 8, 34);
    lastT = now;

    // Exponential smoothing: stable feel across different refresh rates.
    const kr = 1 - Math.exp(-0.018 * dt);
    const kd = 1 - Math.exp(-0.08 * dt);
    rx += (tx - rx) * kr;
    ry += (ty - ry) * kr;
    dx += (tx - dx) * kd;
    dy += (ty - dy) * kd;

    const vx = tx - lastTx;
    const vy = ty - lastTy;
    lastTx = tx;
    lastTy = ty;

    const speed = Math.hypot(vx, vy) / dt; // px/ms
    const stretch = clamp(speed * 0.8, 0, 0.38);
    const sx = 1 + stretch;
    const sy = 1 - stretch * 0.55;
    const rot = Math.atan2(vy, vx) * (180 / Math.PI);

    setVars(dx, dy, rx, ry, Number.isFinite(rot) ? rot : 0, sx.toFixed(3), sy.toFixed(3));

    if (!visible) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  const show = () => {
    if (!visible) root.classList.remove("is-hidden");
    visible = true;
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const hide = () => {
    visible = false;
    root.classList.add("is-hidden");
    root.classList.remove("is-down", "is-hover", "is-text");
  };

  const onMove = (e) => {
    if (!(e instanceof PointerEvent)) return;
    if (!e.isPrimary) return;
    if (e.pointerType === "touch") return;

    tx = e.clientX;
    ty = e.clientY;
    show();

    const isText = isTextTarget(e.target);
    root.classList.toggle("is-text", isText);
    root.classList.toggle("is-hover", !isText && isInteractiveTarget(e.target));
  };

  const onDown = (e) => {
    if (!(e instanceof PointerEvent)) return;
    if (!e.isPrimary) return;
    if (e.pointerType === "touch") return;
    root.classList.add("is-down");
    pulse(tx, ty);
  };

  const onUp = (e) => {
    if (e && e instanceof PointerEvent && !e.isPrimary) return;
    root.classList.remove("is-down");
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onDown, { passive: true });
  window.addEventListener("pointerup", onUp, { passive: true });
  window.addEventListener("pointercancel", onUp, { passive: true });
  window.addEventListener("blur", hide);
  document.addEventListener("mouseleave", hide);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) hide();
  });

  // Initialize offscreen.
  root.classList.add("is-hidden");
})();

