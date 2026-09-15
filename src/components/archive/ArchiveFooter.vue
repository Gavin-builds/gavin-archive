<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const year = new Date().getFullYear();
</script>

<template>
  <footer class="archive-footer">
    <span class="footer-scan" aria-hidden="true" />
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
.footer-scan {
  position: absolute;
  left: 0;
  top: 0;
  width: 90px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.45);
  animation: footer-scan 7s linear infinite;
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
@keyframes footer-scan {
  from {
    transform: translateX(-110px);
  }
  to {
    transform: translateX(100vw);
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
  .footer-scan {
    animation: none;
  }
}
</style>
