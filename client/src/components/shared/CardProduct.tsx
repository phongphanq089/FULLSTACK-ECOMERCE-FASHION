/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '../ui/carousel'
import { AspectRatio } from '../ui/aspect-ratio'
import Button from '../ui/button'
import { CartIcon } from './IconUi'

interface CardProps {
  colorDemo: { name: string; color: string }[]
  ImageCardDemo: { image: string }[]
}
const CardProduct = ({ colorDemo, ImageCardDemo }: CardProps) => {
  return (
    <Card className='rounded-lg sm:rounded-2xl p-0 overflow-hidden gap-0 w-full bg-white'>
      <CardContent className='p-0 relative'>
        <ImageProduct ImageCardDemo={ImageCardDemo} />
      </CardContent>
      <CardHeader className='py-3 sm:py-8 px-2 sm:px-4'>
        <div className='flex items-center gap-2 mb-2'>
          {colorDemo.map((item, index) => {
            if (index > 4) return null
            return (
              <React.Fragment key={index}>
                {index < 4 ? (
                  <span
                    className='w-3 h-3 sm:w-5 sm:h-5 rounded-full shadow-2xl inline-block border border-black'
                    style={{ backgroundColor: item.color }}
                    title={item.name}
                  />
                ) : (
                  <span className='h-5 w-auto px-3 flex items-center justify-center text-center bg-gray-200 rounded-full text-black font-medium leading-none'>
                    <span className='translate-y-[-1px]'> more</span>
                  </span>
                )}
              </React.Fragment>
            )
          })}
        </div>
        <CardTitle className='text-sm sm:text-lg text-black'>
          Mansion Tee Marshmallow
        </CardTitle>
        <CardDescription className='flex flex-col gap-2'>
          <span className='text-xl sm:text-2xl font-bold text-primary-color'>
            1.676.000₫
          </span>

          <span className='text-xs sm:text-lg text-gray-500'>
            Available Sizes: S, M, L, XL
          </span>
        </CardDescription>
        <Button className='max-sm:text-sm max-sm:px-3 hover:text-white mt-3 flex items-center !justify-between gap-5'>
          ADD CARD <CartIcon className='w-6 h-6 sm:w-8 sm:h-8' />
        </Button>
      </CardHeader>
    </Card>
  )
}

export default CardProduct

const ImageProduct = ({
  ImageCardDemo,
}: {
  ImageCardDemo: { image: string }[]
}) => {
  return (
    <div className='relative w-full aspect-[3/4] group  rounded-xl'>
      <img
        src={ImageCardDemo[2].image}
        alt='Main Image'
        className='absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 z-10'
      />

      <div className='absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 z-20 transition-opacity duration-300 cursor-grabbing'>
        <Carousel className='w-full h-full'>
          <CarouselContent>
            {ImageCardDemo.map((item, index) => (
              <CarouselItem key={index}>
                <AspectRatio ratio={3 / 4}>
                  <img
                    src={item.image}
                    alt={`Image ${index + 1}`}
                    className='object-cover w-full h-full'
                  />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='absolute left-1/2 flex justify-center w-full  bottom-5 -translate-x-1/2 opacity-100 z-30'>
            <CarouselDots />
          </div>
        </Carousel>
      </div>
    </div>
  )
}
