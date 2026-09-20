<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="page">
    <div class="error-code">
      404
    </div>

    <div class="eyebrow">
      {{ t('notFound.eyebrow') }}
    </div>

    <h1>
      {{ t('notFound.title') }}
    </h1>

    <p>
      {{ t('notFound.description') }}
    </p>

    <button type="button" @click="goHome">
      {{ t('notFound.returnToIndex') }}
    </button>
  </div>
</template>

<style scoped>
.page {
  min-height: 60vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 40px 0;
}

.error-code {
  color: var(--accent);

  font-family: var(--font-mono);
  font-size: var(--fs-md);
  letter-spacing: 0.16em;
}

.eyebrow {
  margin-top: 12px;

  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.12em;
}

h1 {
  margin: 18px 0 0;

  font-size: clamp(48px, 8vw, 96px);
  line-height: 0.95;
  letter-spacing: -0.06em;
}

p {
  margin: 24px 0 0;

  color: var(--text-secondary);
}

button {
  width: fit-content;

  margin-top: 36px;
  padding: 12px 16px;

  border: 1px solid var(--line);
  background: transparent;

  color: var(--text);

  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  letter-spacing: 0.1em;

  cursor: pointer;

  transition:
    border-color var(--transition-fast),
    color var(--transition-fast),
    background var(--transition-fast);
}

button:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-soft);
}
</style>