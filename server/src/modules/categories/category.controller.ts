import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'
import { CategoryService } from './category.service'
import { sendResponse } from '@/utils/response'
import { CreateCategoryInput, UpdateCategoryInput } from './category.schema'

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

interface UpdateCategoryInputRoute extends RouteGenericInterface {
  Body: UpdateCategoryInput
}
export const updateCategoryController = async (
  request: FastifyRequest<UpdateCategoryInputRoute>,
  reply: FastifyReply
) => {
  const id = Number((request.params as { id: string }).id)

  const result = await CategoryService.update(id, request.body)

  return sendResponse(reply, 'Update category  success', result)
}

export const getCategoryController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const result = await CategoryService.getAll()
  return sendResponse(reply, 'Get category success', result)
}

export const getCategoryDetailController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const id = Number((request.params as { id: string }).id)

  const result = await CategoryService.getCategoryDetail(id)

  return sendResponse(reply, 'Get category  success', result)
}

export const deleteCategoryController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const id = Number((request.params as { id: string }).id)

  const result = await CategoryService.delete(id)

  return sendResponse(reply, `Delete ${result} success`)
}
