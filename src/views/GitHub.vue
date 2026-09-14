<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useGitHub } from "../composables/useGitHub";

const { t } = useI18n();
const { profile, repositories, loading, error, username, refresh } =
  useGitHub();

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
</script>

<template>
  <section class="github">
    <header class="header">
      <div>
        <div class="eyebrow">/ 05 NETWORK</div>
        <h1>{{ t("github.title") }}</h1>
        <p>{{ t("github.subtitle") }}</p>
      </div>

      <div class="github__signal" aria-hidden="true">
        <div class="github__pulse"></div>
        <div class="github__orbit github__orbit--1"></div>
        <div class="github__orbit github__orbit--2"></div>
        <span>SOURCE NODE</span>
        <strong>ONLINE</strong>
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

    <div v-if="loading" class="state">{{ t("common.loading") }}</div>

    <div v-else-if="error" class="state state--error">
      <strong>{{ t("github.unavailable") }}</strong>
      <span>{{ error }}</span>
      <button @click="refresh">{{ t("github.retry") }}</button>
    </div>

    <template v-else-if="profile">
      <section class="stats">
        <div>
          <span>REPOSITORIES</span><strong>{{ profile.public_repos }}</strong>
        </div>
        <div>
          <span>FOLLOWERS</span><strong>{{ profile.followers }}</strong>
        </div>
        <div>
          <span>FOLLOWING</span><strong>{{ profile.following }}</strong>
        </div>
      </section>

      <section class="repos">
        <div class="section-label">{{ t("github.repositories") }}</div>

        <article v-for="repo in repositories" :key="repo.id" class="repo">
          <div>
            <h2>{{ repo.name }}</h2>
            <p>{{ repo.description || t("github.noDescription") }}</p>
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
.github {
  position: relative;
}
.header {
  position: relative;
  min-height: 300px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px auto;
  gap: 28px;
  padding-bottom: 44px;
  border-bottom: 1px solid var(--line);
  overflow: hidden;
}
.eyebrow,
.section-label {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  letter-spacing: 0.15em;
}
h1 {
  margin: 12px 0 0;
  font-size: clamp(54px, 8vw, 102px);
  line-height: 0.9;
  letter-spacing: -0.07em;
}
.header p {
  max-width: 650px;
  margin: 22px 0 0;
  color: var(--text-secondary);
  font-size: var(--fs-xl);
  line-height: 1.72;
}
.profile-link {
  justify-self: end;
  align-self: end;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  text-decoration: none;
  letter-spacing: 0.1em;
  padding: 10px 12px;
  border: 1px solid var(--accent-line);
  background: var(--accent-soft);
}
.profile-link:hover {
  box-shadow: var(--glow-cyan);
}
.github__signal {
  position: relative;
  height: 190px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-left: 1px solid var(--line);
  background: radial-gradient(circle, rgba(0, 229, 255, 0.08), transparent 62%);
}
.github__orbit {
  position: absolute;
  border: 1px solid rgba(0, 229, 255, 0.2);
  border-radius: 50%;
}
.github__orbit--1 {
  width: 148px;
  height: 148px;
  animation: gh-spin 15s linear infinite;
}
.github__orbit--2 {
  width: 92px;
  height: 92px;
  border-color: rgba(255, 43, 214, 0.24);
  border-style: dashed;
  animation: gh-spin 10s linear reverse infinite;
}
.github__pulse {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 36px rgba(0, 229, 255, 0.48);
  animation: gh-pulse 2.4s ease-in-out infinite;
}
.github__signal span,
.github__signal strong {
  position: absolute;
  font-family: var(--font-mono);
}
.github__signal span {
  top: 14px;
  left: 14px;
  color: var(--text-muted);
  font-size: var(--fs-2xs);
  letter-spacing: 0.14em;
}
.github__signal strong {
  right: 14px;
  bottom: 12px;
  color: var(--accent);
  font-size: var(--fs-xs);
  letter-spacing: 0.12em;
}
.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  margin: 16px 0 56px;
  background: var(--line);
}
.stats div {
  position: relative;
  padding: 26px;
  min-height: 130px;
  background: var(--surface);
  overflow: hidden;
}
.stats div::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), transparent 70%);
  opacity: 0.6;
}
.stats span {
  display: block;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.12em;
}
.stats strong {
  display: block;
  margin-top: 14px;
  color: var(--accent);
  font-size: 42px;
  line-height: 1;
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
  padding: 28px 0;
  border-top: 1px solid var(--line);
  transition:
    transform var(--transition-normal),
    padding-left var(--transition-normal);
}
.repo:hover {
  transform: translateX(6px);
  padding-left: 6px;
}
.repo h2 {
  margin: 0;
  font-size: 25px;
  letter-spacing: -0.03em;
}
.repo p {
  max-width: 700px;
  margin: 10px 0 0;
  color: var(--text-secondary);
  line-height: 1.72;
}
.repo__meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  align-content: start;
  gap: 8px;
  min-width: 280px;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
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
@keyframes gh-spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes gh-pulse {
  0%,
  100% {
    transform: scale(0.84);
    opacity: 0.72;
  }
  50% {
    transform: scale(1.12);
    opacity: 1;
  }
}
@media (max-width: 1050px) {
  .header {
    grid-template-columns: minmax(0, 1fr) 210px auto;
  }
}
@media (max-width: 860px) {
  .header {
    grid-template-columns: 1fr;
  }
  .github__signal {
    display: none;
  }
  .profile-link {
    justify-self: start;
    margin-top: 8px;
  }
  .stats {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 800px) {
  .repo {
    flex-direction: column;
  }
  .repo__meta {
    justify-content: start;
    min-width: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .github__orbit,
  .github__pulse,
  .repo {
    animation: none;
    transition: none;
  }
}
</style>
