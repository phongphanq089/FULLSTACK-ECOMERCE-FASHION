import { z } from 'zod'

export const createProductSchema = z.object({
  search: z.string().optional(),

  name: z
    .string({ required_error: 'Product name is required' })
    .min(1, 'Product name cannot be empty'),
  smallStrip: z.string().optional(),

  description: z
    .string({ required_error: 'Product description is required' })
    .min(1, 'Product description cannot be empty'),

  imageUrl: z
    .string({ required_error: 'Product image URL is required' })
    .url('Invalid image URL (must be a valid URL)'),

  weight: z
    .number({ invalid_type_error: 'Weight must be a number' })
    .nonnegative('Weight cannot be negative')
    .optional(),

  categoryId: z
    .number({ invalid_type_error: 'Category ID must be a number' })
    .int()
    .min(1)
    .optional(),

  brandId: z
    .number({ invalid_type_error: 'Brand ID must be a number' })
    .int()
    .min(1)
    .optional(),

  sizeIds: z
    .array(z.number().int().gt(0), {
      invalid_type_error: 'Size list must be an array of numbers',
    })
    .optional(),

  colorIds: z
    .array(z.number().int().gt(0), {
      invalid_type_error: 'Color list must be an array of numbers',
    })
    .optional(),

  // ✅ Gắn product vào nhiều collection
  collectionIds: z
    .array(z.number().int().gt(0), {
      invalid_type_error: 'Collection list must be an array of numbers',
    })
    .optional(),

  // ✅ Thêm các section thông tin bổ sung (title + content)
  infoSections: z
    .array(
      z.object({
        title: z.string().min(1, 'Title cannot be empty'),
        content: z.string().min(1, 'Content cannot be empty'),
        sortOrder: z.number().int().optional(), // mặc định 0 nếu không truyền
      })
    )
    .optional(),

  // ✅ Variants
  variants: z
    .array(
      z.object({
        sku: z.string().min(1, 'SKU cannot be empty'),
        price: z.number().nonnegative('Price cannot be negative'),
        originalPrice: z.number().nonnegative().optional(),
        discountPercent: z.number().min(0).max(100).optional(),
        costPrice: z.number().nonnegative().optional(),
        profit: z.number().optional(),
        profitMargin: z.number().optional(),
        stock: z.number().int().nonnegative('Stock cannot be negative'),
        colorId: z.number().int().optional(),
        sizeId: z.number().int().optional(),
      })
    )
    .min(1, 'At least one variant is required'),

  // Sort options
  orderBy: z
    .enum(['createdAt', 'name', 'price'])
    .optional()
    .default('createdAt'),
  sort: z.enum(['asc', 'desc']).optional().default('desc'),
})

export const getProductQuerySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  orderBy: z
    .enum(['createdAt', 'name', 'price'])
    .optional()
    .default('createdAt'),
  sort: z.enum(['asc', 'desc']).optional().default('desc'),
})

export const filterProductSchema = z.object({
  search: z.string().optional(),
  categoryId: z.coerce.number().optional(),
  brandId: z.coerce.number().optional(),
  sizeIds: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(',').map(Number) : undefined)),
  colorIds: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(',').map(Number) : undefined)),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  orderBy: z
    .enum(['createdAt', 'name', 'price'])
    .optional()
    .default('createdAt'),
  sort: z.enum(['asc', 'desc']).optional().default('desc'),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
})

export type CreateProductInput = z.infer<typeof createProductSchema>

export type ProductQuerySchemaInput = z.infer<typeof getProductQuerySchema>

export type FilterProductQueryInput = z.infer<typeof filterProductSchema>
