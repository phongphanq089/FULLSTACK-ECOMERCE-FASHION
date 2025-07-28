'use client'
import { IconPlus } from '@tabler/icons-react'
import React from 'react'
import Button from '~/components/ui/button'

const ProductInCollection = () => {
  return (
    <div className='p-3 min-h-[400px]'>
      <div className='flex items-center justify-center flex-col gap-2 text-center'>
        <h3 className='font-bold text-lg lg:text-2xl'>
          Start adding Product to your catalog
        </h3>
        <p>Create a new Product to display on your website.</p>
        <Button className='mt-4'>
          <IconPlus /> Add new Product
        </Button>
      </div>
    </div>
  )
}

export default ProductInCollection
