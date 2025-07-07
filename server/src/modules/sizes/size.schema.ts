import { z } from 'zod'

export const CreateSizeSchema = z.object({
  name: z.string().min(1, 'The name list is required.'),
})

export type CreateSizeInput = z.infer<typeof CreateSizeSchema>
