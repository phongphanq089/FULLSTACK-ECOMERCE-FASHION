import React from 'react'
import LayoutSectionSlide from '~/components/layout/root/section-home/LayoutSectionSlide'
import CardProduct from '~/components/shared/CardProduct'

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel'

const ImageCardDemo = [
  {
    image:
      'https://ik.imagekit.io/htnacim0q/ecomerce-test/BANDANA_HANDKERCHIEF_RED_3_800x.webp?updatedAt=1752999198363',
  },
  {
    image:
      'https://ik.imagekit.io/htnacim0q/ecomerce-test/BANDANA_HANDKERCHIEF_RED_1_800x.webp?updatedAt=1752999198184',
  },
  {
    image:
      'https://ik.imagekit.io/htnacim0q/ecomerce-test/NUDEPROJECT_MASVINOHAHA5347_800x.webp?updatedAt=1752999198213',
  },
  {
    image:
      'https://ik.imagekit.io/htnacim0q/ecomerce-test/BANDANA_HANDKERCHIEF_RED_2_800x.webp?updatedAt=1752999198183',
  },
]

const colorDemo = [
  {
    color: '#ff3c00',
    name: 'Primary Color',
  },
  {
    color: '#fff4e2',
    name: 'Secondary Color',
  },
  {
    color: '#0044ff',
    name: 'Primary Color',
  },
  {
    color: '#c9800a',
    name: 'Secondary Color',
  },
  {
    color: '#0ac960',
    name: 'Secondary Color',
  },
  {
    color: '#fff4e2',
    name: 'Secondary Color',
  },
  {
    color: '#0044ff',
    name: 'Primary Color',
  },
]

const Accessories = () => {
  return (
    <div>
      <LayoutSectionSlide title='Accessories' link='/products'>
        <Carousel
          opts={{
            align: 'start',
          }}
          className='w-full relative'
        >
          <CarouselContent>
            <CarouselItem className='basis-1/2 lg:basis-1/3 xl:basis-1/4'>
              <CardProduct
                ImageCardDemo={ImageCardDemo}
                colorDemo={colorDemo}
              />
            </CarouselItem>
            <CarouselItem className='basis-1/2 lg:basis-1/3 xl:basis-1/4'>
              <CardProduct
                ImageCardDemo={ImageCardDemo}
                colorDemo={colorDemo}
              />
            </CarouselItem>
            <CarouselItem className='basis-1/2 lg:basis-1/3 xl:basis-1/4'>
              <CardProduct
                ImageCardDemo={ImageCardDemo}
                colorDemo={colorDemo}
              />
            </CarouselItem>
            <CarouselItem className='basis-1/2 lg:basis-1/3 xl:basis-1/4'>
              <CardProduct
                ImageCardDemo={ImageCardDemo}
                colorDemo={colorDemo}
              />
            </CarouselItem>
            <CarouselItem className='basis-1/2 lg:basis-1/3 xl:basis-1/4'>
              <CardProduct
                ImageCardDemo={ImageCardDemo}
                colorDemo={colorDemo}
              />
            </CarouselItem>
            <CarouselItem className='basis-1/2 lg:basis-1/3 xl:basis-1/4'>
              <CardProduct
                ImageCardDemo={ImageCardDemo}
                colorDemo={colorDemo}
              />
            </CarouselItem>
            <CarouselItem className='basis-1/2 lg:basis-1/3 xl:basis-1/4'>
              <CardProduct
                ImageCardDemo={ImageCardDemo}
                colorDemo={colorDemo}
              />
            </CarouselItem>
            <CarouselItem className='basis-1/2 lg:basis-1/3 xl:basis-1/4'>
              <CardProduct
                ImageCardDemo={ImageCardDemo}
                colorDemo={colorDemo}
              />
            </CarouselItem>
            <CarouselItem className='basis-1/2 lg:basis-1/3 xl:basis-1/4'>
              <CardProduct
                ImageCardDemo={ImageCardDemo}
                colorDemo={colorDemo}
              />
            </CarouselItem>
            <CarouselItem className='basis-1/2 lg:basis-1/3 xl:basis-1/4'>
              <CardProduct
                ImageCardDemo={ImageCardDemo}
                colorDemo={colorDemo}
              />
            </CarouselItem>
            <CarouselItem className='basis-1/2 lg:basis-1/3 xl:basis-1/4'>
              <CardProduct
                ImageCardDemo={ImageCardDemo}
                colorDemo={colorDemo}
              />
            </CarouselItem>
            <CarouselItem className='basis-1/2 lg:basis-1/3 xl:basis-1/4'>
              <CardProduct
                ImageCardDemo={ImageCardDemo}
                colorDemo={colorDemo}
              />
            </CarouselItem>
          </CarouselContent>
          <div className='flex items-center justify-center gap-2  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-lg:hidden'>
            <CarouselPrevious variant={'default'} />
            <CarouselNext variant={'default'} />
          </div>
          <div className='lg:hidden mt-10'>
            <CarouselDots />
          </div>
        </Carousel>
      </LayoutSectionSlide>
    </div>
  )
}

export default Accessories
