import { reactive } from 'vue'

import { fetchCollection, fetchSingle } from '../api/strapi'
import type { StrapiEntry } from '../api/strapi'
import { getLocale, i18n } from '../locales'
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
 * 数据按页加载：列表每次只请求 10 条，触底后请求下一页。
 * `src/data` 下的静态数据只在首屏请求失败时兜底展示，后端可用时完全不参与渲染。
 */

const LOCALES = { zh: 'zh-CN', en: 'en-US' } as const

/** 当前界面语言对应的 Strapi locale */
type AppLocale = keyof typeof LOCALES

const activeLocale = (): AppLocale => getLocale()

/** 列表每页条数 */
export const PAGE_SIZE = 10

/** 单个集合的分页状态 */
export interface FeedState {
  /** 已加载到第几页 */
  page: number
  pageSize: number
  pageCount: number
  total: number
  /** 是否还有下一页 */
  hasMore: boolean
  loading: boolean
  /** 首屏请求是否已有结果（成功或失败兜底） */
  initialized: boolean
  /** 当前数据来源：等待 / Strapi / 静态兜底 */
  source: 'pending' | 'strapi' | 'static'
  /** 这批数据的语言；语言切换后与当前界面语言不一致就会重载 */
  locale: AppLocale | null
}

const createFeedState = (): FeedState => ({
  page: 0,
  pageSize: PAGE_SIZE,
  pageCount: 0,
  total: 0,
  hasMore: false,
  loading: false,
  initialized: false,
  source: 'pending',
  locale: null,
})

export const projects = reactive<Project[]>([])
export const pulseItems = reactive<PulseItem[]>([])
export const blogPosts = reactive<BlogPost[]>([])

export const projectFeed = reactive<FeedState>(createFeedState())
export const pulseFeed = reactive<FeedState>(createFeedState())
export const blogFeed = reactive<FeedState>(createFeedState())

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

const buildListParams = (page: number, sort: string[]): Record<string, string> => {
  const params: Record<string, string> = {
    status: 'published',
    'pagination[page]': String(page),
    'pagination[pageSize]': String(PAGE_SIZE),
  }

  sort.forEach((value, index) => {
    params[`sort[${index}]`] = value
  })

  return params
}

/** 只拉取当前界面语言的一页数据 */
const fetchPage = async (
  endpoint: string,
  page: number,
  sort: string[],
  locale: AppLocale,
): Promise<{ entries: StrapiEntry[]; total: number; pageCount: number }> => {
  const params = buildListParams(page, sort)
  const result = await fetchCollection(endpoint, { ...params, locale: LOCALES[locale] })

  return {
    entries: result.data,
    total: result.pagination.total,
    pageCount: result.pagination.pageCount,
  }
}

/** 按 slug 拉取当前界面语言的单条记录 */
const fetchBySlug = async (
  endpoint: string,
  slug: string,
  locale: AppLocale,
): Promise<LocalePair | null> => {
  const params: Record<string, string> = {
    status: 'published',
    'filters[slug][$eq]': slug,
    'pagination[pageSize]': '1',
  }

  const result = await fetchCollection(endpoint, { ...params, locale: LOCALES[locale] })
  const entry = result.data[0]

  if (!entry) return null

  return { [locale]: entry } as LocalePair
}

/**
 * 加载一页。
 *
 * - 尚未初始化时请求第 1 页；已初始化且还有下一页时请求下一页。
 * - 首屏请求失败才使用 `fallback` 静态数据；后续页失败只停止继续加载。
 */
const loadPage = async <T>(
  endpoint: string,
  sort: string[],
  target: T[],
  state: FeedState,
  fallback: T[],
  toItem: (pair: LocalePair) => T,
): Promise<void> => {
  if (state.loading) return

  const locale = activeLocale()

  // 语言切换：清空旧语言的数据，从第一页重新加载
  if (state.source === 'strapi' && state.locale !== locale) {
    target.splice(0, target.length)
    Object.assign(state, createFeedState(), { locale })
  }

  if (state.initialized && !state.hasMore) return

  const page = state.initialized ? state.page + 1 : 1

  state.loading = true

  try {
    const { entries, total, pageCount } = await fetchPage(endpoint, page, sort, locale)

    // 请求期间切换了语言：丢弃本次结果，在 finally 中按新语言重载
    if (locale !== activeLocale()) return

    target.push(...entries.map((entry) => toItem({ [locale]: entry } as LocalePair)))

    state.page = page
    state.total = total
    state.pageCount = pageCount
    state.hasMore = page < pageCount
    state.source = 'strapi'
  } catch (error) {
    if (locale !== activeLocale()) return

    if (!state.initialized) {
      target.splice(0, target.length, ...fallback)
      state.total = fallback.length
      state.pageCount = 1
      state.hasMore = false
      state.source = 'static'
    } else {
      state.hasMore = false
    }

    console.warn(`[content] ${endpoint} 第 ${page} 页加载失败`, error)
  } finally {
    state.loading = false

    if (locale !== activeLocale()) {
      target.splice(0, target.length)
      Object.assign(state, createFeedState())
      void loadPage(endpoint, sort, target, state, fallback, toItem)
    } else {
      state.initialized = true
      state.locale = locale
    }
  }
}

// ------------------------------------------------------------------ 列表

export const ensureProjects = (): Promise<void> =>
  loadPage('projects', ['featured:desc', 'date:desc'], projects, projectFeed, fallbackProjects, toProject)

export const loadMoreProjects = (): Promise<void> =>
  loadPage('projects', ['featured:desc', 'date:desc'], projects, projectFeed, fallbackProjects, toProject)

export const ensurePulseItems = (): Promise<void> =>
  loadPage('pulses', ['lastActive:desc'], pulseItems, pulseFeed, fallbackPulseItems, toPulseItem)

export const loadMorePulseItems = (): Promise<void> =>
  loadPage('pulses', ['lastActive:desc'], pulseItems, pulseFeed, fallbackPulseItems, toPulseItem)

export const ensureBlogPosts = (): Promise<void> =>
  loadPage('blog-posts', ['pinned:desc', 'date:desc'], blogPosts, blogFeed, fallbackBlogPosts, toBlogPost)

export const loadMoreBlogPosts = (): Promise<void> =>
  loadPage('blog-posts', ['pinned:desc', 'date:desc'], blogPosts, blogFeed, fallbackBlogPosts, toBlogPost)

// ------------------------------------------------------------------ 详情

const projectDetails = new Map<string, Project>()
const blogPostDetails = new Map<string, BlogPost>()

/**
 * 按 slug 加载项目详情。
 *
 * 列表只加载了部分页，深链接的项目可能还没进列表，因此这里单独按 slug 请求。
 * 请求失败时才回退到 `src/data/projects.ts`。
 */
export const loadProjectBySlug = async (slug: string): Promise<Project | undefined> => {
  const locale = activeLocale()
  const fromList = projectFeed.source === 'static' || projectFeed.locale === locale
    ? projects.find((item) => item.slug === slug)
    : undefined
  const cached = fromList ?? projectDetails.get(`${locale}:${slug}`)

  if (cached) return cached

  try {
    const pair = await fetchBySlug('projects', slug, locale)

    if (!pair) return undefined

    const project = toProject(pair)
    projectDetails.set(`${locale}:${slug}`, project)

    return project
  } catch (error) {
    console.warn('[content] 项目详情加载失败，使用本地静态数据兜底。', error)

    return fallbackProjects.find((item) => item.slug === slug)
  }
}

/** 按 slug 加载博客文章；列表未加载到该篇时单独请求 */
export const loadBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const locale = activeLocale()
  const fromList = blogFeed.source === 'static' || blogFeed.locale === locale
    ? blogPosts.find((item) => item.slug === slug)
    : undefined
  const cached = fromList ?? blogPostDetails.get(`${locale}:${slug}`)

  if (cached) return cached

  try {
    const pair = await fetchBySlug('blog-posts', slug, locale)

    if (!pair) return undefined

    const post = toBlogPost(pair)
    blogPostDetails.set(`${locale}:${slug}`, post)

    return post
  } catch (error) {
    console.warn('[content] 博客详情加载失败，使用本地静态数据兜底。', error)

    return fallbackBlogPosts.find((item) => item.slug === slug)
  }
}

// ------------------------------------------------------------------ UI 文案

/**
 * 从 Strapi 拉取 ui-text 单类型的整包文案，合并进 vue-i18n。
 *
 * mergeLocaleMessage 是深合并：后端返回的 key 覆盖本地文案，
 * 后端缺失的 key 保留本地 zh-CN.ts / en-US.ts 的值。
 */
export const loadUiText = async (): Promise<void> => {
  const locale = activeLocale()
  const entry = await fetchSingle('ui-text', { locale: LOCALES[locale], status: 'published' })
  const messages = entry?.messages as Record<string, unknown> | undefined

  if (messages) i18n.global.mergeLocaleMessage(locale, messages)
}
