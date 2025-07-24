import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Button from '~/components/ui/button'

const ActionRightHeader = () => {
  return (
    <div className='flex items-center gap-2'>
      <Button className=' hover:text-white'>
        <Search />
      </Button>
      <Link href={'/auth/login'}>
        <Button className='hover:text-white'>Log in</Button>
      </Link>
      <Button className='relative px-6 py-1 rounded-3xl  border-[1px] text-primary-color font-bold border-primary-color  flex items-center justify-start gap-5 min-w-[100px] max-2xl:hidden'>
        Cart{' '}
        <span className='flex items-center justify-center bg-white text-primary-color p-1 px-3 rounded-4xl absolute right-1'>
          5
        </span>
      </Button>
    </div>
  )
}

export default ActionRightHeader
