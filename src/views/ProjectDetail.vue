<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import ProjectStatus from "../components/projects/ProjectStatus.vue";
import { getProjectBySlug } from "../data/projects";
import { localize } from "../types/content";

const route = useRoute();
const { t, locale } = useI18n();
const project = computed(() =>
  typeof route.params.slug === "string"
    ? getProjectBySlug(route.params.slug)
    : undefined,
);
const text = (value: { zh: string; en: string }) =>
  localize(value, locale.value);
</script>

<template>
  <section v-if="project" class="case-detail">
    <RouterLink to="/archive/projects" class="back">{{
      t("projects.backToList")
    }}</RouterLink>
    <header class="case-hero">
      <div class="eyebrow">{{
        t("projects.caseFileDate", { date: project.date })
      }}</div>
      <div class="case-hero__top">
        <h1>{{ text(project.title) }}</h1>
        <ProjectStatus :status="project.status" />
      </div>
      <p>{{ text(project.description) }}</p>
      <div class="case-cover" v-if="project.cover">
        <img :src="project.cover" :alt="text(project.title)" />
        <div />
        <span>{{ t("projects.caseVisual", { date: project.date }) }}</span>
      </div>
      <div class="case-actions">
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noreferrer"
          >{{ t("projects.github") }} ↗</a
        ><a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noreferrer"
          >{{ t("projects.demo") }} ↗</a
        >
      </div>
    </header>

    <div class="case-layout">
      <main>
        <section
          v-if="project.context"
          class="record-section record-section--context"
        >
          <span>00 / {{ t("projects.context") }}</span>
          <p>{{ text(project.context) }}</p>
          <div class="context-role">
            <b>{{ t("projects.role") }}</b
            ><strong>{{ text(project.role ?? { zh: "", en: "" }) }}</strong>
          </div>
        </section>
        <section v-if="project.problem" class="record-section">
          <span>01 / {{ t("projects.problem") }}</span>
          <p>{{ text(project.problem) }}</p>
        </section>
        <section v-if="project.solution" class="record-section">
          <span>02 / {{ t("projects.solution") }}</span>
          <p>{{ text(project.solution) }}</p>
        </section>
        <section v-if="project.features?.length" class="record-section">
          <span>03 / {{ t("projects.features") }}</span>
          <div class="feature-list">
            <div v-for="(feature, index) in project.features" :key="feature.en">
              <i>{{ String(index + 1).padStart(2, "0") }}</i
              ><strong>{{ text(feature) }}</strong>
            </div>
          </div>
        </section>
        <section v-if="project.architecture?.length" class="record-section">
          <span>04 / {{ t("projects.architecture") }}</span>
          <div class="architecture">
            <template
              v-for="(node, index) in project.architecture"
              :key="node.label.en"
              ><div class="architecture__node">
                <strong>{{ text(node.label) }}</strong
                ><small v-if="node.description">{{
                  text(node.description)
                }}</small>
              </div>
              <div
                v-if="index < project.architecture.length - 1"
                class="architecture__arrow"
              >
                ↓
              </div></template
            >
          </div>
        </section>
        <section
          v-if="project.engineeringChallenges?.length"
          class="record-section"
        >
          <span>05 / {{ t("projects.engineeringNotes") }}</span>
          <div class="challenge-grid">
            <article
              v-for="(item, index) in project.engineeringChallenges"
              :key="item.title.en"
            >
              <small>{{
                t("projects.noteToken", {
                  n: String(index + 1).padStart(2, "0"),
                })
              }}</small>
              <h3>{{ text(item.title) }}</h3>
              <p><b>{{ t("projects.problem") }}</b>{{ text(item.problem) }}</p>
              <p><b>{{ t("projects.solution") }}</b>{{ text(item.solution) }}</p>
            </article>
          </div>
        </section>
        <section v-if="project.developmentLog?.length" class="record-section">
          <span>06 / {{ t("projects.developmentLog") }}</span>
          <div class="timeline">
            <article
              v-for="item in project.developmentLog"
              :key="item.date + item.title.en"
            >
              <time>{{ item.date }}</time>
              <div>
                <h3>{{ text(item.title) }}</h3>
                <p>{{ text(item.description) }}</p>
              </div>
            </article>
          </div>
        </section>
      </main>
      <aside class="meta-panel">
        <div>
          <span>{{ t("projects.stack") }}</span>
          <p v-for="item in project.stack" :key="item">{{ item }}</p>
        </div>
        <div>
          <span>{{ t("projects.tags") }}</span>
          <p v-for="tag in project.tags" :key="tag.en">{{ text(tag) }}</p>
        </div>
        <div v-if="project.highlights?.length">
          <span>{{ t("projects.highlights") }}</span>
          <p v-for="item in project.highlights" :key="item.en">
            → {{ text(item) }}
          </p>
        </div>
      </aside>
    </div>
  </section>
  <section v-else class="not-found">
    <div class="eyebrow">{{ t("projects.notFoundError") }}</div>
    <h1>{{ t("projects.notFound") }}</h1>
    <RouterLink to="/archive/projects">{{
      t("projects.backToList")
    }}</RouterLink>
  </section>
</template>

<style scoped>
.back,
.not-found a {
  display: inline-block;
  padding: 10px 13px;
  border: 1px solid var(--accent-line);
  background: var(--accent-soft);
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  text-decoration: none;
  letter-spacing: 0.08em;
}
.back {
  margin-bottom: 42px;
}
.eyebrow,
.record-section > span,
.meta-panel > div > span {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.14em;
}
.case-hero {
  padding-bottom: 54px;
  border-bottom: 1px solid var(--line);
}
.case-hero__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 22px;
  margin-top: 14px;
}
.case-hero h1 {
  margin: 0;
  font-size: clamp(52px, 8vw, 108px);
  line-height: 0.9;
  letter-spacing: -0.07em;
}
.case-hero > p {
  max-width: 800px;
  margin: 24px 0 0;
  color: var(--text-secondary);
  font-size: var(--fs-xl);
  line-height: 1.75;
}
.case-cover {
  position: relative;
  height: min(460px, 42vw);
  margin-top: 30px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--media-bg);
}
.case-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.case-cover > div {
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
.case-cover span {
  position: absolute;
  left: 16px;
  bottom: 14px;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}
.case-actions {
  display: flex;
  gap: 10px;
  margin-top: 24px;
}
.case-actions a {
  padding: 10px 13px;
  border: 1px solid var(--line);
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  text-decoration: none;
}
.case-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 250px;
  gap: 80px;
  padding-top: 54px;
}
.record-section {
  padding-bottom: 60px;
}
.record-section > p {
  max-width: 800px;
  margin: 20px 0 0;
  color: var(--text-secondary);
  font-size: var(--fs-lg);
  line-height: 1.9;
}
.record-section--context {
  padding: 22px;
  border: 1px solid var(--accent-line);
  background: var(--accent-soft);
}
.record-section--context > p {
  margin-top: 14px;
}
.context-role {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 14px;
  margin-top: 20px;
  padding-top: 14px;
  border-top: 1px solid var(--accent-line);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}
.context-role b {
  color: var(--text-muted);
}
.context-role strong {
  color: var(--text);
}
.feature-list {
  margin-top: 20px;
  border-top: 1px solid var(--line);
}
.feature-list div {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}
.feature-list i {
  font-style: normal;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}
.feature-list strong {
  font-weight: 500;
  color: var(--text-secondary);
}
.architecture {
  margin-top: 20px;
}
.architecture__node {
  padding: 18px;
  border: 1px solid var(--line);
  background: var(--surface);
}
.architecture__node strong,
.architecture__node small {
  display: block;
}
.architecture__node small {
  margin-top: 6px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}
.architecture__arrow {
  padding: 7px;
  color: var(--accent);
  font-family: var(--font-mono);
  text-align: center;
}
.challenge-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 20px;
}
.challenge-grid article {
  padding: 20px;
  border: 1px solid var(--line);
  background: var(--surface);
}
.challenge-grid small {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}
.challenge-grid h3 {
  margin: 12px 0 0;
  font-size: 22px;
}
.challenge-grid p {
  margin: 16px 0 0;
  color: var(--text-secondary);
  line-height: 1.7;
}
.challenge-grid p b {
  display: block;
  margin-bottom: 4px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  font-weight: 500;
}
.timeline article {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}
.timeline time {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}
.timeline h3 {
  margin: 0;
  font-size: 20px;
}
.timeline p {
  margin: 7px 0 0;
  color: var(--text-secondary);
  line-height: 1.7;
}
.meta-panel {
  display: flex;
  flex-direction: column;
  gap: 34px;
}
.meta-panel > div {
  padding-bottom: 24px;
  border-bottom: 1px solid var(--line);
}
.meta-panel > div > span {
  display: block;
  margin-bottom: 12px;
  color: var(--text-muted);
}
.meta-panel p {
  margin: 8px 0;
  color: var(--text-secondary);
  line-height: 1.6;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}
.not-found h1 {
  margin: 16px 0 28px;
  font-size: clamp(44px, 7vw, 90px);
}
@media (max-width: 900px) {
  .case-layout {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .meta-panel {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }
  .challenge-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 620px) {
  .case-hero__top {
    flex-direction: column;
  }
  .case-cover {
    height: 240px;
  }
  .meta-panel {
    grid-template-columns: 1fr;
  }
  .context-role {
    grid-template-columns: 1fr;
  }
  .case-actions {
    flex-wrap: wrap;
  }
}
</style>
