<script lang="ts" setup>
import fourseas from '@/assets/sponsors/4seas.svg'
import aevir from '@/assets/sponsors/aevir.svg'
import bcgood from '@/assets/sponsors/bcgood.svg'
import binanceth from '@/assets/sponsors/binanceth.svg'
import ecf from '@/assets/sponsors/ecfnetwork.svg'
import gcc from '@/assets/sponsors/gcc.svg'
import nervos from '@/assets/sponsors/nervosfoundation.svg'
import primus from '@/assets/sponsors/primus.svg'
import uniswap from '@/assets/sponsors/uniswaplabs.svg'
import ypt from '@/assets/sponsors/ypt.svg'

const sponsors = [
  {
    name: '4Seas',
    href: 'https://www.4seas.xyz',
    logo: fourseas,
  },
  {
    name: 'ECF',
    href: 'https://ecf.network',
    logo: ecf,
  },
  {
    name: 'YPT',
    href: 'https://ypt.com',
    logo: ypt,
  },
  {
    name: 'Aevir',
    href: 'https://aevir.org',
    logo: aevir,
  },
  {
    name: 'Uniswap Labs',
    href: 'https://uniswap.org',
    logo: uniswap,
  },
  {
    name: 'GCC',
    href: 'https://www.gccofficial.org',
    logo: gcc,
  },
  {
    name: 'Binance Thailand',
    href: 'https://www.binance.th/en',
    logo: binanceth,
  },
  // {
  //   name: 'Fetch.ai',
  //   href: 'https://fetch.ai',
  //   logo: fetchai,
  // },
  // {
  //   name: 'Picwe',
  //   href: 'https://picwe.org',
  //   logo: picwe,
  // },
  // {
  //   name: 'Mask Network',
  //   href: 'https://mask.io/',
  //   logo: mask,
  // },
  // {
  //   name: 'OpenHub',
  //   href: 'https://openhub.co.th',
  //   logo: openhub,
  // },
  {
    name: 'Nervos Foundation',
    href: 'https://www.nervos.org',
    logo: nervos,
  },
  {
    name: 'Primus',
    href: 'https://primuslabs.xyz/',
    logo: primus,
  },
  {
    name: 'Blockchain for Good Alliance',
    href: 'https://chainforgood.org/',
    logo: bcgood,
  },
]
</script>
<template>
  <div class="ethcontainer flex flex-col p-8 lg:p-16 gap-16 bg-[#0536B6] rounded-[24px]">
    <div class="text-center">
      <div class="font-kodchasan font-bold text-4xl">Sponsors</div>
    </div>
    <div
      class="flex flex-col md:flex-row flex-wrap items-center justify-around gap-8 sm:gap-16 w-full max-w-[1100px] mx-auto pb-16"
    >
      <a
        v-for="sponsor in sponsors"
        :href="sponsor.href"
        :key="sponsor.name"
        class="h-[50px] lg:h-[75px]"
      >
        <img :src="sponsor.logo" :alt="sponsor.name" class="h-full" />
      </a>
    </div>
  </div>
</template>
