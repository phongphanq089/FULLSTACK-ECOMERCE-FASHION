import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { createProductSchema } from './product.schema'
import { zodValidate } from '@/middleware/zodValidate'
import { toJsonSchema } from '@/utils/lib'
import { withErrorHandling } from '@/utils/withErrorHandling'
import { createProductController } from './product.controller'

export const productRoutes = (server: FastifyInstance) => {
  server.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
    const product = await server.prisma.product.findMany()
    return reply.send(product)
  })
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
  )
}
