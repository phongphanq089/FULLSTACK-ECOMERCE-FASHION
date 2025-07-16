import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'

import { sendResponse } from '@/utils/response'

import { CreateSizeInput, UpdateSizeInput } from './size.schema'
import { SizeService } from './size.service'

interface CreateSizeInputRoute extends RouteGenericInterface {
  Body: CreateSizeInput
}
export const createSizeController = async (
  request: FastifyRequest<CreateSizeInputRoute>,
  reply: FastifyReply
) => {
  const result = await SizeService.create(request.body)
  return sendResponse(reply, 'Add new size success', result)
}

interface UpdateSizeInputRoute extends RouteGenericInterface {
  Body: UpdateSizeInput
}
export const UpdateSizeController = async (
  request: FastifyRequest<UpdateSizeInputRoute>,
  reply: FastifyReply
) => {
  const id = Number((request.params as { id: string }).id)
  const result = await SizeService.update(id, request.body)
  return sendResponse(reply, `Update size ${result}`)
}

export const getSizeController = async (
  request: FastifyRequest<UpdateSizeInputRoute>,
  reply: FastifyReply
) => {
  const result = await SizeService.getAll()
  return sendResponse(reply, `Get size`, result)
}

export const getSizeDetailController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const id = Number((request.params as { id: string }).id)
  const result = await SizeService.getDetail(id)
  return sendResponse(reply, `Get size ${result} success`, result)
}
