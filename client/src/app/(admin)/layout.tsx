import React from 'react'
import { AppSidebar } from '~/components/layout/admin/AppSidebar'

const LayoutRoot = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <AppSidebar />
      <div> {children}</div>
    </div>
  )
}

export default LayoutRoot
