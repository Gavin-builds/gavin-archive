<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

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
      SYSTEM / ROUTE NOT FOUND
    </div>

    <h1>
      Nothing here.
    </h1>

    <p>
      The requested archive module does not exist.
    </p>

    <button type="button" @click="goHome">
      ← RETURN TO INDEX
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
  font-size: 12px;
  letter-spacing: 0.16em;
}

.eyebrow {
  margin-top: 12px;

  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: 9px;
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
  font-size: 9px;
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