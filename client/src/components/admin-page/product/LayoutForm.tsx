'use client'

import React from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'

import Button from '~/components/ui/button'
import { useProductForm } from '~/hooks/product/useProductForm'

interface PropsComponent {
  title: string

  children: React.ReactNode
}

const LayoutForm = (props: PropsComponent) => {
  const { title, children } = props

  const form = useProductForm()

  return (
    <FormProvider {...form}>
      <div className='w-full'>
        <div className='lg:px-10 '>
          <HeaderAction title={title} />
        </div>
        <div className='lg:px-10'>{children}</div>
      </div>
    </FormProvider>
  )
}

export default LayoutForm

const HeaderAction = ({ title }: { title: string }) => {
  const { handleSubmit } = useFormContext()

  const onClickSubmit = () => {
    handleSubmit((data) => {
      console.log('Submit data:', data)
    })()
  }
  return (
    <div className='min-h-[100px] py-5 w-full rounded-2xl flex items-center justify-between custom-gradient dark:custom-gradient-dark'>
      <div className='flex max-md:flex-col gap-2 items-center justify-between w-full px-4 lg:px-10 '>
        <h3 className='font-medium'>{title}</h3>

        <div className='flex items-center justify-center gap-3'>
          <Button variant={'outline'}>CANCLE</Button>
          <Button onClick={onClickSubmit}>SAVE</Button>
        </div>
      </div>
    </div>
  )
}
