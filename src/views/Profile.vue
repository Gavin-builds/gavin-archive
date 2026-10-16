<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import CyberCard from '../components/archive/CyberCard.vue'

const { t } = useI18n()

const focusKeys = [
  'profile.focusItems.ai',
  'profile.focusItems.tools',
  'profile.focusItems.openSource',
  'profile.focusItems.products',
] as const

const skillGroups = [
  { titleKey: 'profile.frontend', items: 'Vue · React · TypeScript · Vite' },
  { titleKey: 'profile.backend', items: 'Node.js · Midway · REST API' },
  { titleKey: 'profile.ai', items: 'LLM · AI Application · AI Agents' },
  { titleKey: 'profile.engineering', items: 'Git · Docker · API · PWA' },
] as const

const links = [
  { labelKey: 'nav.github', href: 'https://github.com/Gavin-builds' },
  { labelKey: 'profile.emailLink', href: 'mailto:lejob@qq.com' },
]
</script>

<template>
  <section class="profile">
    <header class="profile__header">
      <div class="eyebrow">
        {{ t('profile.sectionLabel') }}
      </div>

      <h1>
        GavinLin
      </h1>

      <p class="role">
        {{ t('profile.role') }}
      </p>

      <p class="intro">
        {{ t('profile.description') }}
      </p>
    </header>

    <div class="profile__grid">
      <CyberCard :label="t('profile.subtitle')">
        <p>
          {{ t('profile.aboutIntro') }}
        </p>

        <p>
          {{ t('profile.aboutArchive') }}
        </p>
      </CyberCard>

      <CyberCard :label="t('profile.focus')">
        <ul class="focus-list">
          <li
            v-for="key in focusKeys"
            :key="key"
          >
            {{ t(key) }}
          </li>
        </ul>
      </CyberCard>

      <CyberCard :label="t('profile.whatIBuild')">
        <p>
          {{ t('profile.whatIBuildText') }}
        </p>
      </CyberCard>

      <CyberCard :label="t('profile.howIWork')">
        <p>
          {{ t('profile.howIWorkText') }}
        </p>
      </CyberCard>

      <CyberCard :label="t('profile.contact')">
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
      </CyberCard>

      <CyberCard :label="t('archive.token')" :hoverable="false">
        <p class="mono">GAVIN ARCHIVE / {{ t('home.footer.version') }}</p>
        <p>
          {{ t('profile.archiveText') }}
        </p>
      </CyberCard>
    </div>

    <section class="skills">
      <div class="label">
        {{ t('profile.techStack') }}
      </div>

      <div class="skills__grid">
        <CyberCard
          v-for="group in skillGroups"
          :key="group.titleKey"
          :label="t(group.titleKey)"
          :hoverable="false"
        >
          <p>{{ group.items }}</p>
        </CyberCard>
      </div>
    </section>
  </section>
</template>

<style scoped>
.profile__header {
  padding-bottom: 54px;

  border-bottom: 1px solid var(--line);
}

.eyebrow,
.label {
  color: var(--accent);

  font-family: var(--font-mono);
  font-size: var(--fs-sm);

  letter-spacing: 0.14em;
}

.profile h1 {
  margin: 14px 0 0;

  font-size: clamp(64px, 10vw, 130px);

  line-height: 0.9;

  letter-spacing: -0.07em;
}

.role {
  margin: 24px 0 0;

  color: var(--accent-secondary);

  font-family: var(--font-mono);
  font-size: var(--fs-body);

  letter-spacing: 0.2em;
}

.intro {
  max-width: 680px;

  margin: 24px 0 0;

  color: var(--text-secondary);

  font-size: var(--fs-2xl);
  line-height: 1.7;
}

.profile__grid {
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 18px;

  margin-top: 48px;
}

.profile__grid p {
  margin: 18px 0 0;

  color: var(--text-secondary);

  line-height: 1.8;
}

.focus-list {
  margin: 22px 0 0;
  padding: 0;

  list-style: none;
}

.focus-list li {
  padding: 12px 0;

  border-bottom: 1px solid var(--line);

  color: var(--text-secondary);
}

.focus-list li:last-child {
  border-bottom: none;
}

.focus-list li::before {
  content: '→';

  margin-right: 10px;

  color: var(--accent);
}

.skills {
  margin-top: 56px;
}

.skills__grid {
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 18px;

  margin-top: 18px;
}

.skills__grid p {
  margin: 16px 0 0;

  color: var(--text-secondary);

  line-height: 1.7;
}

.links {
  display: flex;
  flex-direction: column;

  margin-top: 4px;
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

  transition:
    color var(--transition-fast),
    text-shadow var(--transition-fast);
}

.links a:last-child {
  border-bottom: none;
}

.links a:hover {
  text-shadow: 0 0 10px rgba(var(--accent-rgb), 0.5);
}

.mono {
  color: var(--accent) !important;

  font-family: var(--font-mono);
  font-size: var(--fs-md);
}

@media (prefers-reduced-motion: reduce) {
  .links a {
    transition: none;
  }
}

@media (max-width: 700px) {
  .profile__grid,
  .skills__grid {
    grid-template-columns: 1fr;
  }
}
</style>
