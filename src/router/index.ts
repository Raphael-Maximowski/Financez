import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DashBoard View',
      component: () => import('../views/DashBoardView.vue'),
    },
    {
      path: '/transactions',
      name: 'Transactions Management View',
      component: () => import('../views/TransactionsControl/TransactionsControlView.vue'),
      children: [
        {
          path: 'expenses',
          name: 'Expenses Management View',
          component: () => import('../views/TransactionsControl/ExpensesControlView.vue')
        },
        {
          path: 'incomes',
          name: 'Incomes Management View',
          component: () => import('../views/TransactionsControl/IncomesControlView.vue')
        },
        {
          path: 'total-balance',
          name: 'Total Balance Management View',
          component: () => import('../views/TransactionsControl/TotalBalanceControl.vue')
        },

      ]
    }
  ],
})

export default router
