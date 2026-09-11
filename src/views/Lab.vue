<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { labExperiments } from '../data/lab'
import type { LabStatus } from '../types/lab'

const { t } = useI18n()

type Filter = 'ALL' | LabStatus

const filter = ref<Filter>('ALL')

const filters: Filter[] = [
  'ALL',
  'EXPERIMENT',
  'TESTING',
  'PROMISING',
  'PAUSED',
  'FAILED',
  'ARCHIVED',
]

const filteredExperiments = computed(() => {
  if (filter.value === 'ALL') return labExperiments
  return labExperiments.filter(item => item.status === filter.value)
})
</script>

<template>
  <section class="lab">
    <header class="lab__header">
      <div>
        <div class="eyebrow">/ 03 LAB ARCHIVE</div>
        <h1>{{ t('lab.title') }}</h1>
        <p>{{ t('lab.description') }}</p>
      </div>

      <div class="lab__count">
        <strong>{{ filteredExperiments.length }}</strong>
        <span>{{ t('lab.countLabel') }}</span>
      </div>
    </header>

    <div class="filters">
      <button
        v-for="item in filters"
        :key="item"
        :class="{ active: filter === item }"
        @click="filter = item"
      >
        {{ item === 'ALL' ? t('lab.all') : t(`lab.status.${item}`) }}
      </button>
    </div>

    <div class="grid">
      <article
        v-for="experiment in filteredExperiments"
        :key="experiment.slug"
        class="card"
      >
        <div class="card__top">
          <span class="index">LAB / {{ experiment.date }}</span>
          <span class="status" :class="`status--${experiment.status.toLowerCase()}`">
            ● {{ t(`lab.status.${experiment.status}`) }}
          </span>
        </div>

        <h2>{{ experiment.title }}</h2>
        <p>{{ experiment.description }}</p>

        <div class="tags">
          <span v-for="tag in experiment.tags" :key="tag">{{ tag }}</span>
        </div>

        <RouterLink
          v-if="experiment.relatedProject"
          :to="`/archive/projects/${experiment.relatedProject}`"
          class="related"
        >
          {{ t('lab.relatedProject') }} →
        </RouterLink>
      </article>
    </div>

    <div v-if="filteredExperiments.length === 0" class="empty">
      {{ t('lab.empty') }}
    </div>
  </section>
</template>

<style scoped>
.lab__header {
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

h1 {
  margin: 12px 0 0;
  font-size: clamp(48px, 7vw, 88px);
  line-height: 0.95;
  letter-spacing: -0.06em;
}

.lab__header p {
  max-width: 620px;
  margin: 22px 0 0;
  color: var(--text-secondary);
  font-size: 17px;
  line-height: 1.7;
}

.lab__count {
  display: flex;
  flex-direction: column;
  align-items: end;
  font-family: var(--font-mono);
}

.lab__count strong {
  color: var(--accent);
  font-size: 42px;
  line-height: 1;
}

.lab__count span {
  margin-top: 6px;
  color: var(--text-muted);
  font-size: 9px;
  letter-spacing: 0.12em;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 28px 0;
}

.filters button {
  padding: 9px 12px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 10px;
  cursor: pointer;
}

.filters button:hover,
.filters button.active {
  color: var(--accent);
  border-color: var(--accent-line);
  background: var(--accent-soft);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.card {
  min-height: 280px;
  display: flex;
  flex-direction: column;
  padding: 22px;
  border: 1px solid var(--line);
  background: var(--surface);
  transition: transform var(--transition-normal), border-color var(--transition-normal);
}

.card:hover {
  transform: translateY(-3px);
  border-color: var(--accent-line);
}

.card__top {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.index,
.related,
.status {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.08em;
}

.index {
  color: var(--text-muted);
}

.status--experiment,
.status--testing {
  color: var(--accent);
}

.status--promising {
  color: var(--accent-secondary);
}

.status--failed {
  color: #ff6b8a;
}

.status--paused,
.status--archived {
  color: var(--text-muted);
}

.card h2 {
  margin: 42px 0 0;
  font-size: 26px;
  line-height: 1.2;
}

.card p {
  margin: 16px 0 0;
  color: var(--text-secondary);
  line-height: 1.7;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 20px;
}

.tags span {
  padding: 5px 8px;
  border: 1px solid var(--line);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 9px;
}

.related {
  margin-top: auto;
  padding-top: 24px;
  color: var(--accent);
  text-decoration: none;
}

.empty {
  padding: 42px 0;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .lab__header {
    display: block;
  }

  .lab__count {
    align-items: start;
    margin-top: 28px;
  }

  .card__top {
    flex-direction: column;
  }
}
</style>
