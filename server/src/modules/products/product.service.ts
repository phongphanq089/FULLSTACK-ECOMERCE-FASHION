import { prisma } from '@/utils/lib'
import { CreateProductInput } from './product.schema'
import { Prisma } from '@prisma/client'
import { AppError } from '@/utils/errors'

export class ProductService {
  static async addNewProduct(resBody: CreateProductInput) {
    const {
      name,
      description,
      imageUrl,
      weight,

      categoryId,
      brandId,
      sizeIds,
      colorIds,
    } = resBody

    const data: Prisma.ProductCreateInput = {
      name,
      description,
      imageUrl,
      weight: weight ?? null,
    }

    if (categoryId) {
      const exists = await prisma.category.findUnique({
        where: { id: categoryId },
      })
      if (!exists) throw new AppError('Category không tồn tại')
      data.category = { connect: { id: categoryId } }
    }

    if (brandId) {
      const exists = await prisma.brand.findUnique({ where: { id: brandId } })
      if (!exists) throw new AppError('Brand không tồn tại')
      data.brand = { connect: { id: brandId } }
    }
    if (sizeIds?.length) {
      data.sizes = { connect: sizeIds.map((id) => ({ id })) }
    }

    if (colorIds?.length) {
      data.colors = { connect: colorIds.map((id) => ({ id })) }
    }

    const product = await prisma.product.create({ data })

    return product
  }
}
