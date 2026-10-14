<script setup lang="ts">
import { computed, ref, watch } from "vue";
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

// 给每个导航项注入本地化 label —— 让 CSS 伪元素能用 attr(data-text) 镜像文字
const navItems = computed(() =>
  navLinks.map((link) => ({
    ...link,
    label: t(link.labelKey),
  })),
);

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
          v-for="link in navItems"
          :key="link.path"
          :to="link.path"
          class="site-nav__link"
          :class="{ 'is-active': isActive(link.path) }"
        >
          <span class="site-nav__label" :data-text="link.label"
            >{{ link.label }}</span
          >
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
  max-width: 1200px;
  height: 76px;
  margin: 0 auto;
  padding: 0 36px;
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

  width: 34px;
  height: 34px;

  border: 1px solid var(--accent);

  box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.25);

  transition: box-shadow var(--transition-fast), transform var(--transition-fast);
}

.site-brand__mark img {
  width: 20px;
  height: 20px;
}

/* 右下角标 */
.site-brand__mark::after {
  content: "";

  position: absolute;
  right: -3px;
  bottom: -3px;

  width: 6px;
  height: 6px;

  background: var(--accent-secondary);
}

.site-brand:hover .site-brand__mark {
  box-shadow:
    0 0 10px rgba(var(--accent-rgb), 0.6),
    0 0 22px rgba(var(--accent-rgb), 0.25);
}

.site-brand__name {
  position: relative;

  font-family: var(--font-mono);
  font-size: var(--fs-md);
  font-weight: 700;
  letter-spacing: 0.18em;

  transition: color var(--transition-fast), text-shadow var(--transition-fast);
}

/* RGB 故障残影（hover 瞬间短 burst 闪动）——
   只动画 opacity，clip-path 在每步起点就固定好，
   全程走合成器，零重绘 */
.site-brand__name::before,
.site-brand__name::after {
  content: attr(data-text);

  position: absolute;
  inset: 0;

  pointer-events: none;
  opacity: 0;
}

.site-brand:hover .site-brand__name::before {
  color: var(--accent);

  clip-path: inset(0 0 65% 0);

  transform: translate(-2px, 0);

  animation: brand-glitch-cyan 320ms steps(3, end) forwards;
}

.site-brand:hover .site-brand__name::after {
  color: var(--accent-secondary);

  clip-path: inset(60% 0 0 0);

  transform: translate(2px, 0);

  animation: brand-glitch-pink 280ms steps(3, end) forwards;
}

.site-brand:hover .site-brand__name {
  color: var(--accent);

  text-shadow: 0 0 14px rgba(var(--accent-rgb), 0.5);
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

  padding: 10px 14px;

  color: var(--text-muted);

  font-size: var(--fs-base);
  text-decoration: none;
  letter-spacing: 0.04em;

  transition:
    color var(--transition-fast),
    text-shadow var(--transition-fast);
}

/* 文字层：作为残影定位基准 */
.site-nav__label {
  position: relative;
}

/* RGB 残影（hover 短 burst，与品牌名完全同款）——
   clip-path 固定起点值，keyframe 只 anim opacity，
   全程合成器完成，零重绘 */
.site-nav__label::before,
.site-nav__label::after {
  content: attr(data-text);

  position: absolute;
  inset: 0;

  pointer-events: none;
  opacity: 0;
}

.site-nav__label::before {
  color: var(--accent);

  clip-path: inset(0 0 65% 0);

  transform: translate(-2px, 0);
}

.site-nav__label::after {
  color: var(--accent-secondary);

  clip-path: inset(60% 0 0 0);

  transform: translate(2px, 0);
}

.site-nav__link:hover .site-nav__label::before {
  animation: brand-glitch-cyan 320ms steps(3, end) forwards;
}

.site-nav__link:hover .site-nav__label::after {
  animation: brand-glitch-pink 280ms steps(3, end) forwards;
}

.site-nav__link:hover {
  color: var(--accent);

  text-shadow: 0 0 14px rgba(var(--accent-rgb), 0.5);
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

@keyframes brand-glitch-cyan {
  0% {
    opacity: 0.9;
  }

  40% {
    opacity: 0.2;
  }

  100% {
    opacity: 0;
  }
}

@keyframes brand-glitch-pink {
  0% {
    opacity: 0.85;
  }

  35% {
    opacity: 0.15;
  }

  100% {
    opacity: 0;
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
  .site-brand__name,
  .site-brand__name::before,
  .site-brand__name::after,
  .site-brand__cursor,
  .site-nav__link,
  .site-nav__link::after,
  .site-nav__label::before,
  .site-nav__label::after,
  .site-menu-btn span {
    animation: none !important;
    transition: none;
  }

  .site-brand__name::before,
  .site-brand__name::after,
  .site-brand__cursor,
  .site-nav__label::before,
  .site-nav__label::after {
    display: none;
  }
}
</style>
