'use client'

import { IconInfoCircleFilled } from '@tabler/icons-react'
import React, { useId } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

// import { ControllerRenderProps } from 'react-hook-form'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
// import { ProductSchemaType } from '~/validate/product/schema'
const InventoryForm = () => {
  const id = useId()
  return (
    <Card className='my-10'>
      <CardHeader className='border-b'>
        <CardTitle>Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex items-center  gap-4'>
          <div className='grid gap-2 w-full'>
            <div className='*:not-first:mt-2'>
              <Label htmlFor={id} className='mb-4'>
                Stock
              </Label>
              <div className='relative'>
                <Input
                  id={id}
                  className='peer ps-6 pe-12'
                  placeholder='0.00'
                  type='number'
                />
                <span className='text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50'>
                  %
                </span>
              </div>
            </div>
          </div>
          <div className='grid gap-2 w-full '>
            <div className='flex items-center gap-2'>
              <Label>SKU</Label>

              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <IconInfoCircleFilled />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className='px-2 py-1 text-xs'>
                    {`A "Stock Keeping Unit" is a unique code that you can create for each product or variant that you have in your store. Use SKU to help track inventory.`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input type='text' placeholder='' />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InventoryForm
