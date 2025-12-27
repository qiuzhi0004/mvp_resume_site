(() => {
  const canvas = document.getElementById("mouseMoveFx");
  if (!(canvas instanceof HTMLCanvasElement)) return;
  if (canvas.dataset.init === "true") return;
  canvas.dataset.init = "true";

  const prefersReduce =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduce) return;

  const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
  if (!ctx) return;

  const DPR = () => Math.min(window.devicePixelRatio || 1, 2);
  let w = 1;
  let h = 1;
  let dpr = DPR();

  const resize = () => {
    dpr = DPR();
    w = Math.max(1, window.innerWidth || document.documentElement.clientWidth || 1);
    h = Math.max(1, window.innerHeight || document.documentElement.clientHeight || 1);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  resize();
  window.addEventListener("resize", () => {
    window.clearTimeout(resize._t);
    resize._t = window.setTimeout(resize, 120);
  });

  // Particle system (cursor trail, inspired by DenDionigi/raeELZR input logic)
  const MAX = 980;
  const pool = [];
  const active = [];

  const rand = (min, max) => min + Math.random() * (max - min);
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const make = () => ({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    life: 0,
    max: 0,
    r: 0,
    hue: 0,
    a: 1,
    spin: 0,
    seed: 0,
    wobble: 1,
  });

  for (let i = 0; i < MAX; i++) pool.push(make());

  const trail = {
    x: w * 0.5,
    y: h * 0.4,
    oldX: w * 0.5,
    oldY: h * 0.4,
    lastFx: 1,
    lastFy: 0,
    lastEvent: 0,
    active: false,
    down: false,
  };

  const spawn = (x, y, dist, fx, fy, isDown, now) => {
    const p = pool.length ? pool.pop() : null;
    if (!p) return;
    p.x = x;
    p.y = y;
    const speed = (0.15 + dist * 0.0075) * (isDown ? 1.12 : 1);
    const spread = (0.2 + Math.min(1, dist / 160) * 0.18) * (isDown ? 1.08 : 1);
    let iFx = fx + rand(-spread, spread);
    let iFy = fy + rand(-spread, spread);
    const il = Math.hypot(iFx, iFy) || 1;
    iFx /= il;
    iFy /= il;
    p.vx = iFx * speed + rand(-0.085, 0.085);
    p.vy = iFy * speed + rand(-0.085, 0.085);
    p.life = 0;
    p.max = clamp(520 + dist * 7 + rand(-120, 220), 420, 1250);
    // Smaller particle + higher brightness, for finer-yet-punchy dust.
    p.r = clamp(0.18 + rand(0, 0.85) + dist * 0.0013, 0.18, 1.65);
    // vivid neon-y palette that complements the hero background
    p.hue = (210 + now * 0.05 + dist * 0.7 + rand(-24, 24)) % 360;
    p.a = rand(0.24, 0.62) * (isDown ? 1.08 : 1);
    p.spin = rand(-1, 1);
    p.seed = rand(0, 1000);
    p.wobble = rand(0.8, 1.25);
    active.push(p);
  };

  const updateTrail = (x, y, now, isDown) => {
    const dx = x - trail.oldX;
    const dy = y - trail.oldY;
    const dist = Math.hypot(dx, dy);
    const hasMove = dist > 0.01;
    if (!hasMove) {
      trail.oldX = x;
      trail.oldY = y;
      return;
    }

    const targetFx = dx / dist;
    const targetFy = dy / dist;
    const lerpSpeed = 0.18;
    trail.lastFx += (targetFx - trail.lastFx) * lerpSpeed;
    trail.lastFy += (targetFy - trail.lastFy) * lerpSpeed;
    const l = Math.hypot(trail.lastFx, trail.lastFy) || 1;
    trail.lastFx /= l;
    trail.lastFy /= l;

    const jitter = dist < 1;
    const perMouse = clamp(Math.round(dist * 0.62), 6, 44);
    const perpX = -targetFy;
    const perpY = targetFx;
    const width = clamp(dist * 0.06, 0.35, 2.25);

    for (let i = 0; i < perMouse; i++) {
      const ratio = i / perMouse;
      let cx = trail.oldX + dx * ratio;
      let cy = trail.oldY + dy * ratio;
      if (jitter) {
        cx += rand(-0.9, 0.9);
        cy += rand(-0.9, 0.9);
      }
      const w0 = rand(-1, 1) * width;
      cx += perpX * w0;
      cy += perpY * w0;
      spawn(cx, cy, dist, trail.lastFx, trail.lastFy, isDown, now);
    }

    trail.oldX = x;
    trail.oldY = y;
  };

  const onMove = (e) => {
    if (!(e instanceof PointerEvent)) return;
    if (!e.isPrimary) return;
    if (e.pointerType === "touch") return;
    trail.active = true;

    const t = typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
    trail.down = (e.buttons & 1) === 1;

    const x = clamp(e.clientX, 0, w);
    const y = clamp(e.clientY, 0, h);

    trail.x = x;
    trail.y = y;
    if (!trail.lastEvent) {
      trail.oldX = x;
      trail.oldY = y;
    }
    updateTrail(x, y, t, trail.down);
    trail.lastEvent = t;
  };

  window.addEventListener("pointermove", onMove, { passive: true });

  // Fade by subtracting alpha (keeps canvas transparent)
  const fade = (dt) => {
    ctx.globalCompositeOperation = "destination-out";
    const a = clamp(0.062 * (dt / 16.67), 0.025, 0.16);
    ctx.fillStyle = `rgba(0,0,0,${a})`;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
  };

  const draw = (dt, now) => {
    const drag = Math.exp(-0.00095 * dt);
    const t = now * 0.001;
    for (let i = active.length - 1; i >= 0; i--) {
      const p = active[i];
      p.life += dt;
      const k = p.life / p.max;
      if (k >= 1) {
        active[i] = active[active.length - 1];
        active.pop();
        pool.push(p);
        continue;
      }

      // Organic flow field + slight orbit around cursor to avoid linear motion.
      const n1 = Math.sin(p.x * 0.012 + p.y * 0.008 + t * 1.15 + p.seed);
      const n2 = Math.cos(p.x * 0.009 - p.y * 0.011 - t * 0.95 + p.seed * 1.7);
      const ax = n1 * 0.00055 * p.wobble;
      const ay = n2 * 0.00055 * p.wobble;
      p.vx += ax * dt;
      p.vy += ay * dt;

      const dxm = trail.x - p.x;
      const dym = trail.y - p.y;
      const pull = 0.0000026;
      const orbit = 0.0000021 * p.spin;
      p.vx += dxm * pull * dt + -dym * orbit * dt;
      p.vy += dym * pull * dt + dxm * orbit * dt;

      p.vx *= drag;
      p.vy *= drag;
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      const alpha = p.a * Math.pow(1 - k, 1.25);
      const r = p.r * (0.45 + (1 - k) * 0.45);
      ctx.beginPath();
      ctx.fillStyle = `hsla(${(p.hue + now * 0.01) % 360}, 98%, 68%, ${alpha})`;
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  let raf = 0;
  let lastT = 0;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    const now = typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
    if (!lastT) lastT = now;
    const dt = clamp(now - lastT, 8, 34);
    lastT = now;
    fade(dt);
    draw(dt, now);
  };

  const start = () => {
    if (raf) return;
    lastT = 0;
    raf = requestAnimationFrame(tick);
  };
  const stop = () => {
    if (!raf) return;
    cancelAnimationFrame(raf);
    raf = 0;
  };

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  start();
})();
