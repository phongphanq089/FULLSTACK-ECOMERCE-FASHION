import { z } from 'zod'

export const createColorSchema = z.object({
  name: z
    .string({ required_error: 'Color name is required' })
    .min(1, 'Color name cannot be empty'),

  hexCode: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, 'Invalid hex color code'),
})

export const updateColorSchema = z.object({
  name: z
    .string({ required_error: 'Color name is required' })
    .min(1, 'Color name cannot be empty'),

  hexCode: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, 'Invalid hex color code'),
})

export type CreateColorInput = z.infer<typeof createColorSchema>

export type UpdateColorInput = z.infer<typeof updateColorSchema>
