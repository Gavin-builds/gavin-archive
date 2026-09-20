<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import ProjectCard from "../components/projects/ProjectCard.vue";
import { projects } from "../data/projects";
import type { ProjectCategory } from "../types/project";
import { localize } from "../types/content";

const { t, locale } = useI18n();
type Filter = "ALL" | ProjectCategory;
const filter = ref<Filter>("ALL");
const filters: Filter[] = [
  "ALL",
  "AI",
  "Web",
  "Open Source",
  "Tools",
  "Experiment",
];
const text = (value: { zh: string; en: string }) =>
  localize(value, locale.value);
const categoryKeyMap: Record<ProjectCategory, string> = {
  AI: "projects.ai",
  Web: "projects.web",
  "Open Source": "projects.openSource",
  Tools: "projects.tools",
  Experiment: "projects.experiment",
};
const filterLabel = (item: Filter) =>
  item === "ALL" ? t("projects.all") : t(categoryKeyMap[item]);
const filteredProjects = computed(() =>
  filter.value === "ALL"
    ? projects
    : projects.filter((project) =>
        project.categories.includes(filter.value as ProjectCategory),
      ),
);
const featured = computed(
  () =>
    filteredProjects.value.find((project) => project.featured) ??
    filteredProjects.value[0],
);
const archiveEntries = computed(() =>
  filteredProjects.value.filter(
    (project) => project.slug !== featured.value?.slug,
  ),
);
</script>

<template>
  <section class="projects">
    <header class="archive-intro">
      <div>
        <div class="eyebrow">{{ t("projects.eyebrow") }}</div>
        <h1>
          {{ t("projects.title") }}
        </h1>
        <p>
          {{ t("projects.description") }}
        </p>
      </div>
      <div class="archive-counter">
        <span>{{ t("projects.indexed") }}</span
        ><strong>{{ String(filteredProjects.length).padStart(2, "0") }}</strong
        ><small>{{ t("projects.caseFiles") }}</small>
      </div>
    </header>

    <div class="filter-row">
      <span>{{
        t("projects.indexPrefix", { filter: filterLabel(filter) })
      }}</span>
      <div>
        <button
          v-for="item in filters"
          :key="item"
          type="button"
          :class="{ active: filter === item }"
          @click="filter = item"
        >
          {{ filterLabel(item) }}
        </button>
      </div>
    </div>

    <RouterLink
      v-if="featured"
      :to="`/archive/projects/${featured.slug}`"
      class="featured-file"
    >
      <div class="featured-file__media">
        <img
          v-if="featured.cover"
          :src="featured.cover"
          :alt="text(featured.title)"
        />
        <div class="featured-file__scan" />
        <span>{{
          t("projects.featuredCase", { date: featured.date })
        }}</span>
      </div>
      <div class="featured-file__body">
        <div class="case-id">
          {{
            t("projects.caseFile", {
              n: String(filteredProjects.indexOf(featured) + 1).padStart(3, "0"),
            })
          }}
        </div>
        <div class="case-meta">
          <span>{{ t(`projects.status.${featured.status}`) }}</span
          ><span>{{ featured.date }}</span>
        </div>
        <h2>{{ text(featured.title) }}</h2>
        <p>{{ text(featured.description) }}</p>
        <div class="case-tags">
          <span v-for="tag in featured.tags" :key="tag.en">{{
            text(tag)
          }}</span>
        </div>
        <span class="open"
          >{{ t("projects.openFullCase") }}
          →</span
        >
      </div>
    </RouterLink>

    <div class="case-grid">
      <ProjectCard
        v-for="project in archiveEntries"
        :key="project.slug"
        :project="project"
      />
    </div>

    <div v-if="!filteredProjects.length" class="empty-state">
      <span>{{ t("projects.indexReturned") }}</span
      ><strong>{{ t("projects.empty") }}</strong>
    </div>
  </section>
</template>

<style scoped>
.archive-intro {
  min-height: 300px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px;
  gap: 40px;
  padding-bottom: 42px;
  border-bottom: 1px solid var(--line);
}
.eyebrow,
.filter-row,
.case-id,
.case-meta {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  letter-spacing: 0.14em;
}
.archive-intro h1 {
  margin: 14px 0 0;
  font-size: clamp(54px, 8vw, 104px);
  line-height: 0.9;
  letter-spacing: -0.07em;
}
.archive-intro p {
  max-width: 680px;
  margin: 24px 0 0;
  color: var(--text-secondary);
  font-size: var(--fs-xl);
  line-height: 1.75;
}
.archive-counter {
  align-self: end;
  padding: 18px;
  border: 1px solid var(--line);
  background: var(--surface);
  font-family: var(--font-mono);
}
.archive-counter span,
.archive-counter small {
  display: block;
  color: var(--text-muted);
  font-size: var(--fs-xs);
  letter-spacing: 0.12em;
}
.archive-counter strong {
  display: block;
  margin: 8px 0;
  font-size: 48px;
  line-height: 1;
  color: var(--text);
}
.filter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 22px 0;
}
.filter-row > div {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}
.filter-row button {
  padding: 8px 11px;
  border: 1px solid var(--line);
  background: var(--control-bg);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  cursor: pointer;
}
.filter-row button.active,
.filter-row button:hover {
  color: var(--accent);
  border-color: var(--accent-line);
  background: var(--accent-soft);
}
.featured-file {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  border: 1px solid var(--line);
  background: var(--surface);
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  transition:
    transform var(--transition-normal),
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);
}
.featured-file:hover {
  transform: translateY(-6px);
  border-color: var(--accent-line);
  box-shadow: var(--shadow);
}
.featured-file__media {
  position: relative;
  min-height: 430px;
  overflow: hidden;
  background: var(--media-bg);
}
.featured-file__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}
.featured-file:hover img {
  transform: scale(1.06);
}
.featured-file__scan {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, transparent 35%, rgba(0, 0, 0, 0.72)),
    repeating-linear-gradient(
      0deg,
      transparent 0 5px,
      rgba(255, 255, 255, 0.02) 6px
    );
}
.featured-file__media span {
  position: absolute;
  left: 18px;
  bottom: 16px;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.12em;
}
.featured-file__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 36px;
}
.case-meta {
  display: flex;
  gap: 16px;
  margin-top: 18px;
  color: var(--text-muted);
}
.case-meta span:first-child {
  color: var(--accent);
}
.featured-file h2 {
  margin: 20px 0 0;
  font-size: clamp(38px, 5vw, 64px);
  line-height: 0.98;
  letter-spacing: -0.05em;
}
.featured-file p {
  margin: 18px 0 0;
  color: var(--text-secondary);
  line-height: 1.85;
}
.case-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 22px;
}
.case-tags span {
  padding: 5px 8px;
  border: 1px solid var(--line);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}
.open {
  margin-top: 26px;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
}
.case-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 18px;
}
.empty-state {
  padding: 60px;
  border: 1px dashed var(--line);
  text-align: center;
  font-family: var(--font-mono);
}
.empty-state span {
  display: block;
  color: var(--text-muted);
  font-size: var(--fs-sm);
}
.empty-state strong {
  display: block;
  margin-top: 8px;
  color: var(--accent);
}
@media (max-width: 900px) {
  .archive-intro {
    grid-template-columns: 1fr;
  }
  .featured-file {
    grid-template-columns: 1fr;
  }
  .featured-file__media {
    min-height: 300px;
  }
  .case-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 650px) {
  .filter-row {
    align-items: flex-start;
    flex-direction: column;
  }
  .filter-row > div {
    justify-content: flex-start;
  }
  .featured-file__body {
    padding: 22px;
  }
}
</style>
