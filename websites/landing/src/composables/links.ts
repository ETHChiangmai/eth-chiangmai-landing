import squaresLogo from '@/assets/social/social-squares.svg'
import starLogo from '@/assets/social/social-start.svg'
import telegramLogo from '@/assets/social/social-telegram.svg'
import twitterLogo from '@/assets/social/social-twitter.svg'

export const useLinks = () => {
  return {
    speaker: {
      label: 'Apply to Speak',
      href: 'https://docs.google.com/forms/d/e/1FAIpQLSdu0mG2y10V_I2okKRw8J_mHGDcXkFN9U3V3xT2zbwaIgG3yA/viewform',
    },
    sponsor: {
      label: 'Apply to Sponsor',
      href: '/sponsor.pdf',
    },
    bootcamp: {
      label: 'Apply for Bootcamp',
      href: 'https://learnblockchain.cn/openspace/1',
    },
    hackathon: {
      label: 'Apply for Hackathon',
      href: 'https://ethchiangmai.devfolio.co/overview',
    },
    eventList: {
      label: 'Event List',
      href: 'https://app.sola.day/event/ethchiangmai2025',
    },
    social: [
      {
        label: 'Telegram',
        href: 'https://t.me/ethchiangmai',
        logo: telegramLogo,
      },
      {
        label: 'Twitter',
        href: 'https://twitter.com/ethchiangmai',
        logo: twitterLogo,
      },

      {
        label: 'Luma',
        href: 'https://luma.com/tkqtz5v7',
        logo: starLogo,
      },
      {
        label: 'Social Layer',
        href: 'https://app.sola.day/event/ethchiangmai2025',
        logo: squaresLogo,
      },
    ],
  }
}
