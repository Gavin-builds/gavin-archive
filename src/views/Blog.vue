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
    [post.title, post.description, ...post.tags].some(value => value.toLowerCase().includes(keyword)),
  )
})

const featuredPost = computed(() => filteredPosts.value[0])
const restPosts = computed(() => filteredPosts.value.slice(1))
</script>

<template>
  <section class="blog">
    <div class="blog__hero">
      <div>
        <div class="eyebrow">/ 04 DEVELOPMENT LOG</div>
        <h1>{{ t('blog.title') }}</h1>
        <p>{{ t('blog.description') }}</p>
      </div>

      <label class="search">
        <span>QUERY / {{ t('blog.search') }}</span>
        <div class="search__field">
          <span class="search__cursor">›</span>
          <input v-model="query" :placeholder="t('blog.searchPlaceholder')" />
          <kbd>⌘ K</kbd>
        </div>
        <small>{{ String(filteredPosts.length).padStart(2, '0') }} ENTRIES INDEXED</small>
      </label>
    </div>

    <template v-if="featuredPost">
      <RouterLink :to="`/archive/blog/${featuredPost.slug}`" class="featured-post">
        <div class="featured-post__media">
          <img v-if="featuredPost.cover" :src="featuredPost.cover" :alt="`${featuredPost.title} cover`" />
          <div class="featured-post__scan" />
          <div class="featured-post__media-label">LATEST LOG / {{ featuredPost.date }}</div>
        </div>

        <div class="featured-post__body">
          <div class="post__meta">
            <span>{{ featuredPost.date }}</span>
            <span>{{ t(`blog.type.${featuredPost.type}`) }}</span>
            <span>{{ featuredPost.readTime }} {{ t('blog.minRead') }}</span>
          </div>
          <h2>{{ featuredPost.title }}</h2>
          <p>{{ featuredPost.description }}</p>
          <div class="tags">
            <span v-for="tag in featuredPost.tags" :key="tag">{{ tag }}</span>
          </div>
          <span class="open">{{ t('blog.read') }} →</span>
        </div>
      </RouterLink>
    </template>

    <TransitionGroup name="post-list" tag="div" class="list">
      <RouterLink
        v-for="post in restPosts"
        :key="post.slug"
        :to="`/archive/blog/${post.slug}`"
        class="post"
      >
        <div class="post__media">
          <img v-if="post.cover" :src="post.cover" :alt="`${post.title} cover`" loading="lazy" />
          <span>{{ post.date }}</span>
        </div>

        <div class="post__body">
          <div class="post__meta">
            <span>{{ post.date }}</span>
            <span>{{ t(`blog.type.${post.type}`) }}</span>
            <span>{{ post.readTime }} {{ t('blog.minRead') }}</span>
          </div>
          <h2>{{ post.title }}</h2>
          <p>{{ post.description }}</p>
          <div class="tags">
            <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
          </div>
          <span class="open">{{ t('blog.read') }} →</span>
        </div>
      </RouterLink>
    </TransitionGroup>

    <div v-if="filteredPosts.length === 0" class="empty">
      <span>QUERY RETURNED / 0</span>
      <strong>{{ t('blog.empty') }}</strong>
    </div>
  </section>
</template>

<style scoped>
.blog__hero {
  display: grid;
  grid-template-columns: minmax(0,1fr) 340px;
  gap: 56px;
  min-height: 340px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--line);
}

.eyebrow,
.search,
.post__meta {
  font-family: var(--font-mono);
}

.eyebrow { color: var(--accent); font-size: var(--fs-sm); letter-spacing: .16em; }

h1 {
  margin: 14px 0 0;
  font-size: clamp(58px, 8vw, 104px);
  line-height: .9;
  letter-spacing: -.07em;
}

.blog__hero p {
  max-width: 700px;
  margin: 24px 0 0;
  color: var(--text-secondary);
  font-size: var(--fs-xl);
  line-height: 1.7;
}

.search {
  align-self: end;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  letter-spacing: .1em;
}

.search__field {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding: 12px 13px;
  border: 1px solid var(--line);
  background: rgba(9,9,18,.72);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.search__field:focus-within {
  border-color: var(--accent-line);
  box-shadow: 0 0 26px rgba(0,229,255,.05);
}

.search__cursor { color: var(--accent); font-size: var(--fs-lg); }

.search input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--text);
}

.search input::placeholder { color: var(--text-muted); }
.search kbd { color: var(--text-muted); white-space: nowrap; }
.search small { display: block; margin-top: 8px; color: var(--text-muted); font-size: var(--fs-2xs); }

.featured-post {
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  margin-top: 18px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  animation: archive-rise 600ms cubic-bezier(.2,.75,.25,1) both;
  transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
}

.featured-post:hover { transform: translateY(-6px); border-color: var(--accent-line); box-shadow: var(--shadow); }

.featured-post__media,
.post__media {
  position: relative;
  overflow: hidden;
  background: #060810;
}

.featured-post__media { min-height: 390px; }
.featured-post__media img,
.post__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 700ms cubic-bezier(.2,.7,.2,1), opacity 400ms ease;
}

.featured-post:hover .featured-post__media img,
.post:hover .post__media img { transform: scale(1.06); }

.featured-post__scan {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,.5)), repeating-linear-gradient(0deg, transparent 0 4px, rgba(255,255,255,.02) 5px);
}

.featured-post__media-label {
  position: absolute;
  left: 16px;
  bottom: 15px;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: .1em;
}

.featured-post__body { padding: 34px; display: flex; flex-direction: column; justify-content: center; }
.post__meta { display: flex; flex-wrap: wrap; gap: 8px; color: var(--text-muted); font-size: var(--fs-xs); letter-spacing: .08em; }
.post__meta span:first-child { color: var(--accent); }
.featured-post h2 { margin: 24px 0 0; font-size: clamp(34px, 4vw, 58px); line-height: .98; letter-spacing: -.05em; }
.featured-post p { margin: 18px 0 0; color: var(--text-secondary); line-height: 1.8; }

.tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 20px; }
.tags span { padding: 5px 8px; border: 1px solid var(--line); color: var(--text-muted); font-family: var(--font-mono); font-size: var(--fs-xs); }
.open { display: inline-block; margin-top: 26px; color: var(--accent); font-family: var(--font-mono); font-size: var(--fs-sm); }

.list { margin-top: 18px; }
.post {
  display: grid;
  grid-template-columns: 260px minmax(0,1fr);
  gap: 28px;
  padding: 18px 0;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid var(--line);
  animation: archive-rise 560ms cubic-bezier(.2,.75,.25,1) both;
}

.post:hover .post__body h2 { color: var(--accent); }
.post__media { aspect-ratio: 16 / 9; border: 1px solid var(--line); }
.post__media::after { content:''; position:absolute; inset:0; background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,.55)); }
.post__media span { position:absolute; z-index:2; left:12px; bottom:10px; color:var(--accent); font-family:var(--font-mono); font-size:var(--fs-xs); }
.post__body { padding: 10px 0; }
.post__body h2 { margin: 14px 0 0; font-size: 31px; line-height: 1.06; letter-spacing: -.04em; transition: color var(--transition-fast); }
.post__body p { max-width: 760px; margin: 12px 0 0; color: var(--text-secondary); line-height: 1.75; }

.empty { margin-top: 18px; padding: 60px 0; border: 1px dashed var(--line); text-align:center; font-family:var(--font-mono); }
.empty span { display:block; color:var(--text-muted); font-size:var(--fs-sm); }
.empty strong { display:block; margin-top:8px; color:var(--accent); font-size:var(--fs-body); }

.post-list-enter-active,
.post-list-leave-active,
.post-list-move { transition: all 360ms cubic-bezier(.2,.7,.2,1); }
.post-list-enter-from,
.post-list-leave-to { opacity:0; transform:translateY(18px); }

@keyframes archive-rise { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }

@media (max-width: 900px) {
  .blog__hero { grid-template-columns: 1fr; min-height:0; }
  .search { align-self: auto; }
  .featured-post { grid-template-columns: 1fr; }
  .featured-post__media { min-height: 300px; }
}

@media (max-width: 680px) {
  .post { grid-template-columns: 1fr; gap: 16px; }
  .post__media { max-width: 420px; }
  .featured-post__body { padding: 22px; }
  .featured-post h2 { font-size: 38px; }
}

@media (prefers-reduced-motion: reduce) {
  .featured-post,
  .post,
  .featured-post__media img,
  .post__media img,
  .post-list-enter-active,
  .post-list-leave-active,
  .post-list-move { animation:none; transition:none; }
}
</style>
