# Gavin Archive

> A cyberpunk developer archive for projects, experiments, technical writing and open-source work.

**Gavin Archive** is my personal Developer OS / digital archive.

Instead of presenting myself as a static portfolio, I use this project to document:

- what I build
- what I am experimenting with
- what I am learning
- how my projects evolve
- where the source code lives

The goal is to turn a personal website into a long-term, searchable record of development work.

## Live Structure

```text
Gavin Archive
│
├── Home
│   └── Landing / system entry
│
└── Archive
    ├── Profile
    ├── Projects
    │   └── Project Detail
    ├── Lab
    ├── Blog
    │   └── Article
    ├── GitHub
    └── About
```

## Current Features

- Cyberpunk-inspired Developer OS interface
- Shared archive layout with header, sidebar and footer
- Project archive with category filtering
- Project detail pages with problem / solution / features / architecture / development log
- Experimental Lab for prototypes and unfinished ideas
- Blog archive with search
- Individual article pages
- GitHub public repository integration
- Chinese / English interface switching
- Responsive desktop and mobile layouts
- Route-based code splitting through Vue Router
- Custom loading and error states for external data

## Tech Stack

```text
Vue 3
TypeScript
Vite
Vue Router
Vue I18n
CSS / Custom Design System
GitHub REST API
```

## Design Direction

The visual direction is intentionally somewhere between:

```text
Developer Tool
      +
Terminal / HUD
      +
Digital Archive
      +
Cyberpunk
```

The interface uses a restrained cyberpunk language rather than turning the site into a game UI.

Core visual elements include:

- cyan / purple accent system
- monospace metadata
- grid backgrounds
- subtle glow
- thin technical borders
- system status indicators
- large editorial typography
- lightweight interaction and motion

The goal is **developer product first, cyberpunk second**.

## Project Structure

```text
src/
├── components/
│   ├── archive/
│   └── projects/
│
├── composables/
│   └── useGitHub.ts
│
├── data/
│   ├── blog.ts
│   ├── lab.ts
│   └── projects.ts
│
├── layouts/
│   └── ArchiveLayout.vue
│
├── locales/
│   ├── en-US.ts
│   ├── zh-CN.ts
│   └── index.ts
│
├── router/
│   └── index.ts
│
├── types/
│   ├── blog.ts
│   ├── lab.ts
│   └── project.ts
│
├── views/
│   ├── Home.vue
│   ├── Profile.vue
│   ├── Projects.vue
│   ├── ProjectDetail.vue
│   ├── Lab.vue
│   ├── Blog.vue
│   ├── BlogArticle.vue
│   ├── GitHub.vue
│   ├── About.vue
│   └── NotFound.vue
│
├── App.vue
├── main.ts
└── style.css
```

## Local Development

Requirements:

- Node.js 20+
- npm

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Content Model

The current MVP keeps content in TypeScript data files so that the application can evolve quickly without introducing a CMS too early.

### Projects

`src/data/projects.ts`

Project data contains fields such as:

```ts
{
  slug,
  title,
  description,
  status,
  categories,
  tags,
  stack,
  featured,
  github,
  demo,
  date,
  problem,
  solution,
  features,
  architecture,
  developmentLog,
}
```

### Lab

`src/data/lab.ts`

Lab experiments use a dedicated lifecycle:

```text
EXPERIMENT
TESTING
PROMISING
PAUSED
FAILED
ARCHIVED
```

A Lab entry can also reference a related project.

### Blog

`src/data/blog.ts`

The MVP currently uses structured post data. Markdown content is planned as a later content-layer upgrade rather than a requirement for the first usable release.

## Routing

```text
/

/archive
/archive/profile
/archive/projects
/archive/projects/:slug
/archive/lab
/archive/blog
/archive/blog/:slug
/archive/github
/archive/about

/* → 404 */
```

Archive pages are mounted through the shared `ArchiveLayout`.

## GitHub Integration

The GitHub page currently uses the public GitHub API to load:

- public repository count
- followers
- following
- recently updated public repositories
- repository language
- stars
- forks
- last updated date

The current account is:

```text
https://github.com/Gavin-builds
```

No private GitHub token is required by the current implementation.

## Internationalization

The project currently supports:

```text
中文
English
```

Translations are stored in:

```text
src/locales/zh-CN.ts
src/locales/en-US.ts
```

The selected locale is persisted in `localStorage`.

## Development Philosophy

### 1. Build the product before the infrastructure

The archive experience comes first. PWA, analytics, monitoring and other infrastructure should not block the core product.

### 2. Content should remain easy to update

Projects, Lab experiments and articles are treated as content rather than hard-coded page layouts.

### 3. The website is itself a portfolio project

Architecture, code quality, documentation and Git history are all part of the final work.

### 4. Avoid decorative complexity

Animations and cyberpunk effects should support hierarchy and interaction rather than compete with the content.

### 5. Keep the archive honest

Experiments can fail. Projects can pause. Work in progress is part of the archive instead of something that needs to be hidden.

## Roadmap

### v0.1 — Developer Archive

- [x] Landing page
- [x] Archive shell
- [x] Profile
- [x] Projects
- [x] Project detail
- [x] Lab
- [x] Blog
- [x] Article pages
- [x] GitHub integration
- [x] About / Now
- [x] Chinese / English
- [x] Responsive layout
- [x] 404

### v0.2 — Intelligent Archive

- [ ] Command Palette
- [ ] Global search
- [ ] Project / Lab / Blog relationships
- [ ] Markdown content layer
- [ ] Better article reading experience
- [ ] Project timeline
- [ ] Architecture visualization

### v0.3 — Productized Archive

- [ ] PWA
- [ ] RSS
- [ ] Privacy-friendly analytics
- [ ] Error monitoring
- [ ] Automated OG images
- [ ] Improved content validation
- [ ] Testing / CI hardening

Advanced 3D, Live2D, audio and other experimental interactions are intentionally lower priority.

## Inspired By

The interface direction is influenced by developer dashboards, terminal-style interfaces and cyberpunk visual design.

The project may take visual inspiration from existing websites, but its implementation and architecture are written independently.

## License

This repository is released under the [MIT License](./LICENSE).

Third-party libraries, fonts, images, icons, music and other assets may be distributed under their own licenses. Their licenses remain separate from this project's license.

## Author

**Gavin**

AI Full-Stack Engineer

- GitHub: https://github.com/Gavin-builds
- Email: lejob@qq.com

---

> Build. Experiment. Archive.
