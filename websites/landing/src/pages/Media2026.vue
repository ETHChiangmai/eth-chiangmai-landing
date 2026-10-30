<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import LogoDark from '@/assets/logo-figma.png'
import LogoLight from '@/assets/logo-long.svg'

const navScrolled = ref(false)
function onScroll() { navScrolled.value = window.scrollY > 30 }

let prevTitle = ''
onMounted(() => {
  prevTitle = document.title
  document.title = 'Walk In: Spend This Winter in Chiang Mai | ETHChiangmai'
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  document.title = prevTitle
  window.removeEventListener('scroll', onScroll)
})

const sourceUrl = 'https://x.com/ETHChiangmai/status/2115121300930781243'

const crops = [
  {
    name: 'Censorship Resistance',
    text: "For a community that lives and works across borders, frozen accounts, blocked transfers and services cut off by one region's policy are everyday realities. We'll talk about block building after ePBS, how usable stablecoins and onchain payments are in daily life, and infrastructure that communities run themselves.",
  },
  {
    name: 'Open Source and Free',
    text: "An app that is closed source and depends on a single operator can't pass the walkaway test. About 80% of last year's ETHChiangmai output was published as open-source resources. We'll keep that going, with more time on open-source AI tools and public goods funding.",
  },
  {
    name: 'Privacy',
    text: "From Kohaku, the Ethereum Foundation's wallet privacy roadmap, to how communities can handle access, voting and reputation without exposing their members, to how health data in longevity research can be useful without being abused.",
  },
  {
    name: 'Security',
    text: 'AI-assisted audits, wallet and key recovery, post-quantum migration. Attacks are getting faster, so defense has to start at the first line of code.',
  },
]

const activities = [
  {
    icon: '🏠',
    title: 'Co-living',
    when: 'From Nov 11',
    paragraphs: [
      'ETHChiangmai starts with living together. Co-living opens on Nov 11, opening day. People cook, work and stay up late together at 4Seas. Plenty of collaborations start over dinner, and plenty of projects start in the kitchen at 2 a.m.',
    ],
    cta: { label: 'Book co-living', href: 'https://4seas.xyz/coliving' },
  },
  {
    icon: '🥥',
    title: 'Unconference',
    when: 'All season',
    paragraphs: [
      'There is no fixed speaker list or agenda. Topics come from whoever is in the room: a deep dive into protocol research, a privacy tools workshop, or an argument about community governance. Last year there were more than 70 sessions. Bring your questions, and bring your answers.',
    ],
  },
  {
    icon: '🇹🇭',
    title: 'Nomad Market',
    when: 'Nov 14–15 and Dec 25–26',
    paragraphs: [
      "We call it Southeast Asia's first crypto-themed market. Chiang Mai already has a mature market culture and one of the region's densest nomad populations. Nomad Market grafts builder projects, crypto payments and the nomad economy onto that scene, with tech demos, project booths, local vendors, live performances and blockchain exhibits. Local vendors, digital nomads and Web3 builders trade and make friends on the same street.",
      "For us, it's the most direct way to bring CROPS into the digital economy and local resilience. Onchain payments shouldn't live only in hackathon demos. They should buy you a coffee at the market.",
    ],
  },
  {
    icon: '🧘',
    title: 'Longevity Month',
    when: 'Opens Nov 30',
    paragraphs: [
      'Longevity and Ethereum go back further than many people think. In 2018, Vitalik donated $2.4 million in ETH to the SENS Research Foundation, calling aging "one of the greatest problems facing humanity." At Zuzalu in 2023, longevity was one of the first themes. Long-term work needs a body that lasts. Longevity Month brings health, science and lifestyle into the season, and health data privacy, transparent research funding and open sharing of results are all places where blockchains can genuinely help.',
    ],
  },
  {
    icon: '💻',
    title: 'Hackathon & Conference',
    when: 'Dec 26–27',
    paragraphs: [
      'ETHChiangmai @ Longevity Hackathon 2026, with a prize pool of over $10,000, built around two themes: CROPS and longevity. Detailed tracks are coming soon. Start forming a team during co-living and turn weeks of conversation into something that runs.',
    ],
  },
  {
    icon: '🎤',
    title: 'Longevity Summit',
    when: 'Dec 28',
    paragraphs: [
      'After the hackathon, the summit puts what the season built and figured out in front of a wider audience.',
    ],
  },
  {
    icon: '🎤',
    title: 'Cypherpunk Conference',
    when: 'Dec 30',
    paragraphs: [
      'One of Ethereum\'s roots is A Cypherpunk\'s Manifesto, written by Eric Hughes in 1993: "Privacy is necessary for an open society in the electronic age." More than thirty years later, that line still underlies CROPS. Like Longevity Month, the Cypherpunk Conference is a partner event held at 4Seas during the season. A conference on the cypherpunk spirit closes the season.',
    ],
  },
]
</script>

<template>
  <div class="min-h-screen" style="background: #faf0e8; color: #0d0918">

    <!-- NAV -->
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      :class="navScrolled ? 'bg-[#faf0e8]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'"
    >
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <RouterLink to="/">
          <img
            :src="navScrolled ? LogoDark : LogoLight"
            alt="ETHChiangmai"
            class="h-8 w-auto object-contain transition-opacity duration-300"
          />
        </RouterLink>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
          :class="navScrolled
            ? 'border-[#0d0918]/25 text-[#0d0918] hover:bg-[#0d0918] hover:text-white'
            : 'border-white/50 text-white hover:bg-white hover:text-[#0d0918]'"
        >
          <i class="fa-solid fa-arrow-left text-[10px]"></i> Back to Home
        </RouterLink>
      </div>
    </header>

    <!-- HERO -->
    <section class="relative min-h-[60vh] flex items-end justify-center overflow-hidden pb-16 pt-40" style="background: linear-gradient(160deg, #4a1230 0%, #0d0918 100%)">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20" style="background: radial-gradient(circle, #c8366b 0%, transparent 70%)" />
      </div>
      <div class="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p class="text-sm font-bold tracking-[0.22em] uppercase mb-5 gradient-text">✦ ETHChiangmai 2026 · The Non-Negotiables of Ethereum</p>
        <h1 class="font-display text-[2.6rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.05] text-white mb-6">
          Walk In: Spend This Winter in Chiang Mai
        </h1>
        <p class="text-base md:text-lg text-white/60 leading-relaxed">
          Nov 11 – Dec 30 · 4Seas Nimman, Chiang Mai
        </p>
      </div>
    </section>

    <!-- ARTICLE -->
    <article class="article max-w-2xl mx-auto px-6 py-16 md:py-20">

      <blockquote class="border-l-4 border-[#c8366b] pl-5 my-0 mb-12">
        <p class="font-display text-2xl md:text-3xl leading-snug text-[#0d0918]">"Ethereum itself must pass the walkaway test."</p>
        <footer class="mt-3 text-sm text-[#0d0918]/50">— Vitalik Buterin, January 2026</footer>
      </blockquote>

      <p>In 2026, one idea kept coming up in Ethereum: the walkaway test. Even if the Ethereum Foundation and the core developers disappeared tomorrow, the chain should keep running on its own.</p>
      <p>In its March mandate, the Foundation wrote that it is "not Ethereum's parent, ruler, or final authority." In a conversation in October, Vitalik said he measures Ethereum's progress by whether the community can defend its values without waiting for him to speak.</p>
      <p>Everyone is learning to take a step back.</p>
      <p class="lead">A protocol can learn to walk away. Someone still has to walk in.</p>
      <p>This winter, ETHChiangmai invites you to walk in: come to a city, stay a while, and work alongside people who believe in the same things, turning Ethereum's non-negotiable values into things people can see and use.</p>

      <h2>Ethereum is subtracting. Communities need to add.</h2>
      <p>In 2026, Ethereum is getting faster and lighter at the same time.</p>
      <p><strong>Faster:</strong> last December's Fusaka upgrade brought PeerDAS to mainnet. In February, Ethereum Foundation researcher Justin Drake published the Strawmap, a draft roadmap proposing seven hard forks through 2029. It would cut slot times from 12 seconds to single digits and finality from about 16 minutes to seconds, and its goals include a 1 gigagas-per-second L1, post-quantum cryptography and native private ETH transfers. On October 6, the next upgrade, Glamsterdam, went live on the Sepolia testnet, with mainnet expected in Q4. In the same year, Vitalik rewrote the L2 story: the idea of L2s as "branded shards" no longer makes sense, and Ethereum needs a new path.</p>
      <p><strong>Lighter:</strong> in March, the Ethereum Foundation published the EF Mandate. It names censorship resistance, open source, privacy and security (CROPS) as non-negotiable, writes the walkaway test into its charter, and treats the Foundation's own shrinking influence as a measure of success. In its own words, the Foundation was Ethereum's first steward; now it is one of many.</p>
      <p>This is a rare moment: a network worth hundreds of billions of dollars is handing itself back to its community.</p>
      <p>Once the subtraction is done, someone has to fill the space it leaves. Another center won't fill it. Many small, real places where people live and work will, a little at a time. We want Chiang Mai to be one of them.</p>

      <h2>In the age of AI, the non-negotiables are fewer, and they cost more</h2>
      <p>AI is what made this year's conversations urgent.</p>
      <p>In Singapore in October, Vitalik said AI is becoming both the biggest opportunity and the biggest risk for blockchains. It already helps Ethereum find bugs and prove complex cryptography, and it also makes attacks cheaper and faster. At the Network State Conference, one speaker pointed out that most cryptography is trusted only because human experts tried and failed to break it, and AI might need just a month. Balaji proposed that every chain needs a "defense budget" that pays AI to keep auditing its own code.</p>
      <p>Compute, data and models are concentrating in a handful of companies. Crypto's original, simple wish, that no single power should take full control of the digital world, is back on the table.</p>
      <p>That is why ETHChiangmai's theme this year is <em>The Non-Negotiables of Ethereum</em>. Discussions, workshops, the hackathon and the conference all center on CROPS:</p>

      <div class="not-prose grid gap-4 my-8">
        <div v-for="c in crops" :key="c.name" class="rounded-2xl p-6 border border-[#c8366b]/15 bg-[#c8366b]/[0.04]">
          <h3 class="font-display text-lg text-[#0d0918] mb-2">{{ c.name }}</h3>
          <p class="text-[15px] leading-relaxed text-[#0d0918]/70">{{ c.text }}</p>
        </div>
      </div>

      <h2>The best infrastructure is people living together</h2>
      <p>In spring 2023, Vitalik started Zuzalu in Montenegro: two months, a couple of hundred people living together, talking about cryptography, public goods, longevity and new forms of society. Three years later, pop-up cities are turning into permanent nodes. Edge City hosted more than 12,500 people in a year, Mu and Noma Collective are building permanent bases, and when Network School moved from Malaysia to Kazakhstan, more than 200 people followed.</p>
      <p>At this year's Network State Conference, Vitalik summed up decentralization as going "from one leader to many." Balaji said his goal is "minimum necessary Balaji": training a hundred community leaders so that he becomes less necessary.</p>
      <p>On the ground, these ideas become specific communities. A protocol's resilience comes from code. A community's resilience comes from people: when the place changes, or a platform or payment channel is cut off, they can still gather and keep working.</p>
      <p>4Seas grew this way. It started in Chiang Mai in 2023 as a crypto nomad community. Before Devcon in 2024, Chiang Mai hosted more than ten pop-up villages, and 4Seas became Zuzalu's permanent node in Thailand. In 2025 it hosted the first ETHChiangmai, and this year it opened the Zuzalu Library at its Nimman campus.</p>
      <p>We care about localism. Ethereum's vision has to land in a real city, where local vendors, students and neighbors can use it too. As AI moves more of our work online, a group of people in the same place for weeks, seeing each other every day, has become one of the scarcest things there is.</p>

      <h2>Why Chiang Mai</h2>
      <p>In Thai, "Chiang Mai" means "new city." King Mangrai founded it on the Ping River in 1296 as the capital of the Lanna Kingdom. More than seven centuries later, the old walls and moat still stand, the city has over 300 temples, and it is home to one of the densest digital nomad communities in Southeast Asia.</p>
      <p>November and December are Chiang Mai's best months. The rains are over and the cool season begins, with clear days and cool mornings and evenings. November brings Loy Krathong and Yi Peng, when lanterns float on the moat and fill the night sky. Watch the sunrise on Doi Suthep at the weekend, eat a bowl of khao soi at the Sunday Walking Street in the old city, then head back to a Nimman café and keep coding.</p>
      <p>Living costs are low, fiber is fast, the food is great, and most Asian cities are a few hours' flight away. Above all, the Ethereum community has been here for years and has never really left.</p>
      <p>Last winter, the first ETHChiangmai spent two months building here. More than 1,000 people came through, all 70+ Unconference sessions were proposed by participants, and in a week-long hackathon, 122 hackers from many countries submitted 44 projects.</p>
      <p>After Devcon 8, next stop: Chiang Mai. This year we're staying for another winter, a hot Southeast Asian winter.</p>

      <h2>What you can do in Chiang Mai this winter</h2>
      <div class="not-prose grid gap-5 my-8">
        <div v-for="a in activities" :key="a.title" class="rounded-2xl p-6 md:p-7 bg-white/60 border border-[#0d0918]/8" style="box-shadow: 0 4px 24px rgba(13,9,24,0.05)">
          <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
            <h3 class="font-display text-xl text-[#0d0918]"><span class="mr-2">{{ a.icon }}</span>{{ a.title }}</h3>
            <span class="text-xs font-bold tracking-[0.14em] uppercase text-[#c8366b]">{{ a.when }}</span>
          </div>
          <p v-for="(p, i) in a.paragraphs" :key="i" class="text-[15px] leading-relaxed text-[#0d0918]/70" :class="i > 0 ? 'mt-3' : ''">{{ p }}</p>
          <a
            v-if="a.cta"
            :href="a.cta.href"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-5 inline-flex items-center gap-2 rounded-full text-sm font-semibold px-5 py-2.5 text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style="background: linear-gradient(135deg, #c8366b 0%, #7632c8 100%); box-shadow: 0 4px 16px rgba(200,54,107,0.3)"
          >{{ a.cta.label }} <i class="fa-solid fa-arrow-right text-xs"></i></a>
        </div>
      </div>

      <h2>Walk in</h2>
      <p>Ethereum spent ten years learning not to depend on any one creator. In the next ten, it needs more places and more people, each holding the same line and building their own things.</p>
      <p>If you're a builder, bring the idea you never had time for. If you're a researcher, bring the question no one has dug into with you. If you're a creator, come and document what Ethereum went through this year. If you're just curious, wander the market and buy a coffee with ETH.</p>
      <p>More than seven hundred years ago, King Mangrai built a new city here. This winter, we want to build something new in it with you.</p>
      <p class="lead">Opening Nov 11 and running to the end of the year. See you in Chiang Mai.</p>

      <div class="not-prose mt-12 flex flex-wrap gap-3">
        <RouterLink
          to="/participate"
          class="inline-flex items-center gap-2 rounded-full text-sm font-semibold px-6 py-3 text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style="background: linear-gradient(135deg, #c8366b 0%, #7632c8 100%); box-shadow: 0 4px 16px rgba(200,54,107,0.3)"
        >Participate <i class="fa-solid fa-arrow-right text-xs"></i></RouterLink>
        <a
          :href="sourceUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full text-sm font-semibold px-6 py-3 border border-[#0d0918]/20 text-[#0d0918] hover:bg-[#0d0918] hover:text-white transition-colors"
        ><i class="fa-brands fa-x-twitter"></i> Read on X</a>
      </div>
    </article>

    <!-- FOOTER -->
    <footer class="gradient-dark text-[#faf0e8] border-t border-[#faf0e8]/6 mt-8">
      <div class="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <img :src="LogoLight" alt="ETHChiangMai" class="h-7 w-auto object-contain opacity-80" />
        <p class="text-xs text-[#faf0e8]/30">© 2026 ETHChiangMai. All rights reserved.</p>
        <div class="flex items-center gap-5 text-sm text-[#faf0e8]/55">
          <a href="https://t.me/ethchiangmai" target="_blank" rel="noopener noreferrer" class="hover:text-[#faf0e8] transition-colors">Telegram</a>
          <a href="https://twitter.com/ethchiangmai" target="_blank" rel="noopener noreferrer" class="hover:text-[#faf0e8] transition-colors">Twitter / X</a>
          <a href="mailto:info@ethchiangmai.com" class="hover:text-[#faf0e8] transition-colors">Email</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
.article > p {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: rgba(13, 9, 24, 0.78);
  margin: 0 0 1.25rem;
}
.article > p.lead {
  font-family: 'Fraunces', serif;
  font-size: 1.35rem;
  line-height: 1.5;
  color: #0d0918;
  margin: 2rem 0;
}
.article h2 {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: 1.75rem;
  line-height: 1.25;
  color: #0d0918;
  margin: 3.5rem 0 1.25rem;
}
.article strong {
  color: #0d0918;
}
.article a:not([class]) {
  color: #c8366b;
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
