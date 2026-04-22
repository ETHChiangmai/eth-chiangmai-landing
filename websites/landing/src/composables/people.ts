import andy from '@/assets/instructors/instructor-andy.png'
import tiny from '@/assets/instructors/instructor-tiny.png'
import andrej from '@/assets/speakers/speaker-andrej.png'
import angela from '@/assets/speakers/speaker-angela.jpg'
import frank from '@/assets/speakers/speaker-frank.png'
import guo from '@/assets/speakers/speaker-guo.png'
import hazel from '@/assets/speakers/speaker-hazel.png'
import jiang from '@/assets/speakers/speaker-jiang.jpg'
import kenway from '@/assets/speakers/speaker-kenway.png'
import kurt from '@/assets/speakers/speaker-kin.png'
import kin from '@/assets/speakers/speaker-kurt.png'
import leo from '@/assets/speakers/speaker-leo.png'
import michel from '@/assets/speakers/speaker-michel.png'
import nicholas from '@/assets/speakers/speaker-nicholas.png'
import pang from '@/assets/speakers/speaker-pang.png'
import qj from '@/assets/speakers/speaker-qj.png'
import sam from '@/assets/speakers/speaker-sam.png'
import scott from '@/assets/speakers/speaker-scott.png'
import victor from '@/assets/speakers/speaker-victor.png'
import yis from '@/assets/speakers/speaker-yis.png'
import yu from '@/assets/speakers/speaker-yu.png'
import zhou from '@/assets/speakers/speaker-zhou.png'

export const usePeople = () => {
  const speakers = [
    {
      name: 'Angela',
      photo: angela,
      description: 'New Week in Ethereum News',
    },
    {
      name: 'Andrej Berlin',
      photo: andrej,
      description: 'UX/HCI Researcher & Organizational Designer',
    },
    {
      name: 'Frank',
      photo: frank,
      description: 'Developer Relations of Chain Link',
    },
    {
      name: 'Guo Yu',
      photo: guo,
      description: 'Founder of SECBIT Labs',
    },
    {
      name: 'Hazel Hu',
      photo: hazel,
      description: 'GCC Team Leader',
    },
    {
      name: 'Jiang',
      photo: jiang,
      description: 'Founder of Social Layer',
    },
    {
      name: 'Kenway',
      photo: kenway,
      description: 'CTO of Spider Pool',
    },
    {
      name: 'Kin Nathapon',
      photo: kin,
      description: 'Professor of CMU International College of Digital Innovation',
    },
    {
      name: 'Kurt Pan',
      photo: kurt,
      description: 'Crypto Primitives, Contributor of Uncommons',
    },
    {
      name: 'Leo Lara',
      photo: leo,
      description: 'Protocol Testing Engineer, Ethereum Foundation',
    },
    {
      name: 'Michel Bauwens',
      photo: michel,
      description: 'Founder of P2P Foundation',
    },
    {
      name: 'Nicholas Hu',
      photo: nicholas,
      description: 'Core Contributor of 4Seas & GCC',
    },
    {
      name: 'Pan ZhiXiong',
      photo: pang,
      description: 'Founder of ChainFeeds',
    },
    {
      name: 'QJ',
      photo: qj,
      description: 'Director of Ethereum Community Fund (ECF)',
    },
    {
      name: 'Sam Chua',
      photo: sam,
      description: 'Founding Curator Seapunk Studios',
    },
    {
      name: 'Scott Moore',
      photo: scott,
      description: 'Co-Founder of Gitcoin, PublicWorks',
    },
    {
      name: 'Victor Zhou',
      photo: victor,
      description: 'EIP Editor',
    },
    {
      name: 'Yisi Liu',
      photo: yis,
      description: 'Co-Founder & CTO of Mask',
    },
    {
      name: 'Yu Bai',
      photo: yu,
      description: 'Founder of SeeDAO, CKB Ecofund Leader',
    },
    {
      name: 'Zhou Qi',
      photo: zhou,
      description: 'Founder of ETH Storage',
    },
  ]

  const instructors = [
    {
      name: 'Tiny Xiong',
      photo: tiny,
      title: 'Instructor',
      headline: 'Initiator of UpchainDAO, Co-Founder of DeCertme',
      descriptions: [
        'Systematic blockchain teaching and project mentorship',
        'Guest lecturer at Xiamen University Blockchain Research Center',
        'Author of multiple blockchain technology books',
      ],
    },
    {
      name: 'Andy',
      photo: andy,
      title: 'Instructor',
      headline: 'Core Contributor of the UpchainDAO, Senior Front-end Development Engineer',
    },
  ]

  return {
    speakers,
    instructors,
  }
}
