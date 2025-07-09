import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'
import { CreateProductInput } from './product.schema'
import { sendResponse } from '@/utils/response'
import { ProductService } from './product.service'
import { prisma } from '@/utils/lib'

interface CreateProductInputRoute extends RouteGenericInterface {
  Body: CreateProductInput
}

interface UpdateProductInputRoute extends RouteGenericInterface {
  Body: CreateProductInput
}

export const createProductController = async (
  request: FastifyRequest<CreateProductInputRoute>,
  reply: FastifyReply
) => {
  const result = await ProductService.addNewProduct(request.body)
  return sendResponse(reply, 'Add new product success', result)
}

export const updateProductController = async (
  request: FastifyRequest<UpdateProductInputRoute>,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string }
  const result = await ProductService.updateProduct(request.body, id)
  return sendResponse(reply, 'Update product success', result)
}

export const getProductController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      brand: true,
      sizes: true,
      colors: true,
      ProductImage: true,
      variants: true,
    },
  })
  return sendResponse(reply, 'Get product success', products)
}

export const getProductDetailController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string }

  const result = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      category: true,
      brand: true,
      sizes: true,
      colors: true,
      ProductImage: true,
      variants: true,
    },
  })
  return sendResponse(reply, 'Get product detail  success', result)
}
