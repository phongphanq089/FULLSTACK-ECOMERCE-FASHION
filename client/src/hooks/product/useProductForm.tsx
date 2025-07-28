import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  createProductSchema,
  CreateProductSchemaType,
} from '~/validate/product/schema'

export function useProductForm(
  defaultValues?: Partial<CreateProductSchemaType>
) {
  return useForm<CreateProductSchemaType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      smallStrip: '',
      description: '',
      imageUrl: 'https://cdn.myhost.com/image-123.jpg',
      weight: undefined,

      categoryId: undefined,
      brandId: undefined,
      sizeIds: [],
      colorIds: [],
      collectionIds: [],

      infoSections: [],

      variants: [
        {
          sku: '',
          price: 0,
          originalPrice: undefined,
          discountPercent: undefined,
          costPrice: undefined,
          profit: undefined,
          profitMargin: undefined,
          stock: 0,
          colorId: undefined,
          sizeId: undefined,
        },
      ],

      ...defaultValues,
    },
  })
}
