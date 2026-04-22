<script lang="ts" setup>
import logo706 from '@/assets/tribe/706.svg'
import alt from '@/assets/tribe/alt.svg'
import attikastudio from '@/assets/tribe/attikastudio.svg'
import bLogo from '@/assets/tribe/b.svg'
import camt from '@/assets/tribe/camt.svg'
import cmu from '@/assets/tribe/cmu.svg'
import cmuba from '@/assets/tribe/cmuba.svg'
import econ from '@/assets/tribe/con1.svg'
import coset from '@/assets/tribe/coset.svg'
import dali from '@/assets/tribe/dali.svg'
import ecfnetwork from '@/assets/tribe/ecfnetwork.svg'
import ercref from '@/assets/tribe/ercref.svg'
import ethereumsingapore from '@/assets/tribe/ethereumsignapore.svg'
import ethkl from '@/assets/tribe/ethkl.svg'
import ethpadthai from '@/assets/tribe/ethpadthai.svg'
import ethstorage from '@/assets/tribe/ethstorage.svg'
import ethtao from '@/assets/tribe/ethtao.svg'
import ethtokyo from '@/assets/tribe/ethtokyo.svg'
import gcc from '@/assets/tribe/gcc.svg'
import happytogethercinema from '@/assets/tribe/happytogethercinema.svg'
import icdi from '@/assets/tribe/icdi.svg'
import keymap from '@/assets/tribe/keymap.svg'
import logos from '@/assets/tribe/logos.svg'
import mask from '@/assets/tribe/mask.svg'
import meshroom from '@/assets/tribe/meshroom.svg'
import namefi from '@/assets/tribe/namefi.svg'
import nomadlibrary from '@/assets/tribe/nomadlibrary.svg'
import nowhere from '@/assets/tribe/nowhere.svg'
import openbuild from '@/assets/tribe/openbuild.svg'
import openhub from '@/assets/tribe/openhub.svg'
import publicworks from '@/assets/tribe/publicworks.svg'
import seapunkstudios from '@/assets/tribe/seapunkstudios.svg'
import seedao from '@/assets/tribe/seedao.svg'
import shanhaiwoo from '@/assets/tribe/shanhaiwoo.svg'
import sociallayer from '@/assets/tribe/sociallayer.svg'
import spiderpool from '@/assets/tribe/spiderpool.svg'
import themu from '@/assets/tribe/themu.svg'
import uncommons from '@/assets/tribe/uncommons.svg'
import uniserv from '@/assets/tribe/uniserv.svg'
import uniswap from '@/assets/tribe/uniswap.svg'
import webbuilder from '@/assets/tribe/webbuilder.svg'
import zuzalu from '@/assets/tribe/zuzalu.svg'

const tribe = [
  // Row 1
  zuzalu,
  uniswap,
  ecfnetwork,
  bLogo,
  cmu,
  gcc,
  // Row 2
  mask,
  uncommons,
  publicworks,
  spiderpool,
  seapunkstudios,
  sociallayer,
  // Row 3
  ethstorage,
  nomadlibrary,
  namefi,
  logo706,
  ethereumsingapore,
  ethpadthai,
  // Row 4
  icdi,
  uniserv,
  econ,
  cmuba,
  camt,
  logos,
  // Row 5
  ethkl,
  webbuilder,
  happytogethercinema,
  alt,
  seedao,
  ethtokyo,
  // Row 6
  ethtao,
  dali,
  coset,
  themu,
  nowhere,
  openhub,
  // Row 7
  keymap,
  meshroom,
  ercref,
  attikastudio,
  shanhaiwoo,
  openbuild,
]
</script>
<template>
  <div class="ethcontainer flex flex-col p-8 lg:p-16 gap-16 bg-[#4068FF] rounded-3xl">
    <div class="text-center">
      <div class="font-kodchasan font-bold text-4xl">Tribe</div>
    </div>
    <div
      class="grid grid-cols-[repeat(2,auto)] md:grid-cols-[repeat(3,auto)] lg:grid-cols-[repeat(4,auto)] xl:grid-cols-[repeat(5,auto)] 2xl:grid-cols-[repeat(6,auto)] place-items-center gap-4 w-full py-8"
    >
      <img v-for="(logo, index) in tribe" :key="index" :src="logo" class="h-[60px]" />
    </div>
  </div>
</template>
