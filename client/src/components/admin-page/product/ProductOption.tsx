'use client'
import { IconPlus, IconX } from '@tabler/icons-react'
import Image from 'next/image'
import React, { useId, useRef, useState } from 'react'
import { icon1 } from '~/assets/image'
import Button from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Tag, TagInput } from 'emblor'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'

import { Label } from '~/components/ui/label'
import { ColorPicker } from '~/components/ui/ColorPicker'
import { Input } from '~/components/ui/input'

function ProductOption() {
  return (
    <Card className='mt-10'>
      <CardHeader className='border-b'>
        <CardTitle>Product options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-9'>
            <p className='text-lg mb-5'>
              Does your product have different options like size, color, or
              material? Add them here.
            </p>

            <AddProductOption />
          </div>
          <div className='col-span-3'>
            <Image
              src={icon1.src}
              alt='icon-1'
              width={150}
              height={150}
              className='w-full h-auto object-cover'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductOption

const tags = [
  {
    id: '1',
    text: 'M',
  },
  {
    id: '2',
    text: 'L',
  },
  {
    id: '3',
    text: 'XL',
  },
]

const AddProductOption = () => {
  const [hasReadToBottom, setHasReadToBottom] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const [color, setColor] = useState('#002fff')

  const [colorTags, setColorTags] = useState<Tag[]>([
    { id: '1', text: '#ff0000' },
    { id: '2', text: '#00ff00' },
    { id: '3', text: '#0000ff' },
  ])
  const [newTag, setNewTag] = useState('')

  const addColorTag = () => {
    if (!newTag.match(/^#[0-9A-Fa-f]{6}$/)) return
    setColorTags([...colorTags, { id: Date.now().toString(), text: newTag }])
    setNewTag('')
  }

  const id = useId()
  const [exampleTags, setExampleTags] = useState<Tag[]>(tags)
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)

  const handleScroll = () => {
    const content = contentRef.current
    if (!content) return

    const scrollPercentage =
      content.scrollTop / (content.scrollHeight - content.clientHeight)
    if (scrollPercentage >= 0.99 && !hasReadToBottom) {
      setHasReadToBottom(true)
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          Add product options <IconPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-0 p-0 sm:max-h-[min(840px,80vh)] sm:max-w-xl [&>button:last-child]:top-3.5'>
        <DialogHeader className='contents space-y-0 text-left'>
          <DialogTitle className='border-b px-6 py-4 text-base'>
            Add product options
          </DialogTitle>
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className='overflow-y-auto'
          >
            <div className='px-6 py-4'>
              <div className='grid gap-2 mb-5'>
                <Label>Size</Label>
                <TagInput
                  id={id}
                  tags={exampleTags}
                  setTags={(newTags) => {
                    setExampleTags(newTags)
                  }}
                  placeholder='Add a tag'
                  styleClasses={{
                    tagList: {
                      container: 'gap-1',
                    },
                    input:
                      'rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                    tag: {
                      body: 'relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7',
                      closeButton:
                        'absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground',
                    },
                  }}
                  activeTagIndex={activeTagIndex}
                  setActiveTagIndex={setActiveTagIndex}
                  inlineTags={false}
                  inputFieldPosition='top'
                />
              </div>

              <div className='grid gap-2 mb-5'>
                <Label>
                  Color
                  <ColorPicker
                    color={color}
                    onChange={(color) => setColor(color)}
                    label='Pick A Color'
                  />
                </Label>
                <div className='flex gap-2'>
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder='#ff0000'
                    className='border px-2 py-1 rounded text-sm'
                  />
                  <button
                    onClick={addColorTag}
                    className='bg-black text-white px-3 py-1 rounded text-sm'
                  >
                    Add
                  </button>
                </div>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {colorTags.map((tag) => (
                    <div
                      key={tag.id}
                      className='flex items-center gap-2 text-white text-xs px-2 py-1 rounded border'
                      style={{ backgroundColor: tag.text }}
                    >
                      <span className='w-4 h-4 rounded-full border bg-white/50' />
                      {tag.text}
                      <button
                        onClick={() =>
                          setColorTags(colorTags.filter((t) => t.id !== tag.id))
                        }
                        className='ml-2 text-xs hover:text-red-300'
                      >
                        <IconX />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className='border-t px-6 py-4 sm:items-center'>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type='button'>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
