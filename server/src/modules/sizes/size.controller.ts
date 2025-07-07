import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'

import { sendResponse } from '@/utils/response'

import { CreateSizeInput } from './size.schema'
import { SizeService } from './size.service'

interface CreateSizeInputRoute extends RouteGenericInterface {
  Body: CreateSizeInput
}

export const createSizeController = async (
  request: FastifyRequest<CreateSizeInputRoute>,
  reply: FastifyReply
) => {
  const result = await SizeService.create(request.body)
  return sendResponse(reply, 'Add new brand success', result)
}
