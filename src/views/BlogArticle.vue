<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { getBlogPostBySlug } from '../data/blog'

const route = useRoute()
const { t } = useI18n()

const post = computed(() => {
  const slug = route.params.slug
  return typeof slug === 'string' ? getBlogPostBySlug(slug) : undefined
})
</script>

<template>
  <section v-if="post" class="article">
    <RouterLink to="/archive/blog" class="back">
      {{ t('blog.backToList') }}
    </RouterLink>

    <header class="article__header">
      <div class="eyebrow">{{ post.type }} / {{ post.date }}</div>
      <h1>{{ post.title }}</h1>
      <p>{{ post.description }}</p>

      <div v-if="post.cover" class="article__cover">
        <img :src="post.cover" :alt="`${post.title} cover`" />
        <div />
        <span>ARTICLE VISUAL / {{ post.date }}</span>
      </div>

      <div class="meta">
        <span>{{ post.readTime }} {{ t('blog.minRead') }}</span>
        <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
      </div>
    </header>

    <div class="article__body">
      <p v-for="paragraph in post.content" :key="paragraph">
        {{ paragraph }}
      </p>
    </div>

    <section v-if="post.relatedProjects?.length" class="related">
      <div class="section-label">{{ t('blog.relatedProjects') }}</div>
      <RouterLink
        v-for="slug in post.relatedProjects"
        :key="slug"
        :to="`/archive/projects/${slug}`"
      >
        {{ slug }} →
      </RouterLink>
    </section>
  </section>

  <section v-else class="not-found">
    <div class="eyebrow">BLOG ERROR</div>
    <h1>{{ t('blog.notFound') }}</h1>
    <RouterLink to="/archive/blog">{{ t('blog.backToList') }}</RouterLink>
  </section>
</template>

<style scoped>
.related a {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  text-decoration: none;
}

.back,
.not-found a {
  display: inline-block;

  padding: 10px 14px;

  border: 1px solid var(--accent-line);
  background: var(--accent-soft);

  color: var(--accent);

  font-family: var(--font-mono);
  font-size: var(--fs-sm);

  text-decoration: none;
  letter-spacing: 0.08em;

  transition: box-shadow var(--transition-fast);
}

.back {
  margin-bottom: 44px;
}

.back:hover,
.not-found a:hover {
  box-shadow: var(--glow-cyan);
}

.eyebrow,
.section-label {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  letter-spacing: 0.14em;
}

.article__header {
  padding-bottom: 50px;
  border-bottom: 1px solid var(--line);
}

h1 {
  max-width: 1000px;
  margin: 16px 0 0;
  font-size: clamp(48px, 8vw, 100px);
  line-height: 0.96;
  letter-spacing: -0.065em;
}

.article__header p {
  max-width: 760px;
  margin: 26px 0 0;
  color: var(--text-secondary);
  font-size: var(--fs-2xl);
  line-height: 1.7;
}

.article__cover {
  position: relative;
  height: min(440px, 42vw);
  margin-top: 30px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--media-bg);
}

.article__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: .9;
}

.article__cover > div {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 42%, rgba(0,0,0,.58)), repeating-linear-gradient(0deg, transparent 0 5px, rgba(255,255,255,.018) 6px);
}

.article__cover span {
  position: absolute;
  left: 16px;
  bottom: 14px;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: .1em;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}

.meta span {
  padding: 6px 8px;
  border: 1px solid var(--line);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
}

.article__body {
  max-width: 780px;
  padding: 56px 0 10px;
}

.article__body p {
  margin: 0 0 28px;
  color: var(--text-secondary);
  font-size: var(--fs-xl);
  line-height: 1.95;
}

.related {
  padding-top: 28px;
  border-top: 1px solid var(--line);
}

.related a {
  display: block;
  margin-top: 14px;
}

@media (max-width: 640px) {
  .article__cover {
    height: 240px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .article__cover img {
    transition: none;
  }
}

.not-found h1 {
  margin: 16px 0 28px;
  font-size: clamp(44px, 7vw, 88px);
}
</style>
