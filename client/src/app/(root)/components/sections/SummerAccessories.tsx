import Image from 'next/image'
import React from 'react'
import { AspectRatio } from '~/components/ui/aspect-ratio'
import Button from '~/components/ui/button'
import { SparklesText } from '~/components/ui/SparklesText'

const SummerAccessories = () => {
  return (
    <div className='w-full h-full pt-10 lg:pt20'>
      <AspectRatio ratio={16 / 9} className='relative'>
        <Image
          src={
            'https://ik.imagekit.io/htnacim0q/ecomerce-test/Banner_men_desktop.webp?updatedAt=1752983329587'
          }
          alt='SummerAccessories'
          width={1900}
          height={1200}
          className='object-cover w-full h-full'
        />
        <div className='absolute w-fit px-3 flex flex-col text-center justify-center items-center gap-6 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <SparklesText className='max-md:text-3xl text-white'>
            Summer Accessories
          </SparklesText>
          <Button>See Colections</Button>
        </div>
      </AspectRatio>
    </div>
  )
}

export default SummerAccessories
