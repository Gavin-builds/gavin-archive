import type { LabExperiment } from '../types/lab'

export const labExperiments: LabExperiment[] = [
  {
    slug: 'ai-codebase-context',
    title: { zh: 'AI 能真正理解整个代码库吗？', en: 'Can AI understand an entire codebase?' },
    description: {
      zh: '探索项目索引、依赖关系和结构化上下文是否能改善 AI 辅助开发。',
      en: 'Exploring project indexing, dependency graphs and structured context for AI-assisted development.',
    },
    status: 'TESTING',
    tags: [
      { zh: 'AI', en: 'AI' },
      { zh: 'LLM', en: 'LLM' },
      { zh: '代码库', en: 'Codebase' },
      { zh: '关系图', en: 'Graph' },
    ],
    date: '2026-09',
    cover: '/images/lab/codebase-context.svg',
    relatedProject: 'ai-context-manager',
    hypothesis: {
      zh: '如果把代码库表示成结构化关系，而不是一堆原始文件，AI 可能更容易检索和理解相关上下文。',
      en: 'If a codebase is represented as structured relationships rather than raw files, AI may retrieve and reason about relevant context more effectively.',
    },
    question: {
      zh: 'AI 能否在不反复接收相同文件的情况下回答大型项目中的真实开发问题？',
      en: 'Can AI answer real questions about a large project without repeatedly receiving the same files as prompt context?',
    },
    observation: {
      zh: '当前实验聚焦于文件、符号、依赖关系和可复用上下文集合。',
      en: 'The current experiment focuses on files, symbols, dependencies and reusable context collections.',
    },
    conclusion: {
      zh: '仍在测试。下一步是用真实开发任务比较结构化上下文与手工提供上下文的差异。',
      en: 'Still testing. The next step is to compare structured context against manually supplied context on real development tasks.',
    },
  },
  {
    slug: 'archive-ui-system',
    title: { zh: 'Cyberpunk Archive UI System', en: 'Cyberpunk Archive UI System' },
    description: {
      zh: '测试一种克制的赛博朋克视觉语言，让开发者档案保持识别度而不过度装饰。',
      en: 'Testing a restrained cyberpunk visual language for a long-term developer archive.',
    },
    status: 'PROMISING',
    tags: [
      { zh: 'UI', en: 'UI' },
      { zh: 'CSS', en: 'CSS' },
      { zh: '赛博朋克', en: 'Cyberpunk' },
      { zh: '设计系统', en: 'Design System' },
    ],
    date: '2026-09',
    cover: '/images/lab/ui-system.svg',
    relatedProject: 'gavin-archive',
    hypothesis: {
      zh: '少量字体、网格、遥测与档案隐喻，就可以形成稳定的独特视觉，而无需堆叠装饰。',
      en: 'A small set of typography, grid, telemetry and archive metaphors can create a recognizable visual identity without excessive decoration.',
    },
    question: {
      zh: '一个开发者档案可以离开常见作品集布局多远，同时仍然保持易读？',
      en: 'How far can a developer archive move away from conventional portfolio layouts while remaining readable?',
    },
    observation: {
      zh: 'Home 已经形成较强身份感，但内部页面需要更明显的档案隐喻。',
      en: 'The Home already has a strong identity, while internal pages need stronger archival metaphors.',
    },
    conclusion: {
      zh: '有潜力。下一轮把 Profile、Projects、Lab、Blog 设计成不同类型的记录。',
      en: 'Promising. The next iteration turns Profile, Projects, Lab and Blog into distinct record formats.',
    },
  },
  {
    slug: 'webhook-event-flow',
    title: { zh: 'Webhook Event Flow', en: 'Webhook Event Flow' },
    description: {
      zh: '测试一个用于捕获、检查和回放 Webhook 请求的最小工作流。',
      en: 'A small prototype for capturing, inspecting and replaying webhook requests.',
    },
    status: 'EXPERIMENT',
    tags: [
      { zh: 'Webhook', en: 'Webhook' },
      { zh: 'API', en: 'API' },
      { zh: '开发者工具', en: 'Developer Tools' },
    ],
    date: '2026-09',
    cover: '/images/lab/webhook-flow.svg',
    relatedProject: 'webhook-debugger',
    hypothesis: {
      zh: '一个轻量的 Webhook 检查流程可以显著缩短第三方 API 集成时的调试时间。',
      en: 'A lightweight webhook inspection workflow can reduce friction during third-party API integration debugging.',
    },
    question: {
      zh: '检查一个进入系统的 Webhook，最小有用的界面到底需要什么？',
      en: 'What is the smallest useful interface for inspecting an incoming webhook?',
    },
    observation: {
      zh: '当前概念集中在 endpoint 捕获、请求详情、Headers、Payload 与历史记录。',
      en: 'The current concept focuses on endpoint capture, request inspection, headers, payloads and history.',
    },
    conclusion: {
      zh: '早期实验。产品范围和 replay 语义仍需要验证。',
      en: 'Early experiment. Product scope and replay semantics still need validation.',
    },
  },
]
