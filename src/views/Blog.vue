<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { blogPosts } from "../data/blog";
import { localize } from "../types/content";

const { t, locale } = useI18n();
// 临时输入 vs 已提交查询：只有回车 / 点击按钮才触发过滤
const searchInput = ref<HTMLInputElement | null>(null);
const draftQuery = ref("");
const query = ref("");
const submitQuery = () => {
  query.value = draftQuery.value.trim();
};
const resetQuery = () => {
  draftQuery.value = "";
  query.value = "";
};

// ⌘K / Ctrl+K 聚焦搜索，Esc 清空并失焦
const handleShortcut = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.value?.focus();
    searchInput.value?.select();
  }

  if (event.key === "Escape" && document.activeElement === searchInput.value) {
    resetQuery();
    searchInput.value?.blur();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleShortcut);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleShortcut);
});

const text = (value: { zh: string; en: string }) =>
  localize(value, locale.value);
const filteredPosts = computed(() => {
  const keyword = query.value.trim().toLowerCase();
  if (!keyword) return blogPosts;
  return blogPosts.filter((post) =>
    [
      text(post.title),
      text(post.description),
      ...post.tags.map((tag) => text(tag)),
    ].some((value) => value.toLowerCase().includes(keyword)),
  );
});
const featured = computed(() => filteredPosts.value[0]);
const rest = computed(() => filteredPosts.value.slice(1));
</script>

<template>
  <section class="blog">
    <header class="blog-hero">
      <div>
        <div class="eyebrow">{{ t('blog.eyebrow') }}</div>
        <h1>{{ t('blog.title') }}</h1>
        <p>{{ t('blog.description') }}</p>
      </div>
      <label class="query"
        ><span>{{ t('blog.querySearch') }}</span>
        <div class="query__inner">
          <b>›</b
          ><input
            ref="searchInput"
            v-model="draftQuery"
            :placeholder="t('blog.searchPlaceholder')"
            @keydown.enter.prevent="submitQuery"
          />
          <kbd @click="submitQuery">{{ t('blog.search') }}</kbd>
          <kbd class="clear" @click="resetQuery"
            >{{ t('blog.clear') }}</kbd
          >
        </div>
        <small>{{
          t('blog.entriesIndexed', {
            n: String(filteredPosts.length).padStart(2, '0'),
          })
        }}</small></label
      >
    </header>

    <RouterLink
      v-if="featured"
      :to="`/archive/blog/${featured.slug}`"
      class="featured-note"
    >
      <div class="featured-note__media">
        <img
          v-if="featured.cover"
          :src="featured.cover"
          :alt="text(featured.title)"
        /><span>{{ t('blog.latestNote', { date: featured.date }) }}</span>
      </div>
      <div class="featured-note__body">
        <div class="meta">
          <span>{{ t(`blog.type.${featured.type}`) }}</span
          ><span>{{ featured.date }}</span
          ><span>{{ featured.readTime }} {{ t("blog.minRead") }}</span>
        </div>
        <h2>{{ text(featured.title) }}</h2>
        <p>{{ text(featured.description) }}</p>
        <div class="tags">
          <span v-for="tag in featured.tags" :key="tag.en">{{
            text(tag)
          }}</span>
        </div>
        <strong class="read">{{ t("blog.read") }} →</strong>
      </div>
    </RouterLink>

    <div class="note-list">
      <RouterLink
        v-for="post in rest"
        :key="post.slug"
        :to="`/archive/blog/${post.slug}`"
        class="note-row"
      >
        <div class="note-row__media">
          <img
            v-if="post.cover"
            :src="post.cover"
            :alt="text(post.title)"
            loading="lazy"
          />
          <span class="note-row__media-label">{{ post.date }}</span>
        </div>

        <div class="note-row__main">
          <div class="meta">
            <span>{{ t(`blog.type.${post.type}`) }}</span
            ><span>{{ post.date }}</span
            ><span>{{ post.readTime }} {{ t("blog.minRead") }}</span>
          </div>
          <h2>{{ text(post.title) }}</h2>
          <p>{{ text(post.description) }}</p>
        </div>
        <div class="note-row__arrow">↗</div>
      </RouterLink>
    </div>

    <div v-if="!filteredPosts.length" class="empty">{{
      t('blog.queryReturned')
    }}</div>
  </section>
</template>

<style scoped>
.blog-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 54px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--line);
}
.eyebrow,
.query,
.meta,
.note-row__arrow,
.note-row__media-label {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.13em;
}
.eyebrow {
  color: var(--accent);
}
.blog h1 {
  margin: 14px 0 0;
  font-size: clamp(60px, 8vw, 106px);
  line-height: 0.9;
  letter-spacing: -0.07em;
}
.blog-hero p {
  max-width: 700px;
  margin: 24px 0 0;
  color: var(--text-secondary);
  font-size: var(--fs-xl);
  line-height: 1.75;
}
.query {
  position: relative;
  align-self: end;
  padding: 18px 20px 16px;
  color: var(--text-muted);
  border: 1px solid var(--line);
  background: linear-gradient(
      135deg,
      var(--control-bg),
      var(--surface-solid)
    );
}

/* 终端端点：青 / 品红 */
.query::before,
.query::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  pointer-events: none;
}
.query::before {
  top: -1px;
  left: -1px;
  border-top: 2px solid var(--accent);
  border-left: 2px solid var(--accent);
}
.query::after {
  bottom: -1px;
  right: -1px;
  border-bottom: 2px solid var(--accent-secondary);
  border-right: 2px solid var(--accent-secondary);
}

.query > span {
  display: block;
  margin-bottom: 12px;
  color: var(--accent);
}

.query__inner {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--line-strong);
  background: var(--bg);
}

.query__inner:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent), 0 0 16px rgba(var(--accent-rgb), 0.22);
}

.query b {
  color: var(--accent);
  font-size: var(--fs-lg);
}

.query input {
  min-width: 0;
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
}

.query input::placeholder {
  color: var(--text-faint);
}

.query kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 56px;
  padding: 6px 12px;
  border: 1px solid var(--accent);
  background: rgba(var(--accent-rgb), 0.12);
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.12em;
  cursor: pointer;
  transition:
    background var(--transition-fast),
    box-shadow var(--transition-fast);
}

.query kbd:hover {
  background: rgba(var(--accent-rgb), 0.25);
  box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.4);
}

/* 重置按钮：次级样式，跟 SEARCH 同宽但用品红边界 */
.query kbd.clear {
  border-color: var(--line-strong);
  background: transparent;
  color: var(--text-muted);
}

.query kbd.clear:hover {
  border-color: var(--accent-secondary);
  background: rgba(var(--pink-rgb), 0.12);
  color: var(--accent-secondary);
  box-shadow: 0 0 10px rgba(var(--pink-rgb), 0.3);
}

.query small {
  display: block;
  margin-top: 10px;
  color: var(--text-faint);
  font-size: var(--fs-2xs);
}
.featured-note {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  margin-top: 18px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  transition:
    transform var(--transition-normal),
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);
}
.featured-note:hover {
  transform: translateY(-5px);
  border-color: var(--accent-line);
  box-shadow: var(--shadow);
}
.featured-note__media {
  position: relative;
  min-height: 390px;
  background: var(--media-bg);
  overflow: hidden;
}
.featured-note__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}
.featured-note:hover img {
  transform: scale(1.06);
}
.featured-note__media::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, transparent 30%, rgba(0, 0, 0, 0.75)),
    repeating-linear-gradient(
      0deg,
      transparent 0 5px,
      rgba(255, 255, 255, 0.018) 6px
    );
}
.featured-note__media span {
  position: absolute;
  left: 16px;
  bottom: 14px;
  z-index: 2;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}
.featured-note__body {
  padding: 34px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: var(--text-muted);
}
.meta span:first-child {
  color: var(--accent);
}
.note-mark {
  margin-top: 26px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
}
.featured-note h2 {
  margin: 12px 0 0;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1;
  letter-spacing: -0.055em;
}
.featured-note p {
  margin: 18px 0 0;
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
  font-size: var(--fs-xs);
}
.read {
  margin-top: 26px;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  font-weight: 500;
}
.note-list {
  margin-top: 18px;
  border-top: 1px solid var(--line);
}

/* === 复原后的列表行：加了 media 列 === */
.note-row {
  position: relative;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) 50px;
  gap: 24px;
  align-items: start;
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
  color: inherit;
  text-decoration: none;
  transition:
    padding var(--transition-fast),
    background var(--transition-fast);
}
.note-row::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  background: linear-gradient(var(--accent), var(--accent-secondary));
  box-shadow: 0 0 8px rgba(var(--accent-rgb), 0.5);
  transform: scaleY(0);
  transition: transform var(--transition-fast);
}
.note-row:hover {
  padding-left: 10px;
  padding-right: 10px;
  background: rgba(var(--accent-rgb), 0.025);
}
.note-row:hover::before {
  transform: scaleY(1);
}
/* 图片容器：16/9 + 边框 + 遮罩 + 悬浮缩放 */
.note-row__media {
  position: relative;
  aspect-ratio: 16 / 9;
  border: 1px solid var(--line);
  background: var(--media-bg);
  overflow: hidden;
}
.note-row__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1);
}
.note-row:hover .note-row__media img {
  transform: scale(1.06);
}
.note-row__media::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.6)),
    repeating-linear-gradient(
      0deg,
      transparent 0 5px,
      rgba(255, 255, 255, 0.018) 6px
    );
}
.note-row__media-label {
  position: absolute;
  z-index: 2;
  left: 12px;
  bottom: 10px;
  color: var(--accent);
}

.note-row h2 {
  margin: 12px 0 0;
  font-size: 30px;
  line-height: 1.05;
  letter-spacing: -0.04em;
  transition: color var(--transition-fast);
}
.note-row:hover h2 {
  color: var(--accent);
}
.note-row p {
  max-width: 780px;
  margin: 10px 0 0;
  color: var(--text-secondary);
  line-height: 1.7;
}
.note-row__arrow {
  align-self: center;
  justify-self: end;
  color: var(--accent);
  font-size: 20px;
}
.empty {
  padding: 60px;
  border: 1px dashed var(--line);
  text-align: center;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

@media (max-width: 1180px) {
  .note-row {
    grid-template-columns: 220px minmax(0, 1fr) 50px;
    gap: 20px;
  }
}

@media (max-width: 980px) {
  .note-row {
    grid-template-columns: 200px minmax(0, 1fr) 40px;
  }
}

@media (max-width: 880px) {
  .blog-hero {
    grid-template-columns: 1fr;
  }
  .featured-note {
    grid-template-columns: 1fr;
  }
  .featured-note__media {
    min-height: 300px;
  }
}

@media (max-width: 650px) {
  .note-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .note-row__media {
    max-width: 420px;
  }
  .note-row__arrow {
    display: none;
  }
  .featured-note__body {
    padding: 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .note-row,
  .note-row::before,
  .note-row__media img {
    transition: none;
  }
}
</style>