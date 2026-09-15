<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import ArchiveHeader from "../components/archive/ArchiveHeader.vue";
import ArchiveSidebar from "../components/archive/ArchiveSidebar.vue";
import ArchiveFooter from "../components/archive/ArchiveFooter.vue";

const route = useRoute();

const scrollContainer = ref<HTMLElement | null>(null);

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
.archive-page-enter-active,
.archive-page-leave-active {
  transition:
    opacity 240ms ease,
    transform 300ms cubic-bezier(0.2, 0.7, 0.2, 1);
}
.archive-page-enter-from {
  opacity: 0;
  transform: translateY(18px);
}
.archive-page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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
}
</style>
