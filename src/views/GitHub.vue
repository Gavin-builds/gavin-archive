<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useGitHub } from '../composables/useGitHub'

const { t } = useI18n()
const { profile, repositories, loading, error, username, refresh } = useGitHub()

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(value))
</script>

<template>
  <section class="github">
    <header class="header">
      <div>
        <div class="eyebrow">/ 05 NETWORK</div>
        <h1>{{ t('github.title') }}</h1>
        <p>{{ t('github.subtitle') }}</p>
      </div>

      <a
        :href="`https://github.com/${username}`"
        target="_blank"
        rel="noreferrer"
        class="profile-link"
      >
        @{{ username }} ↗
      </a>
    </header>

    <div v-if="loading" class="state">{{ t('common.loading') }}</div>

    <div v-else-if="error" class="state state--error">
      <strong>{{ t('github.unavailable') }}</strong>
      <span>{{ error }}</span>
      <button @click="refresh">{{ t('github.retry') }}</button>
    </div>

    <template v-else-if="profile">
      <section class="stats">
        <div><span>REPOSITORIES</span><strong>{{ profile.public_repos }}</strong></div>
        <div><span>FOLLOWERS</span><strong>{{ profile.followers }}</strong></div>
        <div><span>FOLLOWING</span><strong>{{ profile.following }}</strong></div>
      </section>

      <section class="repos">
        <div class="section-label">{{ t('github.repositories') }}</div>

        <article v-for="repo in repositories" :key="repo.id" class="repo">
          <div>
            <h2>{{ repo.name }}</h2>
            <p>{{ repo.description || t('github.noDescription') }}</p>
          </div>

          <div class="repo__meta">
            <span v-if="repo.language">{{ repo.language }}</span>
            <span>★ {{ repo.stargazers_count }}</span>
            <span>⑂ {{ repo.forks_count }}</span>
            <span>{{ formatDate(repo.updated_at) }}</span>
            <a :href="repo.html_url" target="_blank" rel="noreferrer">OPEN ↗</a>
          </div>
        </article>
      </section>
    </template>
  </section>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 32px;
  padding-bottom: 44px;
  border-bottom: 1px solid var(--line);
}

.eyebrow,
.section-label {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
}

h1 {
  margin: 12px 0 0;
  font-size: clamp(48px, 7vw, 88px);
  line-height: 0.95;
  letter-spacing: -0.06em;
}

.header p {
  max-width: 600px;
  margin: 22px 0 0;
  color: var(--text-secondary);
  font-size: 17px;
  line-height: 1.7;
}

.profile-link {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 10px;
  text-decoration: none;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  margin: 16px 0 56px;
  background: var(--line);
}

.stats div {
  padding: 24px;
  background: var(--surface);
}

.stats span {
  display: block;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.1em;
}

.stats strong {
  display: block;
  margin-top: 12px;
  color: var(--accent);
  font-size: 38px;
}

.repos {
  border-top: 1px solid var(--line);
}

.section-label {
  padding: 18px 0;
}

.repo {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  padding: 26px 0;
  border-top: 1px solid var(--line);
}

.repo h2 {
  margin: 0;
  font-size: 24px;
}

.repo p {
  max-width: 700px;
  margin: 10px 0 0;
  color: var(--text-secondary);
  line-height: 1.7;
}

.repo__meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  align-content: start;
  gap: 8px;
  min-width: 280px;
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--text-muted);
}

.repo__meta span,
.repo__meta a {
  padding: 5px 7px;
  border: 1px solid var(--line);
  text-decoration: none;
}

.repo__meta a {
  color: var(--accent);
}

.state {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 64px 0;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.state--error strong {
  color: #ff6b8a;
}

.state button {
  width: fit-content;
  padding: 9px 12px;
  border: 1px solid var(--accent-line);
  background: var(--accent-soft);
  color: var(--accent);
  cursor: pointer;
}

@media (max-width: 800px) {
  .header {
    display: block;
  }

  .profile-link {
    display: inline-block;
    margin-top: 24px;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .repo {
    flex-direction: column;
  }

  .repo__meta {
    justify-content: start;
    min-width: 0;
  }
}
</style>
