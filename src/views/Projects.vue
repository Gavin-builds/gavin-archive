<script setup lang="ts">
import { computed, ref } from 'vue'

import ProjectCard from '../components/projects/ProjectCard.vue'

import {
  projects,
} from '../data/projects'

import type {
  ProjectCategory,
} from '../types/project'

type Filter =
  | 'ALL'
  | ProjectCategory

const filter = ref<Filter>('ALL')

const filters: Filter[] = [
  'ALL',
  'AI',
  'Web',
  'Open Source',
  'Tools',
  'Experiment',
]

const filteredProjects = computed(() => {
  if (filter.value === 'ALL') {
    return projects
  }

  return projects.filter(project =>
    project.categories.includes(filter.value as ProjectCategory),
  )
})
</script>

<template>
  <section class="projects">
    <header class="projects__header">
      <div>
        <div class="eyebrow">
          / 02 PROJECT ARCHIVE
        </div>

        <h1>
          Projects
        </h1>

        <p>
          Tools, products and experiments
          built with code and AI.
        </p>
      </div>

      <div class="projects__count">
        <strong>
          {{ filteredProjects.length }}
        </strong>

        <span>
          PROJECTS
        </span>
      </div>
    </header>

    <div class="projects__filters">
      <button
        v-for="item in filters"
        :key="item"
        :class="{ active: filter === item }"
        @click="filter = item"
      >
        {{ item }}
      </button>
    </div>

    <div class="projects__grid">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.slug"
        :project="project"
      />
    </div>
  </section>
</template>

<style scoped>
.projects__header {
  display: flex;
  justify-content: space-between;
  align-items: end;

  gap: 40px;

  padding-bottom: 44px;

  border-bottom: 1px solid var(--line);
}

.eyebrow {
  color: var(--accent);

  font-family: var(--font-mono);
  font-size: 10px;

  letter-spacing: 0.16em;
}

.projects h1 {
  margin: 12px 0 0;

  font-size: clamp(48px, 7vw, 88px);

  line-height: 0.95;

  letter-spacing: -0.06em;
}

.projects__header p {
  max-width: 560px;

  margin: 22px 0 0;

  color: var(--text-secondary);

  font-size: 17px;
  line-height: 1.7;
}

.projects__count {
  display: flex;
  flex-direction: column;

  align-items: end;

  font-family: var(--font-mono);
}

.projects__count strong {
  color: var(--accent);

  font-size: 42px;

  line-height: 1;
}

.projects__count span {
  margin-top: 6px;

  color: var(--text-muted);

  font-size: 9px;

  letter-spacing: 0.12em;
}

.projects__filters {
  display: flex;
  flex-wrap: wrap;

  gap: 8px;

  margin: 28px 0;
}

.projects__filters button {
  padding: 9px 12px;

  border: 1px solid var(--line);

  background: transparent;

  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: 10px;

  cursor: pointer;

  transition:
    color var(--transition-fast),
    border-color var(--transition-fast),
    background var(--transition-fast);
}

.projects__filters button:hover {
  color: var(--text);
  border-color: var(--line-strong);
}

.projects__filters button.active {
  color: var(--accent);

  border-color: var(--accent-line);

  background: var(--accent-soft);
}

.projects__grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 16px;
}

@media (max-width: 900px) {
  .projects__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .projects__header {
    display: block;
  }

  .projects__count {
    margin-top: 28px;

    align-items: start;
  }
}
</style>