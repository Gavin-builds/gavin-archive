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
.back,
.related a,
.not-found a {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 10px;
  text-decoration: none;
}

.back {
  display: inline-block;
  margin-bottom: 44px;
  color: var(--text-muted);
}

.eyebrow,
.section-label {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 10px;
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
  font-size: 19px;
  line-height: 1.7;
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
  font-size: 10px;
}

.article__body {
  max-width: 780px;
  padding: 56px 0 10px;
}

.article__body p {
  margin: 0 0 28px;
  color: var(--text-secondary);
  font-size: 17px;
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

.not-found h1 {
  margin: 16px 0 28px;
  font-size: clamp(44px, 7vw, 88px);
}
</style>
