'use client'

import React from 'react'
import UploadImage from '~/components/layout/admin/form-upload/UploadImage'
import Button from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

const FormBrand = () => {
  return (
    <div className='max-w-4xl w-full mx-auto'>
      <Card className='mt-10'>
        <CardHeader className='border-b'>
          <CardTitle>Add Brand</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='p-3 min-h-[400px]'>
            <form>
              <div className='grid gap-2 w-full'>
                <div className='*:not-first:mt-2'>
                  <Label className='mb-4'>Name Brand</Label>
                  <Input
                    className='peer ps-6 pe-12'
                    placeholder='Enter name brand...'
                    type='text'
                  />
                </div>
              </div>
              <div className='grid gap-2 w-full mt-5'>
                <Label className='mb-4'>Image</Label>
                <UploadImage />
              </div>
            </form>
          </div>
        </CardContent>
        <CardFooter className='flex items-center justify-end  gap-5'>
          <Button variant={'outline'}>Cancle</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default FormBrand
