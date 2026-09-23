<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  open: boolean
  eyebrow: string
  title: string
  meta?: string
}>()

const emit = defineEmits<{
  close: []
  closed: []
}>()

const { t } = useI18n()

const closeButton = ref<HTMLButtonElement | null>(null)

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

watch(() => props.open, value => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = value ? 'hidden' : ''

  if (value) {
    window.addEventListener('keydown', handleKeydown)
    // 打开后把焦点移入抽屉，便于 Esc / Tab 在弹窗内操作
    nextTick(() => closeButton.value?.focus())
  } else {
    window.removeEventListener('keydown', handleKeydown)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer-fade" @after-leave="emit('closed')">
      <div v-if="open" class="drawer-root" @click.self="emit('close')">
        <aside class="drawer" role="dialog" aria-modal="true">
          <div class="drawer__top">
            <div>
              <span class="drawer__eyebrow">{{ eyebrow }}</span>
              <span v-if="meta" class="drawer__meta">{{ meta }}</span>
            </div>
            <button ref="closeButton" class="drawer__close" type="button" :aria-label="t('common.close')" @click="emit('close')">
              ×
            </button>
          </div>
          <div class="drawer__title">{{ title }}</div>
          <div class="drawer__body">
            <slot />
          </div>
          <div class="drawer__footer">{{ t('archive.token') }} // {{ t('common.online') }}</div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-root {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  background: rgba(2, 4, 9, 0.56);
  backdrop-filter: blur(9px);
}

.drawer {
  width: min(560px, 100%);
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 22px 24px 18px;
  border-left: 1px solid var(--accent-line);
  background:
    radial-gradient(circle at 20% 10%, rgba(var(--accent-rgb), .08), transparent 30%),
    var(--bg);
  box-shadow: -24px 0 70px rgba(0, 0, 0, .35);
  overflow-y: auto;
}

.drawer__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
}

.drawer__eyebrow,
.drawer__meta,
.drawer__footer {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: .13em;
}

.drawer__eyebrow { color: var(--accent); }
.drawer__meta { margin-top: 5px; color: var(--text-muted); }

.drawer__close {
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 20px;
  cursor: pointer;
}

.drawer__close:hover {
  color: var(--accent);
  border-color: var(--accent-line);
}

.drawer__title {
  margin: 24px 0 8px;
  font-size: clamp(34px, 5vw, 58px);
  line-height: .98;
  letter-spacing: -.055em;
}

.drawer__body { flex: 1; padding-top: 20px; }
.drawer__footer { margin-top: 30px; color: var(--text-muted); }

/* 遮罩淡入淡出 */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity .3s ease;
}

/* 抽屉面板从右侧滑入 / 滑出 */
.drawer-fade-enter-active .drawer,
.drawer-fade-leave-active .drawer {
  transition: transform .4s cubic-bezier(.22, .68, .24, 1);
}

/* 内容逐级浮现 */
.drawer-fade-enter-active .drawer__top,
.drawer-fade-enter-active .drawer__title,
.drawer-fade-enter-active .drawer__body,
.drawer-fade-enter-active .drawer__footer {
  transition:
    opacity .42s ease,
    transform .42s cubic-bezier(.22, .68, .24, 1);
}

.drawer-fade-enter-active .drawer__top { transition-delay: .06s; }
.drawer-fade-enter-active .drawer__title { transition-delay: .11s; }
.drawer-fade-enter-active .drawer__body { transition-delay: .16s; }
.drawer-fade-enter-active .drawer__footer { transition-delay: .2s; }

.drawer-fade-enter-from,
.drawer-fade-leave-to { opacity: 0; }

.drawer-fade-enter-from .drawer,
.drawer-fade-leave-to .drawer { transform: translateX(100%); }

.drawer-fade-enter-from .drawer__top,
.drawer-fade-enter-from .drawer__title,
.drawer-fade-enter-from .drawer__body,
.drawer-fade-enter-from .drawer__footer {
  opacity: 0;
  transform: translateX(26px);
}

@media (max-width: 620px) {
  .drawer { padding: 18px; border-left: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .drawer-fade-enter-active,
  .drawer-fade-leave-active,
  .drawer-fade-enter-active .drawer,
  .drawer-fade-enter-active .drawer__top,
  .drawer-fade-enter-active .drawer__title,
  .drawer-fade-enter-active .drawer__body,
  .drawer-fade-enter-active .drawer__footer {
    transition: none;
  }

  .drawer-fade-enter-from .drawer,
  .drawer-fade-leave-to .drawer,
  .drawer-fade-enter-from .drawer__top,
  .drawer-fade-enter-from .drawer__title,
  .drawer-fade-enter-from .drawer__body,
  .drawer-fade-enter-from .drawer__footer {
    transform: none;
  }
}
</style>
