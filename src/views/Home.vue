<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const canvas = ref<HTMLCanvasElement | null>(null)
const scene = ref<HTMLElement | null>(null)

const mouseX = ref(0)
const mouseY = ref(0)

const enterArchive = () => {
  router.push('/archive/projects')
}

let animationFrame = 0
let resizeHandler: (() => void) | null = null
let mouseHandler: ((event: MouseEvent) => void) | null = null

onMounted(() => {
  const element = scene.value
  const canvasElement = canvas.value

  if (!element || !canvasElement) return

  const ctx = canvasElement.getContext('2d')

  if (!ctx) return

  const particles: Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
    alpha: number
  }> = []

  let width = 0
  let height = 0

  const resize = () => {
    const dpr = window.devicePixelRatio || 1

    width = window.innerWidth
    height = window.innerHeight

    canvasElement.width = width * dpr
    canvasElement.height = height * dpr

    canvasElement.style.width = `${width}px`
    canvasElement.style.height = `${height}px`

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const createParticles = () => {
    particles.length = 0

    const count = Math.min(
      130,
      Math.floor((width * height) / 11000),
    )

    for (let index = 0; index < count; index += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.6 + 0.1,
      })
    }
  }

  const drawParticles = () => {
    ctx.clearRect(0, 0, width, height)

    for (const particle of particles) {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0) particle.x = width
      if (particle.x > width) particle.x = 0

      if (particle.y < 0) particle.y = height
      if (particle.y > height) particle.y = 0

      ctx.beginPath()

      ctx.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2,
      )

      ctx.fillStyle = `rgba(0,229,255,${particle.alpha})`

      ctx.fill()
    }

    // connect nearby particles
    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const a = particles[i]
        const b = particles[j]

        const dx = a.x - b.x
        const dy = a.y - b.y

        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > 120) continue

        const opacity = (1 - distance / 120) * 0.08

        ctx.beginPath()

        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)

        ctx.strokeStyle = `rgba(0,229,255,${opacity})`
        ctx.lineWidth = 1

        ctx.stroke()
      }
    }

    animationFrame = requestAnimationFrame(drawParticles)
  }

  resizeHandler = () => {
    resize()
    createParticles()
  }

  mouseHandler = (event: MouseEvent) => {
    mouseX.value =
      (event.clientX / window.innerWidth - 0.5) * 2

    mouseY.value =
      (event.clientY / window.innerHeight - 0.5) * 2

    element.style.setProperty(
      '--mouse-x',
      `${mouseX.value}`,
    )

    element.style.setProperty(
      '--mouse-y',
      `${mouseY.value}`,
    )
  }

  resize()

  createParticles()

  window.addEventListener('resize', resizeHandler)

  window.addEventListener('mousemove', mouseHandler)

  drawParticles()
})

onBeforeUnmount(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }

  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }

  if (mouseHandler) {
    window.removeEventListener('mousemove', mouseHandler)
  }
})
</script>

<template>
  <main
    ref="scene"
    class="landing"
  >
    <!-- particle canvas -->
    <canvas
      ref="canvas"
      class="landing__particles"
    />

    <!-- background grid -->
    <div class="landing__grid" />

    <!-- scanline -->
    <div class="landing__scanline" />

    <!-- glow -->
    <div class="landing__glow landing__glow--cyan" />
    <div class="landing__glow landing__glow--purple" />

    <!-- top HUD -->
    <header class="hud hud--top">
      <div class="hud__brand">
        <span class="hud__mark">G</span>

        <div>
          <div class="hud__title">
            GAVIN ARCHIVE
          </div>

          <div class="hud__sub">
            DEVELOPER OPERATING SYSTEM
          </div>
        </div>
      </div>

      <div class="hud__status">
        <span class="status-dot" />
        SYSTEM ONLINE
      </div>
    </header>

    <!-- left panel -->
    <aside class="panel panel--left">
      <div class="panel__label">
        IDENTITY
      </div>

      <div class="panel__value">
        GAVINLIN
      </div>

      <div class="panel__line" />

      <div class="panel__row">
        <span>ROLE</span>
        <strong>AI ENGINEER</strong>
      </div>

      <div class="panel__row">
        <span>STACK</span>
        <strong>VUE / NODE</strong>
      </div>

      <div class="panel__row">
        <span>MODE</span>
        <strong>BUILDING</strong>
      </div>
    </aside>

    <!-- right panel -->
    <aside class="panel panel--right">
      <div class="panel__label">
        ARCHIVE
      </div>

      <div class="panel__metric">
        <span>2026</span>
        <small>YEAR</small>
      </div>

      <div class="panel__metric">
        <span>∞</span>
        <small>EXPERIMENTS</small>
      </div>

      <div class="panel__metric">
        <span>01</span>
        <small>ACTIVE CORE</small>
      </div>
    </aside>

    <!-- central scene -->
    <section class="hero">
      <div class="hero__orbit hero__orbit--outer" />
      <div class="hero__orbit hero__orbit--middle" />
      <div class="hero__orbit hero__orbit--inner" />

      <div class="hero__core">
        <div class="hero__core-ring" />

        <div class="hero__core-center">
          G
        </div>
      </div>

      <div class="hero__content">
        <div class="hero__eyebrow">
          <span>// INITIALIZING</span>
          <span>ARCHIVE_001</span>
        </div>

        <h1
          class="hero__title"
          data-text="GAVINLIN"
        >
          GAVINLIN
        </h1>

        <div class="hero__role">
          AI FULL-STACK ENGINEER
        </div>

        <p class="hero__description">
          Building tools, products and experiments
          with code and AI.
        </p>

        <button
          class="enter"
          @click="enterArchive"
        >
          <span class="enter__line" />

          <span>
            ENTER ARCHIVE
          </span>

          <span class="enter__arrow">
            →
          </span>

          <span class="enter__line" />
        </button>
      </div>
    </section>

    <!-- bottom HUD -->
    <footer class="hud hud--bottom">
      <span>
        GAVIN ARCHIVE / 2026
      </span>

      <span>
        BUILD · EXPERIMENT · ARCHIVE
      </span>

      <span>
        v0.1.0
      </span>
    </footer>

    <!-- corner decorations -->
    <div class="corner corner--tl" />
    <div class="corner corner--tr" />
    <div class="corner corner--bl" />
    <div class="corner corner--br" />

    <!-- cursor coordinates -->
    <div class="coordinates">
      X {{ Math.round(mouseX * 100) }}
      /
      Y {{ Math.round(mouseY * 100) }}
    </div>
  </main>
</template>

<style scoped>
.landing {
  --mx: calc(var(--mouse-x, 0) * 1px);
  --my: calc(var(--mouse-y, 0) * 1px);

  position: relative;
  width: 100%;
  min-height: 100svh;
  overflow: hidden;

  background:
    radial-gradient(
      circle at 50% 50%,
      rgba(0, 229, 255, 0.08),
      transparent 28%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(139, 92, 246, 0.08),
      transparent 25%
    ),
    #03040a;

  color: #f4f7ff;

  isolation: isolate;
}

/* =========================
   background
========================= */

.landing__particles {
  position: absolute;
  inset: 0;
  z-index: -5;
}

.landing__grid {
  position: absolute;
  inset: -100px;

  z-index: -4;

  background-image:
    linear-gradient(
      rgba(0, 229, 255, 0.055) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(0, 229, 255, 0.055) 1px,
      transparent 1px
    );

  background-size: 50px 50px;

  transform:
    translate(
      calc(var(--mouse-x, 0) * -8px),
      calc(var(--mouse-y, 0) * -8px)
    );

  transition: transform 0.15s linear;

  mask-image:
    radial-gradient(
      circle at center,
      black,
      transparent 75%
    );
}

.landing__scanline {
  position: absolute;
  inset: 0;

  z-index: 20;

  pointer-events: none;

  background:
    repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 3px,
      rgba(255, 255, 255, 0.018) 4px
    );

  opacity: 0.5;
}

.landing__glow {
  position: absolute;

  width: 500px;
  height: 500px;

  border-radius: 50%;

  filter: blur(100px);

  pointer-events: none;

  z-index: -3;

  animation: glow 8s ease-in-out infinite alternate;
}

.landing__glow--cyan {
  left: 15%;
  top: 20%;

  background: rgba(0, 229, 255, 0.08);
}

.landing__glow--purple {
  right: 10%;
  bottom: 10%;

  background: rgba(139, 92, 246, 0.08);

  animation-delay: -4s;
}

/* =========================
   HUD
========================= */

.hud {
  position: absolute;

  left: 36px;
  right: 36px;

  display: flex;

  align-items: center;
  justify-content: space-between;

  font-family: var(--font-mono);

  font-size: 11px;

  letter-spacing: 0.14em;

  color: rgba(174, 181, 202, 0.72);

  z-index: 10;
}

.hud--top {
  top: 30px;
}

.hud--bottom {
  bottom: 26px;
}

.hud__brand {
  display: flex;
  gap: 14px;
  align-items: center;
}

.hud__mark {
  display: grid;
  place-items: center;

  width: 34px;
  height: 34px;

  border: 1px solid rgba(0, 229, 255, 0.5);

  color: #00e5ff;

  font-size: 16px;

  box-shadow:
    0 0 20px rgba(0, 229, 255, 0.1);
}

.hud__title {
  color: #f4f7ff;
}

.hud__sub {
  margin-top: 4px;

  font-size: 9px;

  color: #666d86;
}

.hud__status {
  display: flex;
  gap: 8px;
  align-items: center;
}

.status-dot {
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: #00e5ff;

  box-shadow:
    0 0 12px #00e5ff;

  animation: pulse 1.5s infinite;
}

/* =========================
   side panels
========================= */

.panel {
  position: absolute;

  top: 50%;

  width: 190px;

  padding: 16px;

  border: 1px solid rgba(115, 125, 170, 0.18);

  background:
    linear-gradient(
      135deg,
      rgba(10, 12, 25, 0.75),
      rgba(5, 6, 14, 0.35)
    );

  backdrop-filter: blur(8px);

  font-family: var(--font-mono);

  transform:
    translateY(-50%)
    translate(
      calc(var(--mouse-x, 0) * 4px),
      calc(var(--mouse-y, 0) * 4px)
    );

  transition: transform 0.15s linear;
}

.panel--left {
  left: 42px;
}

.panel--right {
  right: 42px;
}

.panel__label {
  color: #666d86;

  font-size: 9px;

  letter-spacing: 0.18em;
}

.panel__value {
  margin-top: 10px;

  color: #00e5ff;

  font-size: 20px;

  letter-spacing: 0.08em;
}

.panel__line {
  height: 1px;

  margin: 14px 0;

  background:
    linear-gradient(
      90deg,
      rgba(0, 229, 255, 0.4),
      transparent
    );
}

.panel__row {
  display: flex;

  justify-content: space-between;

  gap: 10px;

  margin-top: 9px;

  font-size: 8px;
}

.panel__row span {
  color: #666d86;
}

.panel__row strong {
  color: #aeb5ca;

  font-weight: 500;
}

.panel__metric {
  display: flex;

  align-items: baseline;

  justify-content: space-between;

  margin-top: 12px;
}

.panel__metric span {
  color: #f4f7ff;

  font-size: 22px;
}

.panel__metric small {
  color: #666d86;

  font-size: 8px;
}

/* =========================
   hero
========================= */

.hero {
  position: absolute;

  inset: 0;

  display: grid;

  place-items: center;

  transform:
    translate(
      calc(var(--mouse-x, 0) * 7px),
      calc(var(--mouse-y, 0) * 7px)
    );

  transition: transform 0.15s linear;
}

.hero__content {
  position: relative;

  z-index: 5;

  text-align: center;
}

.hero__eyebrow {
  display: flex;

  justify-content: center;

  gap: 24px;

  margin-bottom: 22px;

  color: #666d86;

  font-family: var(--font-mono);

  font-size: 9px;

  letter-spacing: 0.18em;
}

.hero__eyebrow span:first-child {
  color: #00e5ff;
}

.hero__title {
  position: relative;

  margin: 0;

  font-family: var(--font-sans);

  font-size: clamp(80px, 13vw, 190px);

  font-weight: 900;

  line-height: 0.8;

  letter-spacing: -0.08em;

  color: #f4f7ff;

  text-shadow:
    0 0 30px rgba(0, 229, 255, 0.1),
    0 0 100px rgba(0, 229, 255, 0.05);

  animation:
    titleFloat 5s ease-in-out infinite;
}

.hero__title::before,
.hero__title::after {
  content: attr(data-text);

  position: absolute;

  inset: 0;

  pointer-events: none;

  opacity: 0.7;
}

.hero__title::before {
  color: #00e5ff;

  transform: translate(-2px, 0);

  clip-path: inset(0 0 70% 0);

  animation: glitch 3s infinite;
}

.hero__title::after {
  color: #ff2bd6;

  transform: translate(2px, 0);

  clip-path: inset(70% 0 0 0);

  animation: glitch 2.5s infinite reverse;
}

.hero__role {
  margin-top: 32px;

  color: #00e5ff;

  font-family: var(--font-mono);

  font-size: 14px;

  letter-spacing: 0.32em;
}

.hero__description {
  max-width: 520px;

  margin: 22px auto 34px;

  color: #aeb5ca;

  font-size: 16px;

  line-height: 1.7;
}

/* =========================
   orbit
========================= */

.hero__orbit {
  position: absolute;

  left: 50%;
  top: 50%;

  border: 1px solid rgba(0, 229, 255, 0.12);

  border-radius: 50%;

  transform:
    translate(-50%, -50%)
    rotateX(65deg)
    rotateZ(0deg);
}

.hero__orbit--outer {
  width: min(62vw, 720px);
  height: min(62vw, 720px);

  animation: orbit 28s linear infinite;
}

.hero__orbit--middle {
  width: min(44vw, 520px);
  height: min(44vw, 520px);

  border-color: rgba(139, 92, 246, 0.16);

  animation:
    orbitReverse 20s linear infinite;
}

.hero__orbit--inner {
  width: min(27vw, 320px);
  height: min(27vw, 320px);

  border-color: rgba(255, 43, 214, 0.12);

  animation: orbit 13s linear infinite;
}

.hero__core {
  position: absolute;

  width: 150px;
  height: 150px;

  border-radius: 50%;

  display: grid;

  place-items: center;

  transform:
    translate(
      calc(var(--mouse-x, 0) * -12px),
      calc(var(--mouse-y, 0) * -12px)
    );

  transition: transform 0.15s linear;
}

.hero__core-ring {
  position: absolute;

  inset: 0;

  border-radius: 50%;

  border:
    1px solid rgba(0, 229, 255, 0.4);

  box-shadow:
    0 0 30px rgba(0, 229, 255, 0.08),
    inset 0 0 30px rgba(0, 229, 255, 0.05);

  animation: corePulse 3s ease-in-out infinite;
}

.hero__core-center {
  width: 56px;
  height: 56px;

  display: grid;
  place-items: center;

  border-radius: 50%;

  background: rgba(0, 229, 255, 0.04);

  border: 1px solid rgba(0, 229, 255, 0.5);

  color: #00e5ff;

  font-family: var(--font-mono);

  font-size: 22px;

  box-shadow:
    0 0 25px rgba(0, 229, 255, 0.2);
}

/* =========================
   button
========================= */

.enter {
  display: inline-flex;

  align-items: center;

  gap: 14px;

  padding: 13px 22px;

  border: 1px solid rgba(0, 229, 255, 0.55);

  background: rgba(0, 229, 255, 0.035);

  color: #00e5ff;

  font-family: var(--font-mono);

  font-size: 11px;

  letter-spacing: 0.16em;

  cursor: pointer;

  transition:
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.enter:hover {
  background: rgba(0, 229, 255, 0.1);

  box-shadow:
    0 0 30px rgba(0, 229, 255, 0.16);

  transform: translateY(-3px);
}

.enter__line {
  width: 28px;

  height: 1px;

  background: rgba(0, 229, 255, 0.5);

  transition: width 0.2s ease;
}

.enter:hover .enter__line {
  width: 40px;
}

.enter__arrow {
  font-size: 16px;
}

/* =========================
   corners
========================= */

.corner {
  position: absolute;

  width: 32px;
  height: 32px;

  z-index: 10;

  opacity: 0.45;
}

.corner--tl {
  left: 20px;
  top: 20px;

  border-left: 1px solid #00e5ff;
  border-top: 1px solid #00e5ff;
}

.corner--tr {
  right: 20px;
  top: 20px;

  border-right: 1px solid #00e5ff;
  border-top: 1px solid #00e5ff;
}

.corner--bl {
  left: 20px;
  bottom: 20px;

  border-left: 1px solid #00e5ff;
  border-bottom: 1px solid #00e5ff;
}

.corner--br {
  right: 20px;
  bottom: 20px;

  border-right: 1px solid #00e5ff;
  border-bottom: 1px solid #00e5ff;
}

.coordinates {
  position: absolute;

  right: 42px;
  bottom: 50px;

  color: #4f566d;

  font-family: var(--font-mono);

  font-size: 8px;

  letter-spacing: 0.1em;
}

/* =========================
   animations
========================= */

@keyframes pulse {
  0%,
  100% {
    opacity: 0.35;
  }

  50% {
    opacity: 1;
  }
}

@keyframes glow {
  from {
    transform: scale(0.9);
    opacity: 0.4;
  }

  to {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

@keyframes orbit {
  from {
    transform:
      translate(-50%, -50%)
      rotateX(65deg)
      rotateZ(0deg);
  }

  to {
    transform:
      translate(-50%, -50%)
      rotateX(65deg)
      rotateZ(360deg);
  }
}

@keyframes orbitReverse {
  from {
    transform:
      translate(-50%, -50%)
      rotateX(65deg)
      rotateZ(360deg);
  }

  to {
    transform:
      translate(-50%, -50%)
      rotateX(65deg)
      rotateZ(0deg);
  }
}

@keyframes corePulse {
  0%,
  100% {
    transform: scale(0.92);
    opacity: 0.5;
  }

  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

@keyframes titleFloat {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

@keyframes glitch {
  0%,
  92%,
  100% {
    clip-path: inset(0 0 100% 0);
  }

  94% {
    clip-path: inset(20% 0 50% 0);
  }

  96% {
    clip-path: inset(70% 0 10% 0);
  }
}

/* =========================
   responsive
========================= */

@media (max-width: 900px) {
  .panel {
    display: none;
  }

  .hud {
    left: 20px;
    right: 20px;
  }

  .hero__orbit--outer {
    width: 85vw;
    height: 85vw;
  }

  .hero__orbit--middle {
    width: 65vw;
    height: 65vw;
  }

  .hero__orbit--inner {
    width: 45vw;
    height: 45vw;
  }
}

@media (max-width: 600px) {
  .hud__sub {
    display: none;
  }

  .hud__status {
    font-size: 8px;
  }

  .hero__eyebrow {
    flex-direction: column;
    gap: 5px;
  }

  .hero__title {
    font-size: clamp(58px, 19vw, 110px);
  }

  .hero__role {
    font-size: 10px;
    letter-spacing: 0.2em;
  }

  .hero__description {
    width: calc(100vw - 48px);
    font-size: 14px;
  }

  .hero__core {
    width: 110px;
    height: 110px;
  }

  .hero__core-center {
    width: 42px;
    height: 42px;
    font-size: 16px;
  }

  .hud--bottom {
    font-size: 8px;
  }

  .hud--bottom span:nth-child(2) {
    display: none;
  }

  .coordinates {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .landing *,
  .landing *::before,
  .landing *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
</style>