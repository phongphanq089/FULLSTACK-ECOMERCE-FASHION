'use client'

import { IconPlus } from '@tabler/icons-react'
import React from 'react'
import Button from '~/components/ui/button'
import { Input } from '~/components/ui/input'

const HeaderTop = () => {
  return (
    <div className='flex flex-wrap justify-between gap-10'>
      <div className='flex flex-col gap-1'>
        <h3 className='font-bold text-xl lg:text-4xl'>Collection</h3>
        <p className='text-lg'>
          Group related products and category into collection and add them to
          your website
        </p>
      </div>

      {/* action */}
      <div className='flex max-lg:flex-wrap items-center gap-4'>
        <Input
          placeholder='Search collection...'
          className='h-[50px] min-w-[300px]'
        />
        <Button>
          <IconPlus /> Add new Collection
        </Button>
      </div>
    </div>
  )
}

export default HeaderTop
