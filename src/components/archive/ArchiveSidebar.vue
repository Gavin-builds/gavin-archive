<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

interface NavigationItem {
  labelKey: string
  path: string
  number: string
}

const router = useRouter()
const route = useRoute()

const { t } = useI18n()

const navigationGroups = [
  {
    titleKey: 'sidebar.system',
    items: [
      {
        labelKey: 'nav.profile',
        path: '/archive/profile',
        number: '01',
      },
    ],
  },
  {
    titleKey: 'sidebar.work',
    items: [
      {
        labelKey: 'nav.projects',
        path: '/archive/projects',
        number: '02',
      },
      {
        labelKey: 'nav.lab',
        path: '/archive/lab',
        number: '03',
      },
    ],
  },
  {
    titleKey: 'sidebar.log',
    items: [
      {
        labelKey: 'nav.blog',
        path: '/archive/blog',
        number: '04',
      },
    ],
  },
  {
    titleKey: 'sidebar.network',
    items: [
      {
        labelKey: 'nav.github',
        path: '/archive/github',
        number: '05',
      },
      {
        labelKey: 'nav.about',
        path: '/archive/about',
        number: '06',
      },
    ],
  },
]

const isActive = (item: NavigationItem) => {
  if (item.path === '/') {
    return route.path === '/'
  }

  return route.path === item.path || route.path.startsWith(`${item.path}/`)
}

const currentPath = computed(() => route.path)

function navigate(path: string) {
  if (currentPath.value !== path) {
    router.push(path)
  }
}
</script>

<template>
  <aside class="archive-sidebar">
    <div class="sidebar-inner">
      <div
        v-for="group in navigationGroups"
        :key="group.titleKey"
        class="nav-group"
      >
        <div class="group-title">
          <span class="group-line"></span>
          <span>{{ t(group.titleKey) }}</span>
        </div>

        <nav class="nav-list">
          <button
            v-for="item in group.items"
            :key="item.path"
            class="nav-item"
            :class="{ active: isActive(item) }"
            type="button"
            @click="navigate(item.path)"
          >
            <span class="nav-number">
              {{ item.number }}
            </span>

            <span class="nav-label">
              {{ t(item.labelKey) }}
            </span>

            <span class="nav-arrow">
              →
            </span>
          </button>
        </nav>
      </div>
    </div>

    <div class="sidebar-bottom">
      <div class="archive-index">
        <span>{{ t('sidebar.archiveIndex') }}</span>
        <span>{{ t('sidebar.modules') }}</span>
      </div>

      <div class="sidebar-decoration">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.archive-sidebar {
  min-height: 0;

  display: flex;
  flex-direction: column;

  border-right: 1px solid var(--line);

  background:
    linear-gradient(
      180deg,
      rgba(0, 229, 255, 0.018),
      transparent 35%,
      rgba(255, 43, 214, 0.018)
    ),
    var(--surface);

  position: relative;
}


/* ========================================
 * Neon vertical line
 * ======================================== */

.archive-sidebar::after {
  content: "";

  position: absolute;

  top: 0;
  right: -1px;

  width: 1px;
  height: 120px;

  background:
    linear-gradient(
      transparent,
      var(--accent),
      transparent
    );

  box-shadow:
    0 0 10px rgba(0, 229, 255, 0.5);

  pointer-events: none;
}


/* ========================================
 * Navigation
 * ======================================== */

.sidebar-inner {
  flex: 1;

  padding: 32px 18px;
}

.nav-group {
  margin-bottom: 34px;
}

.group-title {
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 10px;

  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;

  letter-spacing: 0.18em;
}

.group-line {
  width: 24px;
  height: 1px;

  background: var(--line-strong);
}


/* ========================================
 * Nav item
 * ======================================== */

.nav-list {
  display: flex;
  flex-direction: column;

  gap: 3px;
}

.nav-item {
  width: 100%;
  height: 46px;

  display: grid;

  grid-template-columns: 34px 1fr 24px;

  align-items: center;

  padding: 0 12px;

  border: 1px solid transparent;

  background: transparent;

  color: var(--text-secondary);

  cursor: pointer;

  text-align: left;

  transition:
    color var(--transition-fast),
    background var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.nav-item:hover {
  color: var(--text);

  background: rgba(0, 229, 255, 0.035);

  border-color: var(--line);

  box-shadow:
    inset 2px 0 0 rgba(0, 229, 255, 0.35);
}

.nav-item.active {
  color: var(--accent);

  background:
    linear-gradient(
      90deg,
      rgba(0, 229, 255, 0.10),
      rgba(0, 229, 255, 0.025)
    );

  border-color: var(--accent-line);

  box-shadow:
    inset 3px 0 0 var(--accent),
    0 0 18px rgba(0, 229, 255, 0.035);
}


/* ========================================
 * Number
 * ======================================== */

.nav-number {
  font-family: var(--font-mono);

  font-size: 12px;

  color: var(--text-muted);
}

.nav-item.active .nav-number {
  color: var(--accent-secondary);
}


/* ========================================
 * Label
 * ======================================== */

.nav-label {
  font-family: var(--font-mono);

  font-size: 13px;
  font-weight: 650;

  letter-spacing: 0.12em;
}


/* ========================================
 * Arrow
 * ======================================== */

.nav-arrow {
  opacity: 0;

  color: var(--accent);

  font-family: var(--font-mono);
  font-size: 14px;

  transform: translateX(-5px);

  transition:
    opacity var(--transition-fast),
    transform var(--transition-fast);
}

.nav-item:hover .nav-arrow,
.nav-item.active .nav-arrow {
  opacity: 1;

  transform: translateX(0);
}


/* ========================================
 * Bottom
 * ======================================== */

.sidebar-bottom {
  padding: 18px;

  border-top: 1px solid var(--line);
}

.archive-index {
  display: flex;
  justify-content: space-between;

  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: 10px;

  letter-spacing: 0.08em;
}

.sidebar-decoration {
  display: flex;

  gap: 4px;

  margin-top: 14px;
}

.sidebar-decoration span {
  display: block;

  width: 5px;
  height: 5px;

  background: var(--line);
}

.sidebar-decoration span:first-child {
  background: var(--accent);

  box-shadow: 0 0 8px var(--accent);
}

.sidebar-decoration span:nth-child(3) {
  background: var(--accent-secondary);
}


/* ========================================
 * Mobile
 * ======================================== */

@media (max-width: 768px) {
  .archive-sidebar {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .archive-sidebar::after {
    display: none;
  }

  .sidebar-inner {
    padding: 9px 12px;

    overflow-x: auto;
  }

  .nav-group {
    margin: 0;
  }

  .group-title,
  .sidebar-bottom {
    display: none;
  }

  .nav-list {
    flex-direction: row;

    gap: 4px;
  }

  .nav-item {
    width: auto;
    min-width: max-content;

    height: 42px;

    grid-template-columns: auto 1fr auto;

    gap: 8px;
  }

  .nav-arrow {
    display: none;
  }
}
</style>