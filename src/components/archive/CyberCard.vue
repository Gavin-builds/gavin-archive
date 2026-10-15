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
  position: relative;

  display: flex;
  align-items: center;
  gap: 9px;

  color: var(--accent);

  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  letter-spacing: 0.14em;
}

/* 霓虹灯光影：从 tick 向右发散的 radial-gradient，
   静止时极淡，hover 时像灯管被点亮，光影扫过标题 */
.cyber-card__label::before {
  content: "";

  position: absolute;
  left: -4px;
  top: 50%;

  width: 180px;
  height: 28px;

  transform: translateY(-50%);

  background: radial-gradient(
    ellipse at left center,
    rgba(var(--accent-rgb), 0.55),
    rgba(var(--accent-rgb), 0.18) 30%,
    transparent 65%
  );

  filter: blur(3px);

  opacity: 0.12;

  pointer-events: none;

  transition: opacity var(--transition-normal);
}

.cyber-card--hover:hover .cyber-card__label::before {
  opacity: 1;
}

/* 霓虹灯管本体：圆角 + 多层发光 box-shadow + 微闪烁 */
.cyber-card__tick {
  position: relative;

  width: 9px;
  height: 9px;

  border-radius: 2px;

  background: var(--accent);

  /* 三层 box-shadow：内核亮光 + 中层光晕 + 外层散辉 */
  box-shadow:
    0 0 3px 1px rgba(var(--accent-rgb), 0.95),
    0 0 9px 2px rgba(var(--accent-rgb), 0.6),
    0 0 18px 4px rgba(var(--accent-rgb), 0.3);

  /* 灯管外壳：用 outline 加一圈极细边框模拟玻璃罩 */
  outline: 1px solid rgba(var(--accent-rgb), 0.4);
  outline-offset: 1px;

  animation: cyber-neon-flicker 4.2s steps(1) infinite;

  flex-shrink: 0;

  transition:
    box-shadow var(--transition-normal),
    background var(--transition-normal);
}

/* hover 灯管亮度升级 */
.cyber-card--hover:hover .cyber-card__tick {
  background: #fff;

  box-shadow:
    0 0 5px 2px rgba(var(--accent-rgb), 1),
    0 0 14px 4px rgba(var(--accent-rgb), 0.75),
    0 0 32px 8px rgba(var(--accent-rgb), 0.45);
}

/* 灯管闪烁：低频 + 极短暂的"熄灭"帧，模拟真实霓虹的微闪 */
@keyframes cyber-neon-flicker {
  0%,
  72%,
  100% {
    opacity: 1;
  }

  73% {
    opacity: 0.4;
  }

  74% {
    opacity: 1;
  }

  78% {
    opacity: 0.6;
  }
}

@media (max-width: 640px) {
  .cyber-card {
    padding: 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cyber-card,
  .cyber-card::before,
  .cyber-card__corner,
  .cyber-card__label::before,
  .cyber-card__tick {
    transition: none;
    animation: none !important;
  }

  .cyber-card--hover:hover {
    transform: none;
  }

  .cyber-card--hover:hover::before {
    transform: translateX(-55%);
  }
}
</style>
