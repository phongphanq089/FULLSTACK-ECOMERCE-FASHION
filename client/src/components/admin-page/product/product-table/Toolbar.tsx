/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Input } from '~/components/ui/input'
import Button from '~/components/ui/button'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

export function TableToolbar({
  filterValue,
  setFilter,
  selectedRows,
  onDelete,
}: any) {
  const [status, setStatus] = useState('all')

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    setFilter(
      'isActive',
      newStatus === 'all' ? undefined : newStatus === 'active'
    )
  }

  return (
    <div className='flex items-center justify-between mb-4'>
      <div className='flex gap-2'>
        <Input
          placeholder='Search product name...'
          value={filterValue || ''}
          onChange={(e) => setFilter('name', e.target.value)}
        />

        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select a fruit' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='banana'>Active</SelectItem>
              <SelectItem value='inactive'>Inactive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {selectedRows.length > 0 && (
        <Button onClick={onDelete}>
          Delete Selected ({selectedRows.length})
        </Button>
      )}
    </div>
  )
}
