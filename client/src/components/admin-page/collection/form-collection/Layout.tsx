'use client'
import React from 'react'
import Button from '~/components/ui/button'
import CollectionInformation from './CollectionInfomation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import ProductInCollection from './ProductInCollection'
import CategoryInCollection from './CategoryInCollection'

const Layout = () => {
  return (
    <div>
      <div className='lg:grid grid-cols-12 gap-10'>
        {/* ===== FROM SUBMIT ====== */}
        <div className='col-span-8'>
          <Tabs defaultValue='account'>
            <Card className='mt-10'>
              <CardHeader className='border-b max-sm:min-h-[100px]'>
                <CardTitle className='flex items-center gap-10'>
                  <TabsList className='flex items-center flex-wrap gap-4'>
                    <TabsTrigger value='account'>
                      <span>Product in colleciton</span>
                      <span>10</span>
                    </TabsTrigger>
                    <TabsTrigger value='password'>
                      <span>Category in collection</span>
                      <span>10</span>
                    </TabsTrigger>
                  </TabsList>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TabsContent value='account'>
                  <ProductInCollection />
                </TabsContent>
                <TabsContent value='password'>
                  <CategoryInCollection />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
        <div className='col-span-4'>
          <CollectionInformation />
        </div>
      </div>

      {/* ===== ACTION BOTTOM FORM ======= */}
      <div className=' border-t-[1px] border-accent pt-10 mt-10'>
        <div className='flex items-center justify-end  gap-5'>
          <Button variant={'outline'}>Cancle</Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  )
}

export default Layout
