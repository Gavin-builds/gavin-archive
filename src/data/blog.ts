import type { BlogPost } from '../types/blog'

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-i-built-gavin-archive',
    title: { zh: '为什么我要做 Gavin Archive', en: 'Why I Built Gavin Archive' },
    description: {
      zh: '把个人作品集变成一个长期记录项目、实验、思考与构建过程的数字档案。',
      en: 'Turning a personal portfolio into a long-term archive for projects, experiments, ideas and the process behind building.',
    },
    date: '2026-09-11',
    tags: [
      { zh: '开发者', en: 'Developer' },
      { zh: '档案', en: 'Archive' },
      { zh: '开源', en: 'Open Source' },
    ],
    readTime: 5,
    type: 'ARTICLE',
    relatedProjects: ['gavin-archive'],
    cover: '/images/blog/archive-log.svg',
    content: [
      { zh: '大多数开发者作品集只回答一个问题：你做过什么？', en: 'Most developer portfolios answer one question: what have you built?' },
      { zh: '我希望它还能回答：我现在正在做什么、为什么这么做、什么失败过，以及代码在哪里。', en: 'I wanted it to also answer what I am building now, why I am building it, what failed, and where the code lives.' },
      { zh: 'Gavin Archive 因此更像一个持续更新的开发者档案，而不是一页完成后就很少变化的作品集。', en: 'Gavin Archive is therefore closer to a living developer archive than a portfolio that is finished once and rarely changes.' },
      { zh: 'Projects 记录已经构建的东西，Lab 记录尚在验证的东西，Blog 记录思考与技术决策。', en: 'Projects record what has been built, Lab records what is still being tested, and Blog records ideas and technical decisions.' },
      { zh: '目标不是把作品集做得更复杂，而是让开发过程本身变得可见。', en: 'The goal is not to make the portfolio more complicated, but to make the development process visible.' },
    ],
  },
  {
    slug: 'building-ai-context-manager',
    title: { zh: '构建 AI 上下文管理器', en: 'Building AI Context Manager' },
    description: {
      zh: '记录一个关于“AI 如何理解整个代码库”的开发者工具实验。',
      en: 'Notes on exploring how structured project context can help AI-assisted software development.',
    },
    date: '2026-09-10',
    tags: [
      { zh: 'AI', en: 'AI' },
      { zh: 'LLM', en: 'LLM' },
      { zh: '开发者工具', en: 'Developer Tools' },
    ],
    readTime: 7,
    type: 'DEVLOG',
    relatedProjects: ['ai-context-manager'],
    cover: '/images/blog/context-log.svg',
    content: [
      { zh: '大型项目难以被 AI 工具真正理解，因为有价值的上下文分散在文件、模块、符号和约定中。', en: 'Large projects are difficult for AI tools to understand because useful context is distributed across files, modules, symbols and conventions.' },
      { zh: '我的思路是先建立一层结构化上下文，让项目关系可以被索引、检索和复用。', en: 'My direction is to build a structured context layer so project relationships can be indexed, retrieved and reused.' },
      { zh: '原型阶段先处理项目结构：文件、符号、依赖以及上下文集合。', en: 'The prototype starts with project structure: files, symbols, dependencies and reusable context collections.' },
      { zh: '真正需要验证的问题是：结构化上下文能否减少开发者反复粘贴文件和解释项目的工作？', en: 'The key question is whether structured context can reduce the repeated work of pasting files and explaining the project to AI.' },
    ],
  },
  {
    slug: 'from-ai-api-to-ai-system',
    title: { zh: '从 AI API 到 AI 系统', en: 'From AI API to AI System' },
    description: {
      zh: '当应用从调用一个模型，发展到同时管理多个 AI 能力时，工程问题会发生什么变化？',
      en: 'What changes when an application grows from calling one model into managing multiple AI capabilities?',
    },
    date: '2026-09-06',
    tags: [
      { zh: 'AI', en: 'AI' },
      { zh: '架构', en: 'Architecture' },
      { zh: '后端', en: 'Backend' },
    ],
    readTime: 8,
    type: 'ARTICLE',
    relatedProjects: ['ai-control-console'],
    content: [
      { zh: '调用一次 AI 模型并不复杂，但围绕多个模型、多个能力和多个任务构建系统，则是另一类问题。', en: 'Calling an AI model is simple enough, but building a system around multiple models, capabilities and tasks is a different engineering problem.' },
      { zh: '不同提供商的 API、能力和返回格式不同，业务逻辑不应该直接依赖某一家模型。', en: 'Provider APIs, capabilities and response formats differ, so business logic should not depend directly on any single provider.' },
      { zh: '在 AI 中控台项目中，这最终形成了 Provider 抽象、能力映射和统一服务层。', en: 'In the AI Control Console project, this led to provider abstractions, capability mapping and a unified service layer.' },
      { zh: '当模型不再是系统里唯一重要的组件时，AI 应用就开始真正进入系统工程阶段。', en: 'Once models stop being the only moving part, an AI application starts becoming a systems-engineering problem.' },
    ],
  },
  {
    slug: 'what-makes-a-developer-tool-useful',
    title: { zh: '什么样的开发者工具才真正有用？', en: 'What Makes a Developer Tool Useful?' },
    description: {
      zh: '记录我对开发者工具价值的一点观察：减少重复工作，而不是增加又一层界面。',
      en: 'A note on why developer tools should reduce repeated work instead of simply adding another interface.',
    },
    date: '2026-09-04',
    tags: [
      { zh: '开发者工具', en: 'Developer Tools' },
      { zh: '产品', en: 'Product' },
      { zh: '工程', en: 'Engineering' },
    ],
    readTime: 6,
    type: 'NOTE',
    content: [
      { zh: '开发者工具真正有用的时候，通常不是因为它提供了更多功能，而是因为它消除了一个重复发生的摩擦点。', en: 'A developer tool becomes useful when it removes friction from a workflow that happens repeatedly.' },
      { zh: '真正有价值的部分往往不是 UI，而是它替开发者省下了多少认知和机械工作。', en: 'The valuable part is often not the UI, but how much cognitive and mechanical work the tool removes.' },
      { zh: '这也是我一直关注 AI 上下文、Webhook 和开发工作流工具的原因。', en: 'That is why I keep exploring tools around AI context, webhooks and development workflows.' },
      { zh: '最直接的验证方式很简单：把工具放进真实项目里，看工作流是否真的变轻。', en: 'The simplest validation is to put the tool into a real project and see whether the workflow actually becomes easier.' },
    ],
  },
]

export const getBlogPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug)
