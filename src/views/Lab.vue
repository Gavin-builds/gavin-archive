<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { labExperiments } from '../data/lab'
import type { LabStatus } from '../types/lab'

const { t } = useI18n()

type Filter = 'ALL' | LabStatus
const filter = ref<Filter>('ALL')

const filters: Filter[] = ['ALL', 'EXPERIMENT', 'TESTING', 'PROMISING', 'PAUSED', 'FAILED', 'ARCHIVED']

const filteredExperiments = computed(() => {
  if (filter.value === 'ALL') return labExperiments
  return labExperiments.filter(item => item.status === filter.value)
})
</script>

<template>
  <section class="lab">
    <div class="lab__hero">
      <div class="lab__copy">
        <div class="eyebrow">/ 03 EXPERIMENTAL LAB</div>
        <h1>{{ t('lab.title') }}</h1>
        <p>{{ t('lab.description') }}</p>
      </div>

      <div class="lab__console" aria-hidden="true">
        <div class="console-line"><span>LAB.RUNTIME</span><strong>ACTIVE</strong></div>
        <div class="console-line"><span>CHANNELS</span><strong>03</strong></div>
        <div class="console-line"><span>STATE</span><strong>OBSERVE → ITERATE</strong></div>
        <div class="console-screen">
          <span v-for="n in 9" :key="n" :style="{ '--i': n }" />
        </div>
      </div>
    </div>

    <div class="lab__toolbar">
      <span>FILTER / {{ filter }}</span>
      <div class="filters">
        <button
          v-for="item in filters"
          :key="item"
          :class="{ active: filter === item }"
          @click="filter = item"
        >
          {{ item === 'ALL' ? t('lab.all') : t(`lab.status.${item}`) }}
        </button>
      </div>
    </div>

    <TransitionGroup name="lab-list" tag="div" class="lab__grid">
      <article
        v-for="(experiment, index) in filteredExperiments"
        :key="experiment.slug"
        class="lab-card"
      >
        <RouterLink
          :to="experiment.relatedProject ? `/archive/projects/${experiment.relatedProject}` : '/archive/lab'"
          class="lab-card__media"
        >
          <img v-if="experiment.cover" :src="experiment.cover" :alt="`${experiment.title} visual`" loading="lazy" />
          <div class="lab-card__media-glitch" />
          <div class="lab-card__index">0{{ index + 1 }}</div>
          <div class="lab-card__status" :class="`status--${experiment.status.toLowerCase()}`">
            ● {{ t(`lab.status.${experiment.status}`) }}
          </div>
        </RouterLink>

        <div class="lab-card__body">
          <div class="lab-card__date">LAB / {{ experiment.date }}</div>
          <h2>{{ experiment.title }}</h2>
          <p>{{ experiment.description }}</p>

          <div class="tags">
            <span v-for="tag in experiment.tags" :key="tag">{{ tag }}</span>
          </div>

          <RouterLink
            v-if="experiment.relatedProject"
            :to="`/archive/projects/${experiment.relatedProject}`"
            class="related"
          >
            {{ t('lab.relatedProject') }} →
          </RouterLink>
        </div>
      </article>
    </TransitionGroup>

    <div v-if="filteredExperiments.length === 0" class="empty">
      <span>NO EXPERIMENTS / 0 RESULTS</span>
      <strong>{{ t('lab.empty') }}</strong>
    </div>
  </section>
</template>

<style scoped>
.lab__hero {
  display: grid;
  grid-template-columns: minmax(0,1fr) 320px;
  gap: 50px;
  min-height: 340px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--line);
}

.eyebrow,
.lab__toolbar > span,
.lab-card__date {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  letter-spacing: .16em;
}

h1 {
  margin: 14px 0 0;
  font-size: clamp(58px, 8vw, 104px);
  line-height: .9;
  letter-spacing: -.07em;
}

.lab__copy p {
  max-width: 640px;
  margin: 24px 0 0;
  color: var(--text-secondary);
  font-size: var(--fs-xl);
  line-height: 1.7;
}

.lab__console {
  align-self: stretch;
  padding: 18px;
  border: 1px solid var(--line);
  background: linear-gradient(145deg, rgba(0,229,255,.03), rgba(139,92,246,.02)), var(--surface);
  box-shadow: inset 0 0 40px rgba(0,229,255,.025);
}

.console-line {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 10px 0;
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}

.console-line span { color: var(--text-muted); }
.console-line strong { color: var(--accent); font-weight: 500; text-align: right; }

.console-screen {
  position: relative;
  height: 140px;
  margin-top: 16px;
  overflow: hidden;
  border: 1px solid var(--line);
  background:
    linear-gradient(180deg, rgba(0,229,255,.05), transparent),
    repeating-linear-gradient(0deg, rgba(255,255,255,.025) 0 1px, transparent 1px 6px);
}

.console-screen::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 20%, rgba(0,229,255,.12) 50%, transparent 80%);
  transform: translateX(-100%);
  animation: scanner 4s ease-in-out infinite;
}

.console-screen span {
  position: absolute;
  left: calc(8% + var(--i) * 9%);
  bottom: calc(12% + (var(--i) * 7%));
  width: 2px;
  height: calc(18px + var(--i) * 8px);
  background: linear-gradient(to top, rgba(0,229,255,.12), var(--accent));
  box-shadow: 0 0 14px rgba(0,229,255,.18);
  animation: bar 2.2s ease-in-out infinite alternate;
  animation-delay: calc(var(--i) * -120ms);
}

.lab__toolbar {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  padding: 22px 0;
}

.filters { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }

.filters button {
  padding: 9px 12px;
  border: 1px solid var(--line);
  background: rgba(9,9,18,.65);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  cursor: pointer;
  transition: color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast), background var(--transition-fast);
}

.filters button:hover,
.filters button.active {
  color: var(--accent);
  border-color: var(--accent-line);
  background: var(--accent-soft);
}

.filters button:hover { transform: translateY(-1px); }

.lab__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 16px;
}

.lab-card {
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--surface);
  animation: archive-rise 560ms cubic-bezier(.2,.75,.25,1) both;
  transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
}

.lab-card:hover {
  transform: translateY(-6px);
  border-color: var(--accent-line);
  box-shadow: var(--shadow);
}

.lab-card__media {
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  background: #060810;
}

.lab-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: .82;
  transition: transform 600ms ease, opacity 400ms ease;
}

.lab-card:hover .lab-card__media img {
  transform: scale(1.06);
  opacity: 1;
}

.lab-card__media-glitch {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,.6)), repeating-linear-gradient(0deg, transparent 0 5px, rgba(255,255,255,.025) 6px);
  pointer-events: none;
}

.lab-card__index,
.lab-card__status {
  position: absolute;
  z-index: 2;
  top: 12px;
  padding: 6px 8px;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(5,5,10,.48);
  backdrop-filter: blur(8px);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: .08em;
}

.lab-card__index { left: 12px; color: var(--text-muted); }
.lab-card__status { right: 12px; }

.status--experiment,
.status--testing { color: var(--accent); }
.status--promising { color: var(--accent-secondary); }
.status--failed { color: #ff6b8a; }
.status--paused,
.status--archived { color: var(--text-muted); }

.lab-card__body { padding: 20px; }
.lab-card__date { color: var(--text-muted); font-size: var(--fs-xs); }
.lab-card h2 { margin: 12px 0 0; font-size: 25px; line-height: 1.12; letter-spacing: -.03em; }
.lab-card p { margin: 12px 0 0; color: var(--text-secondary); font-size: var(--fs-body); line-height: 1.75; }

.tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 18px; }
.tags span { padding: 5px 8px; border: 1px solid var(--line); color: var(--text-muted); font-family: var(--font-mono); font-size: var(--fs-xs); }
.related { display: inline-block; margin-top: 22px; color: var(--accent); font-family: var(--font-mono); font-size: var(--fs-sm); text-decoration: none; }
.related:hover { text-shadow: var(--glow-cyan); }

.empty { padding: 60px 0; text-align: center; font-family: var(--font-mono); border: 1px dashed var(--line); }
.empty span { display: block; color: var(--text-muted); font-size: var(--fs-sm); }
.empty strong { display: block; margin-top: 8px; color: var(--accent); font-size: var(--fs-body); }

.lab-list-enter-active,
.lab-list-leave-active,
.lab-list-move { transition: all 360ms cubic-bezier(.2,.7,.2,1); }
.lab-list-enter-from,
.lab-list-leave-to { opacity: 0; transform: translateY(20px) scale(.985); }

@keyframes archive-rise { from { opacity: 0; transform: translateY(18px); } to { opacity:1; transform:none; } }
@keyframes scanner { 0%,20% { transform:translateX(-100%); } 60%,100% { transform:translateX(100%); } }
@keyframes bar { from { transform: scaleY(.55); opacity:.45; } to { transform: scaleY(1.15); opacity:1; } }

@media (max-width: 1050px) { .lab__grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
@media (max-width: 900px) {
  .lab__hero { grid-template-columns: 1fr; }
  .lab__console { min-height: 220px; }
  .lab__toolbar { align-items:flex-start; flex-direction:column; }
  .filters { justify-content:flex-start; }
}
@media (max-width: 640px) { .lab__grid { grid-template-columns: 1fr; } }

@media (prefers-reduced-motion: reduce) {
  .console-screen::after,
  .console-screen span,
  .lab-card,
  .lab-list-enter-active,
  .lab-list-leave-active,
  .lab-list-move { animation:none; transition:none; }
}
</style>
