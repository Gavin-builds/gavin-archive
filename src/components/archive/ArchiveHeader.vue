<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import ThemeToggle from "./ThemeToggle.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();

const { t } = useI18n();

defineProps<{
  currentPage: string;
}>();

const now = ref(new Date());

let timer: number | undefined;

const currentTime = computed(() => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now.value);
});

const currentDate = computed(() => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now.value);
});

const handleClickBrand = () => {
  router.push("/");
};

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  if (timer) {
    window.clearInterval(timer);
  }
});
</script>

<template>
  <header class="archive-header">
    <div class="header-brand">
      <div class="brand-mark" @click="handleClickBrand">
        <img class="brand-mark__img" src="/favicon.svg" alt="GA" />
      </div>

      <div class="brand-info">
        <div class="brand-name" data-text="GAVIN ARCHIVE">GAVIN ARCHIVE</div>

        <div class="brand-subtitle">{{ t("archive.headerSubtitle") }}</div>
      </div>
    </div>

    <div class="header-center">
      <span class="header-label">{{ t("common.current") }}</span>
      <span
        class="header-page"
        :key="currentPage"
        :data-text="currentPage === '404' ? '404' : t(currentPage)"
      >{{
        currentPage === "404" ? "404" : t(currentPage)
      }}</span>
    </div>

    <div class="header-status">
      <div class="status-item">
        <ThemeToggle />

        <LanguageSwitcher />

        <div class="status-item">
          <span class="status-dot" />
          {{ t("common.online") }}
        </div>
      </div>

      <div class="header-time">
        <span>{{ currentDate }}</span>
        <span>{{ currentTime }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.archive-header {
  height: 78px;
  flex-shrink: 0;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  padding: 0 32px;

  border-bottom: 1px solid var(--line);
  background:
    linear-gradient(
      90deg,
      rgba(var(--accent-rgb), 0.025),
      transparent 40%,
      rgba(var(--pink-rgb), 0.025)
    ),
    var(--surface);

  position: relative;
  z-index: 20;
}

/* HUD top line: traveling energy beam */

.archive-header::before {
  content: "";

  position: absolute;
  top: 0;
  left: 0;

  width: 200px;
  height: 1px;

  background: linear-gradient(
    90deg,
    transparent,
    var(--accent),
    transparent
  );

  box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.6);

  opacity: 0.75;

  animation: header-beam 5.5s linear infinite;
}

/* ========================================
 * Brand
 * ======================================== */

.header-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 40px;
  height: 40px;

  display: grid;
  place-items: center;

  border: 1px solid var(--accent);

  color: var(--accent);

  font-family: var(--font-mono);
  font-size: var(--fs-md);
  font-weight: 800;
  letter-spacing: 0.08em;

  box-shadow: var(--glow-cyan);

  position: relative;
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }
}

.brand-mark__img {
  width: 100%;
  height: 100%;

  object-fit: contain;
}

.brand-mark::after {
  content: "";

  position: absolute;

  width: 6px;
  height: 6px;

  right: -3px;
  bottom: -3px;

  background: var(--accent-secondary);
}

/* conic scan ring on hover */
.brand-mark::before {
  content: "";

  position: absolute;
  inset: -5px;

  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 250deg,
    rgba(var(--accent-rgb), 0.9) 310deg,
    transparent 360deg
  );

  opacity: 0;

  pointer-events: none;
}

.brand-mark:hover::before {
  opacity: 1;

  animation: header-scan-ring 0.85s linear infinite;
}

.brand-mark:hover {
  box-shadow:
    var(--glow-cyan),
    0 0 18px rgba(var(--pink-rgb), 0.35);
}

/* ========================================
 * Brand text
 * ======================================== */

.brand-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brand-name {
  position: relative;

  color: var(--text);

  font-family: var(--font-mono);
  font-size: var(--fs-md);
  font-weight: 800;

  letter-spacing: 0.14em;

  animation: header-flicker 7s linear infinite;
}

.brand-name::before,
.brand-name::after {
  content: attr(data-text);

  position: absolute;
  inset: 0;

  opacity: 0;

  pointer-events: none;
}

.header-brand:hover .brand-name::before {
  opacity: 0.85;

  color: var(--accent);

  animation: header-brand-glitch-a 0.4s steps(2, end) infinite;
}

.header-brand:hover .brand-name::after {
  opacity: 0.85;

  color: var(--accent-secondary);

  animation: header-brand-glitch-b 0.34s steps(2, end) infinite;
}

.brand-subtitle {
  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: var(--fs-md);

  letter-spacing: 0.12em;
}

/* ========================================
 * Current page
 * ======================================== */

.header-center {
  display: flex;
  align-items: center;
  gap: 12px;

  font-family: var(--font-mono);
  font-size: var(--fs-md);

  letter-spacing: 0.12em;
}

.header-label {
  color: var(--text-muted);
}

.header-page {
  position: relative;

  color: var(--accent);

  text-shadow: 0 0 12px rgba(var(--accent-rgb), 0.45);

  animation: header-page-boot 0.55s steps(6, end) both;
}

.header-page::before {
  content: attr(data-text);

  position: absolute;
  inset: 0;

  color: var(--accent-secondary);

  pointer-events: none;

  animation: header-page-chromatic 0.55s ease both;
}

/* ========================================
 * Status
 * ======================================== */

.header-status {
  justify-self: end;

  display: flex;
  align-items: center;
  gap: 28px;

  font-family: var(--font-mono);
  font-size: var(--fs-md);

  letter-spacing: 0.08em;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;

  color: var(--accent);
}

.status-dot {
  position: relative;

  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: var(--accent);

  box-shadow: var(--glow-cyan);

  animation: header-dot-pulse 1.6s ease-in-out infinite;
}

.status-dot::after {
  content: "";

  position: absolute;
  inset: -3px;

  border: 1px solid var(--accent);
  border-radius: 50%;

  animation: header-radar-ping 2.4s ease-out infinite;
}

.header-time {
  display: flex;
  gap: 12px;

  color: var(--text-muted);

  animation: header-time-flicker 6s linear infinite;
}

/* ========================================
 * Cyber interaction keyframes
 * ======================================== */

@keyframes header-beam {
  from {
    transform: translateX(-220px);
  }

  to {
    transform: translateX(calc(100vw + 220px));
  }
}

@keyframes header-scan-ring {
  to {
    transform: rotate(360deg);
  }
}

@keyframes header-flicker {
  0%,
  92%,
  100% {
    opacity: 1;
  }

  93% {
    opacity: 0.55;
  }

  94% {
    opacity: 1;
  }

  96% {
    opacity: 0.75;
  }
}

@keyframes header-brand-glitch-a {
  0% {
    clip-path: inset(0 0 70% 0);

    transform: translate(-2px, -1px);
  }

  25% {
    clip-path: inset(55% 0 15% 0);

    transform: translate(2px, 1px);
  }

  50% {
    clip-path: inset(20% 0 50% 0);

    transform: translate(-1px, 0);
  }

  75% {
    clip-path: inset(75% 0 0 0);

    transform: translate(2px, -1px);
  }

  100% {
    clip-path: inset(0 0 60% 0);

    transform: translate(-2px, 1px);
  }
}

@keyframes header-brand-glitch-b {
  0% {
    clip-path: inset(60% 0 10% 0);

    transform: translate(2px, 1px);
  }

  30% {
    clip-path: inset(10% 0 70% 0);

    transform: translate(-2px, 0);
  }

  60% {
    clip-path: inset(75% 0 5% 0);

    transform: translate(1px, -1px);
  }

  100% {
    clip-path: inset(30% 0 40% 0);

    transform: translate(-1px, 1px);
  }
}

@keyframes header-page-boot {
  0% {
    opacity: 0;

    transform: translateX(10px);

    filter: blur(2px);
  }

  55% {
    opacity: 1;

    transform: translateX(-3px);
  }

  100% {
    opacity: 1;

    transform: translateX(0);

    filter: blur(0);
  }
}

@keyframes header-page-chromatic {
  0% {
    opacity: 0.9;

    transform: translateX(-3px);

    clip-path: inset(0 0 65% 0);
  }

  45% {
    opacity: 0.7;

    transform: translateX(3px);

    clip-path: inset(60% 0 5% 0);
  }

  100% {
    opacity: 0;

    transform: translateX(0);

    clip-path: inset(0 0 100% 0);
  }
}

@keyframes header-dot-pulse {
  0%,
  100% {
    opacity: 0.55;
  }

  50% {
    opacity: 1;
  }
}

@keyframes header-radar-ping {
  from {
    transform: scale(0.6);

    opacity: 0.9;
  }

  to {
    transform: scale(2.8);

    opacity: 0;
  }
}

@keyframes header-time-flicker {
  0%,
  96%,
  100% {
    opacity: 1;
  }

  97% {
    opacity: 0.45;
  }

  98% {
    opacity: 1;
  }

  99% {
    opacity: 0.7;
  }
}

/* ========================================
 * Mobile
 * ======================================== */

@media (max-width: 768px) {
  .archive-header {
    height: 68px;

    grid-template-columns: auto 1fr auto;

    padding: 0 16px;
  }

  .brand-subtitle,
  .header-center {
    display: none;
  }

  .brand-name {
    font-size: var(--fs-md);
  }

  .brand-mark {
    width: 32px;
    height: 32px;
  }

  .header-status {
    gap: 0;
  }

  .status-item span:last-child {
    display: none;
  }

  .header-time {
    flex-direction: column;
    gap: 1px;

    text-align: right;
  }
}

@media (prefers-reduced-motion: reduce) {
  .archive-header::before,
  .brand-mark::before,
  .brand-name,
  .brand-name::before,
  .brand-name::after,
  .header-page,
  .header-page::before,
  .status-dot,
  .status-dot::after,
  .header-time {
    animation: none !important;
  }

  .brand-name::before,
  .brand-name::after,
  .header-page::before,
  .status-dot::after {
    display: none;
  }
}
</style>
