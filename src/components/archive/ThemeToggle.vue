<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useTheme } from '../../composables/useTheme'

const { t } = useI18n()
const { theme, toggleTheme } = useTheme()

const label = computed(() =>
  theme.value === 'dark'
    ? t('common.lightMode')
    : t('common.darkMode'),
)
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :title="label"
    :aria-label="label"
    @click="toggleTheme"
  >
    <!-- 当前为深色模式：显示太阳，点击切换浅色 -->
    <svg
      v-if="theme === 'dark'"
      class="theme-toggle__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path
        d="M12 2.4v2.4M12 19.2v2.4M2.4 12h2.4M19.2 12h2.4M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19"
      />
    </svg>

    <!-- 当前为浅色模式：显示月亮，点击切换深色 -->
    <svg
      v-else
      class="theme-toggle__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M20.4 13.6A8.4 8.4 0 0 1 10.4 3.6 8.4 8.4 0 1 0 20.4 13.6Z"
      />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: grid;
  place-items: center;

  width: 26px;
  height: 26px;

  padding: 0;

  border: 0;

  background: transparent;

  color: var(--text-muted);

  cursor: pointer;

  transition:
    color 0.2s ease,
    text-shadow 0.2s ease;
}

.theme-toggle:hover {
  color: var(--accent);

  text-shadow: var(--glow-cyan);
}

.theme-toggle__icon {
  width: 17px;
  height: 17px;

  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
