import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    slug: 'gavin-archive',

    title: 'Gavin Archive',

    description:
      'A cyberpunk developer archive for documenting projects, experiments, ideas and open-source work.',

    status: 'BUILDING',

    categories: [
      'Web',
      'Open Source',
    ],

    tags: [
      'Developer OS',
      'Portfolio',
      'Open Source',
    ],

    stack: [
      'Vue 3',
      'TypeScript',
      'Vite',
      'Vue Router',
    ],

    featured: true,

    github:
      'https://github.com/Gavin-builds/gavin-archive',

    date: '2026-09',

    problem:
      'Traditional developer portfolios usually focus on static resumes and project screenshots, but they do not represent how a developer thinks and builds over time.',

    solution:
      'Gavin Archive turns the portfolio into a long-term developer archive containing projects, experiments, development logs and technical writing.',

    features: [
      'Developer OS interface',
      'Project archive',
      'Project detail pages',
      'AI Lab',
      'Technical Blog',
      'GitHub integration',
    ],

    architecture: [
      {
        label: 'Vue Application',
        description: 'Vue 3 + TypeScript',
      },
      {
        label: 'Archive Layout',
        description: 'Shared Developer OS shell',
      },
      {
        label: 'Content Layer',
        description: 'Projects, Lab and Blog',
      },
    ],

    developmentLog: [
      {
        date: '2026-09',
        title: 'Project initialized',
        description:
          'Created the initial Vue 3 + TypeScript + Vite application.',
      },
      {
        date: '2026-09',
        title: 'Developer OS started',
        description:
          'Started transforming the portfolio into a cyberpunk developer archive.',
      },
    ],
  },

  {
    slug: 'ai-context-manager',

    title: 'AI Context Manager',

    description:
      'A developer tool for organizing, managing and reusing AI context across software projects.',

    status: 'PROTOTYPE',

    categories: [
      'AI',
      'Tools',
    ],

    tags: [
      'AI',
      'LLM',
      'Developer Tools',
    ],

    stack: [
      'TypeScript',
      'Node.js',
      'Vue',
      'LLM API',
    ],

    featured: true,

    date: '2026-09',

    problem:
      'Large software projects require developers to repeatedly provide context to AI coding tools.',

    solution:
      'Build a structured context layer that allows project knowledge to be stored, indexed and reused.',

    features: [
      'Project context',
      'AI prompts',
      'Context collections',
      'Reusable development knowledge',
    ],

    architecture: [
      {
        label: 'Developer',
      },
      {
        label: 'Context Manager',
      },
      {
        label: 'LLM Provider',
      },
    ],
  },

  {
    slug: 'webhook-debugger',

    title: 'Webhook Debugger',

    description:
      'A lightweight webhook inspection and debugging platform for developers.',

    status: 'IDEA',

    categories: [
      'Tools',
      'Open Source',
    ],

    tags: [
      'Webhook',
      'Developer Tools',
      'API',
    ],

    stack: [
      'Vue',
      'Node.js',
      'TypeScript',
    ],

    featured: false,

    date: '2026-09',

    features: [
      'Webhook endpoint',
      'Request inspection',
      'Headers viewer',
      'Payload viewer',
      'Request history',
    ],

    architecture: [
      {
        label: 'Webhook',
      },
      {
        label: 'API Gateway',
      },
      {
        label: 'Request Inspector',
      },
    ],
  },
]

export const getProjectBySlug = (
  slug: string,
) => {
  return projects.find(
    project => project.slug === slug,
  )
}