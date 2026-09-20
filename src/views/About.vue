<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const links = [
  {
    labelKey: "nav.github",
    href: "https://github.com/Gavin-builds",
  },
  {
    labelKey: "about.emailLink",
    href: "mailto:lejob@qq.com",
  },
];
</script>

<template>
  <section class="about">
    <header class="header">
      <div class="eyebrow">{{ t("about.eyebrow") }}</div>
      <h1>{{ t("about.title") }}</h1>
      <p>{{ t("about.description") }}</p>
    </header>

    <div class="grid">
      <section class="panel">
        <div class="label">{{ t("about.whatIBuild") }}</div>
        <p>{{ t("about.whatIBuildText") }}</p>
      </section>

      <section class="panel">
        <div class="label">{{ t("about.howIWork") }}</div>
        <p>{{ t("about.howIWorkText") }}</p>
      </section>

      <section class="panel panel--wide">
        <div class="label">{{ t("about.now") }}</div>
        <div class="now">
          <div>
            <span>{{ t("about.currentlyBuilding") }}</span>
            <strong>{{ t("about.buildingValue") }}</strong>
          </div>
          <div>
            <span>{{ t("about.currentlyLearning") }}</span>
            <strong>{{ t("about.learningValue") }}</strong>
          </div>
          <div>
            <span>{{ t("about.exploring") }}</span>
            <strong>{{ t("about.exploringValue") }}</strong>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="label">{{ t("about.contact") }}</div>
        <div class="links">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noreferrer"
          >
            {{ t(link.labelKey) }} ↗
          </a>
        </div>
      </section>

      <section class="panel">
        <div class="label">{{ t("about.archive") }}</div>
        <p class="mono">GAVIN ARCHIVE / {{ t("home.footer.version") }}</p>
        <p>{{ t("about.archiveText") }}</p>
      </section>
    </div>
  </section>
</template>

<style scoped>
.about {
  position: relative;
}
.header {
  position: relative;
  min-height: 330px;
  padding-bottom: 54px;
  border-bottom: 1px solid var(--line);
  overflow: hidden;
}
.header::after {
  content: "ARCHIVE";
  position: absolute;
  right: -18px;
  bottom: -34px;
  color: rgba(var(--ink-rgb), 0.05);
  font-size: 160px;
  font-weight: 900;
  letter-spacing: -0.08em;
  pointer-events: none;
}
.eyebrow,
.label {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  letter-spacing: 0.15em;
}
h1 {
  margin: 14px 0 0;
  font-size: clamp(54px, 8vw, 100px);
  line-height: 0.9;
  letter-spacing: -0.07em;
}
.header > p {
  max-width: 780px;
  margin: 24px 0 0;
  color: var(--text-secondary);
  font-size: var(--fs-xl);
  line-height: 1.8;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;
}
.panel {
  position: relative;
  padding: 30px;
  border: 1px solid var(--line);
  background:
    linear-gradient(135deg, rgba(var(--ink-rgb), 0.025), transparent 50%),
    var(--surface);
  overflow: hidden;
  transition:
    transform var(--transition-normal),
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);
}
.panel::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 72px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent));
  opacity: 0.55;
}
.panel:hover {
  transform: translateY(-4px);
  border-color: var(--accent-line);
  box-shadow: var(--shadow-soft);
}
.panel--wide {
  grid-column: 1/-1;
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
  min-height: 140px;
  padding: 22px;
  background: var(--surface-solid);
}
.now span {
  display: block;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
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
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-md);
  text-decoration: none;
}
.mono {
  color: var(--accent) !important;
  font-family: var(--font-mono);
  font-size: var(--fs-md);
}
@keyframes about-spin {
  to {
    transform: rotate(360deg);
  }
}
@media (max-width: 760px) {
  .grid,
  .now {
    grid-template-columns: 1fr;
  }
  .panel--wide {
    grid-column: auto;
  }
  .header {
    min-height: 0;
  }
  .header::after {
    font-size: 88px;
    bottom: -16px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .matrix__orb {
    animation: none;
  }
  .panel,
  .links a {
    transition: none;
  }
}
</style>
