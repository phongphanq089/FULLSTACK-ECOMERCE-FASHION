import React from 'react'
import FormBrand from '~/components/admin-page/brand/form-brand/FormBrand'
import LayoutMain from '~/components/layout/admin/LayoutMain'
import MainLayoutForm from '~/components/layout/admin/MainLayoutForm'

const PageCreate = () => {
  return (
    <LayoutMain>
      <MainLayoutForm title='ADD BRAND'>
        <FormBrand />
      </MainLayoutForm>
    </LayoutMain>
  )
}

export default PageCreate
