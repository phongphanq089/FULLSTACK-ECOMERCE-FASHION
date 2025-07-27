import Link from 'next/link'
import React from 'react'

interface LayoutSectionSlideProps {
  title: string
  link: string
  children: React.ReactNode
}

const LayoutSectionSlide = ({
  title,
  link,
  children,
}: LayoutSectionSlideProps) => {
  return (
    <div className='overflow-hidden container-full py-10 md:py-20'>
      <div className='flex items-center justify-between mb-5'>
        <h2 className='text-lg md:text-3xl font-bold'>{title}</h2>
        <Link
          href={link}
          className='text-primary-color hover:underline text-sm md:text-xl font-bold'
        >
          View More
        </Link>
      </div>
      <div className='w-full '>{children}</div>
    </div>
  )
}

export default LayoutSectionSlide
