<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

import ArchiveHeader from "../components/archive/ArchiveHeader.vue";
import ArchiveSidebar from "../components/archive/ArchiveSidebar.vue";
import ArchiveFooter from "../components/archive/ArchiveFooter.vue";

const route = useRoute();

const scrollContainer = ref<HTMLElement | null>(null);

// 路由切换时的赛博扫描光束，每次 fullPath 变化重播
const sweepKey = ref(0);

watch(
  () => route.fullPath,
  () => {
    sweepKey.value += 1;
  },
);

// 仅当覆盖层自身动画结束（晚于伪元素动画）时移除
const onSweepEnd = (event: AnimationEvent) => {
  if (event.target === event.currentTarget) {
    sweepKey.value = 0;
  }
};

const resetScrollTop = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = 0;
  }
};

const currentPage = computed(() => {
  const name = route.name;

  if (typeof name !== "string") {
    return "ARCHIVE";
  }

  const pageMap: Record<string, string> = {
    home: "HOME",
    profile: "PROFILE",
    projects: "PROJECTS",
    "project-detail": "PROJECT DETAIL",
    lab: "LAB",
    blog: "BLOG",
    "blog-article": "ARTICLE",
    github: "GITHUB",
    about: "ABOUT",
    "not-found": "404",
  };

  return pageMap[name] ?? "ARCHIVE";
});
</script>

<template>
  <div class="archive-shell">
    <ArchiveHeader :current-page="currentPage" />

    <div class="archive-body">
      <ArchiveSidebar />

      <main class="archive-main">
        <div
          class="archive-main__rail archive-main__rail--left"
          aria-hidden="true"
        />
        <div
          class="archive-main__rail archive-main__rail--right"
          aria-hidden="true"
        />
        <div ref="scrollContainer" class="archive-scroll">
          <div class="archive-content">
            <RouterView v-slot="{ Component, route: viewRoute }">
              <Transition
                name="archive-page"
                mode="out-in"
                @before-enter="resetScrollTop"
              >
                <component :is="Component" :key="viewRoute.fullPath" />
              </Transition>
            </RouterView>
          </div>
        </div>

        <!-- 路由切换赛博扫描光束 -->
        <div
          v-if="sweepKey"
          :key="sweepKey"
          class="page-sweep"
          aria-hidden="true"
          @animationend="onSweepEnd"
        />
      </main>
    </div>

    <ArchiveFooter />
  </div>
</template>

<style scoped>
.archive-shell {
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
}
.archive-body {
  flex: 1;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  min-height: 0;
}
.archive-main {
  min-width: 0;
  min-height: 0;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 82% 14%,
      rgba(var(--accent-rgb), 0.035),
      transparent 25%
    ),
    radial-gradient(
      circle at 18% 88%,
      rgba(var(--pink-rgb), 0.028),
      transparent 25%
    );
}
.archive-main::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0 49.95%,
    var(--body-grid) 50%,
    transparent 50.05%
  );
  pointer-events: none;
}
.archive-scroll {
  position: relative;
  z-index: 2;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.archive-main__rail {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(transparent, var(--line), transparent);
  opacity: 0.55;
  pointer-events: none;
}
.archive-main__rail--left {
  left: 18px;
}
.archive-main__rail--right {
  right: 18px;
}
.archive-content {
  position: relative;
  z-index: 2;
  width: min(100%, 1480px);
  min-height: 100%;
  margin: 0 auto;
  padding: 52px 64px 80px;
}
/* =========================
   赛博页面转场
========================= */

.archive-page-enter-active {
  transition:
    opacity 260ms steps(5, end),
    transform 300ms cubic-bezier(0.22, 0.68, 0.24, 1),
    clip-path 320ms cubic-bezier(0.7, 0, 0.3, 1),
    filter 260ms ease;
}

.archive-page-leave-active {
  transition:
    opacity 140ms steps(2, end),
    transform 180ms cubic-bezier(0.55, 0, 0.45, 1);
}

/* 离场：向左故障滑出 + 数字闪烁 */
.archive-page-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}

/* 入场：右侧切入 + 顶部百叶窗式裁切揭开 */
.archive-page-enter-from {
  opacity: 0;
  transform: translateX(26px);
  clip-path: inset(0 0 100% 0);
  filter: saturate(1.8);
}

/* 路由扫描光束覆盖层 */
.page-sweep {
  position: absolute;
  inset: 0;
  z-index: 6;

  overflow: hidden;

  pointer-events: none;

  background: linear-gradient(
    to bottom,
    rgba(var(--accent-rgb), 0.07),
    transparent 42%
  );

  opacity: 0;

  animation: sweep-flash 520ms steps(6, end) forwards;
}

/* 主光束：青-白-品红横向能量束，自上而下扫过 */
.page-sweep::before {
  content: "";

  position: absolute;
  left: 0;
  right: 0;
  top: -2%;

  height: 2px;

  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--accent-rgb), 0.9) 30%,
    rgba(var(--ink-rgb), 0.95) 50%,
    rgba(var(--pink-rgb), 0.8) 70%,
    transparent
  );

  box-shadow:
    0 0 16px 2px rgba(var(--accent-rgb), 0.4),
    0 0 44px 6px rgba(var(--accent-rgb), 0.16),
    0 0 22px rgba(var(--pink-rgb), 0.3);

  animation: sweep-beam 460ms cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

/* 水平切片纹理：扫描时的栅格错位感 */
.page-sweep::after {
  content: "";

  position: absolute;
  inset: 0;

  background: repeating-linear-gradient(
    to bottom,
    transparent 0 24px,
    rgba(var(--accent-rgb), 0.05) 25px 26px
  );

  animation: sweep-slices 480ms steps(6, end) forwards;
}

@keyframes sweep-flash {
  0% {
    opacity: 1;
  }

  55% {
    opacity: 0.55;
  }

  100% {
    opacity: 0;
  }
}

@keyframes sweep-beam {
  from {
    top: -2%;
  }

  to {
    top: 102%;
  }
}

@keyframes sweep-slices {
  0% {
    opacity: 0.9;
    transform: translateY(-14px);
  }

  100% {
    opacity: 0;
    transform: translateY(0);
  }
}
@media (max-width: 1024px) {
  .archive-body {
    grid-template-columns: 220px minmax(0, 1fr);
  }
  .archive-content {
    padding: 40px;
  }
}
@media (max-width: 768px) {
  .archive-body {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto minmax(0, 1fr);
  }
  .archive-main__rail {
    display: none;
  }
  .archive-content {
    padding: 32px 20px 64px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .archive-page-enter-active,
  .archive-page-leave-active {
    transition: none;
  }

  .archive-page-enter-from {
    clip-path: none;
    filter: none;
    transform: none;
  }

  .archive-page-leave-to {
    transform: none;
  }

  .page-sweep {
    display: none;
  }
}
</style>
