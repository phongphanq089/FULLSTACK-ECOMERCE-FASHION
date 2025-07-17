import { z } from 'zod'

export const createProductImageSchema = z.object({
  productId: z.number().int().min(1, 'Invalid productId'),
  imageUrl: z.string().url('Invalid image URL'),
  altText: z.string().optional(),
  isMain: z.boolean().optional().default(false),
})

export const bulkCreateProductImageSchema = z.object({
  productId: z.number().int().min(1, 'Invalid productId'),
  images: z
    .array(
      z.object({
        imageUrl: z.string().url('Invalid image URL'),
        altText: z.string().optional(),
        isMain: z.boolean().optional().default(false),
      })
    )
    .min(1, 'At least 1 image is required'),
})

export const updateProductImageSchema = z.object({
  altText: z.string().optional(),
  isMain: z.boolean().optional(),
})

export type CreateProductImageInput = z.infer<typeof createProductImageSchema>

export type BulkCreateProductImageInput = z.infer<
  typeof bulkCreateProductImageSchema
>

export type UpdateProductImageInput = z.infer<typeof updateProductImageSchema>
