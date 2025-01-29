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
      path: '/transactions',
      name: 'Transactions View',
      component: () => import('../views/Transactions.vue'),
      children: [
        {
          path: 'expenses',
          name: 'Expenses View',
          component: () => import('../views/Expenses.vue')
        },
        {
          path: 'incomes',
          name: 'Incomes View',
          component: () => import('../views/Incomes.vue')
        },
      ]
    },
    {
      path: '/savings',
      name: 'Savings View',
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
