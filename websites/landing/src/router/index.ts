import { createRouter, createWebHistory } from 'vue-router'
import Home2026 from '@/pages/Home2026.vue'
import Home2025 from '@/pages/Home2025.vue'
import HackathonVariantC from '@/pages/prototype/HackathonVariantC.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HackathonVariantC },
    { path: '/2025', component: Home2025 },
    { path: '/hero', component: Home2026 },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
