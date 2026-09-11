import type { BlogPost } from '../types/blog'

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-i-built-gavin-archive',
    title: 'Why I Built Gavin Archive',
    description:
      'Turning a personal portfolio into a long-term archive for projects, experiments and technical thinking.',
    date: '2026-09-11',
    tags: ['Developer', 'Open Source', 'Archive'],
    readTime: 5,
    type: 'ARTICLE',
    relatedProjects: ['gavin-archive'],
    content: [
      'Most developer portfolios are designed to answer one question: what have you built?',
      'I wanted something that could also answer what I am building now, how I think, what failed, and where the code lives.',
      'Gavin Archive is the result: a developer archive that connects projects, experiments, writing and open-source work into one system.',
      'The goal is not to create a more complicated portfolio. The goal is to make the development process itself visible.',
    ],
  },
  {
    slug: 'building-ai-context-manager',
    title: 'Building AI Context Manager',
    description:
      'Notes on building a structured context layer for AI-assisted software development.',
    date: '2026-09-10',
    tags: ['AI', 'LLM', 'Developer Tools'],
    readTime: 7,
    type: 'DEVLOG',
    relatedProjects: ['ai-context-manager'],
    content: [
      'Large software projects are difficult for AI coding tools because useful context is distributed across files, modules and conventions.',
      'My current direction is to build a context layer that indexes a project and exposes the relationships an AI system needs.',
      'The prototype focuses on project structure first: files, symbols, dependencies and reusable context collections.',
      'The next step is testing whether structured context can produce more reliable answers than repeatedly pasting files into a prompt.',
    ],
  },
]

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find(post => post.slug === slug)
