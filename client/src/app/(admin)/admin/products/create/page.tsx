import React from 'react'
import FormInputProduct from '~/components/admin-page/product/FormInputProduct'
import LayoutForm from '~/components/admin-page/product/LayoutForm'
import LayoutMain from '~/components/layout/admin/LayoutMain'

const CreateProduct = () => {
  return (
    <LayoutMain>
      <LayoutForm title='ADD NEW PRODUCT'>
        <FormInputProduct />
      </LayoutForm>
    </LayoutMain>
  )
}

export default CreateProduct
