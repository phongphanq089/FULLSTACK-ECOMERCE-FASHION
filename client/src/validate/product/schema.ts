import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name cannot be empty'),
  smallStrip: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url('Invalid image URL (must be a valid URL)'),
  weight: z.number().nonnegative('Weight cannot be negative').optional(),
  categoryId: z.array(z.number().int().gt(0)).optional(),
  brandId: z.number().int().min(1).optional(),

  sizeIds: z.array(z.number().int().gt(0)).optional(),
  colorIds: z.array(z.number().int().gt(0)).optional(),
  collectionIds: z.array(z.number().int().gt(0)).optional(),

  infoSections: z
    .array(
      z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        sortOrder: z.number().int().optional(),
      })
    )
    .optional(),

  variants: z
    .array(
      z.object({
        sku: z.string().optional(),
        price: z.number().nonnegative(),
        originalPrice: z.number().nonnegative().optional(),
        discountPercent: z.number().min(0).max(100).optional(),
        costPrice: z.number().nonnegative().optional(),
        profit: z.number().optional(),
        profitMargin: z.number().optional(),
        stock: z.number().optional(),
        colorId: z.number().int().optional(),
        sizeId: z.number().int().optional(),
      })
    )
    .min(1, 'At least one variant is required'),
})

export const productQuerySchema = z.object({
  search: z.string().optional(),
  orderBy: z
    .enum(['createdAt', 'name', 'price'])
    .optional()
    .default('createdAt'),
  sort: z.enum(['asc', 'desc']).optional().default('desc'),
})

export type CreateProductSchemaType = z.infer<typeof createProductSchema>
export type ProductQuerySchemaType = z.infer<typeof productQuerySchema>
