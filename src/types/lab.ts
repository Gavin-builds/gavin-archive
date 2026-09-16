import type { LocalizedText } from './content'

export type LabStatus =
  | 'EXPERIMENT'
  | 'TESTING'
  | 'PROMISING'
  | 'PAUSED'
  | 'FAILED'
  | 'ARCHIVED'

export interface LabExperiment {
  slug: string
  title: LocalizedText
  description: LocalizedText
  status: LabStatus
  tags: LocalizedText[]
  date: string
  cover?: string
  relatedProject?: string
  hypothesis?: LocalizedText
  question?: LocalizedText
  observation?: LocalizedText
  conclusion?: LocalizedText
}
