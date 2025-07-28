'use client'
import React, { useId, useRef, useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import Image from 'next/image'
import { Group, Input, Label, NumberField } from 'react-aria-components'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input as InputUi } from '~/components/ui/input'
import { Switch } from '~/components/ui/switch'
import { CreateProductSchemaType } from '~/validate/product/schema'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { TagInput } from 'emblor'
import { ColorPicker } from '~/components/ui/ColorPicker'
import { icon1 } from '~/assets/image'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import Button from '~/components/ui/button'

interface Tag {
  id: string
  text: string
}

const FormInputPricePolicy = () => {
  const { control, setValue, watch } = useFormContext<CreateProductSchemaType>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  })

  const id = useId()
  const variants = watch('variants')

  // State cho kích thước và màu sắc
  const [sizeTags, setSizeTags] = useState<Tag[]>([
    { id: '1', text: 'M' },
    { id: '2', text: 'L' },
    { id: '3', text: 'XL' },
  ])
  const [colorTags, setColorTags] = useState<Tag[]>([
    { id: '1', text: '#ff0000' },
    { id: '2', text: '#00ff00' },
    { id: '3', text: '#0000ff' },
  ])

  return (
    <Card className='mt-10'>
      <CardHeader className='border-b'>
        <CardTitle>Price Policy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='mb-5'>
          <div className='flex justify-between items-center mb-5'>
            <h3>Variant Information</h3>
            <div className='flex gap-2'>
              <AddProductOption
                sizeTags={sizeTags}
                setSizeTags={setSizeTags}
                colorTags={colorTags}
                setColorTags={setColorTags}
              />
              <Button
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
                className='bg-primary text-primary-foreground px-4 py-2 rounded-md'
              >
                Add Variant
              </Button>
            </div>
          </div>

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
              <div key={field.id} className='border p-4 rounded-md mb-4'>
                <div className='flex justify-between items-center mb-4'>
                  <h4 className='font-medium'>Variant {index + 1}</h4>
                  {fields.length > 1 && (
                    <Button
                      onClick={() => remove(index)}
                      className='text-destructive'
                    >
                      Remove
                    </Button>
                  )}
                </div>

                {/* Size and Color Select */}
                <div className='grid grid-cols-2 gap-5 mb-5'>
                  <div className='grid gap-2'>
                    <Label className='text-sm font-medium'>Size</Label>
                    <Controller
                      control={control}
                      name={`variants.${index}.sizeId`}
                      render={({ field }) => (
                        <Select
                          value={field.value?.toString()}
                          onValueChange={(key) => field.onChange(Number(key))}
                        >
                          <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='Select a fruit' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select a size</SelectLabel>
                              {sizeTags.map((tag) => (
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
                      )}
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label className='text-sm font-medium'>Color</Label>
                    <Controller
                      control={control}
                      name={`variants.${index}.colorId`}
                      render={({ field }) => (
                        <Select
                          value={field.value?.toString()}
                          onValueChange={(key) => field.onChange(Number(key))}
                        >
                          <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='Select a fruit' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select a size</SelectLabel>
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
                      )}
                    />
                  </div>
                </div>

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
                                setValue(
                                  `variants.${index}.profitMargin`,
                                  margin
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
                                  Price
                                </Label>
                                <Group className='border-input outline-none data-[focus-within]:border-ring data-[focus-within]:ring-ring/50 data-[focus-within]:has-[aria-invalid]:ring-destructive/20 dark:data-[focus-within]:has-[aria-invalid]:ring-destructive/40 data-[focus-within]:has-[aria-invalid]:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-[disabled]:opacity-50 data-[focus-within]:ring-[3px]'>
                                  <Input className='bg-background text-foreground flex-1 px-3 py-2 tabular-nums' />
                                  <div className='flex h-[calc(100%+2px)] flex-col'>
                                    <Button
                                      slot='increment'
                                      className='border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                                    >
                                      <ChevronUpIcon
                                        size={12}
                                        aria-hidden='true'
                                      />
                                    </Button>
                                    <Button
                                      slot='decrement'
                                      className='border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                                    >
                                      <ChevronDownIcon
                                        size={12}
                                        aria-hidden='true'
                                      />
                                    </Button>
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
                              id={`${id}-discount-${index}`}
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
                          htmlFor={`${id}-discount-${index}`}
                          className='text-sm font-medium'
                        >
                          Discount
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                {enableDiscount && (
                  <div className='grid grid-cols-2 gap-5 mb-5'>
                    <div className='*:not-first:mt-2'>
                      <Label>Discount</Label>
                      <div className='relative'>
                        <Controller
                          control={control}
                          name={`variants.${index}.discountPercent`}
                          render={({ field }) => (
                            <InputUi
                              id={`discount-${index}`}
                              value={field.value || 0}
                              onChange={(e) => {
                                const val = Number(e.target.value)
                                field.onChange(val)
                                const newFinalPrice =
                                  price - (price * val) / 100
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
                              className='peer ps-6 pe-12'
                              placeholder='0.00'
                              type='number'
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
                      <InputUi
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
                            setValue(
                              `variants.${index}.profit`,
                              finalPrice - val
                            )
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
                              <Input className='bg-background text-foreground flex-1 px-3 py-2 tabular-nums' />
                              <div className='flex h-[calc(100%+2px)] flex-col'>
                                <Button
                                  slot='increment'
                                  className='border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                                >
                                  <ChevronUpIcon size={12} aria-hidden='true' />
                                </Button>
                                <Button
                                  slot='decrement'
                                  className='border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                                >
                                  <ChevronDownIcon
                                    size={12}
                                    aria-hidden='true'
                                  />
                                </Button>
                              </div>
                            </Group>
                          </div>
                        </NumberField>
                      )}
                    />
                  </div>
                  <div className='grid gap-2 w-full'>
                    <Label className='text-sm font-medium'>Profit</Label>
                    <InputUi
                      readOnly
                      value={profit.toFixed(2)}
                      className='ps-3'
                    />
                  </div>
                  <div className='grid gap-2 w-full'>
                    <Label className='text-sm font-medium'>Margin</Label>
                    <InputUi readOnly value={`${margin.toFixed(2)} %`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// Component AddProductOption
const AddProductOption = ({
  sizeTags,
  setSizeTags,
  colorTags,
  setColorTags,
}: {
  sizeTags: Tag[]
  setSizeTags: React.Dispatch<React.SetStateAction<Tag[]>>
  colorTags: Tag[]
  setColorTags: React.Dispatch<React.SetStateAction<Tag[]>>
}) => {
  const [hasReadToBottom, setHasReadToBottom] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [color, setColor] = useState('#002fff')
  const [newTag, setNewTag] = useState('')
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)
  const id = useId()

  const handleScroll = () => {
    const content = contentRef.current
    if (!content) return
    const scrollPercentage =
      content.scrollTop / (content.scrollHeight - content.clientHeight)
    if (scrollPercentage >= 0.99 && !hasReadToBottom) {
      setHasReadToBottom(true)
    }
  }

  const addColorTag = () => {
    if (!newTag.match(/^#[0-9A-Fa-f]{6}$/)) return
    setColorTags([...colorTags, { id: Date.now().toString(), text: newTag }])
    setNewTag('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add product options</Button>
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
                  tags={sizeTags}
                  setTags={setSizeTags}
                  placeholder='Add a size'
                  styleClasses={{
                    tagList: { container: 'gap-1' },
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
                    onChange={setColor}
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
                      ></button>
                    </div>
                  ))}
                </div>
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

export default FormInputPricePolicy
