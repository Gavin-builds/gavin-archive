import {
  createRouter,
  createWebHistory,
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    // =========================
    // Landing
    // =========================
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: { titleKey: 'home.archive' },
    },

    // =========================
    // Developer Archive
    // =========================
    {
      path: '/archive',
      component: () => import('../layouts/ArchiveLayout.vue'),

      children: [
        {
          path: '',
          redirect: '/archive/profile',
        },

        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/Profile.vue'),
          meta: { titleKey: 'profile.title' },
        },

        {
          path: 'projects',
          name: 'projects',
          component: () => import('../views/Projects.vue'),
          meta: { titleKey: 'projects.title' },
        },

        {
          path: 'projects/:slug',
          name: 'project-detail',
          component: () => import('../views/ProjectDetail.vue'),
          meta: { titleKey: 'projects.title' },
        },

        {
          path: 'lab',
          name: 'lab',
          component: () => import('../views/Lab.vue'),
          meta: { titleKey: 'lab.title' },
        },

        {
          path: 'blog',
          name: 'blog',
          component: () => import('../views/Blog.vue'),
          meta: { titleKey: 'blog.title' },
        },

        {
          path: 'blog/:slug',
          name: 'blog-article',
          component: () => import('../views/BlogArticle.vue'),
          meta: { titleKey: 'blog.title' },
        },

        {
          path: 'github',
          name: 'github',
          component: () => import('../views/GitHub.vue'),
          meta: { titleKey: 'github.title' },
        },

        {
          path: 'about',
          name: 'about',
          component: () => import('../views/About.vue'),
          meta: { titleKey: 'about.title' },
        },
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
      meta: { titleKey: 'notFound.title' },
    },
  ],
})

export default router