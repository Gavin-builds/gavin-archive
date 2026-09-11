<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { blogPosts } from '../data/blog'

const { t } = useI18n()
const query = ref('')

const filteredPosts = computed(() => {
  const keyword = query.value.trim().toLowerCase()

  if (!keyword) return blogPosts

  return blogPosts.filter(post =>
    [post.title, post.description, ...post.tags].some(value =>
      value.toLowerCase().includes(keyword),
    ),
  )
})
</script>

<template>
  <section class="blog">
    <header class="blog__header">
      <div>
        <div class="eyebrow">/ 04 DEVELOPMENT LOG</div>
        <h1>{{ t('blog.title') }}</h1>
        <p>{{ t('blog.description') }}</p>
      </div>

      <label class="search">
        <span>{{ t('blog.search') }}</span>
        <input v-model="query" :placeholder="t('blog.searchPlaceholder')" />
      </label>
    </header>

    <div class="list">
      <article v-for="post in filteredPosts" :key="post.slug" class="post">
        <div class="post__meta">
          <span>{{ post.date }}</span>
          <span>{{ t(`blog.type.${post.type}`) }}</span>
          <span>{{ post.readTime }} {{ t('blog.minRead') }}</span>
        </div>

        <div class="post__body">
          <h2>{{ post.title }}</h2>
          <p>{{ post.description }}</p>

          <div class="tags">
            <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
          </div>

          <RouterLink :to="`/archive/blog/${post.slug}`" class="open">
            {{ t('blog.read') }} →
          </RouterLink>
        </div>
      </article>
    </div>

    <div v-if="filteredPosts.length === 0" class="empty">
      {{ t('blog.empty') }}
    </div>
  </section>
</template>

<style scoped>
.blog__header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 40px;
  padding-bottom: 44px;
  border-bottom: 1px solid var(--line);
}

.eyebrow {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.16em;
}

h1 {
  margin: 12px 0 0;
  font-size: clamp(48px, 7vw, 88px);
  line-height: 0.95;
  letter-spacing: -0.06em;
}

.blog__header p {
  max-width: 620px;
  margin: 22px 0 0;
  color: var(--text-secondary);
  font-size: 17px;
  line-height: 1.7;
}

.search {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 280px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
}

.search input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--line);
  outline: none;
  background: var(--surface);
  color: var(--text);
}

.search input:focus {
  border-color: var(--accent-line);
}

.list {
  display: flex;
  flex-direction: column;
}

.post {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 40px;
  padding: 36px 0;
  border-bottom: 1px solid var(--line);
}

.post__meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
}

.post__meta span:first-child {
  color: var(--accent);
}

.post h2 {
  margin: 0;
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.post p {
  max-width: 760px;
  margin: 16px 0 0;
  color: var(--text-secondary);
  line-height: 1.8;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 20px;
}

.tags span {
  padding: 5px 8px;
  border: 1px solid var(--line);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
}

.open {
  display: inline-block;
  margin-top: 24px;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 11px;
  text-decoration: none;
}

.empty {
  padding: 42px 0;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
}

@media (max-width: 800px) {
  .blog__header {
    display: block;
  }

  .search {
    margin-top: 26px;
    min-width: 0;
  }

  .post {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}
</style>
