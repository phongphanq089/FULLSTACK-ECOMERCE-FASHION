import Image from 'next/image'
import React from 'react'
import { bannerHero } from '~/assets/image'
import { InteractiveHoverButton } from '~/components/ui/InteractiveHoverButton'
import { SparklesText } from '~/components/ui/SparklesText'

const bannerHeroList = [
  {
    title: 'After Dark: Chapter 1',
    desc: '',
    image: bannerHero.banner1,
  },
  {
    title: 'After Dark: Chapter 2',
    desc: '',
    image: bannerHero.banner2,
  },
  {
    title: 'Call Of Duty: Black Ops 6',
    desc: '',
    image: bannerHero.banner3,
  },
  {
    title: 'Neon Genesis Evangelion',
    desc: '',
    image: bannerHero.banner4,
  },
]

const BannerHero = () => {
  return (
    <section className='text-white   w-full '>
      {bannerHeroList.map((item, index) => {
        return (
          <div className='sm:sticky sm:top-0  w-full h-screen ' key={index}>
            <figure className='w-full h-full flex items-center justify-center relative'>
              <Image
                src={item.image}
                alt='Photo by Drew Beamer'
                fill
                className='h-full w-full  object-cover'
              />

              <div className='absolute w-full px-3  flex flex-col text-center justify-center items-center gap-6 left-1/2 -translate-x-1/2 bottom-30 2xl:bottom-20'>
                <SparklesText className='max-md:text-3xl'>
                  {item.title}
                </SparklesText>
                <InteractiveHoverButton>See Colections</InteractiveHoverButton>
              </div>
            </figure>
          </div>
        )
      })}
    </section>
  )
}

export default BannerHero
