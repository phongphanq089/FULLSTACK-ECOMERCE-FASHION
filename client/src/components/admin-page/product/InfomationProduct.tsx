'use client'

import { IconInfoCircleFilled, IconPlus } from '@tabler/icons-react'
import { Edit2Icon, Trash } from 'lucide-react'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import Button from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { CreateProductSchemaType } from '~/validate/product/schema'

const FormEditor = dynamic(
  () => import('../../../components/feature/FormEditor'),
  {
    ssr: false,
  }
)

const InfomationProduct = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateProductSchemaType>()

  console.log(errors, '===>')
  return (
    <Card className='mt-10'>
      <CardHeader className='border-b'>
        <CardTitle>Product Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='mb-5'>
          <h3 className='mb-5'>Information Basic</h3>
          <div className='flex flex-col md:grid grid-cols-2 gap-3 mb-5'>
            <div className='grid gap-2'>
              <Label>Name</Label>
              <Input
                {...register('name')}
                type='text'
                placeholder='Name Product...'
                aria-invalid={errors.name && errors.name.message ? true : false}
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center gap-2'>
                <Label>Small strip</Label>

                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <IconInfoCircleFilled />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className='px-2 py-1 text-xs'>
                      Add a label like “New Arrivals” or “Sale” to highlight
                      this product. The label will appear in your product
                      library and widgets.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                {...register('smallStrip')}
                type='text'
                placeholder='VD : NEW PRODUCT'
              />
            </div>
            {errors.name && (
              <p className='text-red-500'>{errors.name.message}</p>
            )}
          </div>

          <div className='grid gap-2 overflow-x-auto mb-5'>
            <Label className='mb-2'>Description</Label>
            <FormEditor
              placeholder='Add description for product'
              name='description'
            />
          </div>

          <div className='pt-5 border-t'>
            <h3 className='mb-3 font-bold'>Additional information section</h3>
            <p className='mb-5'>
              Share information like return policies and care instructions with
              your customers.
            </p>

            <AddInfomationForm />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InfomationProduct

const AddInfomationForm = () => {
  const { control } = useFormContext<CreateProductSchemaType>()
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'infoSections',
  })

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const openAddDialog = () => {
    setTitle('')
    setContent('')
    setEditIndex(null)
    setOpen(true)
  }

  const openEditDialog = (index: number) => {
    setTitle(fields[index].title || '')
    setContent(fields[index].content || '')
    setEditIndex(index)
    setOpen(true)
  }

  const handleSave = () => {
    if (editIndex !== null) {
      update(editIndex, { title, content }) // ✅ update
    } else {
      append({ title, content }) // ✅ add
    }
    setOpen(false)
    setTitle('')
    setContent('')
    setEditIndex(null)
  }
  return (
    <div className='space-y-5'>
      {/* Button Thêm */}
      <Button variant='outline' onClick={openAddDialog}>
        Add information section <IconPlus />
      </Button>

      {/* Danh sách hiện bên ngoài */}
      <div className='space-y-2'>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className='p-3 border rounded bg-gray-50 cursor-pointer flex items-center justify-between gap-3'
          >
            <strong>{field.title}</strong>
            <div className='flex items-center gap-5'>
              <span
                onClick={() => openEditDialog(index)}
                className='text-red-500 hover:bg-red-50'
              >
                <Edit2Icon className='w-4 h-4' />
              </span>
              <span
                onClick={() => remove(index)}
                className='text-red-500 hover:bg-red-50'
              >
                <Trash className='w-4 h-4' />
              </span>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='flex flex-col gap-0 p-0 sm:max-h-[80vh] sm:max-w-4xl'>
          <DialogHeader className='contents space-y-0 text-left'>
            <DialogTitle className='border-b px-6 py-4 text-base'>
              {editIndex !== null ? 'Edit' : 'Add'} information section
            </DialogTitle>
            <div className='px-6 py-4'>
              <div className='grid gap-2 mb-5'>
                <Label>Information section title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='e.g. Shipping & returns'
                />
              </div>

              <div className='grid gap-2 overflow-x-auto mb-5'>
                <Label>Description</Label>
                <FormEditor
                  value={content}
                  onChange={setContent}
                  placeholder='Add description for product'
                  name='__temporary_editor_ignore__'
                />
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className='border-t px-6 py-4 sm:items-center'>
            <DialogClose
              asChild
              onClick={() => {
                setTitle('')
                setContent('')
                setEditIndex(null)
              }}
            >
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild onClick={handleSave}>
              <Button type='button'>Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
