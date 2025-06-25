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
            component: () => import('../Views/TransactionsOverviewView.vue')
        },
        {
            path: '/savings',
            name: 'Savings View',
            component: () => import('../Views/TransactionsOverviewView.vue')
        },
        {
            path: '/reports',
            name: 'Reports View',
            component: () => import('../Views/ReportsView.vue')
        },
    ],
})


export default router