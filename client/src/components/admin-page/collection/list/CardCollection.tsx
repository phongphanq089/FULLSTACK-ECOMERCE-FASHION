'use client'

import {
  IconDots,
  IconEdit,
  IconImageInPicture,
  IconTrash,
} from '@tabler/icons-react'
import React from 'react'
import { AspectRatio } from '~/components/ui/aspect-ratio'
import { Badge } from '~/components/ui/badge'
import { Card, CardContent } from '~/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

interface ProsCard {
  title: string
  productCount: number
  categoryCount: number
}

const CardCollection = ({ title, productCount, categoryCount }: ProsCard) => {
  return (
    <Card className='group cursor-pointer hover:shadow-lg transition-all custom-gradient dark:custom-gradient-dark  duration-200 border-2 border-dashed hover:border-blue-400'>
      <CardContent className='p-0'>
        <AspectRatio ratio={16 / 9} className='relative'>
          {/* {item.image && <img src={item.image} alt={item.title} />} */}
          <div className='rounded-full  w-fit -top-2 right-3 absolute'>
            <ActionCard />
          </div>

          <div className='flex items-center gap-5 absolute -bottom-1 left-5'>
            <div className='flex flex-col gap-3'>
              <h3>{title}</h3>
              <div className='flex items-center gap-3'>
                <Badge>Product {productCount}</Badge>
                <Badge>Category {categoryCount}</Badge>
              </div>
            </div>
          </div>
        </AspectRatio>
      </CardContent>
    </Card>
  )
}

export default CardCollection

const ActionCard = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconDots />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <div className='w-full flex items-center gap-3'>
            <IconEdit /> Edit
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className='w-full flex items-center gap-3'>
            <IconImageInPicture /> Add image
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className='w-full flex items-center gap-3'>
            <IconTrash /> Delete
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
