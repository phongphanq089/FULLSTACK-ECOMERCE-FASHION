import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'
import { CategoryService } from './category.service'
import { sendResponse } from '@/utils/response'
import { CreateCategoryInput } from './category.schema'

interface CreateCategoryInputRoute extends RouteGenericInterface {
  Body: CreateCategoryInput
}

export const createCategoryController = async (
  request: FastifyRequest<CreateCategoryInputRoute>,
  reply: FastifyReply
) => {
  const result = await CategoryService.create(request.body)
  return sendResponse(reply, 'Add new category success', result)
}
