import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DashBoard View',
      component: () => import('../views/DashBoard.vue'),
    },
    {
      path: '/expenses',
      name: 'Expenses View',
      component: () => import('../views/Expenses.vue')
    },
    {
      path: '/investment',
      name: 'Investment View',
      component: () => import('../views/Investment.vue')
    },
    {
      path: '/reports',
      name: 'Reports View',
      component: () => import('../views/Reports.vue')
    }
  ],
})

export default router
