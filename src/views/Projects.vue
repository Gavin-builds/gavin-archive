<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import ProjectCard from "../components/projects/ProjectCard.vue";
import { projects } from "../data/projects";
import type { ProjectCategory } from "../types/project";

const { t } = useI18n();
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
const categoryKeyMap: Record<ProjectCategory, string> = {
  AI: "projects.ai",
  Web: "projects.web",
  "Open Source": "projects.openSource",
  Tools: "projects.tools",
  Experiment: "projects.experiment",
};
const filterLabel = (item: Filter) =>
  item === "ALL" ? t("projects.all") : t(categoryKeyMap[item]);
const filteredProjects = computed(() => {
  const list =
    filter.value === "ALL"
      ? projects
      : projects.filter((project) =>
          project.categories.includes(filter.value as ProjectCategory),
        );
  // featured 项目排最前，其余保持原序
  return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
});
</script>

<template>
  <section class="projects">
    <header class="archive-intro">
      <div>
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

    <div class="case-grid">
      <ProjectCard
        v-for="project in filteredProjects"
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
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px;
  gap: 40px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--line);
}
.filter-row {
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
  padding: 0 0 4px;
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
  font-size: 40px;
  font-weight: 600;
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
}
</style>
