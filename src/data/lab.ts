import type { LabExperiment } from '../types/lab'

export const labExperiments: LabExperiment[] = [
  {
    slug: 'ai-codebase-context',
    title: 'Can AI understand an entire codebase?',
    description:
      'Exploring project indexing, dependency graphs and structured context for AI-assisted development.',
    status: 'TESTING',
    tags: ['AI', 'LLM', 'Codebase'],
    date: '2026-09',
    relatedProject: 'ai-context-manager',
  },
  {
    slug: 'archive-ui-system',
    title: 'Cyberpunk Archive UI System',
    description:
      'Testing a restrained cyberpunk visual language for a long-term developer archive.',
    status: 'PROMISING',
    tags: ['UI', 'CSS', 'Cyberpunk'],
    date: '2026-09',
    relatedProject: 'gavin-archive',
  },
  {
    slug: 'webhook-event-flow',
    title: 'Webhook Event Flow',
    description:
      'A small prototype for capturing, inspecting and replaying webhook requests.',
    status: 'EXPERIMENT',
    tags: ['Webhook', 'API', 'Developer Tools'],
    date: '2026-09',
    relatedProject: 'webhook-debugger',
  },
]
