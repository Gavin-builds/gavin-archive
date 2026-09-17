<script setup lang="ts">
import { computed } from 'vue'
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

      <!-- 扫描线 / 暗角 -->
      <div class="glt__scanlines" />
      <div class="glt__vignette" />

      <!-- 中央终端信息 -->
      <div class="glt__hud">
        <div class="glt__code">
          SYS::UPLINK &gt; ARCHIVE/PROFILE
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
