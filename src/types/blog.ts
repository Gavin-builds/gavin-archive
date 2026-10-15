import type { LocalizedText } from './content'

export interface BlogPost {
  slug: string
  title: LocalizedText
  description: LocalizedText
  date: string
  tags: LocalizedText[]
  readTime: number
  type: 'ARTICLE' | 'DEVLOG' | 'NOTE'
  content: LocalizedText[]
  relatedProjects?: string[]
  cover?: string
  /** 置顶：列表中排在最前并显示置顶标识 */
  pinned?: boolean
}
