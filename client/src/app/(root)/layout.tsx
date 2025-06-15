import React from 'react'
import Footer from '~/components/layout/root/footer/Footer'

import Header from '~/components/layout/root/Header/Header'

const LayoutRoot = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1'> {children} </main>
      <Footer />
    </div>
  )
}

export default LayoutRoot
