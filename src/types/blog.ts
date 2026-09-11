export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readTime: number
  type: 'ARTICLE' | 'DEVLOG' | 'NOTE'
  content: string[]
  relatedProjects?: string[]
}
