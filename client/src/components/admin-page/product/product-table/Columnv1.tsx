'use client'
import { IconEdit, IconTrash } from '@tabler/icons-react'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '~/components/ui/checkbox'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(val) => table.toggleAllRowsSelected(!!val)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(val) => row.toggleSelected(!!val)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'imageUrl',
    header: '',
    cell: ({ row }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={row.original.imageUrl}
        alt={row.original.name}
        className='h-12 w-12 rounded object-cover'
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Product Name',
  },
  {
    accessorKey: 'category.name',
    header: 'Category',
  },
  {
    accessorKey: 'brand.name',
    header: 'Brand',
  },
  {
    header: 'Price',
    cell: ({ row }) => {
      const prices = row.original.variants.map((v: any) => v.price)
      const min = Math.min(...prices)
      const max = Math.max(...prices)
      return min === max
        ? `${min.toLocaleString()}₫`
        : `${min.toLocaleString()}₫ - ${max.toLocaleString()}₫`
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 text-xs rounded font-medium ${
          row.original.isActive
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {row.original.isActive ? 'Active' : 'Inactive'}
      </span>
    ),
  },
  {
    accessorKey: 'Action',
    header: 'Action',
    cell: () => (
      <div className='flex items-center gap-3'>
        <div className='border p-2 rounded-xl cursor-pointer'>
          <IconTrash />
        </div>
        <div className='border p-2 rounded-xl cursor-pointer'>
          <IconEdit />
        </div>
      </div>
    ),
  },
]
