import React from 'react'
import ListBrand from '~/components/admin-page/brand/list/BrandList'
import HeaderTop from '~/components/admin-page/brand/list/HeaderTop'
import LayoutMain from '~/components/layout/admin/LayoutMain'

const PageListBrand = () => {
  return (
    <LayoutMain>
      <div className='max-w-7xl w-full mx-auto'>
        <HeaderTop />
        <ListBrand />
      </div>
    </LayoutMain>
  )
}

export default PageListBrand
