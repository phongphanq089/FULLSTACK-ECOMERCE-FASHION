import { zodValidate } from '@/middleware/zodValidate'
import { FastifyInstance } from 'fastify'
import { toJsonSchema } from '@/utils/lib'
import { withErrorHandling } from '@/utils/withErrorHandling'

import { CreateSizeSchema } from './size.schema'
import {
  createSizeController,
  getSizeController,
  getSizeDetailController,
} from './size.controller'
import { schemaDocsSize } from '@/contents/schema-docs'

export async function sizeRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/size',
    {
      preValidation: zodValidate(CreateSizeSchema),
      schema: {
        body: toJsonSchema(CreateSizeSchema),
        operationId: schemaDocsSize.createSize.operationId,
        tags: schemaDocsSize.createSize.tags,
        summary: schemaDocsSize.createSize.summary,
      },
    },
    withErrorHandling(createSizeController)
  ),
    fastify.get(
      '/size',
      {
        schema: {
          operationId: schemaDocsSize.getSizeAll.operationId,
          tags: schemaDocsSize.getSizeAll.tags,
          summary: schemaDocsSize.getSizeAll.summary,
        },
      },
      withErrorHandling(getSizeController)
    )
  fastify.get(
    '/size/:id',
    {
      schema: {
        operationId: schemaDocsSize.getSizeDetail.operationId,
        tags: schemaDocsSize.getSizeDetail.tags,
        summary: schemaDocsSize.getSizeDetail.summary,
      },
    },
    withErrorHandling(getSizeDetailController)
  ),
    fastify.put(
      '/size/:id',
      {
        preValidation: zodValidate(CreateSizeSchema),
        schema: {
          body: toJsonSchema(CreateSizeSchema),
          operationId: schemaDocsSize.updateSize.operationId,
          tags: schemaDocsSize.updateSize.tags,
          summary: schemaDocsSize.updateSize.summary,
        },
      },
      withErrorHandling(createSizeController)
    ),
    fastify.delete(
      '/size/:id',
      {
        schema: {
          operationId: schemaDocsSize.deleteSize.operationId,
          tags: schemaDocsSize.deleteSize.tags,
          summary: schemaDocsSize.deleteSize.summary,
        },
      },
      withErrorHandling(createSizeController)
    )
}
