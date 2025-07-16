import { zodValidate } from '@/middleware/zodValidate'
import { FastifyInstance } from 'fastify'
import {
  CreateVariantSchema,
  UpdateVariantSchema,
} from './productVariant.schema'
import { toJsonSchema } from '@/utils/lib'
import { withErrorHandling } from '@/utils/withErrorHandling'
import { schemaDocsVariantProduct } from '@/contents/schema-docs'
import {
  CreateProductVariantController,
  deleteProductVariantController,
  getProductVariantController,
  getProductVariantDetailController,
  updateProductVariantController,
} from './productVariant.controller'

export async function productVariantRoutes(server: FastifyInstance) {
  server.post(
    '/product-variants',
    {
      preValidation: zodValidate(CreateVariantSchema),
      schema: {
        body: toJsonSchema(CreateVariantSchema),
        operationId: schemaDocsVariantProduct.createVariantProduct.operationId,
        tags: schemaDocsVariantProduct.createVariantProduct.tags,
        summary: schemaDocsVariantProduct.createVariantProduct.summary,
      },
    },
    withErrorHandling(CreateProductVariantController)
  ),
    server.put(
      '/product-variants/:id',
      {
        preValidation: zodValidate(UpdateVariantSchema),
        schema: {
          body: toJsonSchema(UpdateVariantSchema),
          operationId:
            schemaDocsVariantProduct.updateVariantProduct.operationId,
          tags: schemaDocsVariantProduct.updateVariantProduct.tags,
          summary: schemaDocsVariantProduct.updateVariantProduct.summary,
        },
      },
      withErrorHandling(updateProductVariantController)
    ),
    server.get(
      '/product-variants/:productId/variants',
      {
        schema: {
          operationId:
            schemaDocsVariantProduct.getVariantProductAll.operationId,
          tags: schemaDocsVariantProduct.getVariantProductAll.tags,
          summary: schemaDocsVariantProduct.getVariantProductAll.summary,
        },
      },
      withErrorHandling(getProductVariantController)
    ),
    server.get(
      '/product-variants/:id',
      {
        schema: {
          operationId:
            schemaDocsVariantProduct.getVariantProductDetail.operationId,
          tags: schemaDocsVariantProduct.getVariantProductDetail.tags,
          summary: schemaDocsVariantProduct.getVariantProductDetail.summary,
        },
      },
      withErrorHandling(getProductVariantDetailController)
    ),
    server.delete(
      '/product-variants/:id',
      {
        schema: {
          operationId:
            schemaDocsVariantProduct.deleteVariantProduct.operationId,
          tags: schemaDocsVariantProduct.deleteVariantProduct.tags,
          summary: schemaDocsVariantProduct.deleteVariantProduct.summary,
        },
      },
      withErrorHandling(deleteProductVariantController)
    )
}
