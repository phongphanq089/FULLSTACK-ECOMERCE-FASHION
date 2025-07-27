import { z } from 'zod'

export const CreateBrandSchema = z.object({
  name: z.string().min(1, 'The name list is required.'),
  imageUrl: z.string().url('Invalid image URL').optional(),
  isActive: z.boolean().optional().default(true),
})

export const UpdateBrandSchema = z.object({
  name: z.string().min(1, 'The name list is required.'),
  imageUrl: z.string().url('Invalid image URL').optional(),
  isActive: z.boolean().optional().default(true),
})

export type CreateBrandInput = z.infer<typeof CreateBrandSchema>

export type UpdateBrandInput = z.infer<typeof UpdateBrandSchema>
