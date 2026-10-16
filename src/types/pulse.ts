import type { LocalizedText } from './content'

export type PulseCategory = 'RESEARCH' | 'READING' | 'LEARNING' | 'LISTENING'

export type PulseStatus = 'ACTIVE' | 'ONGOING' | 'PAUSED' | 'DONE'

export interface PulseItem {
  slug: string
  category: PulseCategory
  title: LocalizedText
  subtitle: LocalizedText
  status: PulseStatus
  date: string
  tags: LocalizedText[]
  source?: LocalizedText
  progress?: LocalizedText
  thought?: LocalizedText
  nextStep?: LocalizedText
  relatedProject?: string
}
