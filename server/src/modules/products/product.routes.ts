import { FastifyInstance } from 'fastify'
import { createProductSchema } from './product.schema'
import { zodValidate } from '@/middleware/zodValidate'
import { toJsonSchema } from '@/utils/lib'
import { withErrorHandling } from '@/utils/withErrorHandling'
import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductDetailController,
} from './product.controller'
import { schemaDocsProduct } from '@/contents/schema-docs'

export const productRoutes = (server: FastifyInstance) => {
  server.post(
    '/create-product',
    {
      preValidation: zodValidate(createProductSchema),
      schema: {
        body: toJsonSchema(createProductSchema),
        operationId: schemaDocsProduct.createProduct.operationId,
        tags: schemaDocsProduct.createProduct.tags,
        summary: schemaDocsProduct.createProduct.summary,
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
          operationId: schemaDocsProduct.updateProduct.operationId,
          tags: schemaDocsProduct.updateProduct.tags,
          summary: schemaDocsProduct.updateProduct.summary,
        },
      },
      withErrorHandling(createProductController)
    ),
    server.get(
      '/products',
      {
        schema: {
          operationId: schemaDocsProduct.getProductAll.operationId,
          tags: schemaDocsProduct.getProductAll.tags,
          summary: schemaDocsProduct.getProductAll.summary,
        },
      },

      withErrorHandling(getProductController)
    ),
    server.get(
      '/products/:id',
      {
        schema: {
          operationId: schemaDocsProduct.getProductDetail.operationId,
          tags: schemaDocsProduct.getProductDetail.tags,
          summary: schemaDocsProduct.getProductDetail.summary,
        },
      },
      withErrorHandling(getProductDetailController)
    ),
    server.delete(
      '/products/:id',
      {
        schema: {
          operationId: schemaDocsProduct.deleteProduct.operationId,
          tags: schemaDocsProduct.deleteProduct.tags,
          summary: schemaDocsProduct.deleteProduct.summary,
        },
      },
      withErrorHandling(deleteProductController)
    )
}
