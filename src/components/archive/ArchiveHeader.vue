<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import ThemeToggle from "./ThemeToggle.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();

const { t } = useI18n();

defineProps<{
  currentPage: string;
}>();

const now = ref(new Date());

let timer: number | undefined;

const currentTime = computed(() => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now.value);
});

const currentDate = computed(() => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now.value);
});

const handleClickBrand = () => {
  router.push("/");
};

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  if (timer) {
    window.clearInterval(timer);
  }
});
</script>

<template>
  <header class="archive-header">
    <div class="header-brand">
      <div class="brand-mark" @click="handleClickBrand">
        <img class="brand-mark__img" src="/favicon.svg" alt="GA" />
      </div>

      <div class="brand-info">
        <div class="brand-name">GAVIN ARCHIVE</div>

        <div class="brand-subtitle">{{ t("archive.headerSubtitle") }}</div>
      </div>
    </div>

    <div class="header-center">
      <span class="header-label">{{ t("common.current") }}</span>
      <span class="header-page">{{
        currentPage === "404" ? "404" : t(currentPage)
      }}</span>
    </div>

    <div class="header-status">
      <div class="status-item">
        <ThemeToggle />

        <LanguageSwitcher />

        <div class="status-item">
          <span class="status-dot" />
          {{ t("common.online") }}
        </div>
      </div>

      <div class="header-time">
        <span>{{ currentDate }}</span>
        <span>{{ currentTime }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.archive-header {
  height: 78px;
  flex-shrink: 0;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  padding: 0 32px;

  border-bottom: 1px solid var(--line);
  background:
    linear-gradient(
      90deg,
      rgba(var(--accent-rgb), 0.025),
      transparent 40%,
      rgba(var(--pink-rgb), 0.025)
    ),
    var(--surface);

  position: relative;
  z-index: 20;
}

/* HUD top line */

.archive-header::before {
  content: "";

  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  height: 1px;

  background: linear-gradient(90deg, transparent, var(--accent), transparent);

  opacity: 0.7;
}

/* ========================================
 * Brand
 * ======================================== */

.header-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 40px;
  height: 40px;

  display: grid;
  place-items: center;

  border: 1px solid var(--accent);

  color: var(--accent);

  font-family: var(--font-mono);
  font-size: var(--fs-md);
  font-weight: 800;
  letter-spacing: 0.08em;

  box-shadow: var(--glow-cyan);

  position: relative;
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }
}

.brand-mark__img {
  width: 100%;
  height: 100%;

  object-fit: contain;
}

.brand-mark::after {
  content: "";

  position: absolute;

  width: 6px;
  height: 6px;

  right: -3px;
  bottom: -3px;

  background: var(--accent-secondary);
}

/* ========================================
 * Brand text
 * ======================================== */

.brand-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brand-name {
  color: var(--text);

  font-family: var(--font-mono);
  font-size: var(--fs-md);
  font-weight: 800;

  letter-spacing: 0.14em;
}

.brand-subtitle {
  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: var(--fs-md);

  letter-spacing: 0.12em;
}

/* ========================================
 * Current page
 * ======================================== */

.header-center {
  display: flex;
  align-items: center;
  gap: 12px;

  font-family: var(--font-mono);
  font-size: var(--fs-md);

  letter-spacing: 0.12em;
}

.header-label {
  color: var(--text-muted);
}

.header-page {
  color: var(--accent);

  text-shadow: 0 0 12px rgba(var(--accent-rgb), 0.45);
}

/* ========================================
 * Status
 * ======================================== */

.header-status {
  justify-self: end;

  display: flex;
  align-items: center;
  gap: 28px;

  font-family: var(--font-mono);
  font-size: var(--fs-md);

  letter-spacing: 0.08em;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;

  color: var(--accent);
}

.status-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: var(--accent);

  box-shadow: var(--glow-cyan);
}

.header-time {
  display: flex;
  gap: 12px;

  color: var(--text-muted);
}

/* ========================================
 * Mobile
 * ======================================== */

@media (max-width: 768px) {
  .archive-header {
    height: 68px;

    grid-template-columns: auto 1fr auto;

    padding: 0 16px;
  }

  .brand-subtitle,
  .header-center {
    display: none;
  }

  .brand-name {
    font-size: var(--fs-md);
  }

  .brand-mark {
    width: 32px;
    height: 32px;
  }

  .header-status {
    gap: 0;
  }

  .status-item span:last-child {
    display: none;
  }

  .header-time {
    flex-direction: column;
    gap: 1px;

    text-align: right;
  }
}
</style>
