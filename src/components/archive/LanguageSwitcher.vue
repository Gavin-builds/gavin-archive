<script setup lang="ts">
import { computed } from 'vue'
import {
  getLocale,
  setLocale,
  type Locale,
} from '../../locales'

const currentLocale = computed(() => getLocale())

const switchLocale = (locale: Locale) => {
  if (currentLocale.value === locale) return

  setLocale(locale)
}
</script>

<template>
  <div class="language-switcher">
    <button
      :class="{ active: currentLocale === 'zh' }"
      @click="switchLocale('zh')"
    >
      中
    </button>

    <span>/</span>

    <button
      :class="{ active: currentLocale === 'en' }"
      @click="switchLocale('en')"
    >
      EN
    </button>
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
  gap: 6px;

  font-family: var(--font-mono);
  font-size: 13px;

  letter-spacing: 0.08em;
}

.language-switcher button {
  padding: 3px 5px;

  border: 0;

  background: transparent;

  color: var(--text-muted);

  font: inherit;

  cursor: pointer;

  transition:
    color 0.2s ease,
    text-shadow 0.2s ease;
}

.language-switcher button:hover,
.language-switcher button.active {
  color: var(--accent);

  text-shadow:
    0 0 10px rgba(0, 229, 255, 0.5);
}

.language-switcher span {
  color: var(--text-muted);
}
</style>