<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import GlitchTransition from './components/GlitchTransition.vue'
import { loadUiText } from './stores/content'

const route = useRoute()
const { t, locale } = useI18n()

// 仅预取 ui-text 文案；列表与详情由各自页面按需、按页请求
onMounted(() => {
  void loadUiText()
})

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

// ui-text 也只拉取当前语言；切换语言后重新请求该语言文案
watch(locale, () => {
  void loadUiText()
})
</script>

<template>
  <RouterView />

  <!-- 全局赛博朋克屏闪转场（主页 -> 个人档案） -->
  <GlitchTransition />
</template>
