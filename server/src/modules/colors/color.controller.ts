import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'
import { sendResponse } from '@/utils/response'
import { CreateColorInput } from './color.schema'
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
