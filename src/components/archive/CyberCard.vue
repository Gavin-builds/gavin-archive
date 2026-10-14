<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    hoverable?: boolean;
  }>(),
  {
    label: undefined,
    hoverable: true,
  },
);
</script>

<template>
  <section class="cyber-card" :class="{ 'cyber-card--hover': hoverable }">
    <!-- 终端角标：左上青 / 右下品红 -->
    <span
      class="cyber-card__corner cyber-card__corner--tl"
      aria-hidden="true"
    />
    <span
      class="cyber-card__corner cyber-card__corner--br"
      aria-hidden="true"
    />

    <header
      v-if="label || $slots.label"
      class="cyber-card__label"
    >
      <slot name="label">
        <i class="cyber-card__tick" aria-hidden="true" />
        <span>{{ label }}</span>
      </slot>
    </header>

    <slot />
  </section>
</template>

<style scoped>
.cyber-card {
  position: relative;

  padding: 28px 30px;

  border: 1px solid var(--line);

  background:
    linear-gradient(
      135deg,
      rgba(var(--ink-rgb), 0.025),
      transparent 52%
    ),
    var(--surface);

  overflow: hidden;
}

/* 顶部扫描线：静止时隐于左侧，hover 扫过 */
.cyber-card::before {
  content: "";

  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  height: 1px;

  background: linear-gradient(
    90deg,
    transparent 6%,
    rgba(var(--accent-rgb), 0.75) 50%,
    transparent 94%
  );

  opacity: 0;

  transform: translateX(-55%);

  pointer-events: none;
}

/* 右上角常驻微光段 */
.cyber-card::after {
  content: "";

  position: absolute;
  top: 0;
  right: 0;

  width: 72px;
  height: 1px;

  background: linear-gradient(90deg, transparent, var(--accent));

  opacity: 0.35;

  pointer-events: none;
}

.cyber-card--hover {
  transition:
    transform var(--transition-normal),
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);
}

.cyber-card--hover:hover {
  transform: translateY(-3px);

  border-color: var(--accent-line);

  box-shadow: var(--shadow-soft);
}

.cyber-card--hover:hover::before {
  opacity: 1;

  transform: translateX(0);

  transition:
    opacity var(--transition-normal),
    transform 0.6s cubic-bezier(0.22, 0.68, 0.24, 1);
}

.cyber-card--hover:hover .cyber-card__corner {
  opacity: 1;
}

/* 终端角标 */
.cyber-card__corner {
  position: absolute;

  width: 10px;
  height: 10px;

  opacity: 0.3;

  transition: opacity var(--transition-normal);

  pointer-events: none;
}

.cyber-card__corner--tl {
  top: -1px;
  left: -1px;

  border-top: 1px solid var(--accent);
  border-left: 1px solid var(--accent);
}

.cyber-card__corner--br {
  right: -1px;
  bottom: -1px;

  border-right: 1px solid var(--accent-secondary);
  border-bottom: 1px solid var(--accent-secondary);
}

/* 标题行：终端方块 + mono 小字 */
.cyber-card__label {
  display: flex;
  align-items: center;
  gap: 9px;

  color: var(--accent);

  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  letter-spacing: 0.14em;
}

.cyber-card__tick {
  width: 7px;
  height: 7px;

  background: var(--accent);

  box-shadow: 0 0 8px rgba(var(--accent-rgb), 0.7);
}

@media (max-width: 640px) {
  .cyber-card {
    padding: 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cyber-card,
  .cyber-card::before,
  .cyber-card__corner {
    transition: none;
  }

  .cyber-card--hover:hover {
    transform: none;
  }

  .cyber-card--hover:hover::before {
    transform: translateX(-55%);
  }
}
</style>
