/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import JoditEditor from 'jodit-react'
import { useFormContext } from 'react-hook-form'
import { CreateProductSchemaType } from '~/validate/product/schema'

type FormEditorProps = {
  placeholder?: string
  name: keyof CreateProductSchemaType | string
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
}

const FormEditor = ({
  placeholder,
  name,
  defaultValue = '',
  value,
  onChange,
}: FormEditorProps) => {
  const editor = useRef(null)
  const [content, setContent] = useState(defaultValue)

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()

  const watchedValue = watch(name)

  useEffect(() => {
    if (watchedValue !== undefined && value === undefined) {
      setContent(watchedValue || '')
    }
  }, [watchedValue, value])

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typings...',
      uploader: {
        insertImageAsBase64URI: false, // Không dùng base64
        url: '/api/upload-image', // Route server nhận ảnh (trả về URL ảnh)
        format: 'json',
        filesVariableName: function () {
          return 'file' // tên key trong FormData.append('file', ...)
        },
        pathVariableName: 'path', // optional
        headers: {
          Authorization: 'Bearer ...', // nếu bạn cần token
        },
      },
      events: {
        onAfterUpload: function (response: any) {
          console.log('Upload response', response)
        },
      },
    }),
    [placeholder]
  )

  return (
    <>
      <JoditEditor
        ref={editor}
        value={value !== undefined ? value : content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => {
          if (onChange) {
            onChange(newContent)
          } else {
            setContent(newContent)
          }
        }}
        onChange={(newContent) => {
          if (onChange) {
            onChange(newContent)
          } else {
            setContent(newContent)
            setValue(name, newContent)
          }
        }}
        className='min-h-[300px]'
      />
      {errors.name && (
        <p className='text-red-500'>
          {errors?.[name as keyof typeof errors]?.message?.toString()}
        </p>
      )}
    </>
  )
}

export default FormEditor
