import { z } from 'zod'

export const createProductSchema = z.object({
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
})

export type CreateProductInput = z.infer<typeof createProductSchema>
