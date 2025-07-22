import React from 'react'
import { ProfileDropdown } from '~/components/layout/admin/elements/ProfileDropdown'
import ThemeToggle from '~/components/layout/admin/elements/ThemeToggle'
import { Header } from '~/components/layout/admin/Header'
import { Main } from '~/components/layout/admin/Main'

const DashBoardPage = () => {
  return (
    <>
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeToggle />
          <ProfileDropdown />
        </div>
      </Header>
      <Main fixed>
        <section className='flex h-full gap-6'>Dashboard</section>
      </Main>
    </>
  )
}

export default DashBoardPage
