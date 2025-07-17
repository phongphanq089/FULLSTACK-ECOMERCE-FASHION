import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'
import {
  BulkCreateProductImageInput,
  CreateProductImageInput,
  UpdateProductImageInput,
} from './productImage.schema'
import { sendResponse } from '@/utils/response'
import { ProductImageService } from './productImage.service'

interface createProductImageInputRoute extends RouteGenericInterface {
  Body: CreateProductImageInput
}

export const createProductImageController = async (
  request: FastifyRequest<createProductImageInputRoute>,
  reply: FastifyReply
) => {
  const result = await ProductImageService.createImageMain(request.body)
  return sendResponse(reply, 'Create product image success', result)
}

interface createBulkProductImageInputRoute extends RouteGenericInterface {
  Body: BulkCreateProductImageInput
}

export const createBulkProductImageController = async (
  request: FastifyRequest<createBulkProductImageInputRoute>,
  reply: FastifyReply
) => {
  const result = await ProductImageService.bulkCreateImages(request.body)
  return sendResponse(reply, 'Create product image success', result)
}

export const getImagesByProductIdController = async (
  request: FastifyRequest<createBulkProductImageInputRoute>,
  reply: FastifyReply
) => {
  const id = Number((request.params as { id: string }).id)
  const result = await ProductImageService.getImagesByProductId(id)
  return sendResponse(reply, 'Get productImage by product success', result)
}

interface UpdateProductImageInputRoute extends RouteGenericInterface {
  Body: UpdateProductImageInput
}

export const updateProductImageController = async (
  request: FastifyRequest<UpdateProductImageInputRoute>,
  reply: FastifyReply
) => {
  const id = Number((request.params as { id: string }).id)
  const result = await ProductImageService.updateImage(id, request.body)
  return sendResponse(reply, 'update success', result)
}

export const deleteProductImageController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const id = Number((request.params as { id: string }).id)
  const result = await ProductImageService.deleProductImage(id)
  return sendResponse(reply, 'Delete product image success', result)
}
