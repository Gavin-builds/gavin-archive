export type LabStatus =
  | 'EXPERIMENT'
  | 'TESTING'
  | 'PROMISING'
  | 'PAUSED'
  | 'FAILED'
  | 'ARCHIVED'

export interface LabExperiment {
  slug: string
  title: string
  description: string
  status: LabStatus
  tags: string[]
  date: string
  relatedProject?: string
}
