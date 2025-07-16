import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'
import { CreateBrandInput, UpdateBrandInput } from './brand.schema'
import { sendResponse } from '@/utils/response'
import { BrandService } from './branch.service'

interface CreateBrandInputRoute extends RouteGenericInterface {
  Body: CreateBrandInput
}
export const createBrandController = async (
  request: FastifyRequest<CreateBrandInputRoute>,
  reply: FastifyReply
) => {
  const result = await BrandService.create(request.body)
  return sendResponse(reply, 'Add new brand success', result)
}

interface UpdateBrandInputRoute extends RouteGenericInterface {
  Body: UpdateBrandInput
}
export const updateBrandController = async (
  request: FastifyRequest<UpdateBrandInputRoute>,
  reply: FastifyReply
) => {
  const id = Number((request.params as { id: string }).id)
  const result = await BrandService.update(id, request.body)
  return sendResponse(reply, `Update brand ${result} success`, result)
}

export const getBrandController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const result = await BrandService.getAll()
  return sendResponse(reply, `Get brand success`, result)
}

export const getBrandDetailController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const id = Number((request.params as { id: string }).id)
  const result = await BrandService.getDetail(id)
  return sendResponse(reply, `Get brand success`, result)
}

export const deleteBrandController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const id = Number((request.params as { id: string }).id)
  const result = await BrandService.delete(id)
  return sendResponse(reply, `Delete brand ${result} success`, result)
}
