export default {
  common: {
    online: '系统在线',
    offline: '系统离线',
    loading: '加载中',
    back: '返回',
    enter: '进入',
    view: '查看',
    open: '打开',
    close: '关闭',
    language: '语言',
    chinese: '中文',
    english: 'English',
    current: '当前',
    lightMode: '切换浅色模式',
    darkMode: '切换深色模式',
  },

  nav: {
    home: '首页',
    profile: '个人档案',
    projects: '项目',
    projectDetail: '项目详情',
    lab: '实验室',
    blog: '博客',
    article: '文章',
    github: 'GitHub',
    about: '关于',
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
    experiments: '实验',
    activeCore: '当前核心',

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
    sectionLabel: '/ 01 个人档案',

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
  },

  projects: {
    title: '项目档案',
    subtitle: '正在构建与归档的项目',

    sectionLabel: '/ 02 项目档案',
    eyebrow: '/ 02 案例档案',
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
    countLabel: '项目',
    cardLabel: '项目',
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

    viewProject: '查看项目',
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
    title: '开发者档案',
    system: 'DEVELOPER ARCHIVE',
    status: 'SYSTEM ONLINE',
    headerSubtitle: '开发者操作系统 / 个人档案',
    token: '档案',
  },

  sidebar: {
    system: '系统',
    work: '工作',
    log: '日志',
    network: '网络',
    archiveIndex: '档案索引',
    modules: '模块',
  },

  footer: {
    developerArchive: '开发者档案',
    builtWith: '使用 Vue 构建',
    email: '邮箱 ↗',
  },

  about: {
    title: '关于',
    subtitle: '关于 Gavin Archive',

    eyebrow: '/ 06 系统信息',
    contact: '联系方式',
    emailLink: '邮箱',
    archive: '档案',

    description:
      'Gavin Archive 是一个持续更新的开发者数字档案，用来记录项目、实验、文章、代码与开发过程。',
    whatIBuild: '我构建什么',
    whatIBuildText: '开发者工具、AI 应用、独立产品与实验性软件。',
    howIWork: '我如何工作',
    howIWorkText: '先做最小可用版本，再通过真实项目验证想法，让代码和结果证明能力。',
    now: 'NOW',
    currentlyBuilding: '正在构建',
    buildingValue: 'Gavin Archive / AI Developer Tools',
    currentlyLearning: '正在学习',
    learningValue: 'AI Engineering / System Design / English',
    exploring: '正在探索',
    exploringValue: 'Open Source / Indie Development / Japan',
    archiveText: '一个持续更新的开发者数字档案。',
  },

  github: {
    title: 'GitHub',
    subtitle: '开源与代码活动',
    sectionLabel: '/ 05 网络节点',
    sourceNode: '源节点',
    online: '在线',
    statsRepos: '仓库',
    statsFollowers: '粉丝',
    statsFollowing: '关注',
    open: '打开 ↗',
    repositories: '公开仓库',
    unavailable: 'GitHub 暂时不可用',
    retry: '重试',
    noDescription: '暂无描述',
  },

  lab: {
    title: '实验记录',
    subtitle: '实验、研究与未完成想法',
    description: '记录正在验证、尚未成熟或最终失败的想法。',
    countLabel: '实验',
    all: '全部',
    relatedProject: '查看关联项目',
    empty: '暂无实验',
    eyebrow: '/ 03 研究笔记',
    runtime: '实验室.运行时',
    active: '运行中',
    cycle: '观察 → 迭代 → 归档',
    notebookPrefix: '笔记 / {filter}',
    expToken: '实验 / {n}',
    statusLabel: '状态',
    open: '打开 ↗',
    emptyResults: '无实验 / 0 条结果',
    drawerEyebrow: '实验笔记',
    fields: {
      question: '问题',
      hypothesis: '假设',
      observation: '观察',
      conclusion: '结论',
    },
    status: {
      EXPERIMENT: '实验中',
      TESTING: '测试中',
      PROMISING: '有潜力',
      PAUSED: '暂停',
      FAILED: '失败',
      ARCHIVED: '已归档',
    },
  },

  blog: {
    title: '博客',
    subtitle: '技术文章、开发记录与思考',
    description: '技术文章、开发日志与构建过程。',
    eyebrow: '/ 04 开发日志',
    querySearch: '查询 / 搜索',
    entriesIndexed: '{n} 条已索引',
    latestNote: '最新笔记 / {date}',
    queryReturned: '查询返回 / 0',
    fieldNote: '实地笔记 / {type} / {date}',
    fieldNoteVisual: '笔记配图 / {date}',
    noteToken: '笔记 / {date}',
    error: '博客错误',
    search: '搜索',
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