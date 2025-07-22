import React from 'react'
import { AppSidebar } from '~/components/layout/admin/AppSidebar'
import { SidebarProvider } from '~/components/ui/sidebar'
import { ThemeProvider } from '~/providers/ThemeProvider'

const LayoutRoot = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='min-h-screen'>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AppSidebar />
          <div className='p-2 w-full min-h-screen'>{children}</div>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  )
}

export default LayoutRoot
