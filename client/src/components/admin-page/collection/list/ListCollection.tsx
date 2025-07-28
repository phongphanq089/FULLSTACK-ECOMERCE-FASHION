'use client'
import React from 'react'
import { collectionList } from './data'
import { Card, CardContent } from '~/components/ui/card'
import { Plus } from 'lucide-react'
import CardCollection from './CardCollection'

const ListCollection = () => {
  return (
    <div className='my-10'>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
        {collectionList.map((item, index) => {
          return (
            <CardCollection
              title={item.name}
              productCount={item.productCount}
              categoryCount={item.categoryCount}
              key={index}
            />
          )
        })}
        <Card className='group cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed hover:border-blue-400 flex items-center justify-center'>
          <CardContent className='p-0'>
            <div className='h-full flex items-center justify-center  rounded-t-lg  transition-colors'>
              <div className='text-center'>
                <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 transition-colors'>
                  <Plus className='h-6 w-6 text-blue-500' />
                </div>
                <p className='text-white text-sm font-medium'>
                  Add new colleciton
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ListCollection
