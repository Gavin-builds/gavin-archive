<script setup lang="ts">
import { useI18n } from "vue-i18n";

import type { Project } from "../../types/project";
import { localize } from "../../types/content";
import ProjectStatus from "./ProjectStatus.vue";

defineProps<{ project: Project }>();

const { t, locale } = useI18n();
const text = (value: { zh: string; en: string }) =>
  localize(value, locale.value);
</script>

<template>
  <article
    class="project-card"
    :class="`project-card--${project.accent ?? 'cyan'}`"
  >
    <RouterLink
      :to="`/archive/projects/${project.slug}`"
      class="project-card__media"
    >
      <img
        v-if="project.cover"
        :src="project.cover"
        :alt="`${text(project.title)} visual`"
        loading="lazy"
      />
      <div class="project-card__media-overlay" />
      <span class="project-card__media-grid" />
      <div class="project-card__media-hud">
        <span>CASE FILE // {{ project.date }}</span
        ><span>{{ project.featured ? "FEATURED" : "ARCHIVE" }}</span>
      </div>
      <div class="project-card__media-corner">↗</div>
    </RouterLink>
    <div class="project-card__top">
      <span class="project-card__index"
        >CASE / {{ project.slug.toUpperCase() }}</span
      ><ProjectStatus :status="project.status" />
    </div>
    <div class="project-card__body">
      <h2>{{ text(project.title) }}</h2>
      <p>{{ text(project.description) }}</p>
    </div>
    <div class="project-card__tags">
      <span v-for="tag in project.tags" :key="tag.en">{{ text(tag) }}</span>
    </div>
    <div class="project-card__bottom">
      <span>SYS / {{ project.date }}</span
      ><RouterLink
        :to="`/archive/projects/${project.slug}`"
        class="project-card__link"
        >{{ t("projects.open") }}</RouterLink
      >
    </div>
  </article>
</template>

<style scoped>
.project-card {
  position: relative;
  min-height: 620px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--surface);
  isolation: isolate;
  animation: archive-rise 560ms cubic-bezier(0.2, 0.75, 0.25, 1) both;
  transition:
    transform var(--transition-normal),
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);
}
.project-card::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(
      circle at 80% 12%,
      rgba(var(--accent-rgb), 0.08),
      transparent 24%
    ),
    linear-gradient(135deg, rgba(var(--ink-rgb), 0.02), transparent 44%);
  pointer-events: none;
}
.project-card--pink::after {
  background:
    radial-gradient(
      circle at 80% 12%,
      rgba(var(--pink-rgb), 0.08),
      transparent 24%
    ),
    linear-gradient(135deg, rgba(var(--ink-rgb), 0.02), transparent 44%);
}
.project-card--purple::after {
  background:
    radial-gradient(
      circle at 80% 12%,
      rgba(var(--purple-rgb), 0.1),
      transparent 24%
    ),
    linear-gradient(135deg, rgba(var(--ink-rgb), 0.02), transparent 44%);
}
.project-card:hover {
  transform: translateY(-7px);
  border-color: var(--accent-line);
  box-shadow: var(--shadow);
}
.project-card__media {
  position: relative;
  display: block;
  height: 280px;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  background: var(--media-bg);
  text-decoration: none;
}
.project-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.88;
  transform: scale(1.01);
  transition:
    transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1),
    opacity 400ms ease;
}
.project-card:hover .project-card__media img {
  transform: scale(1.08);
  opacity: 1;
}
.project-card__media-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to bottom,
      rgba(4, 5, 10, 0.05),
      rgba(4, 5, 10, 0.25) 40%,
      rgba(4, 5, 10, 0.82)
    ),
    linear-gradient(90deg, transparent 0 65%, rgba(var(--accent-rgb), 0.07));
}
.project-card__media-grid {
  position: absolute;
  inset: 0;
  opacity: 0.25;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: linear-gradient(to bottom, black, transparent 80%);
  pointer-events: none;
}
.project-card__media-hud,
.project-card__media-corner {
  position: absolute;
  z-index: 2;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.12em;
}
.project-card__media-hud {
  left: 16px;
  right: 16px;
  bottom: 14px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: rgba(244, 247, 255, 0.72);
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
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(5, 5, 10, 0.34);
  color: var(--text);
  backdrop-filter: blur(8px);
  transition:
    transform var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast);
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
  font-size: var(--fs-xs);
  letter-spacing: 0.12em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.project-card__body {
  margin-top: 26px;
}
.project-card h2 {
  margin: 0;
  color: var(--text);
  font-size: clamp(28px, 3vw, 38px);
  line-height: 1.03;
  letter-spacing: -0.04em;
}
.project-card p {
  max-width: 540px;
  margin: 14px 0 0;
  color: var(--text-secondary);
  font-size: var(--fs-body);
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
  font-size: var(--fs-xs);
}
.project-card__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: auto;
  padding-top: 26px;
  padding-bottom: 20px;
  border-top: 1px solid var(--line);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
}
.project-card__link {
  color: var(--accent);
  text-decoration: none;
}
.project-card__link:hover {
  text-shadow: var(--glow-cyan);
}
@keyframes archive-rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@media (max-width: 760px) {
  .project-card {
    min-height: 0;
  }
  .project-card__media {
    height: 230px;
  }
}
</style>
