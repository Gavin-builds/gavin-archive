import { reactive, ref } from 'vue'

import { fetchCollection } from '../api/strapi'
import type { StrapiEntry } from '../api/strapi'
import { blogPosts as fallbackBlogPosts } from '../data/blog'
import { projects as fallbackProjects } from '../data/projects'
import { pulseItems as fallbackPulseItems } from '../data/pulse'
import type { BlogPost } from '../types/blog'
import type { LocalizedText } from '../types/content'
import type { Project, ProjectCategory, ProjectStatus } from '../types/project'
import type { PulseCategory, PulseItem, PulseStatus } from '../types/pulse'

/**
 * 内容 store。
 *
 * Strapi 官方 i18n 的数据形态是「一条记录 = 一种语言」，而前端组件一直使用
 * `{ zh, en }` 的 LocalizedText。这里在读取后把两种语言按 documentId 配对合并，
 * 还原成前端原有的数据结构，因此所有视图与组件都不需要改写。
 *
 * `src/data` 下的静态数据作为兜底：请求失败时页面照常渲染，不会白屏。
 */

const LOCALES = { zh: 'zh-CN', en: 'en-US' } as const

const PAGE_SIZE = '100'

export const projects = reactive<Project[]>([...fallbackProjects])
export const pulseItems = reactive<PulseItem[]>([...fallbackPulseItems])
export const blogPosts = reactive<BlogPost[]>([...fallbackBlogPosts])

/** 是否正在从 Strapi 拉取数据 */
export const contentLoading = ref(false)
/** 当前数据来源：静态文件兜底 or Strapi */
export const contentSource = ref<'static' | 'strapi'>('static')

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug)

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug)

// ------------------------------------------------------------------ 合并工具

type LocalePair = { zh?: StrapiEntry; en?: StrapiEntry }

/** 非本地化（各语言共享）字段：优先取 en，其次 zh */
const shared = <T>(pair: LocalePair, field: string, fallback: T): T =>
  (pair.en?.[field] ?? pair.zh?.[field] ?? fallback) as T

/** 取本地化字符串字段，拼回 { zh, en } */
const text = (pair: LocalePair, field: string, fallback: LocalizedText = { zh: '', en: '' }): LocalizedText => {
  const zh = pair.zh?.[field] as string | undefined
  const en = pair.en?.[field] as string | undefined

  if (zh == null && en == null) return fallback

  return { zh: zh ?? '', en: en ?? '' }
}

/** 可选本地化字段：两种语言都缺失时返回 undefined（视图里的 v-if 依赖这个语义） */
const optionalText = (pair: LocalePair, field: string): LocalizedText | undefined => {
  const zh = pair.zh?.[field] as string | undefined
  const en = pair.en?.[field] as string | undefined

  if (zh == null && en == null) return undefined

  return { zh: zh ?? '', en: en ?? '' }
}

/** 本地化字符串数组：按下标一一对应拼成 LocalizedText[] */
const textList = (pair: LocalePair, field: string): LocalizedText[] => {
  const zh = (pair.zh?.[field] as string[] | undefined) ?? []
  const en = (pair.en?.[field] as string[] | undefined) ?? []
  const length = Math.max(zh.length, en.length)

  return Array.from({ length }, (_, index) => ({
    zh: zh[index] ?? '',
    en: en[index] ?? '',
  }))
}

/** 本地化对象数组：结构逐项对应，`label` 必填、`description` 可选 */
const architectureList = (pair: LocalePair): Project['architecture'] => {
  type Node = { label?: string; description?: string }

  const zh = (pair.zh?.architecture as Node[] | undefined) ?? []
  const en = (pair.en?.architecture as Node[] | undefined) ?? []
  const length = Math.max(zh.length, en.length)

  return Array.from({ length }, (_, index) => {
    const zhNode = zh[index]
    const enNode = en[index]

    const node: NonNullable<Project['architecture']>[number] = {
      label: { zh: zhNode?.label ?? '', en: enNode?.label ?? '' },
    }

    if (zhNode?.description != null || enNode?.description != null) {
      node.description = { zh: zhNode?.description ?? '', en: enNode?.description ?? '' }
    }

    return node
  })
}

const developmentLogList = (pair: LocalePair): Project['developmentLog'] => {
  type Entry = { date?: string; title?: string; description?: string }

  const zh = (pair.zh?.developmentLog as Entry[] | undefined) ?? []
  const en = (pair.en?.developmentLog as Entry[] | undefined) ?? []
  const length = Math.max(zh.length, en.length)

  return Array.from({ length }, (_, index) => ({
    date: en[index]?.date ?? zh[index]?.date ?? '',
    title: { zh: zh[index]?.title ?? '', en: en[index]?.title ?? '' },
    description: { zh: zh[index]?.description ?? '', en: en[index]?.description ?? '' },
  }))
}

const challengeList = (pair: LocalePair): Project['engineeringChallenges'] => {
  type Entry = { title?: string; problem?: string; solution?: string }

  const zh = (pair.zh?.engineeringChallenges as Entry[] | undefined) ?? []
  const en = (pair.en?.engineeringChallenges as Entry[] | undefined) ?? []
  const length = Math.max(zh.length, en.length)

  return Array.from({ length }, (_, index) => ({
    title: { zh: zh[index]?.title ?? '', en: en[index]?.title ?? '' },
    problem: { zh: zh[index]?.problem ?? '', en: en[index]?.problem ?? '' },
    solution: { zh: zh[index]?.solution ?? '', en: en[index]?.solution ?? '' },
  }))
}

// ------------------------------------------------------------------ 类型映射

const toProject = (pair: LocalePair): Project => ({
  slug: shared<string>(pair, 'slug', ''),
  status: shared<ProjectStatus>(pair, 'stage', 'IDEA'),
  categories: shared<ProjectCategory[]>(pair, 'categories', []),
  stack: shared<string[]>(pair, 'stack', []),
  featured: shared<boolean>(pair, 'featured', false),
  github: shared<string | undefined>(pair, 'github', undefined),
  demo: shared<string | undefined>(pair, 'demo', undefined),
  cover: shared<string | undefined>(pair, 'cover', undefined),
  accent: shared<Project['accent']>(pair, 'accent', undefined),
  date: shared<string>(pair, 'date', ''),
  title: text(pair, 'title'),
  description: text(pair, 'description'),
  context: optionalText(pair, 'context'),
  role: optionalText(pair, 'role'),
  problem: optionalText(pair, 'problem'),
  solution: optionalText(pair, 'solution'),
  tags: textList(pair, 'tags'),
  features: textList(pair, 'features'),
  highlights: textList(pair, 'highlights'),
  architecture: architectureList(pair),
  developmentLog: developmentLogList(pair),
  engineeringChallenges: challengeList(pair),
})

const toPulseItem = (pair: LocalePair): PulseItem => ({
  slug: shared<string>(pair, 'slug', ''),
  category: shared<PulseCategory>(pair, 'category', 'RESEARCH'),
  status: shared<PulseStatus>(pair, 'stage', 'ACTIVE'),
  date: shared<string>(pair, 'date', ''),
  lastActive: shared<string>(pair, 'lastActive', ''),
  activityCount: shared<number>(pair, 'activityCount', 0),
  relatedProject: shared<string | undefined>(pair, 'relatedProject', undefined),
  title: text(pair, 'title'),
  subtitle: text(pair, 'subtitle'),
  tags: textList(pair, 'tags'),
  source: optionalText(pair, 'source'),
  progress: optionalText(pair, 'progress'),
  thought: optionalText(pair, 'thought'),
  nextStep: optionalText(pair, 'nextStep'),
})

const toBlogPost = (pair: LocalePair): BlogPost => ({
  slug: shared<string>(pair, 'slug', ''),
  date: shared<string>(pair, 'date', ''),
  readTime: shared<number>(pair, 'readTime', 0),
  type: shared<BlogPost['type']>(pair, 'type', 'ARTICLE'),
  pinned: shared<boolean>(pair, 'pinned', false),
  relatedProjects: shared<string[] | undefined>(pair, 'relatedProjects', undefined),
  cover: shared<string | undefined>(pair, 'cover', undefined),
  title: text(pair, 'title'),
  description: text(pair, 'description'),
  tags: textList(pair, 'tags'),
  content: textList(pair, 'content'),
})

// ------------------------------------------------------------------ 拉取

/** 同时拉取两种语言，再按 documentId 配对 */
const fetchPairs = async (endpoint: string): Promise<LocalePair[]> => {
  const [zhEntries, enEntries] = await Promise.all([
    fetchCollection(endpoint, {
      locale: LOCALES.zh,
      status: 'published',
      'pagination[pageSize]': PAGE_SIZE,
    }),
    fetchCollection(endpoint, {
      locale: LOCALES.en,
      status: 'published',
      'pagination[pageSize]': PAGE_SIZE,
    }),
  ])

  const pairs = new Map<string, LocalePair>()

  for (const entry of zhEntries) {
    const key = String(entry.documentId)
    pairs.set(key, { ...pairs.get(key), zh: entry })
  }

  for (const entry of enEntries) {
    const key = String(entry.documentId)
    pairs.set(key, { ...pairs.get(key), en: entry })
  }

  return [...pairs.values()]
}

const replaceAll = <T>(target: T[], items: T[]) => {
  target.splice(0, target.length, ...items)
}

/**
 * 从 Strapi 加载全部归档内容。失败时保留 `src/data` 的静态数据兜底，
 * 只打印一条告警，不影响页面渲染。
 */
export const loadContent = async (): Promise<void> => {
  if (contentLoading.value) return

  contentLoading.value = true

  try {
    const [projectPairs, pulsePairs, blogPairs] = await Promise.all([
      fetchPairs('projects'),
      fetchPairs('pulses'),
      fetchPairs('blog-posts'),
    ])

    if (projectPairs.length) replaceAll(projects, projectPairs.map(toProject))
    if (pulsePairs.length) replaceAll(pulseItems, pulsePairs.map(toPulseItem))
    if (blogPairs.length) replaceAll(blogPosts, blogPairs.map(toBlogPost))

    contentSource.value = 'strapi'
  } catch (error) {
    console.warn('[content] Strapi 内容加载失败，继续使用本地静态数据兜底。', error)
  } finally {
    contentLoading.value = false
  }
}
