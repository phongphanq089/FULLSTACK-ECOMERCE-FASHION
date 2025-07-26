'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

import Button from '~/components/ui/button'

interface PropsComponent {
  title: string
  textAction: string
  children: React.ReactNode
}

const LayoutForm = (props: PropsComponent) => {
  const { title, textAction, children } = props
  return (
    <Card className='w-full min-h-screen'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className='flex justify-center'>
        <Button>{textAction}</Button>
      </CardFooter>
    </Card>
  )
}

export default LayoutForm
