import { zodValidate } from '@/middleware/zodValidate'
import { CreateBrandSchema } from './brand.schema'
import { FastifyInstance } from 'fastify'
import { toJsonSchema } from '@/utils/lib'
import { withErrorHandling } from '@/utils/withErrorHandling'
import { createBrandController } from './brand.controller'

export async function brandRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/create-brand',
    {
      preValidation: zodValidate(CreateBrandSchema),
      schema: {
        body: toJsonSchema(CreateBrandSchema),
        operationId: 'createBrand',
        tags: ['Brand'],
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
    withErrorHandling(createBrandController)
  )
}
