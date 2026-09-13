<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { Project } from '../../types/project'
import ProjectStatus from './ProjectStatus.vue'

defineProps<{
  project: Project
}>()

const { t } = useI18n()
</script>

<template>
  <article
    class="project-card"
    :class="`project-card--${project.accent ?? 'cyan'}`"
  >
    <RouterLink
      :to="`/archive/projects/${project.slug}`"
      class="project-card__media"
      :aria-label="`${t('projects.open')} ${project.title}`"
    >
      <img
        v-if="project.cover"
        :src="project.cover"
        :alt="`${project.title} visual`"
        loading="lazy"
      />

      <div class="project-card__media-overlay" />
      <span class="project-card__media-grid" />

      <div class="project-card__media-hud">
        <span>PROJECT // {{ project.date }}</span>
        <span>{{ project.featured ? 'FEATURED' : 'ARCHIVE' }}</span>
      </div>

      <div class="project-card__media-corner">↗</div>
    </RouterLink>

    <div class="project-card__top">
      <span class="project-card__index">
        {{ t('projects.cardLabel') }} / {{ project.slug.toUpperCase() }}
      </span>

      <ProjectStatus :status="project.status" />
    </div>

    <div class="project-card__body">
      <h2>{{ project.title }}</h2>
      <p>{{ project.description }}</p>
    </div>

    <div class="project-card__tags">
      <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
    </div>

    <div class="project-card__bottom">
      <span>SYS / {{ project.date }}</span>

      <RouterLink
        :to="`/archive/projects/${project.slug}`"
        class="project-card__link"
      >
        {{ t('projects.open') }} →
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  position: relative;
  min-height: 590px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--surface);
  isolation: isolate;
  animation: archive-rise 560ms cubic-bezier(.2,.75,.25,1) both;
  transition:
    transform var(--transition-normal),
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);
}

.project-card::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(circle at 80% 12%, rgba(0,229,255,.08), transparent 24%),
    linear-gradient(135deg, rgba(255,255,255,.02), transparent 44%);
  pointer-events: none;
}

.project-card--pink::after {
  background:
    radial-gradient(circle at 80% 12%, rgba(255,43,214,.08), transparent 24%),
    linear-gradient(135deg, rgba(255,255,255,.02), transparent 44%);
}

.project-card--purple::after {
  background:
    radial-gradient(circle at 80% 12%, rgba(139,92,246,.10), transparent 24%),
    linear-gradient(135deg, rgba(255,255,255,.02), transparent 44%);
}

.project-card:hover {
  transform: translateY(-7px);
  border-color: var(--accent-line);
  box-shadow: var(--shadow);
}

.project-card__media {
  position: relative;
  display: block;
  height: 260px;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  background: #050810;
  text-decoration: none;
}

.project-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: .88;
  transform: scale(1.01);
  transition: transform 700ms cubic-bezier(.2,.7,.2,1), opacity 400ms ease;
}

.project-card:hover .project-card__media img {
  transform: scale(1.08);
  opacity: 1;
}

.project-card__media-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(4,5,10,.05), rgba(4,5,10,.25) 40%, rgba(4,5,10,.82)),
    linear-gradient(90deg, transparent 0 65%, rgba(0,229,255,.07));
}

.project-card__media-grid {
  position: absolute;
  inset: 0;
  opacity: .25;
  background-image:
    linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: linear-gradient(to bottom, black, transparent 80%);
  pointer-events: none;
}

.project-card__media-hud,
.project-card__media-corner {
  position: absolute;
  z-index: 2;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: .12em;
}

.project-card__media-hud {
  left: 16px;
  right: 16px;
  bottom: 14px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: rgba(244,247,255,.72);
}

.project-card__media-hud span:first-child {
  color: var(--accent);
}

.project-card__media-corner {
  top: 14px;
  right: 14px;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255,255,255,.2);
  background: rgba(5,5,10,.34);
  color: var(--text);
  backdrop-filter: blur(8px);
  transition: transform var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
}

.project-card:hover .project-card__media-corner {
  transform: translate(2px, -2px);
  border-color: var(--accent-line);
  color: var(--accent);
}

.project-card__top,
.project-card__body,
.project-card__tags,
.project-card__bottom {
  padding-left: 22px;
  padding-right: 22px;
}

.project-card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding-top: 18px;
}

.project-card__index {
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: .12em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-card__body {
  margin-top: 30px;
}

.project-card h2 {
  margin: 0;
  color: var(--text);
  font-size: clamp(26px, 3vw, 34px);
  line-height: 1.06;
  letter-spacing: -.04em;
}

.project-card p {
  max-width: 540px;
  margin: 14px 0 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.75;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 20px;
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
  padding-bottom: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: .08em;
}

.project-card__link {
  color: var(--accent);
  text-decoration: none;
}

.project-card__link:hover {
  text-shadow: var(--glow-cyan);
}

@keyframes archive-rise {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
  .project-card {
    min-height: 0;
  }

  .project-card__media {
    height: 210px;
  }

  .project-card__top,
  .project-card__body,
  .project-card__tags,
  .project-card__bottom {
    padding-left: 18px;
    padding-right: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-card__media img,
  .project-card__media-corner {
    animation: none;
    transition: none;
  }
}
</style>
