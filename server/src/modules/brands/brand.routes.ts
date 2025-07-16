import { zodValidate } from '@/middleware/zodValidate'
import { CreateBrandSchema, UpdateBrandSchema } from './brand.schema'
import { FastifyInstance } from 'fastify'
import { toJsonSchema } from '@/utils/lib'
import { withErrorHandling } from '@/utils/withErrorHandling'
import {
  createBrandController,
  deleteBrandController,
  getBrandController,
  getBrandDetailController,
  updateBrandController,
} from './brand.controller'
import { schemaDocsBrand } from '@/contents/schema-docs'

export async function brandRoutes(server: FastifyInstance) {
  server.post(
    '/brand',
    {
      preValidation: zodValidate(CreateBrandSchema),
      schema: {
        body: toJsonSchema(CreateBrandSchema),
        operationId: schemaDocsBrand.createBrand.operationId,
        tags: schemaDocsBrand.createBrand.tags,
        summary: schemaDocsBrand.createBrand.summary,
      },
    },
    withErrorHandling(createBrandController)
  ),
    server.put(
      '/brand/:id',
      {
        preValidation: zodValidate(UpdateBrandSchema),
        schema: {
          body: toJsonSchema(UpdateBrandSchema),
          operationId: schemaDocsBrand.updateBrand.operationId,
          tags: schemaDocsBrand.updateBrand.tags,
          summary: schemaDocsBrand.updateBrand.summary,
        },
      },
      withErrorHandling(updateBrandController)
    ),
    server.get(
      '/brand',
      {
        schema: {
          operationId: schemaDocsBrand.getBrandAll.operationId,
          tags: schemaDocsBrand.getBrandAll.tags,
          summary: schemaDocsBrand.getBrandAll.summary,
        },
      },
      withErrorHandling(getBrandController)
    ),
    server.get(
      '/brand/:id',
      {
        schema: {
          operationId: schemaDocsBrand.getBrandDetail.operationId,
          tags: schemaDocsBrand.getBrandDetail.tags,
          summary: schemaDocsBrand.getBrandDetail.summary,
        },
      },
      withErrorHandling(getBrandDetailController)
    ),
    server.delete(
      '/brand/:id',
      {
        schema: {
          operationId: schemaDocsBrand.deleteBrand.operationId,
          tags: schemaDocsBrand.deleteBrand.tags,
          summary: schemaDocsBrand.deleteBrand.summary,
        },
      },
      withErrorHandling(deleteBrandController)
    )
}
