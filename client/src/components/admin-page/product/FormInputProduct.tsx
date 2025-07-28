'use client'
import React from 'react'

import InfomationProduct from './InfomationProduct'
import FormInputPricePolicy from './FormInputPricePolicy'
import ProductOption from './ProductOption'
import InventoryForm from './InventoryForm'
import MediaUploadForm from './MediaUploadForm'
import FormCategory from './FormCategory'
import FormCollection from './FormCollection'
import Button from '~/components/ui/button'

import { useFormContext } from 'react-hook-form'

const FormInputProduct = () => {
  const { handleSubmit } = useFormContext()

  const onClickSubmit = () => {
    handleSubmit((data) => {
      console.log('Submit data:', data)
    })()
  }
  return (
    <div className='py-5'>
      <div className='lg:grid grid-cols-12 gap-5'>
        <div className='col-span-8'>
          <MediaUploadForm />
          <InfomationProduct />
          <FormInputPricePolicy />
          <ProductOption />
          <InventoryForm />
        </div>
        <div className='col-span-4'>
          <FormCategory />
          <FormCollection />
        </div>
      </div>
      <div className='flex items-center justify-end gap-3 mt-10'>
        <Button variant={'outline'}>CANCLE</Button>
        <Button onClick={onClickSubmit}>SAVE</Button>
      </div>
    </div>
  )
}

export default FormInputProduct
