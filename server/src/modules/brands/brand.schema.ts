import { z } from 'zod'

export const CreateBrandSchema = z.object({
  name: z.string().min(1, 'The name list is required.'),
  isActive: z.boolean().optional().default(true),
})

export type CreateBrandInput = z.infer<typeof CreateBrandSchema>
