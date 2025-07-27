'use client'

import { Copy, Pipette } from 'lucide-react'
import { HexColorPicker } from 'react-colorful'
import { toast } from 'sonner'
import { Input } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

import { cn } from '~/lib/utils'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  label: string
  isEyeDroppper?: boolean
  className?: string
}

export function ColorPicker({
  color,
  onChange,
  isEyeDroppper = false,
  className,
}: ColorPickerProps) {
  function copyToClipboard() {
    navigator.clipboard.writeText(color)
    toast('Copied!', {
      description: `${color} copied to clipboard`,
      duration: 2000,
    })
  }

  async function useEyeDropper() {
    if (!('EyeDropper' in window)) {
      toast.error('Not supported', {
        description: 'Eyedropper is not supported in your browser',
        duration: 3000,
      })
      return
    }

    try {
      // @ts-expect-error - EyeDropper is not in the TypeScript DOM types yet
      const eyeDropper = new window.EyeDropper()
      const result = await eyeDropper.open()
      onChange(result.sRGBHex)
    } catch (e) {
      console.error('Error using eyedropper', e)
    }
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <span
            className='h-4 w-6 border-2 p-0'
            style={{ backgroundColor: color }}
          >
            <span className='sr-only'>Chose color</span>
          </span>
        </PopoverTrigger>
        <PopoverContent className='w-full p-3 bg-primary-foreground'>
          <HexColorPicker
            color={color}
            onChange={onChange}
            className='!w-full'
          />
          <div className='mt-2 flex w-full gap-2'>
            <Input
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className='h-10 w-full'
            />
            <span
              onClick={copyToClipboard}
              className='h-10 w-12 shrink border-gray-300 bg-gray-100 text-gray-900 hover:bg-gray-200'
              style={{ borderRadius: '6px' }}
            >
              <Copy className='h-4 w-4' />
              <span className='sr-only'>Copy color</span>
            </span>
          </div>

          {isEyeDroppper && (
            <div className='mt-2 flex gap-2'>
              <span
                onClick={useEyeDropper}
                className='h-10 w-10 border-gray-300 bg-gray-100 text-gray-900 hover:bg-gray-200'
                style={{ borderRadius: '6px' }}
              >
                <Pipette className='h-4 w-4' />
                <span className='sr-only'>Pick color</span>
              </span>

              <div
                className='h-10 flex-1'
                style={{ backgroundColor: color, borderRadius: '6px' }}
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
