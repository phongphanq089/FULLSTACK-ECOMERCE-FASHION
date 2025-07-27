'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import UploadImage from './UploadImage'

const MediaUploadForm = () => {
  return (
    <Card>
      <CardHeader className='border-b'>
        <CardTitle>Upload media</CardTitle>
      </CardHeader>
      <CardContent>
        <UploadImage />
      </CardContent>
    </Card>
  )
}

export default MediaUploadForm
