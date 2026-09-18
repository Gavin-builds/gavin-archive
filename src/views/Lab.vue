<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import ArchiveDrawer from "../components/archive/ArchiveDrawer.vue";
import { labExperiments } from "../data/lab";
import type { LabExperiment, LabStatus } from "../types/lab";
import { localize } from "../types/content";

const { t, locale } = useI18n();
type Filter = "ALL" | LabStatus;
const filter = ref<Filter>("ALL");
const selected = ref<LabExperiment | null>(null);
// 关闭动画期间保留上一次选中的内容，动画结束后再清空
const presented = ref<LabExperiment | null>(null);

watch(selected, (value) => {
  if (value) presented.value = value;
});
const filters: Filter[] = [
  "ALL",
  "EXPERIMENT",
  "TESTING",
  "PROMISING",
  "PAUSED",
  "FAILED",
  "ARCHIVED",
];
const text = (value: { zh: string; en: string }) =>
  localize(value, locale.value);
const filteredExperiments = computed(() =>
  filter.value === "ALL"
    ? labExperiments
    : labExperiments.filter((item) => item.status === filter.value),
);
</script>

<template>
  <section class="lab">
    <header class="lab-hero">
      <div>
        <div class="eyebrow">/ 03 RESEARCH NOTEBOOK</div>
        <h1>{{ locale.startsWith("zh") ? "实验记录" : "EXPERIMENTAL LAB" }}</h1>
        <p>
          {{ locale.startsWith('zh') ? "Ideas don't need to work. 这里记录正在验证、尚未成熟或最终可能失败的东西。" : "Ideas don’t need to work. This is where unfinished, uncertain and experimental ideas are recorded." }}
        </p>
      </div>
      <div class="lab-runtime">
        <span>LAB.RUNTIME</span><strong>ACTIVE</strong><i></i
        ><small>OBSERVE → ITERATE → ARCHIVE</small>
      </div>
    </header>

    <div class="lab-index">
      <span>NOTEBOOK / {{ filter }}</span>
      <div>
        <button
          v-for="item in filters"
          :key="item"
          :class="{ active: filter === item }"
          type="button"
          @click="filter = item"
        >
          {{ item === "ALL" ? t("lab.all") : t(`lab.status.${item}`) }}
        </button>
      </div>
    </div>

    <div class="experiment-list">
      <article
        v-for="(experiment, index) in filteredExperiments"
        :key="experiment.slug"
        class="experiment"
        @click="selected = experiment"
      >
        <div class="experiment__index">
          EXP / {{ String(index + 1).padStart(2, "0") }}
        </div>
        <div class="experiment__main">
          <div class="experiment__meta">
            <span>{{ experiment.date }}</span
            ><span>{{ t(`lab.status.${experiment.status}`) }}</span>
          </div>
          <h2>{{ text(experiment.title) }}</h2>
          <p>{{ text(experiment.description) }}</p>
          <div class="tags">
            <span v-for="tag in experiment.tags" :key="tag.en">{{
              text(tag)
            }}</span>
          </div>
        </div>
        <div class="experiment__signal">
          <span>STATUS</span><strong>{{ experiment.status }}</strong
          ><b>OPEN ↗</b>
        </div>
      </article>
    </div>

    <div v-if="!filteredExperiments.length" class="empty">
      NO EXPERIMENTS / 0 RESULTS
    </div>

    <ArchiveDrawer
      :open="!!selected"
      eyebrow="LAB NOTE"
      :title="presented ? text(presented.title) : ''"
      :meta="presented?.date"
      @close="selected = null"
      @closed="presented = null"
    >
      <template v-if="presented">
        <div class="lab-drawer-section" v-if="presented.question">
          <span>QUESTION</span>
          <p>{{ text(presented.question) }}</p>
        </div>
        <div class="lab-drawer-section" v-if="presented.hypothesis">
          <span>HYPOTHESIS</span>
          <p>{{ text(presented.hypothesis) }}</p>
        </div>
        <div class="lab-drawer-section" v-if="presented.observation">
          <span>OBSERVATION</span>
          <p>{{ text(presented.observation) }}</p>
        </div>
        <div class="lab-drawer-section" v-if="presented.conclusion">
          <span>CONCLUSION</span>
          <p>{{ text(presented.conclusion) }}</p>
        </div>
        <RouterLink
          v-if="presented.relatedProject"
          class="lab-link"
          :to="`/archive/projects/${presented.relatedProject}`"
          @click="selected = null"
          >{{
            locale.startsWith("zh") ? "查看关联项目" : "OPEN RELATED CASE"
          }}
          →</RouterLink
        >
      </template>
    </ArchiveDrawer>
  </section>
</template>

<style scoped>
.lab-hero {
  min-height: 300px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 48px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--line);
}
.eyebrow,
.lab-index,
.experiment__index,
.experiment__meta,
.experiment__signal,
.lab-drawer-section > span {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.13em;
}
.eyebrow {
  color: var(--accent);
}
.lab h1 {
  margin: 14px 0 0;
  font-size: clamp(58px, 8vw, 104px);
  line-height: 0.9;
  letter-spacing: -0.07em;
}
.lab-hero p {
  max-width: 680px;
  margin: 24px 0 0;
  color: var(--text-secondary);
  font-size: var(--fs-xl);
  line-height: 1.75;
}
.lab-runtime {
  align-self: end;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  padding: 18px;
  border: 1px solid var(--line);
  background: var(--surface);
  font-family: var(--font-mono);
}
.lab-runtime span,
.lab-runtime small {
  color: var(--text-muted);
  font-size: var(--fs-xs);
}
.lab-runtime strong {
  color: var(--accent);
  font-size: var(--fs-xs);
  font-weight: 500;
}
.lab-runtime i {
  grid-column: 1/-1;
  height: 100px;
  border: 1px solid var(--line);
  background:
    repeating-linear-gradient(
      90deg,
      transparent 0 18px,
      rgba(var(--accent-rgb), 0.06) 19px
    ),
    repeating-linear-gradient(
      0deg,
      transparent 0 18px,
      rgba(var(--accent-rgb), 0.06) 19px
    );
  position: relative;
  overflow: hidden;
}
.lab-runtime i::after {
  content: "";
  position: absolute;
  inset: -50% 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--accent-rgb), 0.18),
    transparent
  );
  transform: translateX(-80%) rotate(12deg);
  animation: lab-scan 3.6s ease-in-out infinite;
}
.lab-index {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  padding: 22px 0;
}
.lab-index > span {
  color: var(--accent);
}
.lab-index > div {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 7px;
}
.lab-index button {
  padding: 8px 10px;
  border: 1px solid var(--line);
  background: var(--control-bg);
  color: var(--text-muted);
  font: inherit;
  cursor: pointer;
}
.lab-index button.active,
.lab-index button:hover {
  color: var(--accent);
  border-color: var(--accent-line);
  background: var(--accent-soft);
}
.experiment-list {
  border-top: 1px solid var(--line);
}
.experiment {
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr) 150px;
  gap: 28px;
  padding: 26px 0;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  transition:
    padding var(--transition-normal),
    background var(--transition-normal);
}
.experiment:hover {
  padding-left: 12px;
  padding-right: 12px;
  background: linear-gradient(
    90deg,
    rgba(var(--accent-rgb), 0.035),
    transparent 70%
  );
}
.experiment__index {
  color: var(--text-muted);
}
.experiment__meta {
  display: flex;
  gap: 16px;
  color: var(--text-muted);
}
.experiment__meta span:last-child {
  color: var(--accent-secondary);
}
.experiment h2 {
  margin: 12px 0 0;
  font-size: clamp(25px, 3vw, 38px);
  line-height: 1.05;
  letter-spacing: -0.035em;
}
.experiment p {
  max-width: 760px;
  margin: 12px 0 0;
  color: var(--text-secondary);
  line-height: 1.75;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 16px;
}
.tags span {
  padding: 5px 8px;
  border: 1px solid var(--line);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}
.experiment__signal {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  border-left: 1px solid var(--line);
  padding-left: 18px;
  color: var(--text-muted);
}
.experiment__signal strong {
  color: var(--accent);
  font-size: var(--fs-sm);
  font-weight: 500;
}
.experiment__signal b {
  color: var(--accent);
  font-weight: 500;
}
.empty {
  padding: 60px;
  border: 1px dashed var(--line);
  text-align: center;
  color: var(--text-muted);
  font-family: var(--font-mono);
}
.lab-drawer-section {
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}
.lab-drawer-section > span {
  color: var(--accent);
}
.lab-drawer-section p {
  margin: 12px 0 0;
  color: var(--text-secondary);
  line-height: 1.8;
}
.lab-link {
  display: inline-block;
  margin-top: 22px;
  padding: 10px 12px;
  border: 1px solid var(--accent-line);
  background: var(--accent-soft);
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  text-decoration: none;
}
@keyframes lab-scan {
  0%,
  20% {
    transform: translateX(-80%) rotate(12deg);
  }
  65%,
  100% {
    transform: translateX(80%) rotate(12deg);
  }
}
@media (max-width: 850px) {
  .lab-hero {
    grid-template-columns: 1fr;
  }
  .experiment {
    grid-template-columns: 70px 1fr;
  }
  .experiment__signal {
    display: none;
  }
}
@media (max-width: 620px) {
  .lab-index {
    align-items: flex-start;
    flex-direction: column;
  }
  .lab-index > div {
    justify-content: flex-start;
  }
  .experiment {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .experiment__index {
    order: 0;
  }
  .experiment__main {
    order: 1;
  }
}
</style>
