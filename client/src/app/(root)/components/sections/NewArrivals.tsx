import React from 'react'
import LayoutSectionGrid from '~/components/layout/root/section-home/LayoutSectionGrid'
import CardProduct from '~/components/shared/CardProduct'

const NewArrivals = () => {
  return (
    <div>
      <LayoutSectionGrid title='New Arrivals' link='/products'>
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </LayoutSectionGrid>
    </div>
  )
}

export default NewArrivals
