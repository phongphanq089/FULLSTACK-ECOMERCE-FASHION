import { zodValidate } from '@/middleware/zodValidate'
import { FastifyInstance } from 'fastify'
import { toJsonSchema } from '@/utils/lib'
import { withErrorHandling } from '@/utils/withErrorHandling'

import { CreateSizeSchema } from './size.schema'
import { createSizeController } from './size.controller'

export async function sizeRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/create-size',
    {
      preValidation: zodValidate(CreateSizeSchema),
      schema: {
        body: toJsonSchema(CreateSizeSchema),
        operationId: 'createSize',
        tags: ['Size'],
        summary: 'Create new brand',
        description: 'Create new brand in the system',
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
    withErrorHandling(createSizeController)
  )
}
