<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

import LanguageSwitcher from "./LanguageSwitcher.vue";
import ThemeToggle from "./ThemeToggle.vue";

interface NavLink {
  labelKey: string;
  path: string;
}

const navLinks: NavLink[] = [
  { labelKey: "nav.profile", path: "/archive/profile" },
  { labelKey: "nav.projects", path: "/archive/projects" },
  { labelKey: "nav.lab", path: "/archive/lab" },
  { labelKey: "nav.blog", path: "/archive/blog" },
  { labelKey: "nav.github", path: "/archive/github" },
  { labelKey: "nav.about", path: "/archive/about" },
];

const route = useRoute();

const { t } = useI18n();

const menuOpen = ref(false);

const isActive = (path: string) =>
  route.path === path || route.path.startsWith(`${path}/`);

// 路由切换后自动收起移动端菜单
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  },
);
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <RouterLink class="site-brand" to="/">
        <span class="site-brand__mark">
          <img src="/favicon.svg" alt="" />
        </span>

        <span class="site-brand__name" data-text="GAVIN ARCHIVE">GAVIN ARCHIVE</span>

        <span class="site-brand__cursor" aria-hidden="true">_</span>
      </RouterLink>

      <nav class="site-nav" aria-label="Primary">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="site-nav__link"
          :class="{ 'is-active': isActive(link.path) }"
        >
          {{ t(link.labelKey) }}
        </RouterLink>
      </nav>

      <div class="site-tools">
        <ThemeToggle />

        <LanguageSwitcher />

        <button
          class="site-menu-btn"
          type="button"
          :class="{ 'is-open': menuOpen }"
          :aria-expanded="menuOpen"
          :aria-label="t('common.menu')"
          @click="menuOpen = !menuOpen"
        >
          <span />

          <span />
        </button>
      </div>
    </div>

    <nav v-if="menuOpen" class="site-mobile-nav" aria-label="Mobile">
      <RouterLink
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        class="site-mobile-nav__link"
        :class="{ 'is-active': isActive(link.path) }"
      >
        {{ t(link.labelKey) }}
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;

  border-bottom: 1px solid var(--line);

  background: var(--control-bg-solid);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

/* 底边两端的终端端点：青 / 品红 */
.site-header::before,
.site-header::after {
  content: "";

  position: absolute;
  bottom: -1px;

  width: 42px;
  height: 2px;

  pointer-events: none;
}

.site-header::before {
  left: 0;

  background: var(--accent);

  box-shadow: 0 0 8px rgba(var(--accent-rgb), 0.7);
}

.site-header::after {
  right: 0;

  background: var(--accent-secondary);

  box-shadow: 0 0 8px rgba(var(--pink-rgb), 0.7);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 1180px;
  height: 62px;
  margin: 0 auto;
  padding: 0 32px;
}

/* Brand */

.site-brand {
  display: flex;
  align-items: center;
  gap: 10px;

  text-decoration: none;

  color: var(--text);
}

/* 方形扫描框 Logo */
.site-brand__mark {
  position: relative;

  display: grid;
  place-items: center;

  width: 28px;
  height: 28px;

  border: 1px solid var(--accent);

  transition: box-shadow var(--transition-fast);
}

.site-brand__mark img {
  width: 17px;
  height: 17px;
}

/* 右下角标 */
.site-brand__mark::after {
  content: "";

  position: absolute;
  right: -3px;
  bottom: -3px;

  width: 5px;
  height: 5px;

  background: var(--accent-secondary);
}

/* hover 旋转扫描环（conic 渐变，仅在小元素上） */
.site-brand__mark::before {
  content: "";

  position: absolute;
  inset: -4px;

  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    var(--accent) 70deg,
    transparent 130deg
  );

  opacity: 0;

  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;

  padding: 1px;

  pointer-events: none;
}

.site-brand:hover .site-brand__mark {
  box-shadow:
    0 0 8px rgba(var(--accent-rgb), 0.55),
    0 0 16px rgba(var(--accent-rgb), 0.2);
}

.site-brand:hover .site-brand__mark::before {
  opacity: 1;

  animation: header-scan-ring 0.9s linear infinite;
}

.site-brand__name {
  position: relative;

  font-family: var(--font-mono);
  font-size: var(--fs-md);
  font-weight: 700;
  letter-spacing: 0.18em;

  transition: color var(--transition-fast);
}

.site-brand:hover .site-brand__name {
  color: var(--accent);
}

/* RGB 故障残影（仅 hover，小文字） */
.site-brand__name::before,
.site-brand__name::after {
  content: attr(data-text);

  position: absolute;
  inset: 0;

  opacity: 0;

  pointer-events: none;
}

.site-brand:hover .site-brand__name::before {
  color: var(--accent);

  animation: header-glitch-a 0.4s steps(2, end) infinite;
}

.site-brand:hover .site-brand__name::after {
  color: var(--accent-secondary);

  animation: header-glitch-b 0.34s steps(2, end) infinite;
}

/* 闪烁的终端光标 */
.site-brand__cursor {
  color: var(--accent);

  font-family: var(--font-mono);
  font-size: var(--fs-md);
  line-height: 1;

  animation: header-cursor-blink 1.1s steps(1) infinite;
}

/* Desktop navigation */

.site-nav {
  display: flex;
  align-items: center;
  gap: 2px;
}

.site-nav__link {
  position: relative;

  padding: 8px 12px;

  color: var(--text-muted);

  font-size: var(--fs-base);
  text-decoration: none;
  letter-spacing: 0.02em;

  transition:
    color var(--transition-fast),
    text-shadow var(--transition-fast);
}

/* 终端风格下划线 */
.site-nav__link::after {
  content: "";

  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 3px;

  height: 1px;

  background: var(--accent);

  box-shadow: 0 0 6px rgba(var(--accent-rgb), 0.6);

  transform: scaleX(0);
  transform-origin: left center;

  transition: transform var(--transition-normal);
}

.site-nav__link:hover {
  color: var(--text);
}

.site-nav__link.is-active {
  color: var(--text);

  text-shadow: 0 0 10px rgba(var(--accent-rgb), 0.35);
}

.site-nav__link.is-active::after {
  transform: scaleX(1);
}

/* Tools + mobile toggle */

.site-tools {
  display: flex;
  align-items: center;
  gap: 14px;
}

.site-menu-btn {
  display: none;

  position: relative;

  width: 34px;
  height: 34px;
  padding: 0;

  border: 1px solid var(--line);
  background: transparent;

  cursor: pointer;
}

.site-menu-btn span {
  position: absolute;
  left: 8px;
  right: 8px;

  height: 1px;

  background: var(--text);

  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

.site-menu-btn span:first-child {
  top: 12px;
}

.site-menu-btn span:last-child {
  top: 20px;
}

.site-menu-btn.is-open span:first-child {
  transform: translateY(4px) rotate(45deg);
}

.site-menu-btn.is-open span:last-child {
  transform: translateY(-4px) rotate(-45deg);
}

/* Mobile navigation panel */

.site-mobile-nav {
  display: none;

  flex-direction: column;

  padding: 8px 24px 20px;

  border-bottom: 1px solid var(--line);

  background: var(--surface-solid);
}

.site-mobile-nav__link {
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 13px 4px;

  border-bottom: 1px solid var(--line);

  color: var(--text-secondary);

  font-family: var(--font-mono);
  font-size: var(--fs-lg);
  text-decoration: none;
}

.site-mobile-nav__link:last-child {
  border-bottom: none;
}

.site-mobile-nav__link.is-active {
  color: var(--accent);
}

@keyframes header-scan-ring {
  to {
    transform: rotate(360deg);
  }
}

@keyframes header-glitch-a {
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

@keyframes header-glitch-b {
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

@keyframes header-cursor-blink {
  0%,
  55% {
    opacity: 1;
  }

  56%,
  100% {
    opacity: 0;
  }
}

@media (max-width: 900px) {
  .site-header__inner {
    padding: 0 20px;
  }

  .site-nav {
    display: none;
  }

  .site-menu-btn {
    display: block;
  }

  .site-mobile-nav {
    display: flex;
  }
}

@media (max-width: 560px) {
  .site-brand__name {
    font-size: var(--fs-sm);
    letter-spacing: 0.12em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-brand__mark,
  .site-brand__mark::before,
  .site-brand__name,
  .site-brand__name::before,
  .site-brand__name::after,
  .site-brand__cursor,
  .site-nav__link,
  .site-nav__link::after,
  .site-menu-btn span {
    animation: none !important;
    transition: none;
  }

  .site-brand__cursor,
  .site-brand__name::before,
  .site-brand__name::after {
    display: none;
  }
}
</style>
