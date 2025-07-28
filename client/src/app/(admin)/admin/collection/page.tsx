import React from 'react'
import HeaderTop from '~/components/admin-page/collection/list/HeaderTop'
import ListCollection from '~/components/admin-page/collection/list/ListCollection'
import LayoutMain from '~/components/layout/admin/LayoutMain'

const PageCollection = () => {
  return (
    <LayoutMain>
      <div className='max-w-7xl w-full mx-auto'>
        <HeaderTop />
        <ListCollection />
      </div>
    </LayoutMain>
  )
}

export default PageCollection
