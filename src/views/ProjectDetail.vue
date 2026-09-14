<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import ProjectStatus from '../components/projects/ProjectStatus.vue'

import {
  getProjectBySlug,
} from '../data/projects'

const route = useRoute()

const { t } = useI18n()

const project = computed(() => {
  const slug = route.params.slug

  if (typeof slug !== 'string') {
    return undefined
  }

  return getProjectBySlug(slug)
})
</script>

<template>
  <section
    v-if="project"
    class="project-detail"
  >
    <RouterLink
      to="/archive/projects"
      class="back"
    >
      {{ t('projects.backToList') }}
    </RouterLink>

    <header class="project-detail__hero">
      <div class="eyebrow">
        PROJECT / {{ project.date }}
      </div>

      <div class="title-row">
        <h1>
          {{ project.title }}
        </h1>

        <ProjectStatus
          :status="project.status"
        />
      </div>

      <p class="description">
        {{ project.description }}
      </p>

      <div v-if="project.cover" class="project-cover">
        <img :src="project.cover" :alt="`${project.title} visual`" />
        <div class="project-cover__scan" />
        <span>VISUAL NODE / {{ project.date }}</span>
      </div>

      <div class="actions">
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noreferrer"
        >
          {{ t('projects.github') }} ↗
        </a>

        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noreferrer"
        >
          {{ t('projects.demo') }} ↗
        </a>
      </div>
    </header>

    <div class="project-detail__layout">
      <main>
        <section
          v-if="project.problem"
          class="content-section"
        >
          <div class="section-label">
            01 / {{ t('projects.problem') }}
          </div>

          <p>
            {{ project.problem }}
          </p>
        </section>

        <section
          v-if="project.solution"
          class="content-section"
        >
          <div class="section-label">
            02 / {{ t('projects.solution') }}
          </div>

          <p>
            {{ project.solution }}
          </p>
        </section>

        <section
          v-if="project.features?.length"
          class="content-section"
        >
          <div class="section-label">
            03 / {{ t('projects.features') }}
          </div>

          <ul>
            <li
              v-for="feature in project.features"
              :key="feature"
            >
              {{ feature }}
            </li>
          </ul>
        </section>

        <section
          v-if="project.architecture?.length"
          class="content-section"
        >
          <div class="section-label">
            04 / {{ t('projects.architecture') }}
          </div>

          <div class="architecture">
            <template
              v-for="(node, index) in project.architecture"
              :key="node.label"
            >
              <div class="architecture__node">
                <strong>
                  {{ node.label }}
                </strong>

                <span v-if="node.description">
                  {{ node.description }}
                </span>
              </div>

              <div
                v-if="
                  index <
                  project.architecture.length - 1
                "
                class="architecture__arrow"
              >
                ↓
              </div>
            </template>
          </div>
        </section>

        <section
          v-if="project.developmentLog?.length"
          class="content-section"
        >
          <div class="section-label">
            05 / {{ t('projects.developmentLog') }}
          </div>

          <div class="timeline">
            <article
              v-for="item in project.developmentLog"
              :key="
                `${item.date}-${item.title}`
              "
              class="timeline__item"
            >
              <span>
                {{ item.date }}
              </span>

              <div>
                <h3>
                  {{ item.title }}
                </h3>

                <p>
                  {{ item.description }}
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <aside class="project-meta">
        <div>
          <span>{{ t('projects.stack') }}</span>

          <div class="stack">
            <span
              v-for="item in project.stack"
              :key="item"
            >
              {{ item }}
            </span>
          </div>
        </div>

        <div>
          <span>{{ t('projects.tags') }}</span>

          <div class="stack">
            <span
              v-for="tag in project.tags"
              :key="tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </aside>
    </div>
  </section>

  <section
    v-else
    class="not-found"
  >
    <div class="eyebrow">
      {{ t('projects.notFoundError') }}
    </div>

    <h1>
      {{ t('projects.notFound') }}
    </h1>

    <RouterLink to="/archive/projects">
      {{ t('projects.backToList') }}
    </RouterLink>
  </section>
</template>

<style scoped>
.back {
  display: inline-block;

  margin-bottom: 44px;
  padding: 10px 14px;

  border: 1px solid var(--accent-line);
  background: var(--accent-soft);

  color: var(--accent);

  font-family: var(--font-mono);
  font-size: var(--fs-sm);

  text-decoration: none;
  letter-spacing: 0.08em;

  transition: box-shadow var(--transition-fast);
}

.back:hover {
  box-shadow: var(--glow-cyan);
}

.project-detail__hero {
  padding-bottom: 54px;

  border-bottom: 1px solid var(--line);
}

.eyebrow,
.section-label {
  color: var(--accent);

  font-family: var(--font-mono);
  font-size: var(--fs-sm);

  letter-spacing: 0.14em;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 24px;

  margin-top: 14px;
}

.title-row h1 {
  margin: 0;

  font-size: clamp(48px, 8vw, 100px);

  line-height: 0.95;

  letter-spacing: -0.065em;
}

.description {
  max-width: 760px;

  margin: 28px 0 0;

  color: var(--text-secondary);

  font-size: var(--fs-2xl);
  line-height: 1.7;
}

.project-cover {
  position: relative;
  height: min(460px, 42vw);
  margin-top: 34px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: #060810;
}

.project-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: .9;
  animation: cover-enter 700ms ease both;
}

.project-cover__scan {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.58)),
    repeating-linear-gradient(0deg, transparent 0 5px, rgba(255,255,255,.018) 6px);
  pointer-events: none;
}

.project-cover span {
  position: absolute;
  left: 16px;
  bottom: 14px;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: .1em;
}

.actions {
  display: flex;
  gap: 10px;

  margin-top: 28px;
}

.actions a {
  padding: 10px 14px;

  border: 1px solid var(--accent-line);

  color: var(--accent);

  font-family: var(--font-mono);
  font-size: var(--fs-sm);

  text-decoration: none;

  background: var(--accent-soft);
}

.project-detail__layout {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr) 260px;

  gap: 80px;

  padding-top: 56px;
}

.content-section {
  padding-bottom: 64px;
}

.content-section > p {
  max-width: 780px;

  margin: 20px 0 0;

  color: var(--text-secondary);

  font-size: var(--fs-lg);
  line-height: 1.9;
}

.content-section ul {
  margin: 20px 0 0;
  padding: 0;

  list-style: none;
}

.content-section li {
  padding: 14px 0;

  border-bottom: 1px solid var(--line);

  color: var(--text-secondary);
}

.content-section li::before {
  content: '→';

  margin-right: 12px;

  color: var(--accent);
}

.architecture {
  margin-top: 22px;
}

.architecture__node {
  display: flex;
  flex-direction: column;

  padding: 18px;

  border: 1px solid var(--line);

  background: var(--surface);
}

.architecture__node strong {
  color: var(--text);
}

.architecture__node span {
  margin-top: 6px;

  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: var(--fs-sm);
}

.architecture__arrow {
  padding: 7px;

  color: var(--accent);

  text-align: center;

  font-family: var(--font-mono);
}

.project-meta {
  display: flex;
  flex-direction: column;

  gap: 40px;
}

.project-meta > div > span {
  display: block;

  margin-bottom: 12px;

  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: var(--fs-xs);

  letter-spacing: 0.12em;
}

.stack {
  display: flex;
  flex-wrap: wrap;

  gap: 7px;
}

.stack span {
  padding: 6px 8px;

  border: 1px solid var(--line);

  color: var(--text-secondary);

  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}

.timeline {
  margin-top: 22px;
}

.timeline__item {
  display: grid;

  grid-template-columns: 90px 1fr;

  gap: 20px;

  padding: 20px 0;

  border-bottom: 1px solid var(--line);
}

.timeline__item > span {
  color: var(--accent);

  font-family: var(--font-mono);
  font-size: var(--fs-sm);
}

.timeline h3 {
  margin: 0;

  font-size: var(--fs-xl);
}

.timeline p {
  margin: 8px 0 0;

  color: var(--text-secondary);

  line-height: 1.7;
}

.not-found h1 {
  margin: 20px 0 30px;

  font-size: clamp(42px, 7vw, 90px);

  letter-spacing: -0.05em;
}

.not-found a {
  display: inline-block;

  padding: 10px 14px;

  border: 1px solid var(--accent-line);
  background: var(--accent-soft);

  color: var(--accent);

  font-family: var(--font-mono);
  font-size: var(--fs-sm);

  text-decoration: none;
  letter-spacing: 0.08em;

  transition: box-shadow var(--transition-fast);
}

.not-found a:hover {
  box-shadow: var(--glow-cyan);
}

@keyframes cover-enter {
  from { opacity: 0; transform: scale(1.035); }
  to { opacity: .9; transform: scale(1); }
}

@media (max-width: 900px) {
  .project-detail__layout {
    grid-template-columns: 1fr;
  }

  .project-meta {
    padding-top: 20px;
    padding-bottom: 40px;

    border-top: 1px solid var(--line);
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-cover img {
    animation: none;
  }
}

@media (max-width: 640px) {
  .title-row {
    display: block;
  }

  .title-row .status {
    margin-top: 18px;
  }

  .description {
    font-size: var(--fs-lg);
  }

  .project-cover {
    height: 260px;
    margin-top: 24px;
  }

  .timeline__item {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>