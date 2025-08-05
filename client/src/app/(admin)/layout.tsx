import React from 'react'
import { AppSidebar } from '~/components/layout/admin/AppSidebar'
import { SidebarProvider } from '~/components/ui/sidebar'
import { SearchProvider } from '~/context/search-context'
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
        <SearchProvider>
          <SidebarProvider>
            <AppSidebar />
            <div className='p-2 w-full min-h-screen'>{children}</div>
          </SidebarProvider>
        </SearchProvider>
      </ThemeProvider>
    </div>
  )
}

export default LayoutRoot
