'use client'

import Image from 'next/image'
import React from 'react'
import { icon1 } from '~/assets/image'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { AddProductOption } from './AddProductOption'
import FormInputProductVariation from './FormInputProductVariation'

const LayoutFormVariation = () => {
  return (
    <Card className='mt-10'>
      <CardHeader className='border-b'>
        <CardTitle>Product Variation</CardTitle>
      </CardHeader>
      <CardContent>
        <FormInputProductVariation />

        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-10'>
            <p className='text-[16px] mb-5'>
              Does your product have different options like size, color, or
              material? Add them here.
            </p>

            <AddProductOption />
          </div>
          <div className='col-span-2'>
            <Image
              src={icon1.src}
              alt='icon-1'
              width={150}
              height={150}
              className='w-full h-auto object-cover'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LayoutFormVariation
