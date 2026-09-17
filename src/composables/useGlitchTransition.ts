import { ref } from 'vue'

export type GlitchPhase = 'in' | 'hold' | 'out'

// 屏闪时间线：切入 460ms -> 保持并执行跳转 360ms -> 切出 500ms
const COVER_DELAY = 460
const OUT_DELAY = 820
const END_DELAY = 1320

// 每次播放的随机种子，驱动故障条位置 / 抖动幅度
const SEED_COUNT = 14

const active = ref(false)
const phase = ref<GlitchPhase>('in')
const runId = ref(0)
const seeds = ref<number[]>([])

let timers: ReturnType<typeof setTimeout>[] = []

const clearTimers = () => {
  timers.forEach((timer) => clearTimeout(timer))
  timers = []
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const useGlitchTransition = () => {
  const play = (onCover?: () => void | Promise<void>) => {
    if (active.value) return

    // 系统开启减弱动效时直接执行跳转，不播放屏闪
    if (prefersReducedMotion()) {
      onCover?.()
      return
    }

    clearTimers()

    seeds.value = Array.from(
      { length: SEED_COUNT },
      () => Math.random(),
    )
    runId.value += 1
    phase.value = 'in'
    active.value = true

    // 黑屏完全覆盖后再跳转，用户看不到中间切换
    timers.push(
      setTimeout(() => {
        phase.value = 'hold'
        onCover?.()
      }, COVER_DELAY),
    )

    timers.push(
      setTimeout(() => {
        phase.value = 'out'
      }, OUT_DELAY),
    )

    timers.push(
      setTimeout(() => {
        active.value = false
        clearTimers()
      }, END_DELAY),
    )
  }

  return {
    active,
    phase,
    runId,
    seeds,
    play,
  }
}
