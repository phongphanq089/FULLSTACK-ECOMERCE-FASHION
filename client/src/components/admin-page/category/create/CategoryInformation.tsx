import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import UploadImage from './UploadImageForm'

const CategoryInformation = () => {
  return (
    <Card className='mt-10'>
      <CardHeader className='border-b'>
        <CardTitle>Category infomation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='p-3 min-h-[400px]'>
          <form>
            <div className='grid gap-2 w-full'>
              <div className='*:not-first:mt-2'>
                <Label className='mb-4'>Name category</Label>
                <Input
                  className='peer ps-6 pe-12'
                  placeholder='0.00'
                  type='Enter name category...'
                />
              </div>
            </div>
            <div className='grid gap-2 w-full mt-5'>
              <Label className='mb-4'>Name category</Label>
              <UploadImage />
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

export default CategoryInformation
