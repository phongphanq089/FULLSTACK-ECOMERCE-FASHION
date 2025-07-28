'use client'
import React from 'react'
import ProductsInCategory from './ProductsInCategory'
import CategoryInformation from './CategoryInformation'
import Button from '~/components/ui/button'

const MainFormLayout = () => {
  return (
    <div>
      <div className='lg:grid grid-cols-12 gap-10'>
        <div className='col-span-8'>
          <ProductsInCategory />
        </div>
        <div className='col-span-4'>
          <CategoryInformation />
        </div>
      </div>

      <div className=' border-t-[1px] border-accent pt-10 mt-10'>
        <div className='flex items-center justify-end  gap-5'>
          <Button variant={'outline'}>Cancle</Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  )
}

export default MainFormLayout
