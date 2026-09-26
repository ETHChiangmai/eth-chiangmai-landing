import { createRouter, createWebHistory } from 'vue-router'
import Home2025 from '@/pages/Home2025.vue'
import PPT2026 from '@/pages/PPT2026.vue'
import Participate from '@/pages/Participate.vue'
import ResidentForm from '@/pages/ResidentForm.vue'
import SpeakerForm from '@/pages/SpeakerForm.vue'
import SponsorForm from '@/pages/SponsorForm.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: PPT2026 },
    { path: '/2025', component: Home2025 },
    { path: '/participate', component: Participate },
    { path: '/participate/resident', component: ResidentForm },
    { path: '/participate/speaker', component: SpeakerForm },
    { path: '/participate/sponsor', component: SponsorForm },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
