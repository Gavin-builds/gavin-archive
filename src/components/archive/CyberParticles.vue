<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const canvasEl = ref<HTMLCanvasElement | null>(null);

// 鼠标斥力场：记录一次坐标，RAF 循环内读取
const mouse = { x: -9999, y: -9999, active: false };

// 拖尾：环形缓冲，每帧左移一格，最新点在末尾
const TRAIL_LEN = 18;
const trail: { x: number; y: number }[] = new Array(TRAIL_LEN)
  .fill(0)
  .map(() => ({ x: -9999, y: -9999 }));

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: "accent" | "pink";
  size: number;
}

let ctx: CanvasRenderingContext2D | null = null;
let dpr = 1;
let particles: Particle[] = [];
let rafId = 0;
let width = 0;
let height = 0;
let reducedMotion = false;

const PARTICLE_COUNT = 120;
const MOUSE_RADIUS = 140;
const LINK_RADIUS = 96;
const MAX_LINKS = 180;
const REPULSION_STRENGTH = 0.9;

// 从 CSS 变量取颜色，主题切换自动同步
const readThemeColors = () => {
  const styles = getComputedStyle(document.documentElement);
  const accentRgb = styles.getPropertyValue("--accent-rgb").trim() || "0 240 255";
  const pinkRgb = styles.getPropertyValue("--pink-rgb").trim() || "255 0 150";
  return {
    accent: `rgb(${accentRgb})`,
    accentSoft: `rgba(${accentRgb}, 0.35)`,
    accentWire: `rgba(${accentRgb}, 0.28)`,
    pink: `rgb(${pinkRgb})`,
    pinkSoft: `rgba(${pinkRgb}, 0.3)`,
    pinkWire: `rgba(${pinkRgb}, 0.24)`,
  };
};

let colors = readThemeColors();

const createParticle = (w: number, h: number): Particle => {
  const isAccent = Math.random() < 0.55;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    color: isAccent ? "accent" : "pink",
    size: 1 + Math.random() * 2.2,
  };
};

const resetParticles = () => {
  particles = new Array(PARTICLE_COUNT)
    .fill(0)
    .map(() => createParticle(width, height));
};

const resize = () => {
  if (!canvasEl.value) return;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvasEl.value.width = width * dpr;
  canvasEl.value.height = height * dpr;
  canvasEl.value.style.width = width + "px";
  canvasEl.value.style.height = height + "px";
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

const step = () => {
  if (!ctx) return;

  // 背景清除
  ctx.clearRect(0, 0, width, height);

  // 粒子位置更新 + 斥力 + 边界环绕
  for (const p of particles) {
    // 斥力场
    if (mouse.active) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const distSq = dx * dx + dy * dy;
      const r2 = MOUSE_RADIUS * MOUSE_RADIUS;
      if (distSq < r2 && distSq > 0.01) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / MOUSE_RADIUS) * REPULSION_STRENGTH;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
    }

    // 速度阻尼，避免积累发散
    p.vx *= 0.97;
    p.vy *= 0.97;

    p.x += p.vx;
    p.y += p.vy;

    // 边界环绕（从一侧飞出 → 对侧出现）
    if (p.x < -20) p.x = width + 20;
    if (p.x > width + 20) p.x = -20;
    if (p.y < -20) p.y = height + 20;
    if (p.y > height + 20) p.y = -20;
  }

  // 连线（只画近距离，限制总数）
  let links = 0;
  const lr2 = LINK_RADIUS * LINK_RADIUS;
  for (let i = 0; i < particles.length && links < MAX_LINKS; i++) {
    const a = particles[i];
    for (let j = i + 1; j < particles.length && links < MAX_LINKS; j++) {
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d2 = dx * dx + dy * dy;
      if (d2 > lr2) continue;
      const d = Math.sqrt(d2);
      const alpha = 1 - d / LINK_RADIUS;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);

      if (a.color === b.color) {
        ctx.strokeStyle =
          a.color === "accent"
            ? `rgba(${getRGB("--accent-rgb")}, ${alpha * 0.28})`
            : `rgba(${getRGB("--pink-rgb")}, ${alpha * 0.24})`;
      } else {
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.1})`;
      }
      ctx.lineWidth = 0.6;
      ctx.stroke();
      links++;
    }
  }

  // 画粒子（发光方块）
  for (const p of particles) {
    const baseColor = p.color === "accent" ? colors.accent : colors.pink;
    ctx.fillStyle = baseColor;
    ctx.shadowColor = baseColor;
    ctx.shadowBlur = 6;
    ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
  }
  ctx.shadowBlur = 0;

  // ========== 鼠标拖尾（赛博朋克双色渐变） ==========
  // 缓冲左移一格，最新点推入末尾；静止时拖尾自动淡出
  for (let i = 0; i < TRAIL_LEN - 1; i++) {
    trail[i] = trail[i + 1];
  }
  // 只有鼠标/手指活跃时才推入真实坐标，否则推入哨兵值让
  // hasTrail 检测失效，静止/抬手后光标圆点立刻消失
  trail[TRAIL_LEN - 1] = mouse.active
    ? { x: mouse.x, y: mouse.y }
    : { x: -9999, y: -9999 };

  const rgbAccent = getRGB("--accent-rgb");
  const rgbPink = getRGB("--pink-rgb");
  const hasTrail =
    mouse.active &&
    trail[0].x > -9998 &&
    trail[TRAIL_LEN - 1].x > -9998;

  if (hasTrail && ctx) {
    // 拖尾线段：最新段青 → 中段白 → 旧段品红，alpha 递减
    for (let i = 0; i < TRAIL_LEN - 1; i++) {
      const a = trail[i];
      const b = trail[i + 1];
      // 跳过还没被实际使用的段（静止时前几格都是 -9999）
      if (a.x < -9998 || b.x < -9998) continue;

      const t = i / (TRAIL_LEN - 1); // 0 = 最旧，接近 1 = 最新
      const alpha = t * 0.9; // 旧段最淡，最新段最亮

      // 双色渐变：越新越偏青，越旧越偏品红
      const mix = t; // 0→pink, 1→accent
      const r1 = Math.round(
        parseInt(rgbAccent.split(" ")[0]) * mix +
          parseInt(rgbPink.split(" ")[0]) * (1 - mix),
      );
      const g1 = Math.round(
        parseInt(rgbAccent.split(" ")[1]) * mix +
          parseInt(rgbPink.split(" ")[1]) * (1 - mix),
      );
      const b1 = Math.round(
        parseInt(rgbAccent.split(" ")[2]) * mix +
          parseInt(rgbPink.split(" ")[2]) * (1 - mix),
      );
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(${r1} ${g1} ${b1} / ${alpha})`;
      ctx.lineWidth = 1 + t * 2; // 旧段 1px，最新段 3px
      ctx.lineCap = "round";
      ctx.shadowColor = `rgb(${r1} ${g1} ${b1})`;
      ctx.shadowBlur = 1 + t * 8; // 最新段发光最强
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // 光标本体：青色发光点 + 圆环
    const head = trail[TRAIL_LEN - 1];
    ctx.fillStyle = `rgba(${rgbAccent} / 0.95)`;
    ctx.shadowColor = `rgb(${rgbAccent})`;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
    ctx.fill();

    // 外光环（细圈）
    ctx.strokeStyle = `rgba(${rgbAccent} / 0.6)`;
    ctx.lineWidth = 1;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(head.x, head.y, 9, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  rafId = requestAnimationFrame(step);
};

// 从 CSS 变量取 rgb 值，用于连线颜色动态插值
const getRGB = (varName: string) => {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  return v || (varName === "--accent-rgb" ? "0 240 255" : "255 0 150");
};

const resetTrail = () => {
  for (let i = 0; i < TRAIL_LEN; i++) {
    trail[i] = { x: -9999, y: -9999 };
  }
};

const onMouseMove = (e: MouseEvent) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;
};
const onTouchStart = (e: TouchEvent) => {
  resetTrail();
  if (e.touches.length) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    mouse.active = true;
  }
};
const onTouchMove = (e: TouchEvent) => {
  if (e.touches.length) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    mouse.active = true;
  }
};
const onTouchEnd = () => {
  resetTrail();
  mouse.active = false;
};
const onMouseLeave = () => {
  resetTrail();
  mouse.active = false;
};

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  if (!canvasEl.value) return;
  ctx = canvasEl.value.getContext("2d", { alpha: true });
  if (!ctx) return;

  resize();
  resetParticles();
  colors = readThemeColors();

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });
  window.addEventListener("touchend", onTouchEnd);
  window.addEventListener("touchcancel", onTouchEnd);
  window.addEventListener("mouseleave", onMouseLeave);

  resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvasEl.value);

  rafId = requestAnimationFrame(step);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("touchstart", onTouchStart);
  window.removeEventListener("touchmove", onTouchMove);
  window.removeEventListener("touchend", onTouchEnd);
  window.removeEventListener("touchcancel", onTouchEnd);
  window.removeEventListener("mouseleave", onMouseLeave);
  resizeObserver?.disconnect();
});
</script>

<template>
  <canvas ref="canvasEl" class="cyber-particles" aria-hidden="true" />
</template>

<style scoped>
.cyber-particles {
  position: fixed;
  inset: 0;
  z-index: 100;

  pointer-events: none;

  opacity: 0.85;
}

@media (prefers-reduced-motion: reduce) {
  .cyber-particles {
    display: none;
  }
}

@media (max-width: 768px) {
  .cyber-particles {
    opacity: 0.6;
  }
}
</style>
