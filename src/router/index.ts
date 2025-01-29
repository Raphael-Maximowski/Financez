import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DashBoard View',
      component: () => import('../views/DashBoardView.vue'),
    },
  ],
})

export default router
