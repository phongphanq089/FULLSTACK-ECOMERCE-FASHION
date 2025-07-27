'use client'

import React from 'react'

import Button from '~/components/ui/button'

interface PropsComponent {
  title: string

  children: React.ReactNode
}

const LayoutForm = (props: PropsComponent) => {
  const { title, children } = props
  return (
    <div className='w-full '>
      <div className='lg:px-10 '>
        <div className='min-h-[100px] py-5 w-full rounded-2xl flex items-center justify-between custom-gradient dark:custom-gradient-dark'>
          <div className='flex max-md:flex-col gap-2 items-center justify-between w-full px-4 lg:px-10 '>
            <h3 className='font-medium'>{title}</h3>

            <div className='flex items-center justify-center gap-3'>
              <Button variant={'outline'}>CANCLE</Button>
              <Button>SAVE</Button>
            </div>
          </div>
        </div>
      </div>
      <div className='lg:px-10'>{children}</div>
    </div>
  )
}

export default LayoutForm
