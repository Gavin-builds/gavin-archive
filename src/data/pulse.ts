import type { PulseItem } from '../types/pulse'

export const pulseItems: PulseItem[] = [
  // =========================
  // RESEARCH 研究 (2 items)
  // =========================
  {
    slug: 'agent-memory',
    category: 'RESEARCH',
    title: { zh: 'AI Agent 长期记忆机制', en: 'Long-term Memory for AI Agents' },
    subtitle: {
      zh: '研究结构化记忆如何让 Agent 跨会话保持上下文。',
      en: 'How structured memory lets agents keep context across sessions.',
    },
    status: 'ACTIVE',
    date: '2026-10-17',
    lastActive: '2026-10-19',
    activityCount: 12,
    tags: [
      { zh: 'Agent', en: 'Agent' },
      { zh: '记忆', en: 'Memory' },
      { zh: 'LLM', en: 'LLM' },
    ],
    progress: {
      zh: '正在对比向量检索与知识图谱两种记忆写入策略，已在个人项目中跑通最小闭环。',
      en: 'Comparing vector retrieval against knowledge-graph memory writes; the minimal loop already runs in a side project.',
    },
    thought: {
      zh: '记忆的价值不在"存得多"，而在"取得准"。上下文窗口再大，也不如一层好的索引。',
      en: 'The value of memory is not storing more, but retrieving better. A bigger context window is no match for a good index.',
    },
    nextStep: {
      zh: '用真实多轮任务评估两种策略的召回质量与成本。',
      en: 'Evaluate recall quality and cost of both strategies on real multi-turn tasks.',
    },
    relatedProject: 'ai-context-manager',
  },
  {
    slug: 'local-rag',
    category: 'RESEARCH',
    title: { zh: '本地代码库语义检索', en: 'Local Codebase Semantic Search' },
    subtitle: {
      zh: '在不上传源码的前提下，用本地嵌入模型索引整个仓库。',
      en: 'Indexing whole repositories with local embedding models, without shipping source code out.',
    },
    status: 'ONGOING',
    date: '2026-09-28',
    lastActive: '2026-10-15',
    activityCount: 8,
    tags: [
      { zh: 'RAG', en: 'RAG' },
      { zh: '嵌入', en: 'Embedding' },
      { zh: '开发者工具', en: 'DevTools' },
    ],
    progress: {
      zh: '仓库分块与本地嵌入管线原型已完成，检索延迟在日常开发可接受范围内。',
      en: 'Repo chunking and the local embedding pipeline prototype are done; latency is acceptable for daily coding.',
    },
    thought: {
      zh: '开发者对"代码不出本机"极其敏感。本地化不是合规需求，而是信任需求。',
      en: 'Developers are extremely sensitive about source code leaving the machine. Local-first is not compliance, it is trust.',
    },
    nextStep: {
      zh: '接入编辑器插件，验证真实开发场景下的召回率。',
      en: 'Wire it into an editor plugin and measure recall in real development flows.',
    },
  },

  // =========================
  // READING 阅读 (4 items)
  // =========================
  {
    slug: 'ddia',
    category: 'READING',
    title: {
      zh: '《Designing Data-Intensive Applications》',
      en: 'Designing Data-Intensive Applications',
    },
    source: { zh: 'Martin Kleppmann', en: 'Martin Kleppmann' },
    subtitle: {
      zh: '系统性地重读数据系统的存储、复制与一致性模型。',
      en: 'A deliberate reread of storage, replication and consistency models.',
    },
    status: 'ONGOING',
    date: '2026-10-01',
    lastActive: '2026-10-18',
    activityCount: 15,
    tags: [
      { zh: '分布式', en: 'Distributed' },
      { zh: '数据库', en: 'Database' },
    ],
    progress: {
      zh: '读到第 7 章"事务"，正在为每章补一页图解笔记。',
      en: 'Chapter 7 (Transactions) in progress; adding a one-page diagram note per chapter.',
    },
    thought: {
      zh: '大多数业务架构问题，这本书在 2017 年就写清楚了，缺的只是把它讲给团队听。',
      en: 'Most architecture questions were already answered in this book back in 2017; what is missing is explaining them to the team.',
    },
    nextStep: {
      zh: '读完第 9–12 章，整理成一篇批注文章发在博客。',
      en: 'Finish chapters 9–12 and publish an annotated note on the blog.',
    },
  },
  {
    slug: 'llm-papers',
    category: 'READING',
    title: { zh: 'LLM 推理与 Agent 论文集', en: 'LLM Inference & Agent Papers' },
    source: { zh: 'arXiv 精选', en: 'arXiv picks' },
    subtitle: {
      zh: '每周精读 1–2 篇推理优化与工具调用论文。',
      en: 'One or two carefully read papers per week on inference and tool use.',
    },
    status: 'ACTIVE',
    date: '2026-10-10',
    lastActive: '2026-10-19',
    activityCount: 6,
    tags: [
      { zh: '论文', en: 'Papers' },
      { zh: '推理', en: 'Inference' },
    ],
    progress: {
      zh: '近期两条主线：speculative decoding 与上下文压缩。',
      en: 'Two current tracks: speculative decoding and context compression.',
    },
    thought: {
      zh: '论文里的 trick 大多是为 GPU 省钱，工程意义是同样预算能做更多事。',
      en: 'Most paper tricks exist to save GPU cost; the engineering meaning is doing more with the same budget.',
    },
    nextStep: {
      zh: '把上下文压缩实验接到 agent-memory 研究里验证。',
      en: 'Feed the context-compression experiment into the agent-memory research.',
    },
  },
  {
    slug: 'pragmatic-programmer',
    category: 'READING',
    title: {
      zh: '《The Pragmatic Programmer》20 周年版',
      en: 'The Pragmatic Programmer (20th Anniversary)',
    },
    source: { zh: 'Hunt & Thomas', en: 'Hunt & Thomas' },
    subtitle: {
      zh: '把 DRY、正交性与可逆性决策映射到 AI 协作开发。',
      en: 'Mapping DRY, orthogonality and reversible decisions onto AI-assisted development.',
    },
    status: 'DONE',
    date: '2026-09-15',
    lastActive: '2026-09-28',
    activityCount: 20,
    tags: [
      { zh: '工程', en: 'Craft' },
      { zh: '方法论', en: 'Methodology' },
    ],
    progress: {
      zh: '已读完，笔记归档进博客草稿。',
      en: 'Finished; notes archived into blog drafts.',
    },
    thought: {
      zh: 'AI 时代"不要重复自己"有了新含义：提示词、上下文与工具链同样需要 DRY。',
      en: 'In the AI era, "do not repeat yourself" has a new meaning: prompts, context and tooling all need DRY too.',
    },
  },
  {
    slug: 'clean-code',
    category: 'READING',
    title: {
      zh: '《Clean Code》重读',
      en: 'Clean Code Revisit',
    },
    source: { zh: 'Robert C. Martin', en: 'Robert C. Martin' },
    subtitle: {
      zh: '对照 AI 生成代码的时代，重新审视命名、函数与注释的原则。',
      en: 'Revisiting naming, functions and comments in the age of AI-generated code.',
    },
    status: 'PAUSED',
    date: '2026-08-20',
    lastActive: '2026-09-05',
    activityCount: 9,
    tags: [
      { zh: '代码质量', en: 'Code Quality' },
      { zh: '原则', en: 'Principles' },
    ],
    progress: {
      zh: '读完前 6 章，暂停等团队读书会一起讨论。',
      en: 'Finished first 6 chapters; paused until team reading group discussion.',
    },
    thought: {
      zh: 'AI 能写出"正确"的代码，但"清晰"的代码仍然需要人来定义。',
      en: 'AI can write correct code, but clear code still needs humans to define what clear means.',
    },
  },

  // =========================
  // LEARNING 学习 (3 items)
  // =========================
  {
    slug: 'rust-wasm',
    category: 'LEARNING',
    title: { zh: 'Rust + WebAssembly', en: 'Rust + WebAssembly' },
    subtitle: {
      zh: '目标：把热点模块编译成 WASM 给前端直接使用。',
      en: 'Goal: compile hot modules to WASM and ship them straight to the frontend.',
    },
    status: 'ACTIVE',
    date: '2026-10-12',
    lastActive: '2026-10-19',
    activityCount: 18,
    tags: [
      { zh: 'Rust', en: 'Rust' },
      { zh: 'WASM', en: 'WASM' },
    ],
    progress: {
      zh: '已过所有权与生命周期关卡，正在写第一个解析器练习。',
      en: 'Ownership and lifetimes clicked; writing the first parser exercise.',
    },
    thought: {
      zh: 'Rust 的报错是老师不是敌人，编译器逼你提前想清楚数据归属。',
      en: 'Rust errors are teachers, not enemies. The compiler forces you to settle data ownership early.',
    },
    nextStep: {
      zh: '完成一个 Markdown → HTML 的 WASM 小工具并 benchmark。',
      en: 'Ship a Markdown → HTML WASM utility and benchmark it.',
    },
  },
  {
    slug: 'system-design',
    category: 'LEARNING',
    title: { zh: '系统设计四大件', en: 'System Design Core Four' },
    subtitle: {
      zh: '按限流、缓存、队列、分库四个模块逐个击破。',
      en: 'Breaking it into rate limiting, caching, queues and sharding.',
    },
    status: 'ONGOING',
    date: '2026-09-20',
    lastActive: '2026-10-16',
    activityCount: 11,
    tags: [
      { zh: '架构', en: 'Architecture' },
      { zh: '后端', en: 'Backend' },
    ],
    progress: {
      zh: '缓存一致性与消息队列两模块已完成笔记，正在做限流。',
      en: 'Cache consistency and message queue notes done; rate limiting in progress.',
    },
    thought: {
      zh: '设计能力的差距不在知道多少模式，而在能不能讲清权衡。',
      en: 'The gap in design skill is not how many patterns you know, but how clearly you can explain trade-offs.',
    },
    nextStep: {
      zh: '用 archive 项目做一次完整的容量估算练习。',
      en: 'Run a full capacity-estimation exercise against this archive project.',
    },
  },
  {
    slug: 'english-output',
    category: 'LEARNING',
    title: { zh: '英语口语与技术写作', en: 'Spoken English & Tech Writing' },
    subtitle: {
      zh: '每天 30 分钟影子跟读，每周一篇英文开发日志。',
      en: '30 minutes of shadowing daily, one English devlog per week.',
    },
    status: 'ONGOING',
    date: '2026-08-15',
    lastActive: '2026-10-18',
    activityCount: 42,
    tags: [
      { zh: '英语', en: 'English' },
      { zh: '写作', en: 'Writing' },
    ],
    progress: {
      zh: '已坚持 6 周，跟读材料换成真实会议录音。',
      en: 'Six weeks in; switched shadowing material to real meeting recordings.',
    },
    thought: {
      zh: '输出倒逼输入：开始写英文日志后，读文档的速度明显变快。',
      en: 'Output forces input: after writing English devlogs, reading docs got noticeably faster.',
    },
  },

  // =========================
  // LISTENING 音乐 (5 items)
  // =========================
  {
    slug: 'synthwave-focus',
    category: 'LISTENING',
    title: { zh: 'Synthwave 编码背景音', en: 'Synthwave Coding Soundtrack' },
    source: { zh: 'The Midnight · Perturbator', en: 'The Midnight · Perturbator' },
    subtitle: {
      zh: '节奏稳定、不抢注意力的电子乐，写代码常驻歌单。',
      en: 'Steady, non-distracting electronic music as the permanent coding playlist.',
    },
    status: 'ACTIVE',
    date: '2026-10-05',
    lastActive: '2026-10-19',
    activityCount: 28,
    tags: [
      { zh: 'Synthwave', en: 'Synthwave' },
      { zh: '专注', en: 'Focus' },
    ],
    progress: {
      zh: '当前循环：The Midnight《Days of Thunder》整张。',
      en: 'On repeat: The Midnight, "Days of Thunder" front to back.',
    },
    thought: {
      zh: '电子乐的 4/4 拍像节拍器，进入心流的速度比人声快得多。',
      en: 'The 4/4 pulse of electronic music works like a metronome; flow state arrives faster than with vocals.',
    },
  },
  {
    slug: 'lex-podcast',
    category: 'LISTENING',
    title: { zh: 'Lex Fridman Podcast', en: 'Lex Fridman Podcast' },
    source: { zh: 'AI / 工程长访谈', en: 'AI & engineering long-form' },
    subtitle: {
      zh: '通勤时段听 AI 研究者与工程师的深度访谈。',
      en: 'Deep interviews with AI researchers and engineers during commute hours.',
    },
    status: 'ONGOING',
    date: '2026-10-08',
    lastActive: '2026-10-17',
    activityCount: 7,
    tags: [
      { zh: '播客', en: 'Podcast' },
      { zh: 'AI', en: 'AI' },
    ],
    progress: {
      zh: '近期重点：Karpathy 关于 agent 的一期，听了两遍。',
      en: 'Recent highlight: the Karpathy episode on agents, listened twice.',
    },
    thought: {
      zh: '长访谈的价值是"思路的展开过程"，这是文章给不了的。',
      en: 'The value of long interviews is watching ideas unfold, something articles cannot give.',
    },
  },
  {
    slug: 'lofi-build',
    category: 'LISTENING',
    title: { zh: 'Lo-fi 构建电台', en: 'Lo-fi Build Radio' },
    source: { zh: '自建歌单 BUILD_MODE', en: 'Custom playlist BUILD_MODE' },
    subtitle: {
      zh: '按构建时长配歌：短平快任务 vs 长夜攻坚。',
      en: 'Music matched to build length: quick tasks vs long night grinds.',
    },
    status: 'PAUSED',
    date: '2026-09-10',
    lastActive: '2026-10-02',
    activityCount: 14,
    tags: [
      { zh: 'Lo-fi', en: 'Lo-fi' },
      { zh: '歌单', en: 'Playlist' },
    ],
    progress: {
      zh: '最近切回 Synthwave，该歌单暂时归档。',
      en: 'Switched back to synthwave; this playlist is temporarily archived.',
    },
    thought: {
      zh: '低音量 lo-fi 适合读代码，但写复杂逻辑时还是纯器乐更稳。',
      en: 'Quiet lo-fi suits code reading, but pure instrumentals are safer for complex logic.',
    },
  },
  {
    slug: 'classical-focus',
    category: 'LISTENING',
    title: { zh: '古典乐深度工作', en: 'Classical Deep Work' },
    source: { zh: 'Bach · Glenn Gould', en: 'Bach · Glenn Gould' },
    subtitle: {
      zh: '复杂架构设计时切换到古典乐，结构感更强。',
      en: 'Switching to classical for complex architecture design; stronger structural sense.',
    },
    status: 'ONGOING',
    date: '2026-10-14',
    lastActive: '2026-10-18',
    activityCount: 5,
    tags: [
      { zh: 'Classical', en: 'Classical' },
      { zh: '深度工作', en: 'Deep Work' },
    ],
    progress: {
      zh: 'Gould 的巴赫《哥德堡变奏曲》1981 版，听了三遍。',
      en: 'Gould\'s Bach "Goldberg Variations" 1981 recording, listened three times.',
    },
    thought: {
      zh: '巴赫的对位法像代码的模块化，每个声部独立又和谐。',
      en: 'Bach\'s counterpoint is like modular code; each voice is independent yet harmonious.',
    },
  },
  {
    slug: 'ambient-texture',
    category: 'LISTENING',
    title: { zh: 'Ambient 纹理音景', en: 'Ambient Texture Soundscape' },
    source: { zh: 'Brian Eno · Aphex Twin', en: 'Brian Eno · Aphex Twin' },
    subtitle: {
      zh: '无旋律的环境音乐，适合长时间沉浸式阅读。',
      en: 'Melody-free ambient music for long immersive reading sessions.',
    },
    status: 'ACTIVE',
    date: '2026-10-16',
    lastActive: '2026-10-19',
    activityCount: 4,
    tags: [
      { zh: 'Ambient', en: 'Ambient' },
      { zh: '阅读', en: 'Reading' },
    ],
    progress: {
      zh: 'Brian Eno《Music for Airports》循环中。',
      en: 'Brian Eno "Music for Airports" on loop.',
    },
    thought: {
      zh: '环境音乐的极致：存在但不打扰，像空气一样。',
      en: 'The pinnacle of ambient: present but not distracting, like air itself.',
    },
  },
]
