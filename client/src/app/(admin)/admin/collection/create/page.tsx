import React from 'react'
import Layout from '~/components/admin-page/collection/form-collection/Layout'
import LayoutMain from '~/components/layout/admin/LayoutMain'
import MainLayoutForm from '~/components/layout/admin/MainLayoutForm'

const PageCreate = () => {
  return (
    <LayoutMain>
      <MainLayoutForm title='ADD NEW COLLECTION'>
        <Layout />
      </MainLayoutForm>
    </LayoutMain>
  )
}

export default PageCreate
