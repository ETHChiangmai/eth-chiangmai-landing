import { createRouter, createWebHistory } from 'vue-router'
import Home2025 from '@/pages/Home2025.vue'
import Media2026 from '@/pages/Media2026.vue'
import MediaHackathon2026 from '@/pages/MediaHackathon2026.vue'
import MediaIndex from '@/pages/MediaIndex.vue'
import NomadMarket from '@/pages/NomadMarket.vue'
import PPT2026 from '@/pages/PPT2026.vue'
import Participate from '@/pages/Participate.vue'
import SpeakerForm from '@/pages/SpeakerForm.vue'
import SponsorForm from '@/pages/SponsorForm.vue'
import TravelGuide from '@/pages/TravelGuide.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: PPT2026 },
    { path: '/2025', component: Home2025 },
    { path: '/media', component: MediaIndex },
    { path: '/media/2026', component: Media2026 },
    { path: '/media/2026/hackathon', component: MediaHackathon2026 },
    { path: '/nomad-market', component: NomadMarket },
    { path: '/participate', component: Participate },
    { path: '/participate/resident', redirect: '/participate' },
    { path: '/participate/speaker', component: SpeakerForm },
    { path: '/participate/sponsor', component: SponsorForm },
    { path: '/travel', component: TravelGuide },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
