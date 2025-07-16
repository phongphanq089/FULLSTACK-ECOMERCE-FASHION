import { z } from 'zod'

export const CreateSizeSchema = z.object({
  name: z.string().min(1, 'The name list is required.'),
})

export const UpdateSizeSchema = z.object({
  name: z.string().min(1, 'The name list is required.'),
})

export type CreateSizeInput = z.infer<typeof CreateSizeSchema>

export type UpdateSizeInput = z.infer<typeof UpdateSizeSchema>
