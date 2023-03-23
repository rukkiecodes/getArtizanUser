// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // User Routes
  {
    path: '/',
    component: () => import('@/layouts/auth/Default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/auth/Signup.vue'),
      },
      {
        path: 'signin',
        component: () => import('@/views/auth/Signin.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/App.vue'),
      },
      {
        path: 'overview',
        component: () => import('@/views/App.vue'),
      },
      {
        path: 'bookings',
        component: () => import('@/views/Bookings.vue'),
      },
      {
        path: 'profile',
        component: () => import('@/views/Profile.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
