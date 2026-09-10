<script setup lang="ts">
import type { Project } from '../../types/project'
import ProjectStatus from './ProjectStatus.vue'

defineProps<{
  project: Project
}>()
</script>

<template>
  <article class="project-card">
    <div class="project-card__top">
      <span class="project-card__index">
        PROJECT
      </span>

      <ProjectStatus :status="project.status" />
    </div>

    <div class="project-card__body">
      <h2>
        {{ project.title }}
      </h2>

      <p>
        {{ project.description }}
      </p>
    </div>

    <div class="project-card__tags">
      <span
        v-for="tag in project.tags"
        :key="tag"
      >
        {{ tag }}
      </span>
    </div>

    <div class="project-card__bottom">
      <span>
        {{ project.date }}
      </span>

      <RouterLink
        :to="`/projects/${project.slug}`"
        class="project-card__link"
      >
        OPEN →
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  position: relative;

  min-height: 290px;

  display: flex;
  flex-direction: column;

  padding: 22px;

  background:
    linear-gradient(
      135deg,
      rgba(0, 229, 255, 0.045),
      transparent 45%
    ),
    var(--surface);

  border: 1px solid var(--line);

  transition:
    transform var(--transition-normal),
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);
}

.project-card::before {
  content: '';

  position: absolute;
  top: 0;
  left: 0;

  width: 28px;
  height: 1px;

  background: var(--accent);
}

.project-card:hover {
  transform: translateY(-4px);

  border-color: var(--accent-line);

  box-shadow:
    0 0 30px rgba(0, 229, 255, 0.06),
    0 20px 50px rgba(0, 0, 0, 0.3);
}

.project-card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-card__index {
  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: 9px;

  letter-spacing: 0.14em;
}

.project-card__body {
  margin-top: 42px;
}

.project-card h2 {
  margin: 0;

  color: var(--text);

  font-size: 28px;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.project-card p {
  max-width: 480px;

  margin: 16px 0 0;

  color: var(--text-secondary);

  font-size: 14px;
  line-height: 1.7;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;

  margin-top: 22px;
}

.project-card__tags span {
  padding: 5px 8px;

  border: 1px solid var(--line);

  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: 9px;
}

.project-card__bottom {
  margin-top: auto;
  padding-top: 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: 9px;
}

.project-card__link {
  color: var(--accent);

  text-decoration: none;

  letter-spacing: 0.08em;
}

.project-card__link:hover {
  text-shadow: var(--glow-cyan);
}
</style>