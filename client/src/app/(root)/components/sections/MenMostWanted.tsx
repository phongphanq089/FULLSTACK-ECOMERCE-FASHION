import React from 'react'
import LayoutSectionGrid from '~/components/layout/root/section-home/LayoutSectionGrid'
import CardProduct from '~/components/shared/CardProduct'

const ImageCardDemo = [
  {
    image:
      'https://ik.imagekit.io/htnacim0q/ecomerce-test/ORIGINS_TEE_BLACK_back_8e4704e9-e509-490c-b690-d8873d842acf_800x.webp?updatedAt=1753001432549',
  },
  {
    image:
      'https://ik.imagekit.io/htnacim0q/ecomerce-test/MAKRO_LONGSLEEVE_TEE_white_3_800x.webp?updatedAt=1753001432636',
  },
  {
    image:
      'https://ik.imagekit.io/htnacim0q/ecomerce-test/ORIGINS_TEE_BLACK_front_ee30af42-524c-4937-8d1e-a1c63eb16607_800x.webp?updatedAt=1753001432627',
  },
  {
    image:
      'https://ik.imagekit.io/htnacim0q/ecomerce-test/ORIGINS_TEE_BLACK_front_ee30af42-524c-4937-8d1e-a1c63eb16607_800x.webp?updatedAt=1753001432627',
  },
  {
    image:
      'https://ik.imagekit.io/htnacim0q/ecomerce-test/MAKRO_LONGSLEEVE_TEE_white_3_800x.webp?updatedAt=1753001432636',
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
const MenMostWanted = () => {
  return (
    <div>
      <LayoutSectionGrid title='Men Most Wanted' link='/products'>
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

export default MenMostWanted
