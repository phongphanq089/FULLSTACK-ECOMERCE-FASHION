import { IconPlus } from '@tabler/icons-react'
import React from 'react'
import Button from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

const ProductsInCategory = () => {
  return (
    <Card className='mt-10'>
      <CardHeader className='border-b'>
        <CardTitle className='flex items-center gap-10'>
          <span>Product in category</span>
          <span>10</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='p-3 min-h-[400px]'>
          <div className='flex items-center justify-center flex-col gap-2 text-center'>
            <h3 className='font-bold text-lg lg:text-2xl'>
              Start adding products to your catalog
            </h3>
            <p>Create a new category to display on your website.</p>
            <Button className='mt-4'>
              <IconPlus /> Add new product
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductsInCategory
