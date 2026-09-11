<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import ArchiveHeader from '../components/archive/ArchiveHeader.vue'
import ArchiveSidebar from '../components/archive/ArchiveSidebar.vue'
import ArchiveFooter from '../components/archive/ArchiveFooter.vue'

const route = useRoute()

const currentPage = computed(() => {
  const name = route.name

  if (typeof name !== 'string') {
    return 'ARCHIVE'
  }

  const pageMap: Record<string, string> = {
    home: 'HOME',
    profile: 'PROFILE',
    projects: 'PROJECTS',
    'project-detail': 'PROJECT DETAIL',
    lab: 'LAB',
    blog: 'BLOG',
    'blog-article': 'ARTICLE',
    github: 'GITHUB',
    about: 'ABOUT',
    'not-found': '404',
  }

  return pageMap[name] ?? 'ARCHIVE'
})
</script>

<template>
  <div class="archive-shell">
    <ArchiveHeader :current-page="currentPage" />

    <div class="archive-body">
      <ArchiveSidebar />

      <main class="archive-main">
        <div class="archive-content">
          <RouterView />
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
}

.archive-content {
  width: min(100%, 1480px);
  min-height: 100%;

  margin: 0 auto;

  padding: 52px 64px 80px;
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

  .archive-content {
    padding: 32px 20px 64px;
  }
}
</style>