'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import UploadImage from './UploadImage'
import { useFormContext } from 'react-hook-form'
import { CreateProductSchemaType } from '~/validate/product/schema'

const MediaUploadForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateProductSchemaType>()

  return (
    <Card>
      <CardHeader className='border-b'>
        <CardTitle>Upload media</CardTitle>
      </CardHeader>
      <CardContent>
        <input {...register('imageUrl')} className='hidden' />
        <UploadImage />
        {errors.imageUrl && (
          <p className='text-red-500 mt-5'>{errors.imageUrl.message}</p>
        )}
      </CardContent>
    </Card>
  )
}

export default MediaUploadForm
