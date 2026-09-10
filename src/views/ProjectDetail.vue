<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import ProjectStatus from '../components/projects/ProjectStatus.vue'

import {
  getProjectBySlug,
} from '../data/projects'

const route = useRoute()

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
      ← BACK TO PROJECTS
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

      <div class="actions">
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noreferrer"
        >
          GITHUB ↗
        </a>

        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noreferrer"
        >
          LIVE DEMO ↗
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
            01 / PROBLEM
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
            02 / SOLUTION
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
            03 / FEATURES
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
            04 / ARCHITECTURE
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
            05 / DEVELOPMENT LOG
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
          <span>STACK</span>

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
          <span>TAGS</span>

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
      PROJECT ERROR
    </div>

    <h1>
      PROJECT NOT FOUND
    </h1>

    <RouterLink to="/projects">
      ← RETURN TO PROJECTS
    </RouterLink>
  </section>
</template>

<style scoped>
.back {
  display: inline-block;

  margin-bottom: 44px;

  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: 10px;

  text-decoration: none;
  letter-spacing: 0.08em;
}

.back:hover {
  color: var(--accent);
}

.project-detail__hero {
  padding-bottom: 54px;

  border-bottom: 1px solid var(--line);
}

.eyebrow,
.section-label {
  color: var(--accent);

  font-family: var(--font-mono);
  font-size: 10px;

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

  font-size: 19px;
  line-height: 1.7;
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
  font-size: 10px;

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

  font-size: 16px;
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
  font-size: 10px;
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
  font-size: 9px;

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
  font-size: 9px;
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
  font-size: 10px;
}

.timeline h3 {
  margin: 0;

  font-size: 17px;
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
  color: var(--accent);

  font-family: var(--font-mono);
  font-size: 11px;

  text-decoration: none;
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

@media (max-width: 640px) {
  .title-row {
    display: block;
  }

  .title-row .status {
    margin-top: 18px;
  }

  .description {
    font-size: 16px;
  }

  .timeline__item {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>