import { Search } from 'lucide-react'
import React from 'react'
import { Button } from '~/components/ui/button'

const ActionRightHeader = () => {
  return (
    <div className='flex items-center'>
      <Button className='rounded-3xl bg-white text-primary-color hover:bg-primary-color hover:text-white'>
        <Search />
      </Button>
      <Button className='rounded-3xl bg-white text-primary-color hover:bg-primary-color hover:text-white'>
        Log in
      </Button>
      <Button className='relative px-6 py-1 rounded-3xl bg-white hover:bg-primary-color/70 hover:text-white border-[1px] text-primary-color font-bold border-primary-color  flex items-center justify-start gap-5 min-w-[100px] max-2xl:hidden'>
        Cart{' '}
        <span className='flex items-center justify-center bg-primary-color text-white p-1 px-3 rounded-4xl absolute right-1'>
          5
        </span>
      </Button>
    </div>
  )
}

export default ActionRightHeader
