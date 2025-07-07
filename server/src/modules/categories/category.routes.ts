import { withErrorHandling } from '@/utils/withErrorHandling'
import { FastifyInstance } from 'fastify'
import { createCategoryController } from './category.controller'
import { zodValidate } from '@/middleware/zodValidate'
import { CreateCategorySchema } from './category.schema'
import { toJsonSchema } from '@/utils/lib'

export async function categoryRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/categories',
    {
      preValidation: zodValidate(CreateCategorySchema),
      schema: {
        body: toJsonSchema(CreateCategorySchema),
        operationId: 'createProduct',
        tags: ['Products'],
        summary: 'Create new Product',
        description: 'Create new product in the system',
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
    withErrorHandling(createCategoryController)
  )
}
