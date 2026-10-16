<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import ArchiveDrawer from "../components/archive/ArchiveDrawer.vue";
import { pulseItems } from "../data/pulse";
import type { PulseCategory, PulseItem } from "../types/pulse";
import { localize } from "../types/content";

const { t, locale } = useI18n();

type Filter = "ALL" | PulseCategory;

const filter = ref<Filter>("ALL");
const selected = ref<PulseItem | null>(null);
// 关闭动画期间保留上一次选中的内容，动画结束后再清空
const presented = ref<PulseItem | null>(null);

watch(selected, (value) => {
  if (value) presented.value = value;
});

const categories: PulseCategory[] = [
  "RESEARCH",
  "READING",
  "LEARNING",
  "LISTENING",
];

// 每个类别的终端图标与主色（CSS 变量名，--tab 注入子元素）
const categoryIcons: Record<Filter, string> = {
  ALL: "∷",
  RESEARCH: "◉",
  READING: "▤",
  LEARNING: "↟",
  LISTENING: "♫",
};

const categoryColors: Record<Filter, string> = {
  ALL: "var(--accent)",
  RESEARCH: "var(--accent)",
  READING: "var(--accent-purple)",
  LEARNING: "var(--accent-secondary)",
  LISTENING: "var(--success)",
};

const text = (value: { zh: string; en: string }) =>
  localize(value, locale.value);

const filterLabel = (item: Filter) =>
  item === "ALL" ? t("pulse.all") : t(`pulse.categories.${item}`);

const countOf = (item: Filter) =>
  item === "ALL"
    ? pulseItems.length
    : pulseItems.filter((entry) => entry.category === item).length;

const filteredItems = computed(() =>
  filter.value === "ALL"
    ? pulseItems
    : pulseItems.filter((entry) => entry.category === filter.value),
);

const latestDate = computed(
  () => [...pulseItems].map((entry) => entry.date).sort().pop() ?? "",
);

// 心电图轨迹：pathLength=1，亮段沿路径扫动
const ecgPath =
  "M0 32 H36 L44 32 L48 20 L52 44 L56 8 L60 50 L64 32 H108 L116 32 L120 24 L124 40 L128 32 H170 L178 32 L182 18 L186 46 L190 6 L194 52 L198 32 H244 L252 32 L256 26 L260 38 L264 32 H280";
</script>

<template>
  <section class="pulse">
    <header class="pulse-hero">
      <div>
        <div class="eyebrow">{{ t("pulse.eyebrow") }}</div>
        <h1>{{ t("pulse.title") }}</h1>
        <p>{{ t("pulse.description") }}</p>
      </div>

      <div class="pulse-monitor" aria-hidden="true">
        <div class="pulse-monitor__head">
          <span>{{ t("pulse.monitor") }}</span>
          <strong><i class="pulse-monitor__dot" />{{ t("pulse.live") }}</strong>
        </div>

        <svg
          class="pulse-monitor__ecg"
          viewBox="0 0 280 64"
          preserveAspectRatio="none"
        >
          <path class="ecg ecg--base" :d="ecgPath" pathLength="1" />
          <path class="ecg ecg--live" :d="ecgPath" pathLength="1" />
        </svg>

        <small>{{ t("pulse.lastSync") }} {{ latestDate }}</small>
      </div>
    </header>

    <div class="pulse-index">
      <span>{{
        t("pulse.feedPrefix", { filter: filterLabel(filter) })
      }}</span>

      <div class="pulse-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          :aria-selected="filter === 'ALL'"
          :class="{ active: filter === 'ALL' }"
          :style="{ '--tab': categoryColors.ALL }"
          @click="filter = 'ALL'"
        >
          <b>{{ categoryIcons.ALL }}</b>{{ t("pulse.all") }}
          <em>{{ String(countOf("ALL")).padStart(2, "0") }}</em>
        </button>

        <button
          v-for="item in categories"
          :key="item"
          type="button"
          role="tab"
          :aria-selected="filter === item"
          :class="{ active: filter === item }"
          :style="{ '--tab': categoryColors[item] }"
          @click="filter = item"
        >
          <b>{{ categoryIcons[item] }}</b>{{ filterLabel(item) }}
          <em>{{ String(countOf(item)).padStart(2, "0") }}</em>
        </button>
      </div>
    </div>

    <div class="pulse-feed">
      <article
        v-for="(item, index) in filteredItems"
        :key="item.slug"
        class="pulse-row"
        :style="{ '--tab': categoryColors[item.category] }"
        tabindex="0"
        role="button"
        @click="selected = item"
        @keydown.enter.prevent="selected = item"
        @keydown.space.prevent="selected = item"
      >
        <div class="pulse-row__cat">
          <span class="pulse-row__icon">{{ categoryIcons[item.category] }}</span>
          <span>{{ t(`pulse.categories.${item.category}`) }}</span>
          <small>{{ t("pulse.pulseToken", { n: String(index + 1).padStart(2, "0") }) }}</small>
        </div>

        <div class="pulse-row__main">
          <div class="pulse-row__meta">
            <span>{{ item.date }}</span>
            <span class="pulse-row__status" :class="`is-${item.status}`">
              <i v-if="item.status === 'ACTIVE'" class="status-dot" />
              {{ t(`pulse.status.${item.status}`) }}
            </span>
          </div>
          <h2>{{ text(item.title) }}</h2>
          <p>{{ text(item.subtitle) }}</p>
          <div class="tags">
            <span v-for="tag in item.tags" :key="tag.en">{{ text(tag) }}</span>
          </div>
        </div>

        <div class="pulse-row__signal">
          <span>{{ t("pulse.statusLabel") }}</span>
          <strong>{{ t(`pulse.status.${item.status}`) }}</strong>
          <b>{{ t("pulse.open") }}</b>
        </div>
      </article>
    </div>

    <div v-if="!filteredItems.length" class="empty">
      {{ t("pulse.emptyResults") }}
    </div>

    <ArchiveDrawer
      :open="!!selected"
      :eyebrow="t('pulse.drawerEyebrow')"
      :title="presented ? text(presented.title) : ''"
      :meta="presented?.date"
      @close="selected = null"
      @closed="presented = null"
    >
      <template v-if="presented">
        <div class="pulse-drawer-cat" :style="{ '--tab': categoryColors[presented.category] }">
          <span>{{ categoryIcons[presented.category] }}</span>
          {{ t(`pulse.categories.${presented.category}`) }}
          <small>{{ presented.date }}</small>
        </div>

        <p class="pulse-drawer-sub">{{ text(presented.subtitle) }}</p>

        <div v-if="presented.source" class="pulse-drawer-section">
          <span>{{ t("pulse.fields.source") }}</span>
          <p>{{ text(presented.source) }}</p>
        </div>
        <div v-if="presented.progress" class="pulse-drawer-section">
          <span>{{ t("pulse.fields.progress") }}</span>
          <p>{{ text(presented.progress) }}</p>
        </div>
        <div v-if="presented.thought" class="pulse-drawer-section">
          <span>{{ t("pulse.fields.thought") }}</span>
          <p>{{ text(presented.thought) }}</p>
        </div>
        <div v-if="presented.nextStep" class="pulse-drawer-section">
          <span>{{ t("pulse.fields.nextStep") }}</span>
          <p>{{ text(presented.nextStep) }}</p>
        </div>

        <RouterLink
          v-if="presented.relatedProject"
          class="pulse-link"
          :to="`/archive/projects/${presented.relatedProject}`"
          @click="selected = null"
          >{{ t("pulse.relatedProject") }} →</RouterLink
        >
      </template>
    </ArchiveDrawer>
  </section>
</template>

<style scoped>
/* =========================
   Hero
========================= */
.pulse-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--line);
}
.eyebrow,
.pulse-index,
.pulse-row__meta,
.pulse-row__signal,
.pulse-row__cat,
.pulse-drawer-section > span {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.13em;
}
.eyebrow {
  color: var(--accent);
}
.pulse h1 {
  margin: 14px 0 0;
  font-size: clamp(58px, 8vw, 104px);
  line-height: 0.9;
  letter-spacing: -0.07em;
}
.pulse-hero p {
  max-width: 680px;
  margin: 24px 0 0;
  color: var(--text-secondary);
  font-size: var(--fs-xl);
  line-height: 1.75;
}

/* =========================
   心电监视器
========================= */
.pulse-monitor {
  align-self: end;
  padding: 16px 18px 14px;
  border: 1px solid var(--line);
  background:
    radial-gradient(circle at 30% 0%, rgba(var(--accent-rgb), 0.07), transparent 55%),
    var(--control-bg);
}
.pulse-monitor__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  letter-spacing: 0.14em;
}
.pulse-monitor__head span {
  color: var(--text-muted);
}
.pulse-monitor__head strong {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent);
}
.pulse-monitor__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px rgba(var(--accent-rgb), 0.8);
  animation: pulse-blink 1.6s ease-in-out infinite;
}
.pulse-monitor__ecg {
  display: block;
  width: 100%;
  height: 56px;
  margin: 10px 0 6px;
}
.ecg {
  fill: none;
  stroke-width: 1.6;
  vector-effect: non-scaling-stroke;
}
.ecg--base {
  stroke: rgba(var(--accent-rgb), 0.16);
}
.ecg--live {
  stroke: var(--accent);
  stroke-dasharray: 0.14 1;
  animation: ecg-run 3.4s linear infinite;
}
.pulse-monitor small {
  display: block;
  color: var(--text-faint);
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  letter-spacing: 0.12em;
}

@keyframes pulse-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}
@keyframes ecg-run {
  from { stroke-dashoffset: 1.14; }
  to { stroke-dashoffset: 0; }
}

/* =========================
   Tab 栏
========================= */
.pulse-index {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 22px 0;
}
.pulse-index > span {
  color: var(--accent);
  white-space: nowrap;
}
.pulse-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 7px;
}
.pulse-tabs button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 11px;
  border: 1px solid var(--line);
  background: var(--control-bg);
  color: var(--text-muted);
  font: inherit;
  cursor: pointer;
  transition:
    color var(--transition-fast),
    border-color var(--transition-fast),
    background var(--transition-fast),
    box-shadow var(--transition-fast);
}
.pulse-tabs button b {
  color: var(--tab);
  font-weight: 400;
}
.pulse-tabs button em {
  font-style: normal;
  font-size: var(--fs-2xs);
  color: var(--text-faint);
  letter-spacing: 0.08em;
}
.pulse-tabs button:hover,
.pulse-tabs button.active {
  color: var(--tab);
  border-color: color-mix(in srgb, var(--tab) 45%, transparent);
  background: color-mix(in srgb, var(--tab) 8%, transparent);
}
.pulse-tabs button.active {
  box-shadow: 0 0 12px color-mix(in srgb, var(--tab) 25%, transparent);
}
.pulse-tabs button.active em {
  color: var(--tab);
}

/* =========================
   信号列表
========================= */
.pulse-feed {
  border-top: 1px solid var(--line);
}
.pulse-row {
  position: relative;
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr) 150px;
  gap: 28px;
  padding: 26px 0;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  transition:
    padding var(--transition-normal),
    background var(--transition-normal);
}
.pulse-row::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  background: linear-gradient(var(--tab), var(--accent-secondary));
  box-shadow: 0 0 8px color-mix(in srgb, var(--tab) 55%, transparent);
  transform: scaleY(0);
  transition: transform var(--transition-normal);
}
.pulse-row:hover,
.pulse-row:focus-visible {
  padding-left: 12px;
  padding-right: 12px;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--tab) 4%, transparent),
    transparent 70%
  );
  outline: none;
}
.pulse-row:hover::before,
.pulse-row:focus-visible::before {
  transform: scaleY(1);
}

.pulse-row__cat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--tab);
}
.pulse-row__icon {
  font-size: 20px;
  line-height: 1;
}
.pulse-row__cat small {
  color: var(--text-faint);
  font-size: var(--fs-2xs);
  letter-spacing: 0.1em;
}

.pulse-row__meta {
  display: flex;
  gap: 16px;
  color: var(--text-muted);
}
.pulse-row__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent);
}
.pulse-row__status.is-PAUSED { color: var(--text-muted); }
.pulse-row__status.is-DONE { color: var(--success); }
.pulse-row__status.is-ONGOING { color: var(--accent-purple); }
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px rgba(var(--accent-rgb), 0.8);
  animation: pulse-blink 1.6s ease-in-out infinite;
}
.pulse-row h2 {
  margin: 12px 0 0;
  font-size: clamp(24px, 2.6vw, 34px);
  line-height: 1.08;
  letter-spacing: -0.035em;
  transition: color var(--transition-fast);
}
.pulse-row:hover h2 {
  color: var(--tab);
}
.pulse-row__main p {
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
.pulse-row__signal {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  border-left: 1px solid var(--line);
  padding-left: 18px;
  color: var(--text-muted);
}
.pulse-row__signal strong {
  color: var(--tab);
  font-size: var(--fs-sm);
  font-weight: 500;
}
.pulse-row__signal b {
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

/* =========================
   抽屉内容
========================= */
.pulse-drawer-cat {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border: 1px solid color-mix(in srgb, var(--tab) 40%, transparent);
  background: color-mix(in srgb, var(--tab) 8%, transparent);
  color: var(--tab);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.13em;
}
.pulse-drawer-cat small {
  margin-left: 6px;
  color: var(--text-muted);
}
.pulse-drawer-sub {
  margin: 18px 0 0;
  color: var(--text-secondary);
  font-size: var(--fs-lg);
  line-height: 1.8;
}
.pulse-drawer-section {
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}
.pulse-drawer-section > span {
  color: var(--accent);
}
.pulse-drawer-section p {
  margin: 12px 0 0;
  color: var(--text-secondary);
  line-height: 1.8;
}
.pulse-link {
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

/* =========================
   响应式
========================= */
@media (max-width: 850px) {
  .pulse-hero {
    grid-template-columns: 1fr;
  }
  .pulse-monitor {
    max-width: 340px;
  }
  .pulse-row {
    grid-template-columns: 96px 1fr;
  }
  .pulse-row__signal {
    display: none;
  }
}
@media (max-width: 620px) {
  .pulse-index {
    align-items: flex-start;
    flex-direction: column;
  }
  .pulse-tabs {
    justify-content: flex-start;
  }
  .pulse-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .pulse-row__cat {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
}

/* =========================
   减弱动态效果
========================= */
@media (prefers-reduced-motion: reduce) {
  .pulse-monitor__dot,
  .status-dot,
  .ecg--live {
    animation: none;
  }
  .ecg--live {
    stroke-dasharray: none;
    stroke: rgba(var(--accent-rgb), 0.5);
  }
  .pulse-row,
  .pulse-row::before,
  .pulse-row h2,
  .pulse-tabs button {
    transition: none;
  }
}
</style>
