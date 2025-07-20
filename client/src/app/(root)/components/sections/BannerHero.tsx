'use client'
import Image from 'next/image'
import React from 'react'
import { bannerHero } from '~/assets/image'
import Button from '~/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '~/components/ui/carousel'
import { SparklesText } from '~/components/ui/SparklesText'
import { useResponsive } from '~/hooks/useResponsive'

const bannerHeroList = [
  {
    title: 'After Dark: Chapter 1',
    desc: '',
    isVideo: true,
    src: 'https://ik.imagekit.io/htnacim0q/ecomerce-test/b94dbda3c3714447ad95f52f80ee9295.HD-1080p-7.2Mbps-49735418%20(1).mp4?updatedAt=1752981754126',
  },
  {
    title: 'After Dark: Chapter 2',
    desc: '',
    src: 'https://ik.imagekit.io/htnacim0q/ecomerce-test/all-ban-2.webp?updatedAt=1752980257553',
  },
  {
    title: 'Call Of Duty: Black Ops 6',
    desc: '',
    src: bannerHero.banner3,
  },
  {
    title: 'Neon Genesis Evangelion',
    desc: '',
    src: 'https://ik.imagekit.io/htnacim0q/ecomerce-test/Banner_New_Arrivals.webp?updatedAt=1752980065695',
  },
]

const BannerHero = () => {
  const { MAX_MD } = useResponsive()
  return (
    <section className='text-white w-full '>
      {MAX_MD ? (
        <BannerHeroMobile />
      ) : (
        <>
          {bannerHeroList.map((item, index) => {
            return (
              <div className='sm:sticky sm:top-0  w-full h-screen ' key={index}>
                <figure className='w-full h-full flex items-center justify-center relative'>
                  {!item.isVideo ? (
                    <Image
                      src={item.src}
                      alt='Photo by Drew Beamer'
                      fill
                      className='h-full w-full  object-cover'
                    />
                  ) : typeof item.src === 'string' ? (
                    <video
                      src={item.src}
                      className='h-full w-full object-cover'
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload='auto'
                    />
                  ) : null}

                  <div className='absolute w-full px-3  flex flex-col text-center justify-center items-center gap-6 left-1/2 -translate-x-1/2 bottom-30 2xl:bottom-20'>
                    <SparklesText className='max-md:text-3xl'>
                      {item.title}
                    </SparklesText>
                    <Button>See Colections</Button>
                  </div>
                </figure>
              </div>
            )
          })}
        </>
      )}
    </section>
  )
}

export default BannerHero

const BannerHeroMobile = () => {
  return (
    <Carousel className='w-full h-full'>
      <CarouselContent>
        {bannerHeroList.map((item, index) => {
          return (
            <CarouselItem className='w-full h-screen relative ' key={index}>
              <figure className='w-full h-full flex items-center justify-center relative'>
                {!item.isVideo ? (
                  <Image
                    src={item.src}
                    alt='Photo by Drew Beamer'
                    fill
                    className='h-full w-full  object-cover'
                  />
                ) : typeof item.src === 'string' ? (
                  <video
                    src={item.src}
                    className='h-full w-full object-cover'
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload='auto'
                  />
                ) : null}

                <div className='absolute w-full px-3  flex flex-col text-center justify-center items-center gap-6 left-1/2 -translate-x-1/2 bottom-30 2xl:bottom-20'>
                  <SparklesText className='max-md:text-3xl'>
                    {item.title}
                  </SparklesText>
                  <Button>See Colections</Button>
                </div>
              </figure>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <div className='absolute left-1/2 flex justify-center w-full  bottom-10 -translate-x-1/2 opacity-100 z-30'>
        <CarouselDots />
      </div>
    </Carousel>
  )
}
