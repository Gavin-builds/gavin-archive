<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const year = new Date().getFullYear();
</script>

<template>
  <footer class="archive-footer">
    <!-- 顶部数据总线：滚动数据包 -->
    <span class="footer-packets" aria-hidden="true" />
    <!-- 双色能量流：青色主脉冲 + 品红副脉冲错峰扫过 -->
    <span class="footer-stream footer-stream--cyan" aria-hidden="true" />
    <span class="footer-stream footer-stream--pink" aria-hidden="true" />
    <!-- 终端角标 -->
    <span class="footer-corner footer-corner--left" aria-hidden="true" />
    <span class="footer-corner footer-corner--right" aria-hidden="true" />

    <div class="footer-left">
      <span>© {{ year }} GAVIN</span>
      <span class="separator">/</span>
      <span>{{ t("footer.developerArchive") }}</span>
    </div>

    <div class="footer-center">
      {{ t("footer.builtWith") }}
    </div>

    <div class="footer-right">
      <a
        href="https://github.com/Gavin-builds"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t("nav.github") }} ↗
      </a>

      <a href="mailto:lejob@qq.com">
        {{ t("footer.email") }}
      </a>
    </div>
  </footer>
</template>

<style scoped>
.archive-footer {
  position: relative;
  flex-shrink: 0;
  min-height: 52px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 24px;
  border-top: 1px solid var(--line);
  background:
    linear-gradient(
      90deg,
      rgba(var(--accent-rgb), 0.02),
      transparent 50%,
      rgba(var(--pink-rgb), 0.02)
    ),
    var(--surface);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  letter-spacing: 0.1em;
  overflow: hidden;
}
/* =========================
   数据总线 / 能量流
========================= */

/* 顶部细数据包，持续向左循环 */
.footer-packets {
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  height: 3px;

  pointer-events: none;

  opacity: 0.65;

  background:
    repeating-linear-gradient(
      90deg,
      transparent 0 44px,
      rgba(var(--accent-rgb), 0.35) 44px 47px,
      transparent 47px 88px,
      rgba(var(--pink-rgb), 0.22) 88px 91px,
      transparent 91px 132px
    );

  animation: footer-packets 1.1s linear infinite;
}

/* 能量流主体：彗星尾 + 高亮头部 */
.footer-stream {
  position: absolute;
  top: -1px;
  left: 0;

  width: 200px;
  height: 1px;

  pointer-events: none;

  opacity: 0;
}

.footer-stream::before {
  content: "";

  position: absolute;
  top: 50%;
  right: -1px;

  width: 5px;
  height: 5px;

  border-radius: 50%;

  transform: translateY(-50%);
}

.footer-stream--cyan {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--accent-rgb), 0.85)
  );

  animation: footer-stream 6.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.footer-stream--cyan::before {
  background: var(--accent);

  box-shadow:
    0 0 8px 1px rgba(var(--accent-rgb), 0.9),
    0 0 22px rgba(var(--accent-rgb), 0.5);
}

.footer-stream--pink {
  width: 130px;

  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--pink-rgb), 0.7)
  );

  animation: footer-stream 9.6s cubic-bezier(0.4, 0, 0.6, 1) -4.4s infinite;
}

.footer-stream--pink::before {
  background: var(--accent-secondary);

  box-shadow:
    0 0 8px 1px rgba(var(--pink-rgb), 0.85),
    0 0 18px rgba(var(--pink-rgb), 0.45);
}

/* 顶部两端终端角标 */
.footer-corner {
  position: absolute;
  top: -1px;

  width: 12px;
  height: 12px;

  pointer-events: none;

  filter: drop-shadow(0 0 4px rgba(var(--accent-rgb), 0.45));
}

.footer-corner--left {
  left: 0;

  border-left: 1px solid var(--accent);
  border-top: 1px solid var(--accent);
}

.footer-corner--right {
  right: 0;

  border-right: 1px solid var(--accent);
  border-top: 1px solid var(--accent);
}
.footer-left,
.footer-right {
  display: flex;
  align-items: center;
  gap: 9px;
}
.footer-right {
  justify-self: end;
  gap: 18px;
}
.separator {
  color: var(--line-strong);
}
.footer-center {
  color: var(--text-muted);
}
.archive-footer a {
  color: var(--text-muted);
  text-decoration: none;
  transition:
    color var(--transition-fast),
    text-shadow var(--transition-fast);
}
.archive-footer a:hover {
  color: var(--accent);
  text-shadow: 0 0 10px rgba(var(--accent-rgb), 0.5);
}
@keyframes footer-stream {
  0% {
    transform: translateX(-240px);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  88% {
    opacity: 1;
  }

  100% {
    transform: translateX(calc(100vw + 240px));
    opacity: 0;
  }
}

@keyframes footer-packets {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 132px 0;
  }
}
@media (max-width: 768px) {
  .archive-footer {
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
  }
  .footer-left .separator,
  .footer-left span:last-child,
  .footer-center {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .footer-stream,
  .footer-packets {
    display: none;
  }
}
</style>
