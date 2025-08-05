/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { IconPlus, IconX } from '@tabler/icons-react'
import { TagInput } from 'emblor'
import { useEffect, useId, useRef, useState } from 'react'
import Button from '~/components/ui/button'
import { ColorPicker } from '~/components/ui/ColorPicker'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { useProductOptionStore } from '~/store/useProductOptionStore'

export const AddProductOption = () => {
  const {
    sizes,
    setSizes,
    // addSize,
    // removeSize,
    colorTags,
    addColorTag,
    removeColorTag,
    fetchOptionsFromAPI,
  } = useProductOptionStore()

  const [newColor, setNewColor] = useState('')
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)
  const [color, setColor] = useState('#002fff')

  const id = useId()
  const contentRef = useRef<HTMLDivElement>(null)
  const [hasReadToBottom, setHasReadToBottom] = useState(false)

  const handleAddColor = () => {
    if (!newColor.match(/^#[0-9A-Fa-f]{6}$/)) return
    addColorTag({ id: Date.now().toString(), text: newColor })
    setNewColor('')
  }

  const handleScroll = () => {
    const content = contentRef.current
    if (!content) return

    const scrollPercentage =
      content.scrollTop / (content.scrollHeight - content.clientHeight)
    if (scrollPercentage >= 0.99 && !hasReadToBottom) {
      setHasReadToBottom(true)
    }
  }
  useEffect(() => {
    fetchOptionsFromAPI()
  }, [])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          Add product options <IconPlus size={14} />
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
                  tags={sizes}
                  setTags={setSizes}
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
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder='#ff0000'
                    className='border px-2 py-1 rounded text-sm'
                  />
                  <button
                    onClick={handleAddColor}
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
                        onClick={() => removeColorTag(tag.id)}
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
