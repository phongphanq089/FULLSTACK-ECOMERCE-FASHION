import { zodValidate } from '@/middleware/zodValidate'
import { FastifyInstance } from 'fastify'
import { toJsonSchema } from '@/utils/lib'
import { withErrorHandling } from '@/utils/withErrorHandling'
import {
  createColorController,
  deleteColorController,
  getColorController,
  updateColorController,
} from './color.controller'
import { createColorSchema, updateColorSchema } from './color.schema'
import { schemaDocsColor } from '@/contents/schema-docs'

export async function colorRoutes(server: FastifyInstance) {
  server.post(
    '/colors',
    {
      preValidation: zodValidate(createColorSchema),
      schema: {
        body: toJsonSchema(createColorSchema),
        operationId: schemaDocsColor.createColor.operationId,
        tags: schemaDocsColor.createColor.tags,
        summary: schemaDocsColor.createColor.summary,
      },
    },
    withErrorHandling(createColorController)
  ),
    server.put(
      '/colors/:id',
      {
        preValidation: zodValidate(updateColorSchema),
        schema: {
          body: toJsonSchema(updateColorSchema),
          operationId: schemaDocsColor.updateColor.operationId,
          tags: schemaDocsColor.updateColor.tags,
          summary: schemaDocsColor.updateColor.summary,
        },
      },
      withErrorHandling(updateColorController)
    ),
    server.get(
      '/colors',
      {
        schema: {
          operationId: schemaDocsColor.getColorAll.operationId,
          tags: schemaDocsColor.getColorAll.tags,
          summary: schemaDocsColor.getColorAll.summary,
        },
      },
      withErrorHandling(getColorController)
    ),
    server.get(
      '/colors/:id',
      {
        schema: {
          operationId: schemaDocsColor.getColorDetail.operationId,
          tags: schemaDocsColor.getColorDetail.tags,
          summary: schemaDocsColor.getColorDetail.summary,
        },
      },
      withErrorHandling(getColorController)
    ),
    server.delete(
      '/colors/:id',
      {
        schema: {
          operationId: schemaDocsColor.deleteColor.operationId,
          tags: schemaDocsColor.deleteColor.tags,
          summary: schemaDocsColor.deleteColor.summary,
        },
      },
      withErrorHandling(deleteColorController)
    )
}
