'use client'
import React, { useId, useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { Button, Group, Input, Label, NumberField } from 'react-aria-components'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input as InputUi } from '~/components/ui/input'
import { Switch } from '~/components/ui/switch'

const FormInputPricePolicy = () => {
  const id = useId()
  const [checked, setChecked] = useState<boolean>(true)
  return (
    <Card className='mt-10'>
      <CardHeader className='border-b'>
        <CardTitle>Price policy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='mb-5'>
          <h3 className='mb-5'>Information Basic</h3>
          <div className='lg:grid grid-cols-12 gap-3 mb-5'>
            <div className='col-span-9'>
              <div className='flex max-lg:flex-col items-end gap-4 w-full'>
                <div className='grid gap-2 w-full'>
                  <NumberField
                    defaultValue={99}
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
                      <Group className='border-input doutline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:ring-[3px]'>
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
                            <ChevronDownIcon size={12} aria-hidden='true' />
                          </Button>
                        </div>
                      </Group>
                    </div>
                  </NumberField>
                </div>
                <div className='inline-flex items-center gap-2'>
                  <Switch
                    id={id}
                    checked={checked}
                    onCheckedChange={setChecked}
                    aria-label='Toggle switch'
                  />
                  <Label htmlFor={id} className='text-sm font-medium'>
                    {checked ? 'Discount' : 'Discount'}
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-5 mb-5'>
            <div className='*:not-first:mt-2'>
              <Label htmlFor={id}>Discount</Label>
              <div className='relative'>
                <InputUi
                  id={id}
                  className='peer ps-6 pe-12'
                  placeholder='0.00'
                  type='number'
                />
                <span className='text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50'>
                  %
                </span>
              </div>
            </div>
            <div className='grid gap-2 w-full'>
              <NumberField
                defaultValue={99}
                formatOptions={{
                  style: 'currency',
                  currency: 'USD',
                  currencySign: 'accounting',
                }}
              >
                <div className='*:not-first:mt-2'>
                  <Label className='text-foreground text-sm font-medium'>
                    Cheap price
                  </Label>
                  <Group className='border-input doutline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:ring-[3px]'>
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
                        <ChevronDownIcon size={12} aria-hidden='true' />
                      </Button>
                    </div>
                  </Group>
                </div>
              </NumberField>
            </div>
          </div>

          <div className='flex items-center flex-wrap gap-5'>
            <div className='grid gap-2 w-full'>
              <NumberField
                defaultValue={99}
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
                  <Group className='border-input doutline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:ring-[3px]'>
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
                        <ChevronDownIcon size={12} aria-hidden='true' />
                      </Button>
                    </div>
                  </Group>
                </div>
              </NumberField>
            </div>
            <div className='grid gap-2 w-full'>
              <NumberField
                defaultValue={99}
                formatOptions={{
                  style: 'currency',
                  currency: 'USD',
                  currencySign: 'accounting',
                }}
              >
                <div className='*:not-first:mt-2'>
                  <Label className='text-foreground text-sm font-medium'>
                    Profit
                  </Label>
                  <Group className='border-input doutline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:ring-[3px]'>
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
                        <ChevronDownIcon size={12} aria-hidden='true' />
                      </Button>
                    </div>
                  </Group>
                </div>
              </NumberField>
            </div>
            <div className='*:not-first:mt-2 w-full'>
              <Label htmlFor={id}>Margin</Label>
              <div className='relative'>
                <InputUi
                  id={id}
                  className='peer ps-6 pe-12'
                  placeholder='0.00'
                  type='number'
                />
                <span className='text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50'>
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FormInputPricePolicy
