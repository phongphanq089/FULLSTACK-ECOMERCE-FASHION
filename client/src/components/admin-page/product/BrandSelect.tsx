import { PlusCircleIcon } from 'lucide-react'
import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

export default function BrandSelect() {
  return (
    <div className='flex items-center gap-5'>
      <Select>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select a fruit' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value='apple'>Apple</SelectItem>
            <SelectItem value='banana'>Banana</SelectItem>
            <SelectItem value='blueberry'>Blueberry</SelectItem>
            <SelectItem value='grapes'>Grapes</SelectItem>
            <SelectItem value='pineapple'>Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <span className='flex items-center gap-3 bg-primary-color px-2 py-1 text-white rounded-2xl cursor-pointer'>
        Add <PlusCircleIcon />
      </span>
    </div>
  )
}
