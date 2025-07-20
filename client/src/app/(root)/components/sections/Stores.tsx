import Image from 'next/image'
import React from 'react'
import { AspectRatio } from '~/components/ui/aspect-ratio'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '~/components/ui/carousel'

const ImageStoresDemo = [
  {
    src: 'https://ik.imagekit.io/htnacim0q/ecomerce-test/deskt_3_7e9a5c61-b237-4c7e-81ec-470fed930de3_1920x.webp?updatedAt=1753001896680',
  },
  {
    src: 'https://ik.imagekit.io/htnacim0q/ecomerce-test/deskt_copia2_a4839238-054f-4819-ab5c-64f99ce66f7a_1920x.webp?updatedAt=1753001896791',
  },
  {
    src: 'https://ik.imagekit.io/htnacim0q/ecomerce-test/deskt5_1920x.webp?updatedAt=1753001896520',
  },
  {
    src: 'https://ik.imagekit.io/htnacim0q/ecomerce-test/1_deskt_1920x.webp?updatedAt=1753001896461',
  },
  {
    src: 'https://ik.imagekit.io/htnacim0q/ecomerce-test/hp-menu_1920x.webp?updatedAt=1753001896312',
  },
  {
    src: 'https://ik.imagekit.io/htnacim0q/ecomerce-test/aa_d7f372ac-c68b-4d4f-bb3e-0373c66fddde_1920x.webp?updatedAt=1753001896349',
  },
  {
    src: 'https://ik.imagekit.io/htnacim0q/ecomerce-test/6_57240963-e16c-4ad2-a575-955a8b705cfb_1920x.webp?updatedAt=1753001896375',
  },
  {
    src: 'https://ik.imagekit.io/htnacim0q/ecomerce-test/iPhone_14_Pro_Max_63_e461b89f-b058-4997-b4b4-2094f7e7950b_1920x.webp?updatedAt=1753001896379',
  },
]

const Stores = () => {
  return (
    <Carousel className='w-full relative'>
      <CarouselContent>
        {ImageStoresDemo.map((item, index) => (
          <CarouselItem key={index}>
            <AspectRatio ratio={16 / 6} className='relative'>
              <Image
                src={item.src}
                alt='SummerAccessories'
                width={1900}
                height={1200}
                className='object-cover w-full h-full'
              />
              <div className='bg-primary-color/30 absolute top-2 md:top-10 right-2 md:right-10 p-2 md:p-5 rounded-xl backdrop-blur-2xl '>
                <div className='flex item-center gap-3'>
                  <h3 className='text-lg md:text-3xl font-bold'>Milano</h3>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='icon icon-tabler icons-tabler-outline icon-tabler-circle-arrow-up-right'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0' />
                    <path d='M15 9l-6 6' />
                    <path d='M15 15v-6h-6' />
                  </svg>
                </div>
              </div>
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='absolute w-full flex items-center justify-center gap-2 bottom-2 md:bottom-10 left-1/2 -translate-x-1/2'>
        <CarouselDots />
      </div>
    </Carousel>
  )
}

export default Stores
