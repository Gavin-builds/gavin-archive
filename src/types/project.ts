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

  title: string

  description: string

  status: ProjectStatus

  categories: ProjectCategory[]

  tags: string[]

  stack: string[]

  featured: boolean

  github?: string

  demo?: string

  cover?: string

  date: string

  problem?: string

  solution?: string

  features?: string[]

  architecture?: {
    label: string
    description?: string
  }[]

  developmentLog?: {
    date: string
    title: string
    description: string
  }[]
}