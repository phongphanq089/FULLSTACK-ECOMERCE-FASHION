import { withErrorHandling } from '@/utils/withErrorHandling'
import { FastifyInstance } from 'fastify'
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryController,
  getCategoryDetailController,
  updateCategoryController,
} from './category.controller'
import { zodValidate } from '@/middleware/zodValidate'
import { CreateCategorySchema, UpdateCategorySchema } from './category.schema'
import { toJsonSchema } from '@/utils/lib'
import { schemaDocsCategories } from '@/contents/schema-docs'

export async function categoryRoutes(server: FastifyInstance) {
  server.post(
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
    server.get(
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
    server.get(
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
    server.put(
      '/categories/:id',
      {
        preValidation: zodValidate(UpdateCategorySchema),
        schema: {
          body: toJsonSchema(UpdateCategorySchema),
          operationId: schemaDocsCategories.updateCategory.operationId,
          tags: schemaDocsCategories.updateCategory.tags,
          summary: schemaDocsCategories.updateCategory.summary,
        },
      },
      withErrorHandling(updateCategoryController)
    ),
    server.delete(
      '/categories/:id',
      {
        schema: {
          operationId: schemaDocsCategories.deleteCategory.operationId,
          tags: schemaDocsCategories.deleteCategory.tags,
          summary: schemaDocsCategories.deleteCategory.summary,
        },
      },
      withErrorHandling(deleteCategoryController)
    )
}
