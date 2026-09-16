import type { LocalizedText } from './content'

export type ProjectStatus =
  | 'IDEA'
  | 'PROTOTYPE'
  | 'BUILDING'
  | 'BETA'
  | 'RELEASED'
  | 'ARCHIVED'

export type ProjectCategory =
  | 'AI'
  | 'Web'
  | 'Open Source'
  | 'Tools'
  | 'Experiment'

export interface Project {
  slug: string
  title: LocalizedText
  description: LocalizedText
  status: ProjectStatus
  categories: ProjectCategory[]
  tags: LocalizedText[]
  stack: string[]
  featured: boolean
  github?: string
  demo?: string
  cover?: string
  accent?: 'cyan' | 'pink' | 'purple'
  date: string
  context?: LocalizedText
  role?: LocalizedText
  problem?: LocalizedText
  solution?: LocalizedText
  features?: LocalizedText[]
  architecture?: {
    label: LocalizedText
    description?: LocalizedText
  }[]
  developmentLog?: {
    date: string
    title: LocalizedText
    description: LocalizedText
  }[]
  engineeringChallenges?: {
    title: LocalizedText
    problem: LocalizedText
    solution: LocalizedText
  }[]
  highlights?: LocalizedText[]
}
