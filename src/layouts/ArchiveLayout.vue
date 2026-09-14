<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import ArchiveHeader from "../components/archive/ArchiveHeader.vue";
import ArchiveSidebar from "../components/archive/ArchiveSidebar.vue";
import ArchiveFooter from "../components/archive/ArchiveFooter.vue";

const route = useRoute();

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
        <div class="archive-content">
          <RouterView v-slot="{ Component, route: viewRoute }">
            <Transition name="archive-page" mode="out-in">
              <component :is="Component" :key="viewRoute.fullPath" />
            </Transition>
          </RouterView>
        </div>
      </main>
    </div>

    <ArchiveFooter />
  </div>
</template>

<style scoped>
.archive-shell {
  min-height: 100vh;
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
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 82% 14%,
      rgba(0, 229, 255, 0.035),
      transparent 25%
    ),
    radial-gradient(
      circle at 18% 88%,
      rgba(255, 43, 214, 0.028),
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
    rgba(255, 255, 255, 0.018) 50%,
    transparent 50.05%
  );
  pointer-events: none;
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
    display: block;
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
