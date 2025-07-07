import { zodValidate } from '@/middleware/zodValidate'
import { FastifyInstance } from 'fastify'
import { toJsonSchema } from '@/utils/lib'
import { withErrorHandling } from '@/utils/withErrorHandling'
import { createColorController } from './color.controller'
import { createColorSchema } from './color.schema'

export async function colorRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/create-color',
    {
      preValidation: zodValidate(createColorSchema),
      schema: {
        body: toJsonSchema(createColorSchema),
        operationId: 'createColor',
        tags: ['Color'],
        summary: 'Create new color',
        description: 'Create new color in the system',
        response: {
          201: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              description: { type: 'string' },
            },
          },
        },
      },
    },
    withErrorHandling(createColorController)
  )
}
