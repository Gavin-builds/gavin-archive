<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import GlitchTransition from './components/GlitchTransition.vue'

const route = useRoute()
const { t, locale } = useI18n()

const BRAND = 'GAVIN ARCHIVE'

// 路由或语言切换时同步浏览器标签页标题
const syncDocumentTitle = () => {
  const titleKey = route.meta.titleKey as string | undefined

  document.title = titleKey ? `${t(titleKey)} · ${BRAND}` : BRAND
}

watch(
  () => [route.meta.titleKey, locale.value],
  syncDocumentTitle,
  { immediate: true },
)
</script>

<template>
  <RouterView />

  <!-- 全局赛博朋克屏闪转场（主页 -> 个人档案） -->
  <GlitchTransition />
</template>
