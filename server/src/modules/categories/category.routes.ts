import { withErrorHandling } from '@/utils/withErrorHandling'
import { FastifyInstance } from 'fastify'
import {
  createCategoryController,
  getCategoryController,
  getCategoryDetailController,
  updateCategoryController,
} from './category.controller'
import { zodValidate } from '@/middleware/zodValidate'
import { CreateCategorySchema } from './category.schema'
import { toJsonSchema } from '@/utils/lib'
import { schemaDocsCategories } from '@/contents/schema-docs'

export async function categoryRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/categories',
    {
      preValidation: zodValidate(CreateCategorySchema),
      schema: {
        body: toJsonSchema(CreateCategorySchema),
        operationId: schemaDocsCategories.createCategory.operationId,
        tags: schemaDocsCategories.createCategory.tags,
        summary: schemaDocsCategories.createCategory.summary,
      },
    },
    withErrorHandling(createCategoryController)
  ),
    fastify.get(
      '/categories',
      {
        schema: {
          operationId: schemaDocsCategories.getCategoryAll.operationId,
          tags: schemaDocsCategories.getCategoryAll.tags,
          summary: schemaDocsCategories.getCategoryAll.summary,
        },
      },
      withErrorHandling(getCategoryController)
    ),
    fastify.get(
      '/categories/:id',
      {
        schema: {
          operationId: schemaDocsCategories.getCategoryDetail.operationId,
          tags: schemaDocsCategories.getCategoryDetail.tags,
          summary: schemaDocsCategories.getCategoryDetail.summary,
        },
      },
      withErrorHandling(getCategoryDetailController)
    ),
    fastify.put(
      '/categories/:id',
      {
        schema: {
          operationId: schemaDocsCategories.updateCategory.operationId,
          tags: schemaDocsCategories.updateCategory.tags,
          summary: schemaDocsCategories.updateCategory.summary,
        },
      },
      withErrorHandling(updateCategoryController)
    )
}
