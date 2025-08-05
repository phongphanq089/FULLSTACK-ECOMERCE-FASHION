/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form'

import Button from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { CreateProductSchemaType } from '~/validate/product/schema'

const initialCategories = [
  { id: '1', name: 'All', checked: true, disabled: true },
  { id: '2', name: 'T-Shirt', checked: false },
  { id: '3', name: 'Jeans', checked: false },
  { id: '4', name: 'Jacket', checked: false },
  { id: '5', name: 'Sweater', checked: false },
]

const FormCategory = () => {
  const [categories, setCategories] = useState(initialCategories)
  const [showInput, setShowInput] = useState(false)
  const [newCategory, setNewCategory] = useState('')

  // Sử dụng useFormContext để truy cập form context
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateProductSchemaType>()

  // Theo dõi giá trị categoryId
  const selectedCategoryIds = watch('categoryId') || [1]

  const toggleCategory = (categoryId: string) => {
    const parsedId = parseInt(categoryId)

    if (isNaN(parsedId)) {
      console.error('Invalid category ID:', categoryId)
      return
    }

    if (parsedId === 1) return

    const currentIds = selectedCategoryIds

    let newIds: number[]
    if (currentIds.includes(parsedId)) {
      // Loại bỏ ID nếu đã được chọn, nhưng giữ ID 1 (All)
      newIds = currentIds.filter((id) => id !== parsedId)
    } else {
      // Thêm ID nếu chưa được chọn, đảm bảo ID 1 luôn có
      newIds = [...currentIds, parsedId]
    }
    // Đảm bảo ID 1 (All) luôn nằm trong mảng
    if (!newIds.includes(1)) {
      newIds.push(1)
    }
    setValue('categoryId', newIds, { shouldValidate: true })

    setCategories((prev) => {
      return prev.map((cat) =>
        cat.id === categoryId && !cat.disabled
          ? { ...cat, checked: !cat.checked }
          : cat
      )
    })
  }

  const handleAdd = () => {
    if (!newCategory.trim()) return
    const newId = `${categories.length + 1}` // Tạo ID mới (có thể thay bằng logic khác)
    setCategories([
      ...categories,
      { id: newId, name: newCategory.trim(), checked: false },
    ])
    setNewCategory('')
    setShowInput(false)
  }

  const handleCancel = () => {
    setNewCategory('')
    setShowInput(false)
  }

  return (
    <Card>
      <CardHeader className='border-b'>
        <CardTitle>Category</CardTitle>
      </CardHeader>
      <CardContent>
        {errors.categoryId && (
          <p className='text-red-600'>{errors.categoryId.message}</p>
        )}
        {categories.map((cat) => (
          <Label
            className=' hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 mb-3  has-[[aria-checked=true]]:border-orange-500  has-[[aria-checked=true]]:bg-orange-50 dark:has-[[aria-checked=true]]:border-orange-600  dark:has-[[aria-checked=true]]:bg-orange-950'
            key={cat.id}
          >
            <Controller
              name='categoryId'
              control={control}
              render={({ field }) => {
                return (
                  <Checkbox
                    id={cat.name}
                    onCheckedChange={() => toggleCategory(cat.id)}
                    checked={field.value?.includes(parseInt(cat.id))}
                    disabled={cat.disabled}
                    className='
              data-[state=checked]:border-orange-500
              data-[state=checked]:bg-orange-500
              data-[state=checked]:text-white
              dark:data-[state=checked]:border-orange-600
              dark:data-[state=checked]:bg-orange-600'
                  />
                )
              }}
            />
            <div className='grid gap-1.5 font-normal'>
              <p className='text-sm leading-none font-medium'>{cat.name}</p>
            </div>
          </Label>
        ))}

        {showInput && (
          <div className='flex items-center gap-2'>
            <Input
              type='text'
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder='New category'
              className='border px-2 py-1 text-sm rounded w-full'
            />
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
            type='submit'
            variant='outline'
            onClick={() => setShowInput(true)}
            className='flex items-center gap-1'
          >
            <IconPlus size={18} />
            Add Category
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default FormCategory
