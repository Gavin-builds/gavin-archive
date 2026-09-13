<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import ProjectCard from '../components/projects/ProjectCard.vue'
import { projects } from '../data/projects'
import type { ProjectCategory } from '../types/project'

const { t } = useI18n()

type Filter = 'ALL' | ProjectCategory

const filter = ref<Filter>('ALL')

interface FilterOption {
  value: Filter
  labelKey: string
}

const filters: FilterOption[] = [
  { value: 'ALL', labelKey: 'projects.all' },
  { value: 'AI', labelKey: 'projects.ai' },
  { value: 'Web', labelKey: 'projects.web' },
  { value: 'Open Source', labelKey: 'projects.openSource' },
  { value: 'Tools', labelKey: 'projects.tools' },
  { value: 'Experiment', labelKey: 'projects.experiment' },
]

const filteredProjects = computed(() => {
  if (filter.value === 'ALL') return projects
  return projects.filter(project => project.categories.includes(filter.value as ProjectCategory))
})
</script>

<template>
  <section class="projects">
    <div class="page-intro">
      <div>
        <div class="eyebrow">/ 02 PROJECT ARCHIVE</div>
        <h1>{{ t('projects.title') }}</h1>
        <p>{{ t('projects.description') }}</p>
      </div>

      <div class="intro-telemetry" aria-hidden="true">
        <span class="telemetry-orbit telemetry-orbit--1" />
        <span class="telemetry-orbit telemetry-orbit--2" />
        <span class="telemetry-core" />
        <div class="telemetry-copy">
          <span>ARCHIVE NODE</span>
          <strong>{{ String(filteredProjects.length).padStart(2, '0') }}</strong>
          <small>{{ t('projects.countLabel') }}</small>
        </div>
      </div>
    </div>

    <div class="toolbar">
      <div class="toolbar__label">FILTER / {{ filter }}</div>
      <div class="projects__filters">
        <button
          v-for="item in filters"
          :key="item.value"
          :class="{ active: filter === item.value }"
          @click="filter = item.value"
        >
          {{ t(item.labelKey) }}
        </button>
      </div>
    </div>

    <TransitionGroup name="card-grid" tag="div" class="projects__grid">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.slug"
        :project="project"
      />
    </TransitionGroup>

    <div v-if="filteredProjects.length === 0" class="empty-state">
      <span>NO PROJECTS / 0 RESULTS</span>
      <strong>ARCHIVE EMPTY</strong>
    </div>
  </section>
</template>

<style scoped>
.projects {
  position: relative;
}

.page-intro {
  min-height: 340px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--line);
  overflow: hidden;
}

.page-intro > div:first-child {
  position: relative;
  z-index: 2;
}

.eyebrow,
.toolbar__label {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: .16em;
}

.projects h1 {
  margin: 14px 0 0;
  font-size: clamp(58px, 8vw, 104px);
  line-height: .9;
  letter-spacing: -.07em;
}

.page-intro p {
  max-width: 620px;
  margin: 24px 0 0;
  color: var(--text-secondary);
  font-size: 17px;
  line-height: 1.7;
}

.intro-telemetry {
  position: relative;
  min-height: 250px;
  display: grid;
  place-items: center;
  border-left: 1px solid var(--line);
  overflow: hidden;
  animation: telemetry-in 900ms ease both;
}

.telemetry-orbit {
  position: absolute;
  width: 190px;
  height: 190px;
  border: 1px solid rgba(0,229,255,.22);
  border-radius: 50%;
  animation: spin 14s linear infinite;
}

.telemetry-orbit--2 {
  width: 128px;
  height: 128px;
  border-style: dashed;
  border-color: rgba(255,43,214,.25);
  animation-direction: reverse;
  animation-duration: 9s;
}

.telemetry-core {
  position: absolute;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-light), var(--accent) 38%, transparent 70%);
  box-shadow: 0 0 40px rgba(0,229,255,.4);
  animation: pulse 2.8s ease-in-out infinite;
}

.telemetry-copy {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-mono);
  text-align: center;
}

.telemetry-copy span,
.telemetry-copy small {
  color: var(--text-muted);
  font-size: 8px;
  letter-spacing: .14em;
}

.telemetry-copy strong {
  margin-top: 6px;
  color: var(--text);
  font-size: 38px;
  line-height: 1;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 22px 0;
}

.projects__filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.projects__filters button {
  position: relative;
  padding: 9px 12px;
  border: 1px solid var(--line);
  background: rgba(9,9,18,.65);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 10px;
  cursor: pointer;
  transition: color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast), background var(--transition-fast);
}

.projects__filters button:hover {
  color: var(--text);
  border-color: var(--line-strong);
  transform: translateY(-1px);
}

.projects__filters button.active {
  color: var(--accent);
  border-color: var(--accent-line);
  background: var(--accent-soft);
  box-shadow: 0 0 22px rgba(0,229,255,.06);
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 18px;
}

.card-grid-enter-active,
.card-grid-leave-active,
.card-grid-move {
  transition: all 360ms cubic-bezier(.2,.7,.2,1);
}

.card-grid-enter-from,
.card-grid-leave-to {
  opacity: 0;
  transform: translateY(24px) scale(.985);
}

.empty-state {
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 1px dashed var(--line);
  font-family: var(--font-mono);
  text-align: center;
}

.empty-state span {
  color: var(--text-muted);
  font-size: 10px;
}

.empty-state strong {
  color: var(--accent);
  font-size: 18px;
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse { 0%,100% { transform: scale(.85); opacity:.75; } 50% { transform: scale(1.1); opacity:1; } }
@keyframes telemetry-in { from { opacity:0; transform: translateX(28px); } to { opacity:1; transform: translateX(0); } }

@media (max-width: 900px) {
  .page-intro {
    grid-template-columns: 1fr;
    min-height: 0;
  }

  .intro-telemetry {
    display: none;
  }

  .toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .projects__filters {
    justify-content: flex-start;
  }

  .projects__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .projects h1 {
    font-size: clamp(52px, 17vw, 78px);
  }

  .page-intro p {
    font-size: 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .telemetry-orbit,
  .telemetry-core,
  .intro-telemetry {
    animation: none;
  }

  .card-grid-enter-active,
  .card-grid-leave-active,
  .card-grid-move {
    transition: none;
  }
}
</style>
