'use client'

import React from 'react'
import InfomationProduct from './InfomationProduct'
import MediaUploadForm from './MediaUploadForm'
import FormCategory from './FormCategory'
import FormCollection from './FormCollection'
import Button from '~/components/ui/button'

import { useFormContext } from 'react-hook-form'
import LayoutFormVariation from './product-variation/LayoutFormVariation'

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
          <LayoutFormVariation />
        </div>
        <div className='col-span-4 ticky top-0 left-0 h-fit'>
          <div className='sticky top-0 left-0 h-fit'>
            <FormCategory />
            <FormCollection />
          </div>
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
