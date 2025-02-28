import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'DashBoard View',
            component: () => import('../Views/DashBoardView.vue'),
        },
        {
            path: '/transactions/:typeTransaction',
            name: 'Metrics View',
            component: () => import('../Views/TransactionsMetrics.vue')
        }
    ],
})


export default router