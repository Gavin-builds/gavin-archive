<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { getBlogPostBySlug } from "../data/blog";
import { localize } from "../types/content";

const route = useRoute();
const { t, locale } = useI18n();
const post = computed(() =>
  typeof route.params.slug === "string"
    ? getBlogPostBySlug(route.params.slug)
    : undefined,
);
const text = (value: { zh: string; en: string }) =>
  localize(value, locale.value);
</script>

<template>
  <section v-if="post" class="article">
    <RouterLink to="/archive/blog" class="back">{{
      t("blog.backToList")
    }}</RouterLink>
    <header class="article-hero">
      <div class="eyebrow">FIELD NOTE / {{ post.type }} / {{ post.date }}</div>
      <h1>{{ text(post.title) }}</h1>
      <p>{{ text(post.description) }}</p>
      <div v-if="post.cover" class="article-cover">
        <img :src="post.cover" :alt="text(post.title)" /><span
          >FIELD NOTE VISUAL / {{ post.date }}</span
        >
      </div>
      <div class="meta">
        <span>{{ post.readTime }} {{ t("blog.minRead") }}</span
        ><span v-for="tag in post.tags" :key="tag.en">{{ text(tag) }}</span>
      </div>
    </header>
    <div class="article-grid">
      <aside>
        <span>NOTE / {{ post.date }}</span
        ><strong>{{ post.type }}</strong
        ><small>{{ post.readTime }} {{ t("blog.minRead") }}</small>
      </aside>
      <main>
        <p v-for="paragraph in post.content" :key="paragraph.en">
          {{ text(paragraph) }}
        </p>
      </main>
    </div>
    <section v-if="post.relatedProjects?.length" class="related">
      <span>{{ t("blog.relatedProjects") }}</span
      ><RouterLink
        v-for="slug in post.relatedProjects"
        :key="slug"
        :to="`/archive/projects/${slug}`"
        >{{ slug }} →</RouterLink
      >
    </section>
  </section>
  <section v-else class="not-found">
    <div class="eyebrow">BLOG ERROR</div>
    <h1>{{ t("blog.notFound") }}</h1>
    <RouterLink to="/archive/blog">{{ t("blog.backToList") }}</RouterLink>
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
  margin-bottom: 40px;
}
.eyebrow,
.article-grid aside,
.related > span {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.14em;
}
.article-hero {
  padding-bottom: 50px;
  border-bottom: 1px solid var(--line);
}
.article h1 {
  max-width: 1040px;
  margin: 16px 0 0;
  font-size: clamp(46px, 7vw, 96px);
  line-height: 0.94;
  letter-spacing: -0.065em;
}
.article-hero > p {
  max-width: 800px;
  margin: 24px 0 0;
  color: var(--text-secondary);
  font-size: var(--fs-xl);
  line-height: 1.8;
}
.article-cover {
  position: relative;
  height: min(420px, 42vw);
  margin-top: 30px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--media-bg);
}
.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.article-cover::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, transparent 35%, rgba(0, 0, 0, 0.7)),
    repeating-linear-gradient(
      0deg,
      transparent 0 5px,
      rgba(255, 255, 255, 0.02) 6px
    );
}
.article-cover span {
  position: absolute;
  left: 16px;
  bottom: 14px;
  z-index: 2;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
}
.meta span {
  padding: 6px 8px;
  border: 1px solid var(--line);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}
.meta span:first-child {
  color: var(--accent);
}
.article-grid {
  display: grid;
  grid-template-columns: 180px minmax(0, 780px);
  gap: 62px;
  padding: 54px 0;
}
.article-grid aside {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 8px;
  color: var(--text-muted);
}
.article-grid aside strong {
  color: var(--text);
  font-family: var(--font-mono);
  font-weight: 500;
}
.article-grid aside small {
  color: var(--text-muted);
}
.article-grid main p {
  margin: 0 0 30px;
  color: var(--text-secondary);
  font-size: var(--fs-xl);
  line-height: 1.95;
}
.related {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}
.related > span {
  margin-right: 8px;
}
.related a {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  text-decoration: none;
}
.not-found h1 {
  margin: 16px 0 28px;
  font-size: clamp(44px, 7vw, 90px);
}
@media (max-width: 760px) {
  .article-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .article-cover {
    height: 240px;
  }
}
</style>
