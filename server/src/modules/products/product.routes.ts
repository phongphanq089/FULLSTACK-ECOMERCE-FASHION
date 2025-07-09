import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { createProductSchema } from './product.schema'
import { zodValidate } from '@/middleware/zodValidate'
import { toJsonSchema } from '@/utils/lib'
import { withErrorHandling } from '@/utils/withErrorHandling'
import {
  createProductController,
  getProductController,
  getProductDetailController,
} from './product.controller'

export const productRoutes = (server: FastifyInstance) => {
  server.post(
    '/create-product',
    {
      preValidation: zodValidate(createProductSchema),
      schema: {
        body: toJsonSchema(createProductSchema),
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
    withErrorHandling(createProductController)
  ),
    server.put(
      '/products/:id',
      {
        preValidation: zodValidate(createProductSchema),
        schema: {
          body: toJsonSchema(createProductSchema),
          operationId: 'updateProduct',
          tags: ['Products'],
          summary: 'update Product',
        },
      },
      withErrorHandling(createProductController)
    ),
    server.get(
      '/products',
      {
        schema: {
          operationId: 'getProduct',
          tags: ['getProduct'],
          summary: 'get Product',
        },
      },

      withErrorHandling(getProductController)
    ),
    server.get(
      '/products/:id',
      {
        schema: {
          operationId: 'getProductDetail',
          tags: ['getProductDetail'],
          summary: 'Get Product Detail',
        },
      },
      withErrorHandling(getProductDetailController)
    )
}
