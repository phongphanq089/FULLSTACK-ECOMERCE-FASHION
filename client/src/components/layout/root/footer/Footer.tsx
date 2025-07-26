'use client'
import React from 'react'

import BlockWorkShop from './elements/BlockWorkShop'
import dynamic from 'next/dynamic'

const FormSubscribe = dynamic(() => import('./elements/FormSubscribe'), {
  ssr: false,
})

const Footer = () => {
  return (
    <div className='w-full bg-white items-center justify-center h-full'>
      <div className='relative w-full h-[80vh] 2xl:h-screen z-10 text-2xl md:text-7xl font-bold uppercase flex justify-center items-center bg-black text-white whitespace-pre overflow-hidden'>
        <FormSubscribe />
      </div>

      <div className='sticky z-0 bottom-0 left-0 w-full py-10 h-fit lg:h-[400px] 2xl:h-[600px] bg-white flex justify-center items-center px-3 md:px-10 max-lg:mb-5 max-2xl:mb-[80px] border-t-[3px]'>
        <div className='relative overflow-hidden w-full h-full flex flex-col  justify-end text-right text-primary-color'>
          <div className='lg:grid grid-cols-2'>
            <div className='flex flex-row space-x-12 sm:pace-x-16  md:space-x-24 text-lg md:text-xl'>
              <ul>
                <li className='hover:underline cursor-pointer'>Home</li>
                <li className='hover:underline cursor-pointer'>Shop</li>
                <li className='hover:underline cursor-pointer'>Colections</li>
                <li className='hover:underline cursor-pointer'>Shoes</li>
                <li className='hover:underline cursor-pointer'>About</li>
                <li className='hover:underline cursor-pointer'>Contact</li>
              </ul>
              <ul>
                <li className='hover:underline cursor-pointer'>Github</li>
                <li className='hover:underline cursor-pointer'>Instagram</li>
                <li className='hover:underline cursor-pointer'>X (Twitter)</li>
              </ul>
            </div>
            <BlockWorkShop />
          </div>
          <div className='flex max-md:flex-col items-end justify-between pt-5'>
            <span className='font-bold mb-2 md:mb-5'>© 2025 AKR-SHOP</span>
            <h2 className='text-[13vw] lg:text-[80px] 2xl:text-[150px] 3xl:text-[192px]  text-primary-color font-bold leading-none'>
              AKR-SHOP
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
