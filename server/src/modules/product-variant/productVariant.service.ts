import { prisma } from '@/utils/lib'
import { CreateVariantInput, UpdateVariantInput } from './productVariant.schema'
import { AppError } from '@/utils/errors'

export class VariantProductService {
  static async create(resBody: CreateVariantInput) {
    const { productId, sizeId, colorId } = resBody

    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      throw new AppError('Invalid productId')
    }
    if (sizeId) {
      const size = await prisma.size.findUnique({ where: { id: sizeId } })
      if (!size) throw new AppError('Invalid sizeId')
    }

    if (colorId) {
      const color = await prisma.color.findUnique({ where: { id: colorId } })
      if (!color) throw new AppError('Invalid colorId')
    }

    const payload = {
      ...resBody,
      productId,
      sizeId: sizeId === undefined ? null : sizeId,
      colorId: colorId === undefined ? null : colorId,
    }

    const productVariant = await prisma.productVariant.create({
      data: payload,
      include: {
        size: true,
        color: true,
      },
    })
    return productVariant
  }

  static async update(id: number, resBody: UpdateVariantInput) {
    const variant = await prisma.productVariant.update({
      where: { id },
      data: {
        ...resBody,
        sizeId: resBody.sizeId === undefined ? null : resBody.sizeId,
        colorId: resBody.colorId === undefined ? null : resBody.colorId,
      },
      include: {
        size: true,
        color: true,
      },
    })

    return variant
  }
  static async getProduct(productId: number) {
    const result = await prisma.productVariant.findMany({
      where: { productId },
      include: {
        size: true,
        color: true,
      },
      orderBy: { id: 'asc' },
    })

    return result
  }
  static async getProductDetail(id: number) {
    const result = await prisma.productVariant.findUnique({
      where: { id },
      include: {
        size: true,
        color: true,
        product: { select: { name: true, id: true } },
      },
    })

    return result
  }
  static async delete(id: number) {
    const result = await prisma.productVariant.delete({
      where: { id },
    })

    return result.id
  }
}
