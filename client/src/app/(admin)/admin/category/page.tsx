import React from 'react'
import HeaderTop from '~/components/admin-page/category/list/HeaderTop'
import ListCategory from '~/components/admin-page/category/list/ListCategory'
import LayoutMain from '~/components/layout/admin/LayoutMain'

const PageCategory = () => {
  return (
    <LayoutMain>
      <div className='max-w-7xl w-full mx-auto'>
        <HeaderTop />
        <ListCategory />
      </div>
    </LayoutMain>
  )
}

export default PageCategory
