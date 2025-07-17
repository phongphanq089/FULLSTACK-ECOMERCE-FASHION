import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'
import {
  CreateProductInput,
  FilterProductQueryInput,
  ProductQuerySchemaInput,
} from './product.schema'
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

interface UpdateProductInputRoute extends RouteGenericInterface {
  Body: CreateProductInput
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
  const query = request.query as ProductQuerySchemaInput
  const products = await ProductService.getProductsWithPagination(query)
  return sendResponse(reply, 'Get product success', products)
}

export const getFilterOptionsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const result = await ProductService.getFilterOptions()

  return sendResponse(reply, 'Get filter option success', result)
}

export const getProductFilterController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const query = request.query as FilterProductQueryInput
  const products = await ProductService.filterProducts(query)
  return sendResponse(reply, 'Get product success', products)
}

export const getProductDetailController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const id = Number((request.params as { id: string }).id)

  const result = await ProductService.getProductDetail(id)

  return sendResponse(reply, 'Get product detail  success', result)
}

export const deleteProductController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const id = Number((request.params as { id: string }).id)

  const result = await ProductService.delete(id)

  return sendResponse(reply, `Delete product ${result} succsess`)
}
