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
        },

        {
          path: 'projects',
          name: 'projects',
          component: () => import('../views/Projects.vue'),
        },

        {
          path: 'projects/:slug',
          name: 'project-detail',
          component: () => import('../views/ProjectDetail.vue'),
        },

        {
          path: 'lab',
          name: 'lab',
          component: () => import('../views/Lab.vue'),
        },

        {
          path: 'blog',
          name: 'blog',
          component: () => import('../views/Blog.vue'),
        },

        {
          path: 'blog/:slug',
          name: 'blog-article',
          component: () => import('../views/BlogArticle.vue'),
        },

        {
          path: 'github',
          name: 'github',
          component: () => import('../views/GitHub.vue'),
        },

        {
          path: 'about',
          name: 'about',
          component: () => import('../views/About.vue'),
        },
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router