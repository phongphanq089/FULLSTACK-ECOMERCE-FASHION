'use client'

import { IconInfoCircleFilled, IconPlus } from '@tabler/icons-react'
import React, { useRef, useState } from 'react'
import QuillEditor from '~/components/shared/QuillEditor'
import Button from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'

const InfomationProduct = () => {
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
              <Input type='text' placeholder='Name Product...' />
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
              <Input type='text' placeholder='VD : NEW PRODUCT' />
            </div>
          </div>

          <div className='grid gap-2 overflow-x-auto mb-5'>
            <Label className='mb-2'>Description</Label>
            <div className='border h-[200px] rounded-2xl overflow-y-auto  editorjs'>
              <QuillEditor holderId='editorjs-1' />
            </div>
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
  const [hasReadToBottom, setHasReadToBottom] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

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
          Add information section <IconPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-0 p-0 sm:max-h-[min(840px,80vh)] sm:max-w-4xl [&>button:last-child]:top-3.5'>
        <DialogHeader className='contents space-y-0 text-left'>
          <DialogTitle className='border-b px-6 py-4 text-base'>
            Add information section
          </DialogTitle>
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className='overflow-y-auto'
          >
            <div className='px-6 py-4'>
              <div className='grid gap-2 mb-5'>
                <Label>Information section title</Label>
                <Input type='text' placeholder='vd: specifications ' />
              </div>

              <div className='grid gap-2 overflow-x-auto mb-5'>
                <Label className='mb-2'>Description</Label>
                <div className='border h-[200px] rounded-2xl overflow-y-auto  editorjs'>
                  <QuillEditor holderId='editorjs-2' />
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
            <Button type='button'>I agree</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
