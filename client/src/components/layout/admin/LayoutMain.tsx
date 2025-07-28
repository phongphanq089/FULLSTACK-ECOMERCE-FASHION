import React from 'react'
import { Header } from './Header'
import ThemeToggle from './elements/ThemeToggle'
import { ProfileDropdown } from './elements/ProfileDropdown'
import { Main } from './Main'
import { Search } from './elements/Search'

const LayoutMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <div className='flex items-center gap-5'>
            <ThemeToggle />
            <ProfileDropdown />
          </div>
        </div>
      </Header>
      <Main fixed>
        <section className='flex h-full w-full gap-6'>{children}</section>
      </Main>
    </>
  )
}

export default LayoutMain
