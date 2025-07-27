import React from 'react'
import LayoutSectionGrid from '~/components/layout/root/section-home/LayoutSectionGrid'
import CardProduct from '~/components/shared/CardProduct'

const ImageCardDemo = [
  {
    image:
      'https://ik.imagekit.io/htnacim0q/ecomerce-test/MOVILES_40_800x.webp?updatedAt=1752906748854',
  },
  {
    image:
      'https://ik.imagekit.io/htnacim0q/ecomerce-test/EDIT_IMG_7119_800x.webp?updatedAt=1752906748954',
  },
  {
    image:
      'https://ik.imagekit.io/htnacim0q/ecomerce-test/MOVILES_68_800x.webp?updatedAt=1752906749276',
  },
  {
    image:
      'https://ik.imagekit.io/htnacim0q/ecomerce-test/MANSION_TEE_WHITE_3_800x.webp?updatedAt=1752906749145',
  },
  {
    image:
      'https://ik.imagekit.io/htnacim0q/ecomerce-test/MANSION_TEE_WHITE_2_800x.webp?updatedAt=1752906749274',
  },
  {
    image:
      'https://ik.imagekit.io/htnacim0q/ecomerce-test/EDIT_IMG_7074_800x.webp?updatedAt=1752906748288',
  },
]

const colorDemo = [
  {
    color: '#ff3c00',
    name: 'Primary Color',
  },
  {
    color: '#fff4e2',
    name: 'Secondary Color',
  },
  {
    color: '#0044ff',
    name: 'Primary Color',
  },
  {
    color: '#c9800a',
    name: 'Secondary Color',
  },
  {
    color: '#0ac960',
    name: 'Secondary Color',
  },
  {
    color: '#fff4e2',
    name: 'Secondary Color',
  },
  {
    color: '#0044ff',
    name: 'Primary Color',
  },
]
const NewArrivals = () => {
  return (
    <div>
      <LayoutSectionGrid title='New Arrivals' link='/products'>
        <CardProduct ImageCardDemo={ImageCardDemo} colorDemo={colorDemo} />
        <CardProduct ImageCardDemo={ImageCardDemo} colorDemo={colorDemo} />
        <CardProduct ImageCardDemo={ImageCardDemo} colorDemo={colorDemo} />
        <CardProduct ImageCardDemo={ImageCardDemo} colorDemo={colorDemo} />
        <CardProduct ImageCardDemo={ImageCardDemo} colorDemo={colorDemo} />
        <CardProduct ImageCardDemo={ImageCardDemo} colorDemo={colorDemo} />
        <CardProduct ImageCardDemo={ImageCardDemo} colorDemo={colorDemo} />
        <CardProduct ImageCardDemo={ImageCardDemo} colorDemo={colorDemo} />
      </LayoutSectionGrid>
    </div>
  )
}

export default NewArrivals
