/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import { useState } from 'react'
import { columns } from './Columnv1'
import { productData } from './data'
import { TableToolbar } from './Toolbar'
import Button from '~/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

export default function ProductTable() {
  const [data, setData] = useState(productData)
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<any[]>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  })

  const selectedRows = table.getSelectedRowModel().rows

  const handleDelete = () => {
    const idsToDelete = selectedRows.map((row) => row.original.id)
    setData((prev) => prev.filter((item) => !idsToDelete.includes(item.id)))
    table.resetRowSelection()
  }

  return (
    <div className='w-full whitespace-nowrap'>
      <TableToolbar
        filterValue={globalFilter}
        setFilter={(key: string, value: any) => {
          if (key === 'name') setGlobalFilter(value)
          else {
            const otherFilters = columnFilters.filter((f) => f.id !== key)
            setColumnFilters([...otherFilters, { id: key, value }])
          }
        }}
        selectedRows={selectedRows}
        onDelete={handleDelete}
      />

      <div className='overflow-auto border rounded-lg'>
        <table className='w-full text-sm text-left'>
          <thead className='bg-gray-100 dark:bg-background'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className='p-3 font-semibold'>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='border-t'>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='p-3 align-middle'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex items-center flex-wrap gap-3 justify-between mt-4'>
        <div className='flex items-center gap-2'>
          <span>Rows per page:</span>

          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className='w-[100px]'>
              <SelectValue placeholder='Select Value' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[10, 20, 50, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            className='max-sm:p-2'
            variant='outline'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </Button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} /{' '}
            {table.getPageCount()}
          </span>
          <Button
            className='max-sm:p-2'
            variant='outline'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
