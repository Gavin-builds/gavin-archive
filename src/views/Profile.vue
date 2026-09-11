<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const focusKeys = [
  'profile.focusItems.ai',
  'profile.focusItems.tools',
  'profile.focusItems.openSource',
  'profile.focusItems.products',
] as const
</script>

<template>
  <section class="profile">
    <header class="profile__header">
      <div class="eyebrow">
        {{ t('profile.sectionLabel') }}
      </div>

      <h1>
        Gavin
      </h1>

      <p class="role">
        {{ t('profile.role') }}
      </p>

      <p class="intro">
        {{ t('profile.description') }}
      </p>
    </header>

    <div class="profile__grid">
      <section class="panel">
        <div class="label">
          {{ t('profile.subtitle') }}
        </div>

        <p>
          {{ t('profile.aboutIntro') }}
        </p>

        <p>
          {{ t('profile.aboutArchive') }}
        </p>
      </section>

      <section class="panel">
        <div class="label">
          {{ t('profile.focus') }}
        </div>

        <ul>
          <li
            v-for="key in focusKeys"
            :key="key"
          >
            {{ t(key) }}
          </li>
        </ul>
      </section>
    </div>

    <section class="skills">
      <div class="label">
        {{ t('profile.techStack') }}
      </div>

      <div class="skills__grid">
        <div>
          <h2>{{ t('profile.frontend') }}</h2>

          <p>
            Vue · React · TypeScript · Vite
          </p>
        </div>

        <div>
          <h2>{{ t('profile.backend') }}</h2>

          <p>
            Node.js · Midway · REST API
          </p>
        </div>

        <div>
          <h2>{{ t('profile.ai') }}</h2>

          <p>
            LLM · AI Application · AI Agents
          </p>
        </div>

        <div>
          <h2>{{ t('profile.engineering') }}</h2>

          <p>
            Git · Docker · API · PWA
          </p>
        </div>
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
  font-size: 10px;

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
  font-size: 14px;

  letter-spacing: 0.2em;
}

.intro {
  max-width: 680px;

  margin: 24px 0 0;

  color: var(--text-secondary);

  font-size: 19px;
  line-height: 1.7;
}

.profile__grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 16px;

  margin-top: 16px;
}

.panel {
  padding: 28px;

  border: 1px solid var(--line);

  background: var(--surface);
}

.panel p {
  color: var(--text-secondary);

  line-height: 1.8;
}

.panel ul {
  margin: 24px 0 0;
  padding: 0;

  list-style: none;
}

.panel li {
  padding: 12px 0;

  border-bottom: 1px solid var(--line);

  color: var(--text-secondary);
}

.panel li::before {
  content: '→';

  margin-right: 10px;

  color: var(--accent);
}

.skills {
  margin-top: 56px;
}

.skills__grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 1px;

  margin-top: 18px;

  background: var(--line);
}

.skills__grid > div {
  min-height: 150px;

  padding: 26px;

  background: var(--surface);
}

.skills h2 {
  margin: 0;

  color: var(--text);

  font-family: var(--font-mono);
  font-size: 12px;

  letter-spacing: 0.1em;
}

.skills p {
  margin: 20px 0 0;

  color: var(--text-secondary);

  line-height: 1.7;
}

@media (max-width: 700px) {
  .profile__grid,
  .skills__grid {
    grid-template-columns: 1fr;
  }
}
</style>