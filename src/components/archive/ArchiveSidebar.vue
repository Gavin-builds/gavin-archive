<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

interface NavigationItem {
  labelKey: string
  path: string
  number: string
}

const router = useRouter()
const route = useRoute()

const { t } = useI18n()

const navigationGroups = [
  {
    titleKey: 'sidebar.system',
    items: [
      {
        labelKey: 'nav.profile',
        path: '/archive/profile',
        number: '01',
      },
    ],
  },
  {
    titleKey: 'sidebar.work',
    items: [
      {
        labelKey: 'nav.projects',
        path: '/archive/projects',
        number: '02',
      },
      {
        labelKey: 'nav.lab',
        path: '/archive/lab',
        number: '03',
      },
    ],
  },
  {
    titleKey: 'sidebar.log',
    items: [
      {
        labelKey: 'nav.blog',
        path: '/archive/blog',
        number: '04',
      },
    ],
  },
  {
    titleKey: 'sidebar.network',
    items: [
      {
        labelKey: 'nav.github',
        path: '/archive/github',
        number: '05',
      },
      {
        labelKey: 'nav.about',
        path: '/archive/about',
        number: '06',
      },
    ],
  },
]

const isActive = (item: NavigationItem) => {
  if (item.path === '/') {
    return route.path === '/'
  }

  return route.path === item.path || route.path.startsWith(`${item.path}/`)
}

const currentPath = computed(() => route.path)

function navigate(path: string) {
  if (currentPath.value !== path) {
    router.push(path)
  }
}
</script>

<template>
  <aside class="archive-sidebar">
    <div class="sidebar-inner">
      <div
        v-for="group in navigationGroups"
        :key="group.titleKey"
        class="nav-group"
      >
        <div class="group-title">
          <span class="group-line"></span>
          <span class="group-name">{{ t(group.titleKey) }}</span>
        </div>

        <nav class="nav-list">
          <button
            v-for="item in group.items"
            :key="item.path"
            class="nav-item"
            :class="{ active: isActive(item) }"
            type="button"
            @click="navigate(item.path)"
          >
            <span class="nav-number">
              {{ item.number }}
            </span>

            <span class="nav-label" :data-text="t(item.labelKey)">
              {{ t(item.labelKey) }}
            </span>

            <span class="nav-arrow">
              →
            </span>
          </button>
        </nav>
      </div>
    </div>

    <div class="sidebar-bottom">
      <div class="archive-index">
        <span>{{ t('sidebar.archiveIndex') }}</span>
        <span>{{ t('sidebar.modules') }}</span>
      </div>

      <div class="sidebar-decoration">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.archive-sidebar {
  min-height: 0;

  display: flex;
  flex-direction: column;

  border-right: 1px solid var(--line);

  background:
    linear-gradient(
      180deg,
      rgba(var(--accent-rgb), 0.018),
      transparent 35%,
      rgba(var(--pink-rgb), 0.018)
    ),
    var(--surface);

  position: relative;
}


/* ========================================
 * Neon vertical line
 * ======================================== */

.archive-sidebar::after {
  content: "";

  position: absolute;

  top: 0;
  right: -1px;

  width: 1px;
  height: 120px;

  background:
    linear-gradient(
      transparent,
      var(--accent),
      transparent
    );

  box-shadow:
    0 0 10px rgba(var(--accent-rgb), 0.5);

  pointer-events: none;
}


/* ========================================
 * Navigation
 * ======================================== */

.sidebar-inner {
  flex: 1;
  min-height: 0;

  padding: 32px 18px;

  overflow-y: auto;
}

.nav-group {
  margin-bottom: 34px;
}

.group-title {
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 10px;

  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: var(--fs-body);
  font-weight: 700;

  letter-spacing: 0.18em;
}

.group-line {
  width: 24px;
  height: 1px;

  background: var(--line-strong);
}


/* ========================================
 * Nav item
 * ======================================== */

.nav-list {
  display: flex;
  flex-direction: column;

  gap: 3px;
}

.nav-item {
  position: relative;

  width: 100%;
  height: 46px;

  display: grid;

  grid-template-columns: 34px 1fr 24px;

  align-items: center;

  padding: 0 12px;

  border: 1px solid transparent;

  background: transparent;

  color: var(--text-secondary);

  cursor: pointer;

  text-align: left;

  overflow: hidden;

  transition:
    color var(--transition-fast),
    background var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.nav-item:hover {
  color: var(--text);

  background: rgba(var(--accent-rgb), 0.035);

  border-color: var(--line);

  box-shadow:
    inset 2px 0 0 rgba(var(--accent-rgb), 0.35);
}

.nav-item.active {
  color: var(--accent);

  background:
    linear-gradient(
      90deg,
      rgba(var(--accent-rgb), 0.10),
      rgba(var(--accent-rgb), 0.025)
    );

  border-color: var(--accent-line);

  box-shadow:
    inset 3px 0 0 var(--accent),
    0 0 18px rgba(var(--accent-rgb), 0.035);
}


/* ========================================
 * Cyber interactions: scan sweep / energy line
 * ======================================== */

.nav-item::before {
  content: "";

  position: absolute;
  inset: 0;

  background: linear-gradient(
    100deg,
    transparent 0%,
    rgba(var(--accent-rgb), 0.16) 50%,
    transparent 100%
  );

  opacity: 0;

  pointer-events: none;
}

.nav-item:not(.active):hover::before {
  animation: nav-sweep 0.65s ease;
}

.nav-item.active::before {
  opacity: 1;

  animation: nav-sweep-active 2.8s linear infinite;
}

.nav-item::after {
  content: "";

  position: absolute;
  left: 0;
  bottom: 0;

  width: 0;
  height: 1px;

  background: linear-gradient(90deg, var(--accent), transparent);

  box-shadow: 0 0 6px rgba(var(--accent-rgb), 0.7);

  transition: width var(--transition-normal);
}

.nav-item:not(.active):hover::after {
  width: 62%;
}

.nav-item.active::after {
  width: 100%;
}


/* ========================================
 * Number flicker / active glow
 * ======================================== */

.nav-item:not(.active):hover .nav-number {
  color: var(--accent);

  animation: nav-number-flicker 0.5s ease;
}

.nav-item.active .nav-number {
  animation: nav-number-glow 2.4s ease-in-out infinite;
}


/* ========================================
 * Label RGB glitch split
 * ======================================== */

.nav-label {
  position: relative;
}

.nav-label::before,
.nav-label::after {
  content: attr(data-text);

  position: absolute;
  inset: 0;

  opacity: 0;

  pointer-events: none;
}

.nav-item:hover .nav-label::before {
  opacity: 0.85;

  color: var(--accent);

  animation: nav-glitch-a 0.4s steps(2, end) infinite;
}

.nav-item:hover .nav-label::after {
  opacity: 0.85;

  color: var(--accent-secondary);

  animation: nav-glitch-b 0.34s steps(2, end) infinite;
}


/* ========================================
 * Group title terminal cursor
 * ======================================== */

.group-name::after {
  content: "_";

  margin-left: 6px;

  color: var(--accent);

  animation: nav-cursor-blink 1.1s steps(1, end) infinite;
}


/* ========================================
 * Bottom indicator breathing
 * ======================================== */

.sidebar-decoration span:first-child {
  animation: nav-dot-breathe 2.2s ease-in-out infinite;
}


@keyframes nav-sweep {
  from {
    transform: translateX(-130%) skewX(-14deg);

    opacity: 0;
  }

  30% {
    opacity: 1;
  }

  to {
    transform: translateX(240%) skewX(-14deg);

    opacity: 0;
  }
}

@keyframes nav-sweep-active {
  0% {
    transform: translateX(-140%) skewX(-14deg);
  }

  45%,
  100% {
    transform: translateX(240%) skewX(-14deg);
  }
}

@keyframes nav-number-flicker {
  0%,
  100% {
    opacity: 1;
  }

  25% {
    opacity: 0.35;

    text-shadow: 0 0 8px rgba(var(--accent-rgb), 0.9);
  }

  55% {
    opacity: 1;
  }

  70% {
    opacity: 0.5;
  }
}

@keyframes nav-number-glow {
  0%,
  100% {
    text-shadow: none;
  }

  50% {
    text-shadow: 0 0 10px rgba(var(--pink-rgb), 0.8);
  }
}

@keyframes nav-glitch-a {
  0% {
    clip-path: inset(0 0 78% 0);

    transform: translate(-2px, -1px);
  }

  25% {
    clip-path: inset(58% 0 12% 0);

    transform: translate(2px, 1px);
  }

  50% {
    clip-path: inset(18% 0 56% 0);

    transform: translate(-1px, 0);
  }

  75% {
    clip-path: inset(80% 0 0 0);

    transform: translate(2px, -1px);
  }

  100% {
    clip-path: inset(0 0 55% 0);

    transform: translate(-2px, 1px);
  }
}

@keyframes nav-glitch-b {
  0% {
    clip-path: inset(62% 0 8% 0);

    transform: translate(2px, 1px);
  }

  30% {
    clip-path: inset(8% 0 72% 0);

    transform: translate(-2px, 0);
  }

  60% {
    clip-path: inset(78% 0 4% 0);

    transform: translate(1px, -1px);
  }

  100% {
    clip-path: inset(30% 0 42% 0);

    transform: translate(-1px, 1px);
  }
}

@keyframes nav-cursor-blink {
  0%,
  55% {
    opacity: 1;
  }

  56%,
  100% {
    opacity: 0;
  }
}

@keyframes nav-dot-breathe {
  0%,
  100% {
    box-shadow: 0 0 4px var(--accent);
  }

  50% {
    box-shadow: 0 0 12px var(--accent);
  }
}


/* ========================================
 * Number
 * ======================================== */

.nav-number {
  font-family: var(--font-mono);

  font-size: var(--fs-md);

  color: var(--text-muted);
}

.nav-item.active .nav-number {
  color: var(--accent-secondary);
}


/* ========================================
 * Label
 * ======================================== */

.nav-label {
  font-family: var(--font-mono);

  font-size: var(--fs-base);
  font-weight: 650;

  letter-spacing: 0.12em;
}


/* ========================================
 * Arrow
 * ======================================== */

.nav-arrow {
  opacity: 0;

  color: var(--accent);

  font-family: var(--font-mono);
  font-size: var(--fs-body);

  transform: translateX(-5px);

  transition:
    opacity var(--transition-fast),
    transform var(--transition-fast);
}

.nav-item:hover .nav-arrow,
.nav-item.active .nav-arrow {
  opacity: 1;

  transform: translateX(0);
}


/* ========================================
 * Bottom
 * ======================================== */

.sidebar-bottom {
  padding: 18px;

  border-top: 1px solid var(--line);
}

.archive-index {
  display: flex;
  justify-content: space-between;

  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: var(--fs-sm);

  letter-spacing: 0.08em;
}

.sidebar-decoration {
  display: flex;

  gap: 4px;

  margin-top: 14px;
}

.sidebar-decoration span {
  display: block;

  width: 5px;
  height: 5px;

  background: var(--line);
}

.sidebar-decoration span:first-child {
  background: var(--accent);

  box-shadow: 0 0 8px var(--accent);
}

.sidebar-decoration span:nth-child(3) {
  background: var(--accent-secondary);
}


/* ========================================
 * Mobile
 * ======================================== */

@media (max-width: 768px) {
  .archive-sidebar {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .archive-sidebar::after {
    display: none;
  }

  .sidebar-inner {
    padding: 9px 12px;

    overflow-x: auto;
  }

  .nav-group {
    margin: 0;
  }

  .group-title,
  .sidebar-bottom {
    display: none;
  }

  .nav-list {
    flex-direction: row;

    gap: 4px;
  }

  .nav-item {
    width: auto;
    min-width: max-content;

    height: 42px;

    grid-template-columns: auto 1fr auto;

    gap: 8px;
  }

  .nav-arrow {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-item::before,
  .nav-item::after,
  .nav-label::before,
  .nav-label::after,
  .nav-number,
  .group-name::after,
  .sidebar-decoration span:first-child {
    animation: none !important;
  }

  .nav-label::before,
  .nav-label::after {
    display: none;
  }

  .nav-item::after {
    transition: none;
  }
}
</style>