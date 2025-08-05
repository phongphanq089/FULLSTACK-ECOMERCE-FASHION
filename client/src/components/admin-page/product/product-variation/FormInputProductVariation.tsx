'use client'

import { IconInfoCircleFilled, IconTrash } from '@tabler/icons-react'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import React from 'react'
import {
  Group,
  NumberField,
  Input as InputUi,
  Button as ButtonUi,
} from 'react-aria-components'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import Button from '~/components/ui/button'
import { ButtonAction } from '~/components/ui/ButtonAction'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Switch } from '~/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { useProductOptionStore } from '~/store/useProductOptionStore'
import { CreateProductSchemaType } from '~/validate/product/schema'

const FormInputProductVariation = () => {
  const { sizes, colorTags } = useProductOptionStore()
  const { control, setValue, watch } = useFormContext<CreateProductSchemaType>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  })

  const variants = watch('variants')

  return (
    <div>
      {fields.map((field, index) => {
        const price = variants[index]?.price || 0
        const cost = variants[index]?.costPrice || 0
        const discountPercent = variants[index]?.discountPercent || 0

        const enableDiscount = discountPercent !== undefined

        const finalPrice = enableDiscount
          ? price - (price * discountPercent) / 100
          : price
        const profit = finalPrice - cost
        const margin = finalPrice > 0 ? (profit / finalPrice) * 100 : 0

        return (
          <div key={field.id} className='border px-4 py-8 rounded-md mb-4'>
            <div className='flex justify-between items-center mb-4'>
              <div className='flex justify-between items-center mb-5 w-full'>
                <h3>Variant Information</h3>

                <Button
                  className='text-xs'
                  onClick={() =>
                    append({
                      sku: '',
                      price: 0,
                      originalPrice: 0,
                      discountPercent: 0,
                      costPrice: 0,
                      profit: 0,
                      profitMargin: 0,
                      stock: 0,
                      colorId: undefined,
                      sizeId: undefined,
                    })
                  }
                >
                  Add Variation
                </Button>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between gap-3 border-b pb-3'>
                <h4 className='font-medium '>Variant {index + 1}</h4>
                {fields.length > 1 && (
                  <ButtonAction
                    onClick={() => remove(index)}
                    className='rounded-full'
                    variant='outline'
                    size='icon'
                    aria-label='Add new item'
                  >
                    <IconTrash size={16} aria-hidden='true' />
                  </ButtonAction>
                )}
              </div>
              {/* ===== Size and Color Select ===== */}
              <div className='grid grid-cols-2 gap-5 mb-5'>
                <div className='grid gap-2'>
                  <Label className='text-sm font-medium'>Size</Label>
                  <Controller
                    control={control}
                    name={`variants.${index}.sizeId`}
                    render={({ field }) => {
                      return (
                        <Select
                          value={field.value?.toString()}
                          onValueChange={(key) => field.onChange(Number(key))}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select a color' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select a size</SelectLabel>
                              {sizes.map((tag) => (
                                <SelectItem
                                  key={tag.id}
                                  id={tag.id}
                                  value={tag.id}
                                >
                                  {tag.text}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )
                    }}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label className='text-sm font-medium'>Color</Label>
                  <Controller
                    control={control}
                    name={`variants.${index}.colorId`}
                    render={({ field }) => {
                      return (
                        <Select
                          value={field.value?.toString()}
                          onValueChange={(key) => field.onChange(Number(key))}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select a color' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select a color</SelectLabel>
                              {colorTags.map((tag) => (
                                <SelectItem
                                  key={tag.id}
                                  id={tag.id}
                                  value={tag.id}
                                >
                                  {tag.text}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )
                    }}
                  />
                </div>
              </div>
              {/* ===== Price and Discount === */}
              <div className='lg:grid grid-cols-12 gap-3 mb-5'>
                <div className='col-span-9'>
                  <div className='flex max-lg:flex-col items-end gap-4 w-full'>
                    <div className='grid gap-2 w-full'>
                      <Controller
                        control={control}
                        name={`variants.${index}.price`}
                        render={({ field }) => (
                          <NumberField
                            value={field.value}
                            onChange={(val) => {
                              field.onChange(val)
                              setValue(
                                `variants.${index}.profit`,
                                finalPrice - cost
                              )
                              setValue(`variants.${index}.profitMargin`, margin)
                            }}
                            formatOptions={{
                              style: 'currency',
                              currency: 'USD',
                              currencySign: 'accounting',
                            }}
                          >
                            <div className='*:not-first:mt-2'>
                              <Label className='text-foreground text-sm font-medium'>
                                Price
                              </Label>
                              <Group className='border-input outline-none data-[focus-within]:border-ring data-[focus-within]:ring-ring/50 data-[focus-within]:has-[aria-invalid]:ring-destructive/20 dark:data-[focus-within]:has-[aria-invalid]:ring-destructive/40 data-[focus-within]:has-[aria-invalid]:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-[disabled]:opacity-50 data-[focus-within]:ring-[3px]'>
                                <InputUi className='bg-background dark:bg-muted text-foreground flex-1 px-3 py-2 tabular-nums' />
                                <div className='flex h-[calc(100%+2px)] flex-col'>
                                  <ButtonUi
                                    slot='increment'
                                    className='border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                                  >
                                    <ChevronUpIcon
                                      size={12}
                                      aria-hidden='true'
                                    />
                                  </ButtonUi>
                                  <ButtonUi
                                    slot='decrement'
                                    className='border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                                  >
                                    <ChevronDownIcon
                                      size={12}
                                      aria-hidden='true'
                                    />
                                  </ButtonUi>
                                </div>
                              </Group>
                            </div>
                          </NumberField>
                        )}
                      />
                    </div>
                    <div className='inline-flex items-center gap-2'>
                      <Controller
                        control={control}
                        name={`variants.${index}.discountPercent`}
                        render={({ field }) => (
                          <Switch
                            id={`$-discount-${index}`}
                            checked={!!field.value}
                            onCheckedChange={(isSelected) => {
                              const newDiscount = isSelected ? 0 : undefined
                              field.onChange(newDiscount)

                              const newFinalPrice = isSelected ? price : price

                              setValue(
                                `variants.${index}.originalPrice`,
                                newFinalPrice
                              )
                              setValue(
                                `variants.${index}.profit`,
                                newFinalPrice - cost
                              )
                              setValue(
                                `variants.${index}.profitMargin`,
                                newFinalPrice > 0
                                  ? ((newFinalPrice - cost) / newFinalPrice) *
                                      100
                                  : 0
                              )
                            }}
                            aria-label={`Toggle discount for variant ${
                              index + 1
                            }`}
                          />
                        )}
                      />
                      <Label
                        htmlFor={`$-discount-${index}`}
                        className='text-sm font-medium'
                      >
                        Discount
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== discount price  ===== */}
              {enableDiscount && (
                <div className='grid grid-cols-2 gap-5 mb-5'>
                  <div className='grid gap-3 w-full'>
                    <Label>Discount</Label>
                    <div className='relative'>
                      <Controller
                        control={control}
                        name={`variants.${index}.discountPercent`}
                        render={({ field }) => (
                          <Input
                            id={`discount-${index}`}
                            value={field.value || 0}
                            onChange={(e) => {
                              const val = Number(e.target.value)
                              field.onChange(val)
                              const newFinalPrice = price - (price * val) / 100
                              setValue(
                                `variants.${index}.originalPrice`,
                                newFinalPrice
                              )
                              setValue(
                                `variants.${index}.profit`,
                                newFinalPrice - cost
                              )
                              setValue(
                                `variants.${index}.profitMargin`,
                                newFinalPrice > 0
                                  ? ((newFinalPrice - cost) / newFinalPrice) *
                                      100
                                  : 0
                              )
                            }}
                            placeholder='0.00'
                            type='text'
                            min='0'
                            max='100'
                          />
                        )}
                      />
                      <span className='text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50'>
                        %
                      </span>
                    </div>
                  </div>
                  <div className='grid gap-2 w-full'>
                    <Label className='text-sm font-medium'>Final Price</Label>
                    <Input
                      readOnly
                      value={finalPrice.toFixed(2)}
                      className='ps-3'
                    />
                  </div>
                </div>
              )}

              <div className='flex items-center flex-wrap gap-5'>
                <div className='grid gap-2 w-full'>
                  <Controller
                    control={control}
                    name={`variants.${index}.costPrice`}
                    render={({ field }) => (
                      <NumberField
                        value={field.value || 0}
                        onChange={(val) => {
                          field.onChange(val)
                          setValue(`variants.${index}.profit`, finalPrice - val)
                          setValue(
                            `variants.${index}.profitMargin`,
                            finalPrice > 0
                              ? ((finalPrice - val) / finalPrice) * 100
                              : 0
                          )
                        }}
                        formatOptions={{
                          style: 'currency',
                          currency: 'USD',
                          currencySign: 'accounting',
                        }}
                      >
                        <div className='*:not-first:mt-2'>
                          <Label className='text-foreground text-sm font-medium'>
                            Cost of goods
                          </Label>
                          <Group className='border-input outline-none data-[focus-within]:border-ring data-[focus-within]:ring-ring/50 data-[focus-within]:has-[aria-invalid]:ring-destructive/20 dark:data-[focus-within]:has-[aria-invalid]:ring-destructive/40 data-[focus-within]:has-[aria-invalid]:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-[disabled]:opacity-50 data-[focus-within]:ring-[3px]'>
                            <InputUi className='bg-background dark:bg-muted text-foreground flex-1 px-3 py-2 tabular-nums' />
                            <div className='flex h-[calc(100%+2px)] flex-col'>
                              <ButtonUi
                                slot='increment'
                                className='border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                              >
                                <ChevronUpIcon size={12} aria-hidden='true' />
                              </ButtonUi>
                              <ButtonUi
                                slot='decrement'
                                className='border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                              >
                                <ChevronDownIcon size={12} aria-hidden='true' />
                              </ButtonUi>
                            </div>
                          </Group>
                        </div>
                      </NumberField>
                    )}
                  />
                </div>
                <div className='grid gap-2 w-full'>
                  <Label className='text-sm font-medium'>Profit</Label>
                  <Input readOnly value={profit.toFixed(2)} className='ps-3' />
                </div>
                <div className='grid gap-2 w-full'>
                  <Label className='text-sm font-medium'>Margin</Label>
                  <Input readOnly value={`${margin.toFixed(2)} %`} />
                </div>
              </div>
              <div className='flex items-center  gap-4'>
                <div className='grid gap-2 w-full'>
                  <div className='*:not-first:mt-2'>
                    <Label className='mb-4'>Stock</Label>
                    <div className='relative'>
                      <Controller
                        control={control}
                        name={`variants.${index}.stock`}
                        render={({ field }) => {
                          return (
                            <Input
                              {...field}
                              value={field.value ?? ''}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              className='peer ps-6 pe-12'
                              placeholder='0.00'
                              type='text'
                            />
                          )
                        }}
                      />
                      <span className='text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50'>
                        %
                      </span>
                    </div>
                  </div>
                </div>
                <div className='grid gap-2 w-full '>
                  <div className='flex items-center gap-2'>
                    <Label>SKU</Label>

                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>
                            <IconInfoCircleFilled />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className='px-2 py-1 text-xs'>
                          {`A "Stock Keeping Unit" is a unique code that you can create for each product or variant that you have in your store. Use SKU to help track inventory.`}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Controller
                    control={control}
                    name={`variants.${index}.sku`}
                    render={({ field }) => {
                      return <Input {...field} type='text' placeholder='' />
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FormInputProductVariation
