'use client'
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
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

const initialCategories = [
  { name: 'All', checked: false, disabled: true },
  { name: 'T-Shirt', checked: false },
  { name: 'Jeans', checked: false },
  { name: 'Jacket', checked: false },
  { name: 'Sweater', checked: false },
]

const FormCategory = () => {
  const [categories, setCategories] = useState(initialCategories)
  const [showInput, setShowInput] = useState(false)
  const [newCategory, setNewCategory] = useState('')

  const toggleCategory = (index: number) => {
    if (categories[index].disabled) return
    const updated = [...categories]
    updated[index].checked = !updated[index].checked
    setCategories(updated)
  }

  const handleAdd = () => {
    if (!newCategory.trim()) return
    setCategories([...categories, { name: newCategory.trim(), checked: false }])
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
        {categories.map((cat, i) => (
          <Label
            className=' hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 mb-3  has-[[aria-checked=true]]:border-orange-500  has-[[aria-checked=true]]:bg-orange-50 dark:has-[[aria-checked=true]]:border-orange-600  dark:has-[[aria-checked=true]]:bg-orange-950'
            key={i}
          >
            <Checkbox
              id={cat.name}
              onCheckedChange={() => toggleCategory(i)}
              checked={cat.checked}
              disabled={cat.disabled}
              className='
              data-[state=checked]:border-orange-500
              data-[state=checked]:bg-orange-500
              data-[state=checked]:text-white
              dark:data-[state=checked]:border-orange-600
              dark:data-[state=checked]:bg-orange-600'
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
