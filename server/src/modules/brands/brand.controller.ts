import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'
import { CreateBrandInput } from './brand.schema'
import { sendResponse } from '@/utils/response'
import { BrandService } from './branch.service'

interface CreateCategoryInputRoute extends RouteGenericInterface {
  Body: CreateBrandInput
}

export const createBrandController = async (
  request: FastifyRequest<CreateCategoryInputRoute>,
  reply: FastifyReply
) => {
  const result = await BrandService.create(request.body)
  return sendResponse(reply, 'Add new brand success', result)
}
