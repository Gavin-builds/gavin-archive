<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import ArchiveHeader from "../components/archive/ArchiveHeader.vue";
import ArchiveFooter from "../components/archive/ArchiveFooter.vue";
import CyberParticles from "../components/archive/CyberParticles.vue";

const route = useRoute();

// 路由切换时的赛博扫描光束，每次 fullPath 变化重播
const sweepKey = ref(0);

watch(
  () => route.fullPath,
  () => {
    sweepKey.value += 1;
  },
);

// 仅当覆盖层自身动画结束（晚于伪元素动画）时移除
const onSweepEnd = (event: AnimationEvent) => {
  if (event.target === event.currentTarget) {
    sweepKey.value = 0;
  }
};

// 页面采用自然文档流，路由切换时把窗口滚动复位到顶部
const resetScrollTop = () => {
  window.scrollTo(0, 0);
};
</script>

<template>
  <div class="archive-shell">
    <!-- 视口四角 HUD 框 -->
    <span class="hud-corner hud-corner--tl" aria-hidden="true" />
    <span class="hud-corner hud-corner--tr" aria-hidden="true" />
    <span class="hud-corner hud-corner--bl" aria-hidden="true" />
    <span class="hud-corner hud-corner--br" aria-hidden="true" />

    <!-- 两侧竖排终端坐标（宽屏装饰） -->
    <span class="hud-coord hud-coord--left" aria-hidden="true">GAVIN//ARCHIVE/SYS</span>
    <span class="hud-coord hud-coord--right" aria-hidden="true">SIGNAL://STABLE</span>

    <ArchiveHeader />

    <main class="archive-main">
      <!-- 赛博朋克粒子网络层：固定视口，z-index 1 叠在栅格底纹之上、内容之下 -->
      <CyberParticles />

      <div class="archive-content">
        <RouterView v-slot="{ Component, route: viewRoute }">
          <Transition
            name="archive-page"
            mode="out-in"
            @before-enter="resetScrollTop"
          >
            <component :is="Component" :key="viewRoute.fullPath" />
          </Transition>
        </RouterView>
      </div>

      <!-- 路由切换赛博扫描光束 -->
      <div
        v-if="sweepKey"
        :key="sweepKey"
        class="page-sweep"
        aria-hidden="true"
        @animationend="onSweepEnd"
      />
    </main>

    <ArchiveFooter />
  </div>
</template>

<style scoped>
.archive-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;

  /* 透明底：让 body 的全局网格 / 双色光晕 / CRT 扫描线透出来 */
  color: var(--text);
}

.archive-main {
  position: relative;

  flex: 1;

  overflow-x: clip;

  /* 静态双层栅格 + 双色光晕（一次性光栅，零持续开销）：
     56px 细栅格为基线，每 224px 一条加粗主线 */
  background:
    repeating-linear-gradient(
      90deg,
      rgba(var(--accent-rgb), 0.14) 0 1px,
      transparent 1px 224px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(var(--accent-rgb), 0.14) 0 1px,
      transparent 1px 224px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(var(--accent-rgb), 0.065) 0 1px,
      transparent 1px 56px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(var(--accent-rgb), 0.065) 0 1px,
      transparent 1px 56px
    ),
    radial-gradient(
      circle at 85% -5%,
      rgba(var(--accent-rgb), 0.07),
      transparent 38%
    ),
    radial-gradient(
      circle at 8% 105%,
      rgba(var(--pink-rgb), 0.06),
      transparent 36%
    );
}

/* 栅格向上下淡出 + 主线交点节点，避免底纹压过正文 */
.archive-main::before {
  content: "";

  position: absolute;
  inset: 0;
  z-index: 0;

  pointer-events: none;

  background:
    radial-gradient(
      circle at 0 0,
      rgba(var(--accent-rgb), 0.55) 0,
      rgba(var(--accent-rgb), 0.55) 1.4px,
      transparent 2px
    ) 0 0 / 224px 224px,
    linear-gradient(
      to bottom,
      var(--bg) 0%,
      transparent 10%,
      transparent 90%,
      var(--bg) 100%
    );
}

/* =========================
   HUD 四角框（固定在视口）
========================= */

.hud-corner {
  position: fixed;

  width: 14px;
  height: 14px;

  pointer-events: none;
  z-index: 40;
}

.hud-corner--tl {
  top: 8px;
  left: 8px;

  border-top: 1px solid var(--accent-line);
  border-left: 1px solid var(--accent-line);
}

.hud-corner--tr {
  top: 8px;
  right: 8px;

  border-top: 1px solid var(--pink-line);
  border-right: 1px solid var(--pink-line);
}

.hud-corner--bl {
  bottom: 8px;
  left: 8px;

  border-bottom: 1px solid var(--pink-line);
  border-left: 1px solid var(--pink-line);
}

.hud-corner--br {
  right: 8px;
  bottom: 8px;

  border-right: 1px solid var(--accent-line);
  border-bottom: 1px solid var(--accent-line);
}

/* 两侧竖排坐标 */
.hud-coord {
  position: fixed;
  top: 50%;

  color: var(--text-faint);

  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.32em;

  writing-mode: vertical-rl;

  pointer-events: none;
  z-index: 40;

  opacity: 0.7;
}

.hud-coord--left {
  left: 14px;

  transform: translateY(-50%) rotate(180deg);
}

.hud-coord--right {
  right: 14px;

  transform: translateY(-50%);
}

.archive-content {
  position: relative;
  z-index: 2;

  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 72px 48px 110px;
}

/* =========================
   页面转场：故障位移 + 切片裁切
========================= */

.archive-page-enter-active {
  transition:
    opacity 280ms steps(5, end),
    transform 340ms cubic-bezier(0.22, 0.68, 0.24, 1),
    clip-path 340ms cubic-bezier(0.7, 0, 0.3, 1);
}

.archive-page-leave-active {
  transition:
    opacity 150ms steps(2, end),
    transform 180ms cubic-bezier(0.55, 0, 0.45, 1);
}

.archive-page-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

.archive-page-enter-from {
  opacity: 0;
  transform: translateX(16px);
  clip-path: inset(0 0 100% 0);
}

/* 路由扫描光束覆盖层（仅切换瞬间出现）
   fixed 到视口：光栅面积恒定为一屏，不随页面高度增长；
   z-index 高于 sticky 页头，从页头"上方"掠过，
   避免页头 backdrop-filter 逐帧重算模糊 */
.page-sweep {
  position: fixed;
  inset: 0;
  z-index: 60;

  overflow: hidden;

  pointer-events: none;

  background: linear-gradient(
    to bottom,
    rgba(var(--accent-rgb), 0.06),
    transparent 42%
  );

  opacity: 0;

  animation: sweep-flash 520ms steps(6, end) forwards;
}

/* 光束：满高伪元素 + 顶部渐变绘制（2px 主体 + 光晕带）。
   渐变只光栅化一次，动画走 transform 由合成器位移，
   全程零布局 / 零重绘（原先动画 top + 大模糊 box-shadow
   每帧都触发整条光束的布局与重绘，是卡顿主因） */
.page-sweep::before {
  content: "";

  position: absolute;
  inset: 0;

  background:
    /* 光束主体 */
    linear-gradient(
      90deg,
      transparent,
      rgba(var(--accent-rgb), 0.9) 30%,
      rgba(var(--ink-rgb), 0.95) 50%,
      rgba(var(--pink-rgb), 0.8) 70%,
      transparent
    ) 0 0 / 100% 2px no-repeat,
    /* 光晕带：替代原 16/44/22px 三层大模糊 box-shadow */
    linear-gradient(
      to bottom,
      transparent,
      rgba(var(--accent-rgb), 0.3) 40%,
      rgba(var(--pink-rgb), 0.22) 60%,
      transparent
    ) 0 -16px / 100% 34px no-repeat;

  will-change: transform;

  animation: sweep-beam 460ms cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

.page-sweep::after {
  content: "";

  position: absolute;
  inset: 0;

  background: repeating-linear-gradient(
    to bottom,
    transparent 0 24px,
    rgba(var(--accent-rgb), 0.05) 25px 26px
  );

  animation: sweep-slices 480ms steps(6, end) forwards;
}

@keyframes sweep-flash {
  0% {
    opacity: 1;
  }

  55% {
    opacity: 0.55;
  }

  100% {
    opacity: 0;
  }
}

/* translateY(100%) 相对自身高度（= 视口高）：
   光束从视口顶部外侧扫到底部外侧，位移全在合成器完成 */
@keyframes sweep-beam {
  from {
    transform: translateY(-40px);
  }

  to {
    transform: translateY(100%);
  }
}

@keyframes sweep-slices {
  0% {
    opacity: 0.9;
    transform: translateY(-14px);
  }

  100% {
    opacity: 0;
    transform: translateY(0);
  }
}

@media (max-width: 1180px) {
  .hud-coord {
    display: none;
  }
}

@media (max-width: 768px) {
  .archive-content {
    padding: 48px 22px 80px;
  }

  .hud-corner {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .archive-page-enter-active,
  .archive-page-leave-active {
    transition: none;
  }

  .archive-page-enter-from,
  .archive-page-leave-to {
    transform: none;
    clip-path: none;
  }

  .page-sweep {
    display: none;
  }
}
</style>
