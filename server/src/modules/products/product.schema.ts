import { z } from 'zod'

export const createProductSchema = z.object({
  search: z.string().optional(),
  name: z
    .string({ required_error: 'Product name is required' })
    .min(1, 'Product name cannot be empty'),

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
    .int('Category ID must be an integer')
    .min(1, 'Category ID must be greater than 0')
    .optional(),

  brandId: z
    .number({ invalid_type_error: 'Brand ID must be a number' })
    .int('Brand ID must be an integer')
    .min(1, 'Brand ID must be greater than 0')
    .optional(),

  sizeIds: z
    .array(
      z
        .number({ invalid_type_error: 'Each size ID must be a number' })
        .int()
        .gt(0, 'Size ID must be greater than 0'),
      { invalid_type_error: 'Size list must be an array of numbers' }
    )
    .optional(),

  colorIds: z
    .array(
      z
        .number({ invalid_type_error: 'Each color ID must be a number' })
        .int()
        .gt(0, 'Color ID must be greater than 0'),
      { invalid_type_error: 'Color list must be an array of numbers' }
    )
    .optional(),
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
