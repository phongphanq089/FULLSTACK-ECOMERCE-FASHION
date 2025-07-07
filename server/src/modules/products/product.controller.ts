import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'
import { CreateProductInput } from './product.schema'
import { sendResponse } from '@/utils/response'
import { ProductService } from './product.service'

interface CreateProductInputRoute extends RouteGenericInterface {
  Body: CreateProductInput
}

export const createProductController = async (
  request: FastifyRequest<CreateProductInputRoute>,
  reply: FastifyReply
) => {
  const result = await ProductService.addNewProduct(request.body)
  return sendResponse(reply, 'Add new product success', result)
}
