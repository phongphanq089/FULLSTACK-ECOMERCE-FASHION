import React from 'react'
import MainFormLayout from '~/components/admin-page/category/create/MainFormLayout'
import LayoutMain from '~/components/layout/admin/LayoutMain'
import MainLayoutForm from '~/components/layout/admin/MainLayoutForm'

const PageCreate = () => {
  return (
    <LayoutMain>
      <MainLayoutForm title='Add category'>
        <MainFormLayout />
      </MainLayoutForm>
    </LayoutMain>
  )
}

export default PageCreate
