<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const year = new Date().getFullYear();
</script>

<template>
  <footer class="archive-footer">
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
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
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
@media (max-width: 768px) {
  .archive-footer {
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
  }
  .footer-left .separator,
  .footer-left span:last-child,
  .footer-center {
    display: none;
  }
}
</style>
