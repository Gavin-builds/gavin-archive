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
}
