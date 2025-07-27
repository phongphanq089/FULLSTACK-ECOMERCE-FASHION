'use client'

import React, { useState } from 'react'
import { IconPlus, IconX, IconCheck } from '@tabler/icons-react'
import { Label } from '~/components/ui/label'
import { Checkbox } from '~/components/ui/checkbox'
import Button from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

const initialCollections = [
  { name: 'All', checked: false, disabled: true },
  { name: 'Womens New Arrivals', checked: false },
  { name: 'Mens Most Wanted', checked: false },
  { name: 'Womens Matching Sets', checked: false },
]

const FormCollection = () => {
  const [collections, setCollections] = useState(initialCollections)
  const [showInput, setShowInput] = useState(false)
  const [newCollection, setNewCollection] = useState('')

  const toggleCollection = (index: number) => {
    if (collections[index].disabled) return
    const updated = [...collections]
    updated[index].checked = !updated[index].checked
    setCollections(updated)
  }

  const handleAdd = () => {
    if (!newCollection.trim()) return
    setCollections([
      ...collections,
      { name: newCollection.trim(), checked: false },
    ])
    setNewCollection('')
    setShowInput(false)
  }

  const handleCancel = () => {
    setNewCollection('')
    setShowInput(false)
  }

  return (
    <Card className='mt-10'>
      <CardHeader className='border-b'>
        <CardTitle>Collections</CardTitle>
      </CardHeader>
      <CardContent className='py-4'>
        {collections.map((col, i) => (
          <Label
            key={i}
            className='
              hover:bg-accent/50
              flex items-start gap-3 rounded-lg border p-3 mb-3
              has-[[aria-checked=true]]:border-orange-500
              has-[[aria-checked=true]]:bg-orange-50
              dark:has-[[aria-checked=true]]:border-orange-600
              dark:has-[[aria-checked=true]]:bg-orange-950
            '
          >
            <Checkbox
              id={col.name}
              checked={col.checked}
              disabled={col.disabled}
              onCheckedChange={() => toggleCollection(i)}
              className='
                data-[state=checked]:border-orange-500
                data-[state=checked]:bg-orange-500
                data-[state=checked]:text-white
                dark:data-[state=checked]:border-orange-600
                dark:data-[state=checked]:bg-orange-600
              '
            />
            <div className='grid gap-1.5 font-normal'>
              <p className='text-sm leading-none font-medium'>{col.name}</p>
            </div>
          </Label>
        ))}

        {/* Input thêm collection */}
        {showInput && (
          <div className='flex items-center gap-2 mb-3'>
            <Label className='flex-1 flex items-center gap-3 rounded-lg border p-3'>
              <input
                type='text'
                autoFocus
                value={newCollection}
                onChange={(e) => setNewCollection(e.target.value)}
                placeholder='New collection'
                className='bg-transparent outline-none border-none text-sm w-full'
              />
            </Label>
            <button
              className='text-green-600 hover:text-green-800'
              onClick={handleAdd}
            >
              <IconCheck size={20} />
            </button>
            <button
              className='text-red-600 hover:text-red-800'
              onClick={handleCancel}
            >
              <IconX size={20} />
            </button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!showInput && (
          <Button
            variant='outline'
            onClick={() => setShowInput(true)}
            className='flex items-center gap-1'
          >
            <IconPlus size={18} />
            Add Collection
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default FormCollection
