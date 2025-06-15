'use client'

import { useRef } from 'react'
import TextCursorProximity from '~/components/ui/TextCursorProximity'

const ASCII = ['✎', '✐', '✏', '✑']

export default function BlockWorkShop() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className='w-full h-[250px] flex flex-col items-center justify-center p-2 shadow-lg bg-white'
      ref={containerRef}
    >
      <div className='relative h-full w-full cursor-pointer overflow-hidden  justify-start items-start shadow-lg flex bg-primary-color text-white'>
        <div className='flex flex-col justify-center uppercase leading-none pt-4 pl-6'>
          <TextCursorProximity
            label='DIGITAL'
            className=' text-6xl will-change-transform  font-overused-grotesk'
            styles={{
              transform: {
                from: 'scale(1)',
                to: 'scale(1.4)',
              },
              color: { from: '#ffffff', to: '#ff87c1' },
            }}
            falloff='gaussian'
            radius={100}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            containerRef={containerRef as any}
          />
          <TextCursorProximity
            label='WORKSHOP'
            className='leading-none text-2xl will-change-transform  font-overused-grotesk'
            styles={{
              transform: {
                from: 'scale(1)',
                to: 'scale(1.4)',
              },
              color: { from: '#ffffff', to: '#ff87c1' },
            }}
            falloff='gaussian'
            radius={100}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            containerRef={containerRef as any}
          />
        </div>

        <div className='absolute bottom-2 flex w-full justify-between px-6'>
          {ASCII.map((hand, i) => (
            <span key={i} className='text-2xl opacity-80'>
              {hand}
            </span>
          ))}
        </div>

        <TextCursorProximity
          className='absolute top-6 right-6 hidden sm:block text-xs '
          label='15/01/2025'
          styles={{
            transform: {
              from: 'scale(1)',
              to: 'scale(1.4)',
            },
            color: { from: '#ffffff', to: '#ff87c1' },
          }}
          falloff='linear'
          radius={10}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          containerRef={containerRef as any}
        />
      </div>
    </div>
  )
}
