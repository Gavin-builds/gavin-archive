<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/Gavin-builds',
  },
  {
    label: 'Email',
    href: 'mailto:lejob@qq.com',
  },
]
</script>

<template>
  <section class="about">
    <header class="header">
      <div class="eyebrow">/ 06 SYSTEM INFO</div>
      <h1>{{ t('about.title') }}</h1>
      <p>{{ t('about.description') }}</p>
    </header>

    <div class="grid">
      <section class="panel">
        <div class="label">{{ t('about.whatIBuild') }}</div>
        <p>{{ t('about.whatIBuildText') }}</p>
      </section>

      <section class="panel">
        <div class="label">{{ t('about.howIWork') }}</div>
        <p>{{ t('about.howIWorkText') }}</p>
      </section>

      <section class="panel panel--wide">
        <div class="label">{{ t('about.now') }}</div>
        <div class="now">
          <div>
            <span>{{ t('about.currentlyBuilding') }}</span>
            <strong>{{ t('about.buildingValue') }}</strong>
          </div>
          <div>
            <span>{{ t('about.currentlyLearning') }}</span>
            <strong>{{ t('about.learningValue') }}</strong>
          </div>
          <div>
            <span>{{ t('about.exploring') }}</span>
            <strong>{{ t('about.exploringValue') }}</strong>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="label">CONTACT</div>
        <div class="links">
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noreferrer"
          >
            {{ link.label }} ↗
          </a>
        </div>
      </section>

      <section class="panel">
        <div class="label">{{ t('about.archive') }}</div>
        <p class="mono">GAVIN ARCHIVE / {{ t('home.footer.version') }}</p>
        <p>{{ t('about.archiveText') }}</p>
      </section>
    </div>
  </section>
</template>

<style scoped>
.header {
  padding-bottom: 54px;
  border-bottom: 1px solid var(--line);
}

.eyebrow,
.label {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
}

h1 {
  margin: 14px 0 0;
  font-size: clamp(48px, 8vw, 88px);
  line-height: 0.95;
  letter-spacing: -0.06em;
}

.header > p {
  max-width: 760px;
  margin: 24px 0 0;
  color: var(--text-secondary);
  font-size: 18px;
  line-height: 1.8;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.panel {
  padding: 28px;
  border: 1px solid var(--line);
  background: var(--surface);
}

.panel--wide {
  grid-column: 1 / -1;
}

.panel p {
  margin: 18px 0 0;
  color: var(--text-secondary);
  line-height: 1.85;
}

.now {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  margin-top: 20px;
  background: var(--line);
}

.now > div {
  min-height: 130px;
  padding: 22px;
  background: var(--surface-solid);
}

.now span {
  display: block;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 10px;
}

.now strong {
  display: block;
  margin-top: 16px;
  color: var(--text);
  line-height: 1.6;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.links a {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 11px;
  text-decoration: none;
}

.mono {
  color: var(--accent) !important;
  font-family: var(--font-mono);
  font-size: 11px;
}

@media (max-width: 760px) {
  .grid,
  .now {
    grid-template-columns: 1fr;
  }

  .panel--wide {
    grid-column: auto;
  }
}
</style>
