/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { CreateProductSchemaType } from '~/validate/product/schema'
import { Controller, useFormContext } from 'react-hook-form'

const initialCollections = [
  { id: '1', name: 'All', checked: false, disabled: true },
  { id: '2', name: 'Womens New Arrivals', checked: false },
  { id: '3', name: 'Mens Most Wanted', checked: false },
  { id: '4', name: 'Womens Matching Sets', checked: false },
]

const FormCollection = () => {
  const [collections, setCollections] = useState(initialCollections)
  const [showInput, setShowInput] = useState(false)
  const [newCollection, setNewCollection] = useState('')

  // Sử dụng useFormContext để truy cập form context
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateProductSchemaType>()

  const selectedCollectionIds = watch('collectionIds') || [1]

  const toggleCollection = (collectionId: string) => {
    const parsedId = parseInt(collectionId)

    if (isNaN(parsedId)) {
      console.error('Invalid collection Id', collectionId)

      return
    }

    if (parsedId === 1) return

    const currentIds = selectedCollectionIds

    let newIds: number[]

    if (currentIds.includes(parsedId)) {
      // Loại bỏ ID nếu đã được chọn, nhưng giữ ID 1 (All)
      newIds = currentIds.filter((id) => id !== parsedId)
    } else {
      newIds = [...currentIds, parsedId]
    }

    // Đảm bảo ID 1 (All) luôn nằm trong mảng
    if (!newIds.includes(1)) {
      newIds.push(1)
    }

    setValue('collectionIds', newIds, { shouldValidate: true })

    setCollections((prev) => {
      return prev.map((col) =>
        col.id === collectionId && !col.disabled
          ? { ...col, checked: !col.checked }
          : col
      )
    })
  }

  const handleAdd = () => {
    if (!newCollection.trim()) return
    const newId = `${collections.length + 1}` // Tạo ID mới (có thể thay bằng logic khác)
    setCollections([
      ...collections,
      { id: newId, name: newCollection.trim(), checked: false },
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
            <Controller
              name='collectionIds'
              control={control}
              render={({ field }) => {
                return (
                  <Checkbox
                    id={col.name}
                    checked={field.value?.includes(parseInt(col.id))}
                    disabled={col.disabled}
                    onCheckedChange={() => toggleCollection(col.id)}
                    className='
                data-[state=checked]:border-orange-500
                data-[state=checked]:bg-orange-500
                data-[state=checked]:text-white
                dark:data-[state=checked]:border-orange-600
                dark:data-[state=checked]:bg-orange-600
              '
                  />
                )
              }}
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
