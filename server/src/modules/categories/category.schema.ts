import { z } from 'zod'

export const CreateCategorySchema = z.object({
  name: z.string().min(1, 'The name list is required.'),
  isActive: z.boolean().optional().default(true),
})

export const UpdateCategorySchema = z.object({
  name: z.string().min(1, 'The name list is required.'),
  isActive: z.boolean().optional().default(true),
})

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>

export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>
