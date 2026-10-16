export default {
  common: {
    loading: '加载中',
    close: '关闭',
    menu: '菜单',
    lightMode: '切换浅色模式',
    darkMode: '切换深色模式',
  },

  nav: {
    profile: '个人档案',
    projects: '项目',
    pulse: '脉搏',
    blog: '博客',
    github: 'GitHub',
  },

  home: {
    archive: 'GAVIN ARCHIVE',
    system: '开发者操作系统',
    identity: '身份',
    role: '角色',
    stack: '技术栈',
    mode: '状态',

    identityValue: 'GAVINLIN',
    roleValue: 'AI 全栈工程师',
    stackValue: 'VUE / NODE',
    modeValue: 'BUILDING',

    archiveLabel: '档案',
    year: '年份',
    pulse: '脉搏',
    activeCore: '当前项目',

    initializing: '// 正在初始化',
    archiveId: 'ARCHIVE_001',

    engineer: 'AI 全栈工程师',

    description:
      '使用代码与 AI 构建工具、产品与实验。',

    enterArchive: '进入档案',

    footer: {
      slogan: '构建 · 实验 · 归档',
      version: 'v0.1.0',
    },
  },

  transition: {
    entering: '正在接入个人档案',
    accessGranted: '接入成功',
    uplink: '系统::接入 > 档案/主页',
  },

  profile: {
    title: '个人档案',
    subtitle: '关于我',

    role: 'AI 全栈工程师',

    description:
      '我使用代码与 AI 围绕软件工程构建工具、产品与实验。',

    aboutIntro:
      '我是一名专注于全栈开发、AI 应用与独立产品构建的开发者。',
    aboutArchive:
      'Gavin Archive 是我记录所构建、所学与所想的地方。',

    focus: '当前方向',
    techStack: '技术栈',

    focusItems: {
      ai: 'AI 全栈工程',
      tools: '开发者工具',
      products: '独立产品',
      openSource: '开源',
    },

    frontend: '前端',
    backend: '后端',
    ai: 'AI',
    engineering: '工程能力',

    whatIBuild: '我构建什么',
    whatIBuildText: '开发者工具、AI 应用、独立产品与实验性软件。',
    howIWork: '我如何工作',
    howIWorkText: '先做最小可用版本，再通过真实项目验证想法，让代码和结果证明能力。',
    contact: '联系方式',
    emailLink: '邮箱',
    archiveText: '一个持续更新的开发者数字档案，记录所构建、所学与所想。',
  },

  projects: {
    title: '项目档案',
    subtitle: '正在构建与归档的项目',

    indexed: '已索引',
    caseFiles: '案例档案',
    indexPrefix: '索引 / {filter}',
    featuredCase: '精选案例 / {date}',
    caseFile: '案例档案 / {n}',
    caseFileHud: '案例档案 // {date}',
    caseFileDate: '案例档案 / {date}',
    caseVisual: '案例配图 / {date}',
    indexReturned: '索引返回 / 0',
    cardVisual: '{title} 封面',
    badgeFeatured: '精选',
    badgeArchive: '归档',
    caseToken: '案例 / {slug}',
    sysToken: '系统 / {date}',
    context: '背景',
    engineeringNotes: '工程笔记',
    noteToken: '笔记 / {n}',
    highlights: '亮点',
    description:
      '使用代码与 AI 构建的工具、产品与实验。',
    open: '打开 →',
    openFullCase: '打开完整案例',
    role: '角色',

    problem: '问题',
    solution: '解决方案',
    features: '功能',
    architecture: '架构',
    developmentLog: '开发日志',
    stack: '技术栈',
    tags: '标签',
    backToList: '← 返回项目列表',
    notFoundError: '项目错误',
    notFound: '未找到项目',

    all: '全部',
    ai: 'AI',
    web: 'Web',
    openSource: '开源',
    tools: '工具',
    experiment: '实验',

    empty: '暂无匹配项目',

    github: 'GitHub',
    demo: '在线演示',

    status: {
      IDEA: '想法',
      PROTOTYPE: '原型',
      BUILDING: '开发中',
      BETA: '测试版',
      RELEASED: '已发布',
      ARCHIVED: '已归档',
    },
  },

  archive: {
    token: '档案',
  },

  footer: {
    developerArchive: '开发者档案',
    builtWith: '使用 Vue 构建',
    email: '邮箱 ↗',
  },

  github: {
    title: 'GitHub',
    subtitle: '开源与代码活动',
    sourceNode: '源节点',
    online: '在线',
    statsRepos: '仓库',
    statsFollowers: '粉丝',
    statsFollowing: '关注',
    open: '打开 ↗',
    repositories: '公开仓库',
    unavailable: 'GitHub 暂时不可用',
    errors: {
      unavailable: 'GitHub 服务暂时不可用，请稍后重试。',
      network: '网络请求失败，请检查网络连接后重试。',
    },
    retry: '重试',
    noDescription: '暂无描述',
  },

  pulse: {
    title: '脉搏',
    description:
      '此刻正在研究什么、读什么、学什么、听什么，都记录在这里。',
    all: '全部',
    monitor: '脉搏.监视器',
    live: '实时',
    lastSync: '上次同步',
    feedPrefix: '信号 / {filter}',
    pulseToken: 'PULSE / {n}',
    statusLabel: '状态',
    open: '打开 ↗',
    emptyResults: '无信号 / 0 条结果',
    drawerEyebrow: '脉搏日志',
    relatedProject: '查看关联项目',
    categories: {
      RESEARCH: '研究',
      READING: '阅读',
      LEARNING: '学习',
      LISTENING: '音乐',
    },
    status: {
      ACTIVE: '进行中',
      ONGOING: '持续推进',
      PAUSED: '暂停',
      DONE: '完成',
    },
    fields: {
      source: '来源',
      progress: '当前进展',
      thought: '思考',
      nextStep: '下一步',
    },
  },

  blog: {
    title: '博客',
    subtitle: '技术文章、开发记录与思考',
    description: '技术文章、开发日志与构建过程。',
    querySearch: '查询 / 搜索',
    entriesIndexed: '{n} 条已索引',
    latestNote: '最新笔记 / {date}',
    queryReturned: '查询返回 / 0',
    fieldNote: '实地笔记 / {type} / {date}',
    fieldNoteVisual: '笔记配图 / {date}',
    noteToken: '笔记 / {date}',
    error: '博客错误',
    search: '搜索',
    clear: '清除',
    pinned: '置顶',
    searchPlaceholder: '搜索文章、标签…',
    minRead: '分钟阅读',
    read: '阅读文章',
    empty: '未找到匹配文章',
    backToList: '← 返回博客列表',
    relatedProjects: '关联项目',
    notFound: '文章不存在',
    type: {
      ARTICLE: '文章',
      DEVLOG: '开发日志',
      NOTE: '笔记',
    },
  },

  notFound: {
    eyebrow: '系统 / 路由未找到',
    title: '这里什么都没有。',
    description: '请求的档案模块不存在。',
    returnToIndex: '← 返回索引',
  },
}