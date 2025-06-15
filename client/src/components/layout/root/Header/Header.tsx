import React from 'react'
import LogoUi from '~/components/shared/LogoUi'
import ListNavDesktop from './elements/ListNavDesktop'
import ActionRightHeader from './elements/ActionRightHeader'
import MenuMobileNavbar from './elements/MenuMobileNavbar'

const Header = () => {
  return (
    <>
      <header className='px-8 py-3 flex items-center justify-between  z-30 fixed top-0 left-1/2 -translate-x-1/2 w-full bg-white/30 backdrop-blur rounded-2xl 2xl:rounded-4xl'>
        <LogoUi />

        <ListNavDesktop />

        <ActionRightHeader />
      </header>
      <MenuMobileNavbar />
    </>
  )
}

export default Header
