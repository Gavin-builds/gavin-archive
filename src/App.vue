<script setup lang="ts">
import GlitchTransition from './components/GlitchTransition.vue'
</script>

<template>
  <RouterView />

  <!-- 全局赛博朋克屏闪转场（主页 -> 个人档案） -->
  <GlitchTransition />
</template>
