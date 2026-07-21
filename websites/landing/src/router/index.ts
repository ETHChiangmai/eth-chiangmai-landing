import { createRouter, createWebHistory } from 'vue-router'
import Home2025 from '@/pages/Home2025.vue'
import PPT2026 from '@/pages/PPT2026.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: PPT2026 },
    { path: '/2025', component: Home2025 },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
