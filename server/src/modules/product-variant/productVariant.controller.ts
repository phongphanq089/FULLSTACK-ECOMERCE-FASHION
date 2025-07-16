import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'
import { CreateVariantInput, UpdateVariantInput } from './productVariant.schema'
import { sendResponse } from '@/utils/response'
import { VariantProductService } from './productVariant.service'

interface CreateProductVariantRoute extends RouteGenericInterface {
  Body: CreateVariantInput
}
export const CreateProductVariantController = async (
  request: FastifyRequest<CreateProductVariantRoute>,
  reply: FastifyReply
) => {
  const result = await VariantProductService.create(request.body)
  return sendResponse(reply, 'Create new product', result)
}

interface UpdateProductVariantRoute extends RouteGenericInterface {
  Body: UpdateVariantInput
}
export const updateProductVariantController = async (
  request: FastifyRequest<UpdateProductVariantRoute>,
  reply: FastifyReply
) => {
  const id = Number((request.params as { id: string }).id)
  const result = await VariantProductService.update(id, request.body)

  return sendResponse(reply, 'Create new product', result)
}

export const getProductVariantController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const productId = Number((request.params as { productId: string }).productId)
  const result = await VariantProductService.getProduct(productId)

  return sendResponse(reply, 'Get product success', result)
}

export const getProductVariantDetailController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const id = Number((request.params as { productId: string }).productId)
  const result = await VariantProductService.getProductDetail(id)

  return sendResponse(reply, 'Get product success', result)
}

export const deleteProductVariantController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const id = Number((request.params as { productId: string }).productId)
  const result = await VariantProductService.delete(id)

  return sendResponse(reply, `Delete product ${result} success`)
}
