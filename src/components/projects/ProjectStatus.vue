<script setup lang="ts">
import type { ProjectStatus } from '../../types/project'

defineProps<{
  status: ProjectStatus
}>()
</script>

<template>
  <span
    class="status"
    :class="`status--${status.toLowerCase()}`"
  >
    <span class="dot"></span>

    {{ status }}
  </span>
</template>

<style scoped>
.status {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  padding: 5px 8px;

  border: 1px solid var(--line);

  color: var(--text-secondary);

  font-family: var(--font-mono);
  font-size: 9px;

  letter-spacing: 0.08em;
}

.dot {
  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: currentColor;
}

.status--building,
.status--beta {
  color: var(--accent);
  border-color: var(--accent-line);
}

.status--prototype,
.status--testing {
  color: var(--accent-secondary);
}

.status--released {
  color: #70ff9b;
}

.status--archived {
  color: var(--text-muted);
}
</style>