import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    slug: 'gavin-archive',
    title: { zh: 'Gavin Archive', en: 'Gavin Archive' },
    description: {
      zh: '一个用于记录项目、实验、想法与开源工作的赛博朋克开发者数字档案。',
      en: 'A cyberpunk developer archive for documenting projects, experiments, ideas and open-source work.',
    },
    status: 'BUILDING',
    categories: ['Web', 'Open Source'],
    tags: [
      { zh: '开发者 OS', en: 'Developer OS' },
      { zh: '个人档案', en: 'Portfolio' },
      { zh: '开源', en: 'Open Source' },
    ],
    stack: ['Vue 3', 'TypeScript', 'Vite', 'Vue Router'],
    featured: true,
    cover: '/images/projects/gavin-archive.svg',
    accent: 'cyan',
    github: 'https://github.com/Gavin-builds/gavin-archive',
    date: '2026-09',
    context: {
      zh: '这是我的长期开发者档案，用来记录正在做什么、做过什么，以及想法如何随项目一起变化。',
      en: 'A long-term developer archive for recording what I build, what I am testing, and how my thinking changes with the work.',
    },
    role: { zh: '独立开发 / 全栈', en: 'Independent Builder / Full-stack' },
    problem: {
      zh: '传统开发者作品集通常强调静态简历和截图，却很难表达一个开发者长期的构建过程。',
      en: 'Traditional developer portfolios focus on static resumes and screenshots, but rarely represent how a developer builds over time.',
    },
    solution: {
      zh: '把作品集变成一个持续更新的档案系统，将项目、实验、日志、技术文章和代码活动连接起来。',
      en: 'Turn the portfolio into a living archive connecting projects, experiments, logs, technical writing and code activity.',
    },
    features: [
      { zh: '开发者 OS 界面', en: 'Developer OS interface' },
      { zh: '项目档案', en: 'Project archive' },
      { zh: '技术案例页', en: 'Technical case files' },
      { zh: '实验室', en: 'Experimental lab' },
      { zh: '开发日志', en: 'Development logs' },
      { zh: 'GitHub 活动', en: 'GitHub activity' },
    ],
    architecture: [
      { label: { zh: 'Vue 应用', en: 'Vue Application' }, description: { zh: 'Vue 3 + TypeScript', en: 'Vue 3 + TypeScript' } },
      { label: { zh: '档案布局', en: 'Archive Layout' }, description: { zh: '统一的 Developer OS 外壳', en: 'Shared Developer OS shell' } },
      { label: { zh: '内容层', en: 'Content Layer' }, description: { zh: 'Projects / Lab / Blog', en: 'Projects / Lab / Blog' } },
    ],
    developmentLog: [
      {
        date: '2026-09',
        title: { zh: '项目初始化', en: 'Project initialized' },
        description: { zh: '创建 Vue 3 + TypeScript + Vite 基础应用。', en: 'Created the initial Vue 3 + TypeScript + Vite application.' },
      },
      {
        date: '2026-09',
        title: { zh: 'Developer OS', en: 'Developer OS started' },
        description: { zh: '开始把普通作品集改造成具有档案感的开发者操作系统。', en: 'Started transforming the portfolio into a cyberpunk developer archive.' },
      },
    ],
    highlights: [
      { zh: '把 Home 的身份展示延伸成完整的档案视觉语言。', en: 'Extended the identity-focused Home into a broader archive language.' },
      { zh: '用不同的信息形态区分 Profile、Projects、Lab 与 Blog。', en: 'Use different record formats for Profile, Projects, Lab and Blog.' },
    ],
  },
  {
    slug: 'ai-control-console',
    title: { zh: 'AI 中控台', en: 'AI Control Console' },
    description: {
      zh: '一个前后端分离的 AI 能力管理平台，整合视觉分析、自然语言处理、智能搜索与实时任务管理。',
      en: 'A full-stack AI service management platform integrating visual analysis, natural language processing, intelligent search and real-time task management.',
    },
    status: 'ARCHIVED',
    categories: ['AI', 'Web', 'Tools'],
    tags: [
      { zh: 'AI', en: 'AI' },
      { zh: '计算机视觉', en: 'Computer Vision' },
      { zh: '自然语言处理', en: 'NLP' },
      { zh: 'WebSocket', en: 'WebSocket' },
      { zh: '任务调度', en: 'Task Management' },
    ],
    stack: [
      'React 18', 'TypeScript', 'Koa.js', 'Node.js', 'PostgreSQL', 'TypeORM',
      'WebSocket', 'Ant Design 5', 'Zustand', 'Vite',
    ],
    featured: true,
    cover: '/images/projects/ai-context-manager.svg',
    accent: 'purple',
    date: '2026',
    context: {
      zh: '公司项目总结：围绕多 AI 能力统一接入、管理和任务化处理，构建完整的前后端解决方案。',
      en: 'Company project summary: a full-stack platform for integrating, managing and orchestrating multiple AI capabilities.',
    },
    role: { zh: '全栈工程师', en: 'Full-stack Engineer' },
    problem: {
      zh: '不同 AI 提供商的 API 和能力模型差异明显，同时视觉分析、搜索、NLP 和离线任务又有不同的业务流程。',
      en: 'AI providers expose different APIs and capability models, while visual analysis, search, NLP and offline processing require different workflows.',
    },
    solution: {
      zh: '通过统一的 ModelProvider 抽象、Provider Adapter、能力映射和任务服务，把不同模型封装进统一服务层，并使用 WebSocket 处理工作台实时同步。',
      en: 'Used a ModelProvider abstraction, provider adapters, capability mapping and task services to unify AI providers, with WebSocket for real-time workspace synchronization.',
    },
    features: [
      { zh: '模型提供商注册与管理', en: 'AI provider management' },
      { zh: '模型能力映射', en: 'Model capability mapping' },
      { zh: '图片结构化提取', en: 'Visual tagging' },
      { zh: 'OCR 识别', en: 'OCR recognition' },
      { zh: '人脸 / 人体 / 车辆 / 非机动车搜索', en: 'Face / human / vehicle / non-motor search' },
      { zh: '自然语言聊天与算法管理', en: 'Natural language interaction and algorithm management' },
      { zh: '离线任务暂停 / 恢复 / 取消', en: 'Pause / resume / cancel offline tasks' },
      { zh: '工作台实时数据同步', en: 'Real-time workspace synchronization' },
    ],
    architecture: [
      { label: { zh: 'React 前端', en: 'React Application' }, description: { zh: 'React 18 + TypeScript + Ant Design', en: 'React 18 + TypeScript + Ant Design' } },
      { label: { zh: 'API 层', en: 'API Layer' }, description: { zh: '处理 HTTP 请求与响应', en: 'HTTP request / response handling' } },
      { label: { zh: '服务层', en: 'Service Layer' }, description: { zh: '业务逻辑、任务编排', en: 'Business logic and task orchestration' } },
      { label: { zh: 'AI 模型层', en: 'AI Model Layer' }, description: { zh: 'Provider Registry + Function Mapping', en: 'Provider Registry + Function Mapping' } },
      { label: { zh: 'PostgreSQL', en: 'PostgreSQL' }, description: { zh: '任务与领域数据持久化', en: 'Persistent task and domain data' } },
    ],
    developmentLog: [
      { date: '01', title: { zh: 'Provider 抽象层', en: 'AI Provider Layer' }, description: { zh: '定义统一 ModelProvider 接口，并为不同模型提供 Adapter。', en: 'Defined a common ModelProvider interface and adapters for different providers.' } },
      { date: '02', title: { zh: '视觉分析', en: 'Visual Analysis' }, description: { zh: '接入结构化提取与 OCR 任务，并保存任务结果。', en: 'Integrated structured extraction and OCR workflows with persisted results.' } },
      { date: '03', title: { zh: '实时工作台', en: 'Realtime Workspace' }, description: { zh: '通过 WebSocket 实现标注数据同步和任务状态通知。', en: 'Implemented annotation synchronization and task notifications through WebSocket.' } },
      { date: '04', title: { zh: '离线任务', en: 'Offline Tasks' }, description: { zh: '实现 running / pending / finished / failed 状态管理。', en: 'Implemented running / pending / finished / failed state management.' } },
    ],
    engineeringChallenges: [
      {
        title: { zh: '多模型统一接入', en: 'Multi-provider AI integration' },
        problem: { zh: '不同模型提供商 API 差异大。', en: 'Provider APIs differ substantially.' },
        solution: { zh: 'ModelProvider + Adapter + Factory + Function Mapping。', en: 'ModelProvider + Adapter + Factory + Function Mapping.' },
      },
      {
        title: { zh: '实时数据同步', en: 'Real-time synchronization' },
        problem: { zh: '标注工作台需要前后端状态一致。', en: 'The annotation workspace needs synchronized state.' },
        solution: { zh: 'WebSocket + 事件驱动消息协议 + 任务状态管理。', en: 'WebSocket + event-driven messaging + task state management.' },
      },
      {
        title: { zh: '图片处理与可视化', en: 'Image processing' },
        problem: { zh: '图片尺寸不同，需要处理显示坐标与原始坐标转换。', en: 'Images vary in size, requiring coordinate conversion between display and source resolution.' },
        solution: { zh: '图片缩放、自适应显示、坐标转换和 Canvas / CSS 标注。', en: 'Scaling, responsive display, coordinate conversion and Canvas / CSS annotations.' },
      },
      {
        title: { zh: '任务容错', en: 'Fault tolerance' },
        problem: { zh: 'AI 模型请求存在失败和不可用情况。', en: 'AI model requests can fail or become unavailable.' },
        solution: { zh: '加入重试、降级、错误日志和友好提示。', en: 'Added retry, fallback, error logging and user-friendly feedback.' },
      },
    ],
    highlights: [
      { zh: '统一封装多个 AI 模型提供商。', en: 'Unified multiple AI model providers behind a common interface.' },
      { zh: '实现 WebSocket 实时任务状态与工作台同步。', en: 'Implemented real-time task and workspace synchronization through WebSocket.' },
      { zh: '完成视觉分析、搜索、NLP 与离线任务等多类 AI 工作流。', en: 'Implemented visual analysis, search, NLP and offline task workflows.' },
      { zh: '加入重试、降级与错误处理策略。', en: 'Added retry, fallback and error-handling strategies.' },
    ],
  },
  {
    slug: 'ai-context-manager',
    title: { zh: 'AI 上下文管理器', en: 'AI Context Manager' },
    description: {
      zh: '一个用于组织、管理和复用软件项目 AI 上下文的开发者工具。',
      en: 'A developer tool for organizing, managing and reusing AI context across software projects.',
    },
    status: 'PROTOTYPE',
    categories: ['AI', 'Tools'],
    tags: [
      { zh: 'AI', en: 'AI' },
      { zh: 'LLM', en: 'LLM' },
      { zh: '开发者工具', en: 'Developer Tools' },
    ],
    stack: ['TypeScript', 'Node.js', 'Vue', 'LLM API'],
    featured: true,
    cover: '/images/projects/ai-context-manager.svg',
    accent: 'purple',
    date: '2026-09',
    context: {
      zh: '一个围绕“AI 如何理解代码库”展开的个人产品实验。',
      en: 'An independent product experiment around the question of how AI can understand a software codebase.',
    },
    problem: {
      zh: '大型项目的有效上下文分散在文件、模块、符号和约定中，开发者经常需要重复把相同信息塞进 AI 提示词。',
      en: 'Useful context in large projects is distributed across files, modules, symbols and conventions, forcing developers to repeatedly provide the same context to AI tools.',
    },
    solution: {
      zh: '建立一个结构化上下文层，对项目结构进行索引，并把文件、符号、依赖关系与可复用上下文集合组织起来。',
      en: 'Build a structured context layer that indexes project structure and organizes files, symbols, dependencies and reusable context collections.',
    },
    features: [
      { zh: '项目上下文索引', en: 'Project context indexing' },
      { zh: 'AI Prompt 管理', en: 'AI prompt management' },
      { zh: '上下文集合', en: 'Context collections' },
      { zh: '代码关系图', en: 'Code relationships' },
    ],
    architecture: [
      { label: { zh: '代码库', en: 'Codebase' } },
      { label: { zh: 'Context Manager', en: 'Context Manager' } },
      { label: { zh: '上下文检索', en: 'Context Retrieval' } },
      { label: { zh: 'LLM Provider', en: 'LLM Provider' } },
    ],
    developmentLog: [
      { date: '01', title: { zh: '项目索引', en: 'Project indexing' }, description: { zh: '先从文件结构与项目关系入手。', en: 'Started with project structure and relationships.' } },
      { date: '02', title: { zh: '上下文集合', en: 'Context collections' }, description: { zh: '尝试把可重复使用的上下文组织成集合。', en: 'Started grouping reusable context into collections.' } },
      { date: '03', title: { zh: '真实任务测试', en: 'Real-task testing' }, description: { zh: '对比结构化上下文与手工粘贴文件两种方式。', en: 'Compare structured context against manually pasted files.' } },
    ],
  },
  {
    slug: 'webhook-debugger',
    title: { zh: 'Webhook Debugger', en: 'Webhook Debugger' },
    description: {
      zh: '一个轻量的 Webhook 捕获、检查与回放工具。',
      en: 'A lightweight webhook inspection and debugging platform for developers.',
    },
    status: 'IDEA',
    categories: ['Tools', 'Open Source'],
    tags: [
      { zh: 'Webhook', en: 'Webhook' },
      { zh: '开发者工具', en: 'Developer Tools' },
      { zh: 'API', en: 'API' },
    ],
    stack: ['Vue', 'Node.js', 'TypeScript'],
    featured: false,
    cover: '/images/projects/webhook-debugger.svg',
    accent: 'pink',
    date: '2026-09',
    context: { zh: '一个从真实 API 调试痛点出发的独立产品想法。', en: 'An independent product idea derived from a recurring API debugging pain point.' },
    problem: { zh: '第三方平台发送的 Webhook 很难方便地捕获、查看请求细节和重复测试。', en: 'Webhooks from third-party platforms can be difficult to capture, inspect and replay during integration debugging.' },
    solution: { zh: '提供临时 endpoint、请求历史、Headers / Payload 查看以及回放能力。', en: 'Provide temporary endpoints, request history, headers and payload inspection, plus replay workflows.' },
    features: [
      { zh: 'Webhook Endpoint', en: 'Webhook endpoint' },
      { zh: 'Request Inspection', en: 'Request inspection' },
      { zh: 'Headers / Payload', en: 'Headers / Payload' },
      { zh: '请求历史', en: 'Request history' },
    ],
    architecture: [
      { label: { zh: 'Webhook', en: 'Webhook' } },
      { label: { zh: 'API Gateway', en: 'API Gateway' } },
      { label: { zh: 'Request Inspector', en: 'Request Inspector' } },
    ],
  },
]

export const getProjectBySlug = (slug: string) => projects.find(project => project.slug === slug)
