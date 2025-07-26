'use client'

import React from 'react'
import { Input } from '~/components/ui/input'
import CategorySelect from './CategorySelect'
import UploadImage from './UploadImage'
import BrandSelect from './BrandSelect'
import SizeSelect from './SizeSelect'
import ColorSelect from './ColorSelect'

const FormInputProduct = () => {
  return (
    <div className='py-5 max-w-4xl mx-auto'>
      <div className='grid grid-cols-2 gap-3'>
        <Input type='text' placeholder='Name Product...' />
        <CategorySelect />
      </div>
      <div className='my-10 '>
        <UploadImage />
      </div>
      <div className='grid grid-cols-2 gap-3'>
        <BrandSelect />
        <SizeSelect />
      </div>
      <div className='pt-10'>
        <ColorSelect />
      </div>
    </div>
  )
}

export default FormInputProduct
