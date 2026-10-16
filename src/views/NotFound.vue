<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="page">
    <div class="frame">
      <!-- corner brackets -->
      <span class="corner corner--tl" aria-hidden="true" />
      <span class="corner corner--tr" aria-hidden="true" />
      <span class="corner corner--bl" aria-hidden="true" />
      <span class="corner corner--br" aria-hidden="true" />

      <!-- scan line -->
      <div class="scanline" aria-hidden="true" />

      <div class="error-code">
        <span class="error-code__glitch" data-text="404">404</span>
      </div>

      <div class="eyebrow">
        <span class="eyebrow__dot" />
        {{ t('notFound.eyebrow') }}
      </div>

      <h1>
        {{ t('notFound.title') }}
      </h1>

      <p>
        {{ t('notFound.description') }}
      </p>

      <button type="button" @click="goHome">
        {{ t('notFound.returnToIndex') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 80vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px 20px;
}

.frame {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  padding: 64px 48px;

  border: 1px solid var(--line);
  background:
    radial-gradient(
      circle at 50% 0%,
      rgba(var(--accent-rgb), 0.06),
      transparent 60%
    ),
    var(--surface);

  max-width: 600px;
  width: 100%;
}

/* ---- corner brackets ---- */
.corner {
  position: absolute;

  width: 18px;
  height: 18px;

  pointer-events: none;
}

.corner::before,
.corner::after {
  content: "";
  position: absolute;

  background: var(--accent);
  box-shadow: 0 0 6px rgba(var(--accent-rgb), 0.6);
}

.corner::before {
  width: 18px;
  height: 1px;
}

.corner::after {
  width: 1px;
  height: 18px;
}

.corner--tl { top: -1px; left: -1px; }
.corner--tl::before { top: 0; left: 0; }
.corner--tl::after { top: 0; left: 0; }

.corner--tr { top: -1px; right: -1px; }
.corner--tr::before { top: 0; right: 0; }
.corner--tr::after { top: 0; right: 0; }

.corner--bl { bottom: -1px; left: -1px; }
.corner--bl::before { bottom: 0; left: 0; }
.corner--bl::after { bottom: 0; left: 0; }

.corner--br { bottom: -1px; right: -1px; }
.corner--br::before { bottom: 0; right: 0; }
.corner--br::after { bottom: 0; right: 0; }

/* ---- scan line ---- */
.scanline {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;

  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--accent-rgb), 0.5),
    transparent
  );

  animation: scan 4s ease-in-out infinite;

  pointer-events: none;
}

/* ---- error code ---- */
.error-code {
  position: relative;

  font-family: var(--font-mono);
  font-size: clamp(80px, 16vw, 140px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;

  color: var(--accent);

  text-shadow:
    0 0 12px rgba(var(--accent-rgb), 0.6),
    0 0 40px rgba(var(--accent-rgb), 0.2);
}

.error-code__glitch {
  position: relative;
  display: inline-block;
}

.error-code__glitch::before,
.error-code__glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;

  opacity: 0;
}

.error-code__glitch::before {
  color: var(--accent-secondary);
  animation: glitch-top 3.2s steps(1) infinite;
  clip-path: inset(0 0 65% 0);
}

.error-code__glitch::after {
  color: var(--accent-purple);
  animation: glitch-bottom 3.2s steps(1) infinite;
  clip-path: inset(65% 0 0 0);
}

/* ---- eyebrow ---- */
.eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-top: 24px;

  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.eyebrow__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;

  background: var(--accent-secondary);
  box-shadow: 0 0 8px rgba(var(--pink-rgb), 0.7);

  animation: blink 1.8s ease-in-out infinite;
}

/* ---- heading ---- */
h1 {
  margin: 16px 0 0;

  font-size: clamp(28px, 5vw, 42px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.03em;
}

/* ---- description ---- */
p {
  margin: 16px 0 0;

  color: var(--text-secondary);
  font-size: var(--fs-lg);
  line-height: 1.7;

  max-width: 420px;
}

/* ---- button ---- */
button {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  margin-top: 36px;
  padding: 12px 20px;

  border: 1px solid var(--accent-line);
  background: var(--accent-soft);

  color: var(--accent);

  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  letter-spacing: 0.1em;

  cursor: pointer;

  transition:
    border-color var(--transition-fast),
    color var(--transition-fast),
    background var(--transition-fast),
    box-shadow var(--transition-fast);
}

button:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
  box-shadow: 0 0 16px rgba(var(--accent-rgb), 0.3);
}

.btn__icon {
  font-size: 14px;
  transition: transform var(--transition-fast);
}

button:hover .btn__icon {
  transform: translateX(-3px);
}

/* ---- animations ---- */
@keyframes scan {
  0% {
    top: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

@keyframes glitch-top {
  0%, 88%, 100% {
    opacity: 0;
  }
  89% {
    opacity: 0.8;
    transform: translate(-3px, -1px);
  }
  90% {
    opacity: 0;
  }
  93% {
    opacity: 0.6;
    transform: translate(2px, 1px);
  }
  94% {
    opacity: 0;
  }
}

@keyframes glitch-bottom {
  0%, 91%, 100% {
    opacity: 0;
  }
  92% {
    opacity: 0.7;
    transform: translate(3px, 1px);
  }
  93% {
    opacity: 0;
  }
  96% {
    opacity: 0.5;
    transform: translate(-2px, -1px);
  }
  97% {
    opacity: 0;
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

/* ---- responsive ---- */
@media (max-width: 600px) {
  .frame {
    padding: 48px 24px;
  }
}

/* ---- reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  .scanline,
  .error-code__glitch::before,
  .error-code__glitch::after,
  .eyebrow__dot {
    animation: none;
  }

  .error-code__glitch::before,
  .error-code__glitch::after {
    opacity: 0;
  }

  button:hover .btn__icon {
    transform: none;
  }
}
</style>
