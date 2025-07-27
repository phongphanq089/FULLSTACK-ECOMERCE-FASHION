import React from 'react'
import { Header } from './Header'
import ThemeToggle from './elements/ThemeToggle'
import { ProfileDropdown } from './elements/ProfileDropdown'
import { Main } from './Main'

const LayoutMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeToggle />
          <ProfileDropdown />
        </div>
      </Header>
      <Main fixed>
        <section className='flex h-full w-full gap-6'>{children}</section>
      </Main>
    </>
  )
}

export default LayoutMain
