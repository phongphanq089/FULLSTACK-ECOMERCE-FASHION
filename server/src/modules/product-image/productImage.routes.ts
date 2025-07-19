import { zodValidate } from '@/middleware/zodValidate'
import { FastifyInstance } from 'fastify'
import {
  bulkCreateProductImageSchema,
  createProductImageSchema,
  updateProductImageSchema,
} from './productImage.schema'
import { toJsonSchema } from '@/utils/lib'
import { schemaDocsProductImage } from '@/contents/schema-docs'
import { withErrorHandling } from '@/utils/withErrorHandling'
import {
  createBulkProductImageController,
  createProductImageController,
  deleteProductImageController,
  getImagesByProductIdController,
  updateProductImageController,
} from './productImage.controller'

export const productImageRoutes = (server: FastifyInstance) => {
  server.post(
    '/create-productImage',
    {
      preValidation: zodValidate(createProductImageSchema),
      schema: {
        body: toJsonSchema(createProductImageSchema),
        operationId: schemaDocsProductImage.createProductImage.operationId,
        tags: schemaDocsProductImage.createProductImage.tags,
        summary: schemaDocsProductImage.createProductImage.summary,
      },
    },
    withErrorHandling(createProductImageController)
  ),
    server.post(
      '/create-productImage/bulk',
      {
        preValidation: zodValidate(bulkCreateProductImageSchema),
        schema: {
          body: toJsonSchema(bulkCreateProductImageSchema),
          operationId:
            schemaDocsProductImage.createProductImageBulk.operationId,
          tags: schemaDocsProductImage.createProductImageBulk.tags,
          summary: schemaDocsProductImage.createProductImageBulk.summary,
        },
      },
      withErrorHandling(createBulkProductImageController)
    ),
    server.get(
      '/products-image/:id/images',
      {
        schema: {
          operationId:
            schemaDocsProductImage.getProductImageByProduct.operationId,
          tags: schemaDocsProductImage.getProductImageByProduct.tags,
          summary: schemaDocsProductImage.getProductImageByProduct.summary,
        },
      },
      withErrorHandling(getImagesByProductIdController)
    )
  server.put(
    '/products-image/:id',
    {
      preValidation: zodValidate(updateProductImageSchema),
      schema: {
        body: toJsonSchema(updateProductImageSchema),
        operationId:
          schemaDocsProductImage.updateProductImageByProduct.operationId,
        tags: schemaDocsProductImage.updateProductImageByProduct.tags,
        summary: schemaDocsProductImage.updateProductImageByProduct.summary,
      },
    },
    withErrorHandling(updateProductImageController)
  )
  server.delete(
    '/products-image/:id',
    {
      schema: {
        operationId: schemaDocsProductImage.deleteProductImage.operationId,
        tags: schemaDocsProductImage.deleteProductImage.tags,
        summary: schemaDocsProductImage.deleteProductImage.summary,
      },
    },
    withErrorHandling(deleteProductImageController)
  )
}
