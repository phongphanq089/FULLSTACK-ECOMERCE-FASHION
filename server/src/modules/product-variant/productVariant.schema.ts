import { z } from 'zod'

export const CreateVariantSchema = z.object({
  productId: z.number(),
  sku: z.string().min(1),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  isActive: z.boolean().optional().default(true),
  sizeId: z.number().optional(),
  colorId: z.number().optional(),
})

export const UpdateVariantSchema = z.object({
  productId: z.number(),
  sku: z.string().min(1),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  isActive: z.boolean().optional().default(true),
  sizeId: z.number().optional(),
  colorId: z.number().optional(),
})

export type CreateVariantInput = z.infer<typeof CreateVariantSchema>

export type UpdateVariantInput = z.infer<typeof UpdateVariantSchema>
