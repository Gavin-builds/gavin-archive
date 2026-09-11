<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="archive-footer">
    <div class="footer-left">
      <span>© {{ year }} GAVIN</span>
      <span class="separator">/</span>
      <span>{{ t('footer.developerArchive') }}</span>
    </div>

    <div class="footer-center">
      {{ t('footer.builtWith') }}
    </div>

    <div class="footer-right">
      <a
        href="https://github.com/Gavin-builds"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('nav.github') }} ↗
      </a>

      <a href="mailto:lejob@qq.com">
        {{ t('footer.email') }}
      </a>
    </div>
  </footer>
</template>

<style scoped>
.archive-footer {
  min-height: 48px;

  display: grid;

  grid-template-columns: 1fr auto 1fr;

  align-items: center;

  padding: 0 24px;

  border-top: 1px solid var(--line);

  background:
    linear-gradient(
      90deg,
      rgba(0, 229, 255, 0.02),
      transparent 50%,
      rgba(255, 43, 214, 0.02)
    ),
    var(--surface);

  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: 9px;

  letter-spacing: 0.1em;
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

  text-shadow:
    0 0 10px rgba(0, 229, 255, 0.5);
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
</style>