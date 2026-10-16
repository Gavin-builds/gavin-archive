export default {
  common: {
    loading: 'LOADING',
    close: 'CLOSE',
    menu: 'MENU',
    lightMode: 'SWITCH TO LIGHT MODE',
    darkMode: 'SWITCH TO DARK MODE',
  },

  nav: {
    profile: 'PROFILE',
    projects: 'PROJECTS',
    pulse: 'PULSE',
    blog: 'BLOG',
    github: 'GITHUB',
  },

  home: {
    archive: 'GAVIN ARCHIVE',
    system: 'DEVELOPER OPERATING SYSTEM',
    identity: 'IDENTITY',
    role: 'ROLE',
    stack: 'STACK',
    mode: 'MODE',

    identityValue: 'GAVINLIN',
    roleValue: 'AI ENGINEER',
    stackValue: 'VUE / NODE',
    modeValue: 'BUILDING',

    archiveLabel: 'ARCHIVE',
    year: 'YEAR',
    pulse: 'PULSE',
    activeCore: 'CURRENT PROJECT',

    initializing: '// INITIALIZING',
    archiveId: 'ARCHIVE_001',

    engineer: 'AI FULL-STACK ENGINEER',

    description:
      'Building tools, products and experiments with code and AI.',

    enterArchive: 'ENTER ARCHIVE',

    footer: {
      slogan: 'BUILD · EXPERIMENT · ARCHIVE',
      version: 'v0.1.0',
    },
  },

  transition: {
    entering: 'JACKING INTO PROFILE',
    accessGranted: 'ACCESS GRANTED',
    uplink: 'SYS::UPLINK > ARCHIVE/PROFILE',
  },

  profile: {
    title: 'PROFILE',
    subtitle: 'ABOUT ME',

    role: 'AI FULL-STACK ENGINEER',

    description:
      'I build tools, products and experiments around software engineering and AI.',

    aboutIntro:
      'I am a developer focused on full-stack development, AI applications and independent product building.',
    aboutArchive:
      'Gavin Archive is where I document what I build, what I learn and how I think about software.',

    focus: 'CURRENT FOCUS',
    techStack: 'TECH STACK',

    focusItems: {
      ai: 'AI Full-Stack Engineering',
      tools: 'Developer Tools',
      products: 'Independent Products',
      openSource: 'Open Source',
    },

    frontend: 'FRONTEND',
    backend: 'BACKEND',
    ai: 'AI',
    engineering: 'ENGINEERING',

    whatIBuild: 'WHAT I BUILD',
    whatIBuildText: 'Developer tools, AI applications, independent products and technical experiments.',
    howIWork: 'HOW I WORK',
    howIWorkText: 'Start with the smallest useful version, validate ideas through real projects, and let the work speak.',
    contact: 'CONTACT',
    emailLink: 'Email',
    archiveText: 'A living developer archive documenting what I build, learn and think about.',
  },

  projects: {
    title: 'PROJECT CASE FILES',
    subtitle: 'Things I am building and archiving',

    indexed: 'INDEXED',
    caseFiles: 'CASE FILES',
    indexPrefix: 'INDEX / {filter}',
    featuredCase: 'FEATURED CASE / {date}',
    caseFile: 'CASE FILE / {n}',
    caseFileHud: 'CASE FILE // {date}',
    caseFileDate: 'CASE FILE / {date}',
    caseVisual: 'CASE VISUAL / {date}',
    indexReturned: 'INDEX RETURNED / 0',
    cardVisual: '{title} visual',
    badgeFeatured: 'FEATURED',
    badgeArchive: 'ARCHIVE',
    caseToken: 'CASE / {slug}',
    sysToken: 'SYS / {date}',
    context: 'CONTEXT',
    engineeringNotes: 'ENGINEERING NOTES',
    noteToken: 'NOTE / {n}',
    highlights: 'HIGHLIGHTS',
    description:
      'Tools, products and experiments built with code and AI.',
    open: 'OPEN →',
    openFullCase: 'OPEN FULL CASE',
    role: 'ROLE',

    problem: 'PROBLEM',
    solution: 'SOLUTION',
    features: 'FEATURES',
    architecture: 'ARCHITECTURE',
    developmentLog: 'DEVELOPMENT LOG',
    stack: 'STACK',
    tags: 'TAGS',
    backToList: '← BACK TO PROJECTS',
    notFoundError: 'PROJECT ERROR',
    notFound: 'PROJECT NOT FOUND',

    all: 'ALL',
    ai: 'AI',
    web: 'WEB',
    openSource: 'OPEN SOURCE',
    tools: 'TOOLS',
    experiment: 'EXPERIMENT',

    empty: 'NO MATCHING PROJECTS',

    github: 'GITHUB',
    demo: 'LIVE DEMO',

    status: {
      IDEA: 'IDEA',
      PROTOTYPE: 'PROTOTYPE',
      BUILDING: 'BUILDING',
      BETA: 'BETA',
      RELEASED: 'RELEASED',
      ARCHIVED: 'ARCHIVED',
    },
  },

  archive: {
    token: 'ARCHIVE',
  },

  footer: {
    developerArchive: 'DEVELOPER ARCHIVE',
    builtWith: 'BUILT WITH VUE',
    email: 'EMAIL ↗',
  },

  github: {
    title: 'GITHUB',
    subtitle: 'Open source and code activity',
    sourceNode: 'SOURCE NODE',
    online: 'ONLINE',
    statsRepos: 'REPOSITORIES',
    statsFollowers: 'FOLLOWERS',
    statsFollowing: 'FOLLOWING',
    open: 'OPEN ↗',
    repositories: 'PUBLIC REPOSITORIES',
    unavailable: 'GITHUB UNAVAILABLE',
    errors: {
      unavailable: 'GitHub service is temporarily unavailable, please try again later.',
      network: 'Network request failed, check your connection and try again.',
    },
    retry: 'RETRY',
    noDescription: 'No description',
  },

  pulse: {
    title: 'PULSE',
    description:
      'What I am researching, reading, learning and listening to right now, all in one place.',
    all: 'ALL',
    monitor: 'PULSE.MONITOR',
    live: 'LIVE',
    lastSync: 'LAST SYNC',
    feedPrefix: 'FEED / {filter}',
    pulseToken: 'PULSE / {n}',
    statusLabel: 'STATUS',
    open: 'OPEN ↗',
    emptyResults: 'NO SIGNAL / 0 RESULTS',
    drawerEyebrow: 'PULSE LOG',
    relatedProject: 'OPEN RELATED CASE',
    categories: {
      RESEARCH: 'RESEARCH',
      READING: 'READING',
      LEARNING: 'LEARNING',
      LISTENING: 'MUSIC',
    },
    status: {
      ACTIVE: 'ACTIVE',
      ONGOING: 'ONGOING',
      PAUSED: 'PAUSED',
      DONE: 'DONE',
    },
    fields: {
      source: 'SOURCE',
      progress: 'CURRENT PROGRESS',
      thought: 'THOUGHT',
      nextStep: 'NEXT STEP',
    },
  },

  blog: {
    title: 'BLOG',
    subtitle: 'Technical articles, development logs and thoughts',
    description: 'Technical articles, development logs and the process behind building.',
    querySearch: 'QUERY / SEARCH',
    entriesIndexed: '{n} ENTRIES INDEXED',
    latestNote: 'LATEST NOTE / {date}',
    queryReturned: 'QUERY RETURNED / 0',
    fieldNote: 'FIELD NOTE / {type} / {date}',
    fieldNoteVisual: 'FIELD NOTE VISUAL / {date}',
    noteToken: 'NOTE / {date}',
    error: 'BLOG ERROR',
    search: 'SEARCH',
    clear: 'CLEAR',
    pinned: 'PINNED',
    searchPlaceholder: 'Search articles, tags…',
    minRead: 'MIN READ',
    read: 'READ ARTICLE',
    empty: 'NO MATCHING ARTICLES',
    backToList: '← BACK TO BLOG LIST',
    relatedProjects: 'RELATED PROJECTS',
    notFound: 'ARTICLE NOT FOUND',
    type: {
      ARTICLE: 'ARTICLE',
      DEVLOG: 'DEVLOG',
      NOTE: 'NOTE',
    },
  },

  notFound: {
    eyebrow: 'SYSTEM / ROUTE NOT FOUND',
    title: 'Nothing here.',
    description: 'The requested archive module does not exist.',
    returnToIndex: '← RETURN TO INDEX',
  },
}