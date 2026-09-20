<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useGlitchTransition } from '../composables/useGlitchTransition'

const { t } = useI18n()

const { active, phase, seeds } = useGlitchTransition()

const BAND_COUNT = 7

interface GlitchBand {
  style: Record<string, string>
  alt: boolean
}

const bands = computed<GlitchBand[]>(() =>
  Array.from({ length: BAND_COUNT }, (_, index) => {
    const positionSeed = seeds.value[index] ?? 0
    const sizeSeed = seeds.value[index + BAND_COUNT] ?? 0

    return {
      alt: index % 2 === 1,
      style: {
        top: `${8 + index * 12.4 + (positionSeed - 0.5) * 9}%`,
        height: `${2 + sizeSeed * 20}px`,
        '--jitter': `${(positionSeed - 0.5) * 170}px`,
        '--dur': `${90 + sizeSeed * 150}ms`,
        '--delay': `${-(positionSeed * 220)}ms`,
      },
    }
  }),
)

const titleText = computed(() =>
  phase.value === 'out'
    ? t('transition.accessGranted')
    : t('transition.entering'),
)

/* =========================
   Canvas 粒子系统
========================= */

type ParticleKind = 'spark' | 'ember' | 'shard'

type RGB = readonly [number, number, number]

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  age: number
  life: number
  size: number
  color: RGB
  kind: ParticleKind
  gravity: number
  drag: number
  twinkle: number
}

const PARTICLE_LIMIT = 320

const PALETTE: RGB[] = [
  [0, 229, 255], // 青
  [255, 43, 214], // 品红
  [234, 252, 255], // 白
  [150, 110, 255], // 电紫
]

const canvasRef = ref<HTMLCanvasElement | null>(null)

let ctx: CanvasRenderingContext2D | null = null
let rafId = 0
let particles: Particle[] = []
let width = 0
let height = 0
let runStart = 0
let lastFrame = 0
let emberAccumulator = 0
let shardAccumulator = 0

const rand = (min: number, max: number) => min + Math.random() * (max - min)

const pickColor = (): RGB =>
  PALETTE[Math.floor(Math.random() * PALETTE.length)]

// 故障条所在的纵向位置（与模板中 bands 的 top 保持同一公式）
const bandY = () => {
  const index = Math.floor(Math.random() * BAND_COUNT)
  const seed = seeds.value[index] ?? Math.random()
  return (8 + index * 12.4 + (seed - 0.5) * 9) / 100 * height
}

const spawnSpark = (x?: number, y?: number): Particle => {
  const horizontal = Math.random() < 0.78

  return {
    x: x ?? rand(0, width),
    y: y ?? bandY(),
    vx: horizontal
      ? rand(180, 900) * (Math.random() < 0.5 ? -1 : 1)
      : rand(-90, 90),
    vy: horizontal ? rand(-120, 120) : rand(60, 320),
    age: 0,
    life: rand(0.22, 0.62),
    size: rand(1, 2.8),
    color: Math.random() < 0.65 ? PALETTE[0] : pickColor(),
    kind: 'spark',
    gravity: rand(120, 320),
    drag: rand(0.6, 1.4),
    twinkle: rand(7, 16),
  }
}

const spawnEmber = (): Particle => ({
  x: rand(0, width),
  y: rand(height * 0.35, height),
  vx: rand(-28, 28),
  vy: rand(-72, -22),
  age: 0,
  life: rand(0.9, 1.9),
  size: rand(0.8, 2.1),
  color: Math.random() < 0.7 ? PALETTE[0] : PALETTE[3],
  kind: 'ember',
  gravity: rand(-26, -8),
  drag: rand(0.2, 0.6),
  twinkle: rand(3, 9),
})

// 沿故障条横向飞出的细长能量碎片
const spawnShard = (): Particle => {
  const direction = Math.random() < 0.5 ? -1 : 1

  return {
    x: direction > 0 ? rand(-40, width * 0.3) : rand(width * 0.7, width + 40),
    y: bandY(),
    vx: direction * rand(420, 1100),
    vy: rand(-40, 40),
    age: 0,
    life: rand(0.18, 0.4),
    size: rand(1.2, 2.4),
    color: Math.random() < 0.5 ? PALETTE[2] : PALETTE[1],
    kind: 'shard',
    gravity: 0,
    drag: rand(1.2, 2.4),
    twinkle: rand(10, 20),
  }
}

const emit = (count: number, factory: () => Particle) => {
  for (let i = 0; i < count; i += 1) {
    if (particles.length >= PARTICLE_LIMIT) return
    particles.push(factory())
  }
}

const renderFrame = (now: number) => {
  if (!ctx || !active.value) return

  const dt = Math.min((now - lastFrame) / 1000, 0.05)
  lastFrame = now

  const elapsed = now - runStart

  // 残影拖尾：叠半透明黑（screen 混合下黑色不遮底，仅让旧粒子衰减）
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = 'rgba(3, 4, 10, 0.3)'
  ctx.fillRect(0, 0, width, height)

  ctx.globalCompositeOperation = 'lighter'

  /* ---- 按阶段调度发射 ---- */
  if (phase.value === 'in') {
    // 切入瞬间沿故障条密集放电，随后快速衰减
    if (elapsed < 160) {
      emit(7, spawnSpark)
    } else if (elapsed < 460) {
      emit(Math.random() < 0.55 ? 1 : 0, spawnSpark)
    }
  } else if (phase.value === 'hold') {
    // 保持期：稀疏上升余烬 + 偶发能量碎片
    emberAccumulator += dt
    if (emberAccumulator > 0.07) {
      emberAccumulator = 0
      emit(1, spawnEmber)
    }

    shardAccumulator += dt
    if (shardAccumulator > 0.24) {
      shardAccumulator = 0
      emit(1, spawnShard)
    }
  } else {
    // 切出初期横向崩散火花
    if (elapsed < 1040) {
      emit(3, spawnSpark)
      emit(1, spawnShard)
    }
  }

  /* ---- 更新 + 绘制 ---- */
  const survivors: Particle[] = []

  for (const p of particles) {
    p.age += dt

    if (p.age >= p.life) continue

    const damping = Math.exp(-p.drag * dt)
    p.vx *= damping
    p.vy = p.vy * damping + p.gravity * dt
    p.x += p.vx * dt
    p.y += p.vy * dt

    if (p.x < -60 || p.x > width + 60 || p.y > height + 60) continue

    const lifeRatio = p.age / p.life
    const fade = 1 - lifeRatio
    const flicker = 0.62 + 0.38 * Math.sin(p.age * p.twinkle * Math.PI)
    const alpha = Math.max(0, Math.min(1, fade * flicker))
    const [r, g, b] = p.color

    if (p.kind === 'spark' || p.kind === 'shard') {
      // 速度方向拖尾线段，游戏技能特效感
      const streak = p.kind === 'shard' ? 0.05 : 0.024

      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
      ctx.lineWidth = p.size
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(p.x - p.vx * streak, p.y - p.vy * streak)
      ctx.stroke()
    }

    // 发光核心（纯色方块，无 shadowBlur，控制绘制成本）
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
    ctx.fillRect(
      p.x - p.size / 2,
      p.y - p.size / 2,
      p.size,
      p.size,
    )

    // 少量高亮白芯
    if (p.size > 1.6) {
      ctx.fillStyle = `rgba(234, 252, 255, ${alpha * 0.7})`
      ctx.fillRect(p.x - 0.5, p.y - 0.5, 1, 1)
    }

    survivors.push(p)
  }

  particles = survivors

  rafId = requestAnimationFrame(renderFrame)
}

const setupCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = window.innerWidth
  height = window.innerHeight

  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)

  ctx = canvas.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
}

const startParticles = async () => {
  await nextTick()

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  setupCanvas()
  if (!ctx) return

  ctx.clearRect(0, 0, width, height)

  particles = []
  runStart = performance.now()
  lastFrame = runStart
  emberAccumulator = 0
  shardAccumulator = 0

  // 切入即沿故障条放电
  emit(54, spawnSpark)

  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(renderFrame)
}

const stopParticles = () => {
  cancelAnimationFrame(rafId)
  particles = []
  ctx = null
}

// 覆盖层挂载（v-if active）后启动 / 卸载时停止
watch(active, (value) => {
  if (value) {
    startParticles()
  } else {
    stopParticles()
  }
})

// 阶段边沿触发：进入 hold 补一波碎片、out 瞬间中心爆发
watch(phase, (value) => {
  if (!active.value || !ctx) return

  if (value === 'hold') {
    emit(14, spawnShard)
  } else if (value === 'out') {
    if (particles.length > PARTICLE_LIMIT - 130) {
      particles.splice(0, particles.length - (PARTICLE_LIMIT - 130))
    }
  }
})

onBeforeUnmount(stopParticles)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="active"
      class="glt"
      :class="`glt--${phase}`"
      aria-hidden="true"
    >
      <!-- 黑色幕布：阶梯式亮度闪烁 -->
      <div class="glt__curtain" />

      <!-- 全屏闪光 -->
      <div class="glt__flash" />

      <!-- 水平故障切片 -->
      <span
        v-for="(band, index) in bands"
        :key="index"
        class="glt__slice"
        :class="{ 'glt__slice--alt': band.alt }"
        :style="band.style"
      />

      <!-- 游戏特效粒子层：放电火花 / 上升余烬 / 能量碎片 / 中心爆发 -->
      <canvas ref="canvasRef" class="glt__particles" />

      <!-- 扫描线 / 暗角 -->
      <div class="glt__scanlines" />
      <div class="glt__vignette" />

      <!-- 中央终端信息 -->
      <div class="glt__hud">
        <div class="glt__code">
          {{ t('transition.uplink') }}
        </div>

        <div
          class="glt__title"
          :data-text="titleText"
        >
          {{ titleText }}
        </div>

        <div class="glt__bar">
          <span />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.glt {
  /* 屏闪固定使用霓虹配色，不受明暗主题影响 */
  --glt-cyan: 0, 229, 255;
  --glt-pink: 255, 43, 214;

  position: fixed;
  inset: 0;
  z-index: 10000;

  overflow: hidden;

  pointer-events: none;

  font-family: var(--font-mono);
}

/* =========================
   幕布
========================= */

.glt__curtain {
  position: absolute;
  inset: 0;

  background: #03040a;

  opacity: 0;
}

.glt--in .glt__curtain {
  animation: glt-curtain-in 460ms steps(6, end) forwards;
}

.glt--hold .glt__curtain {
  opacity: 1;
}

.glt--out .glt__curtain {
  animation: glt-curtain-out 500ms steps(7, end) forwards;
}

/* =========================
   闪光
========================= */

.glt__flash {
  position: absolute;
  inset: 0;

  background:
    radial-gradient(
      circle at 50% 50%,
      rgba(var(--glt-cyan), 0.5),
      transparent 65%
    ),
    rgba(234, 252, 255, 0.9);

  mix-blend-mode: screen;

  opacity: 0;
}

.glt--in .glt__flash {
  animation: glt-flash-in 460ms steps(6, end) forwards;
}

.glt--out .glt__flash {
  animation: glt-flash-out 500ms steps(5, end) forwards;
}

/* =========================
   故障切片
========================= */

.glt__slice {
  position: absolute;
  left: -6%;

  width: 112%;

  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--glt-cyan), 0.85) 28%,
    rgba(255, 255, 255, 0.95) 50%,
    rgba(var(--glt-pink), 0.7) 72%,
    transparent
  );

  mix-blend-mode: screen;

  opacity: 0;
}

.glt__slice--alt {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--glt-pink), 0.8) 35%,
    rgba(var(--glt-cyan), 0.55) 65%,
    transparent
  );
}

.glt--in .glt__slice {
  animation:
    glt-slice-in 260ms steps(3, end) forwards,
    glt-jitter var(--dur) steps(2, end) var(--delay) infinite;
}

.glt--hold .glt__slice {
  opacity: 0.85;

  animation: glt-jitter var(--dur) steps(2, end) var(--delay) infinite;
}

.glt--out .glt__slice {
  animation: glt-slice-out 480ms steps(6, end) forwards;
}

/* =========================
   粒子层
========================= */

.glt__particles {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  /* 加色混合：黑底透明，霓虹粒子相互叠加发光 */
  mix-blend-mode: screen;
}

/* =========================
   扫描线 / 暗角
========================= */

.glt__scanlines {
  position: absolute;
  inset: -4%;

  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.05) 0,
    rgba(255, 255, 255, 0.05) 1px,
    transparent 1px,
    transparent 4px
  );

  opacity: 0.55;

  animation: glt-scan 140ms linear infinite;
}

.glt__vignette {
  position: absolute;
  inset: 0;

  box-shadow:
    inset 0 0 180px 36px rgba(var(--glt-cyan), 0.16),
    inset 0 0 70px rgba(0, 0, 0, 0.9);
}

/* =========================
   终端信息
========================= */

.glt__hud {
  position: absolute;
  inset: 0;

  display: grid;

  place-content: center;
  justify-items: center;
  gap: 20px;

  text-align: center;

  opacity: 0;
}

.glt--in .glt__hud {
  animation: glt-hud-in 300ms steps(2, end) 130ms forwards;
}

.glt--hold .glt__hud {
  opacity: 1;
}

.glt--out .glt__hud {
  animation: glt-hud-out 220ms steps(3, end) forwards;
}

.glt__code {
  color: rgba(var(--glt-cyan), 0.75);

  font-size: var(--fs-sm);

  letter-spacing: 0.34em;

  text-shadow: 0 0 12px rgba(var(--glt-cyan), 0.6);
}

.glt__title {
  position: relative;

  color: #eafcff;

  font-size: clamp(20px, 4vw, 40px);
  font-weight: 700;

  letter-spacing: 0.24em;

  text-shadow: 0 0 24px rgba(var(--glt-cyan), 0.55);
}

.glt__title::before,
.glt__title::after {
  content: attr(data-text);

  position: absolute;
  inset: 0;

  pointer-events: none;
}

.glt__title::before {
  color: rgb(var(--glt-cyan));

  transform: translate(-2px, 0);

  clip-path: inset(0 0 72% 0);

  animation: glt-title-glitch 0.9s steps(2, end) infinite;
}

.glt__title::after {
  color: rgb(var(--glt-pink));

  transform: translate(2px, 0);

  clip-path: inset(72% 0 0 0);

  animation: glt-title-glitch 0.7s steps(2, end) infinite reverse;
}

.glt__bar {
  width: min(320px, 60vw);
  height: 2px;

  background: rgba(var(--glt-cyan), 0.18);

  overflow: hidden;
}

.glt__bar span {
  display: block;

  width: 38%;
  height: 100%;

  background: rgb(var(--glt-cyan));

  box-shadow:
    0 0 10px rgba(var(--glt-cyan), 0.9),
    0 0 22px rgba(var(--glt-cyan), 0.5);

  animation: glt-bar 760ms steps(9, end) forwards;
}

/* =========================
   关键帧
========================= */

@keyframes glt-curtain-in {
  0% {
    opacity: 0;
  }

  18% {
    opacity: 0.85;
  }

  32% {
    opacity: 0.25;
  }

  48% {
    opacity: 0.95;
  }

  66% {
    opacity: 0.6;
  }

  82% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}

@keyframes glt-curtain-out {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  20% {
    opacity: 0.2;
  }

  35% {
    opacity: 0.9;
  }

  55% {
    opacity: 0.35;
  }

  75% {
    opacity: 0.7;
  }

  100% {
    opacity: 0;
    transform: translateY(-5%);
  }
}

@keyframes glt-flash-in {
  0% {
    opacity: 1;
  }

  16% {
    opacity: 0.12;
  }

  30% {
    opacity: 0.7;
  }

  46% {
    opacity: 0.05;
  }

  68% {
    opacity: 0.22;
  }

  100% {
    opacity: 0;
  }
}

@keyframes glt-flash-out {
  0% {
    opacity: 0;
  }

  14% {
    opacity: 0.95;
  }

  32% {
    opacity: 0.15;
  }

  58% {
    opacity: 0.4;
  }

  100% {
    opacity: 0;
  }
}

@keyframes glt-slice-in {
  0% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }

  70% {
    opacity: 0.3;
  }

  100% {
    opacity: 0.85;
  }
}

@keyframes glt-jitter {
  0% {
    transform: translateX(calc(var(--jitter) * -1));
  }

  50% {
    transform: translateX(var(--jitter));
  }

  100% {
    transform: translateX(calc(var(--jitter) * 0.4));
  }
}

@keyframes glt-slice-out {
  0% {
    opacity: 0.85;
    transform: translateX(0) scaleY(1);
  }

  25% {
    opacity: 0.2;
    transform: translateX(calc(var(--jitter) * -0.6)) scaleY(1.4);
  }

  55% {
    opacity: 1;
    transform: translateX(calc(var(--jitter) * 0.8)) scaleY(0.6);
  }

  100% {
    opacity: 0;
    transform: translateX(var(--jitter)) translateY(-34px) scaleY(0.15);
  }
}

@keyframes glt-scan {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(4px);
  }
}

@keyframes glt-hud-in {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glt-hud-out {
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  30% {
    opacity: 0.2;
    transform: translateX(-9px);
  }

  60% {
    opacity: 1;
    transform: translateX(6px);
  }

  100% {
    opacity: 0;
    transform: translateX(34px);
  }
}

@keyframes glt-title-glitch {
  0%,
  100% {
    clip-path: inset(0 0 100% 0);
  }

  30% {
    clip-path: inset(12% 0 58% 0);
  }

  60% {
    clip-path: inset(68% 0 8% 0);
  }
}

@keyframes glt-bar {
  0% {
    transform: translateX(-120%);
  }

  100% {
    transform: translateX(340%);
  }
}
</style>
