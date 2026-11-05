import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue'

/**
 * 触底加载：监听列表末尾的哨兵元素，进入视口时请求下一页。
 *
 * 每次加载结束后重新 observe 哨兵，让「列表仍不满一屏」的情况可以继续
 * 加载下一页，同时避免递归调用造成死循环。
 */
export const useInfiniteScroll = (
  sentinel: Ref<HTMLElement | null>,
  canLoad: () => boolean,
  load: () => Promise<void>,
) => {
  let observer: IntersectionObserver | null = null
  let running = false

  const observe = () => {
    if (!observer || !sentinel.value) return

    // 重新 observe 会触发一次当前相交状态的回调
    observer.unobserve(sentinel.value)
    observer.observe(sentinel.value)
  }

  const attempt = async () => {
    if (running || !canLoad()) return

    running = true

    try {
      await load()
    } finally {
      running = false
    }

    observe()
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) void attempt()
      },
      { rootMargin: '240px 0px' },
    )

    observe()
  })

  watch(sentinel, () => observe())

  // 首页数据加载完成后 hasMore 才变为 true，此时重新观察以决定是否继续加载
  watch(
    () => canLoad(),
    (can) => {
      if (can) observe()
    },
  )

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
