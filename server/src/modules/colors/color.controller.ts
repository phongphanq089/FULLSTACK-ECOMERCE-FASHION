import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'
import { sendResponse } from '@/utils/response'
import { CreateColorInput, UpdateColorInput } from './color.schema'
import { ColorService } from './color.service'

interface CreateColorInputRoute extends RouteGenericInterface {
  Body: CreateColorInput
}

export const createColorController = async (
  request: FastifyRequest<CreateColorInputRoute>,
  reply: FastifyReply
) => {
  const result = await ColorService.create(request.body)
  return sendResponse(reply, 'Add new category success', result)
}

interface UpdateColorInputRoute extends RouteGenericInterface {
  Body: UpdateColorInput
}

export const updateColorController = async (
  request: FastifyRequest<UpdateColorInputRoute>,
  reply: FastifyReply
) => {
  const id = Number((request.params as { id: string }).id)
  const result = await ColorService.update(id, request.body)
  return sendResponse(reply, `Update category ${result} success`, result)
}

export const getColorController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const result = await ColorService.getAll()
  return sendResponse(reply, 'Get category success', result)
}

export const getColorDetailController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const id = Number(request.params as { id: string })
  const result = await ColorService.getDetail(id)
  return sendResponse(reply, 'Get category success', result)
}

export const deleteColorController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const id = Number(request.params as { id: string })
  const result = await ColorService.getDetail(id)
  return sendResponse(reply, `Get category ${result} success`, result)
}
