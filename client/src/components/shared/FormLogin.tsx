'use client'
import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react'
import { cn } from '~/lib/utils'
import Button from '~/components/ui/button'

import { Input } from '~/components/ui/input'

import Link from 'next/link'
import { PasswordInput } from '../ui/PasswordInput'

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
})

type UserLoginSchemaType = z.infer<typeof formSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserLoginSchemaType>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(payload: UserLoginSchemaType) {
    setIsLoading(true)
    // eslint-disable-next-line no-console
    console.log(payload)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <div>
          <Input {...register('email')} placeholder='m@example.com' />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
          )}
        </div>
        <div>
          <PasswordInput placeholder='********' {...register('password')} />
          <Link
            href='/forgot-password'
            className='text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75'
          >
            Forgot password?
          </Link>
        </div>
        <Button className='mt-2' disabled={isLoading}>
          Login
        </Button>

        <div className='relative my-2'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background text-muted-foreground px-2'>
              Or continue with
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <Button type='button' disabled={isLoading}>
            <IconBrandGoogle className='h-4 w-4 mr-4' /> Google
          </Button>
          <Button type='button' disabled={isLoading}>
            <IconBrandFacebook className='h-4 w-4 mr-4' /> Facebook
          </Button>
        </div>
      </form>
    </div>
  )
}
