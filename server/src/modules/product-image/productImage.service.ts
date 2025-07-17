import { prisma } from '@/utils/lib'
import {
  BulkCreateProductImageInput,
  CreateProductImageInput,
  UpdateProductImageInput,
} from './productImage.schema'
import { AppError, NotFoundError } from '@/utils/errors'

export class ProductImageService {
  static async createImageMain(data: CreateProductImageInput) {
    const { productId, imageUrl, altText, isMain } = data
    const productExits = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!productExits) throw new AppError('Product not found')

    if (isMain) {
      await prisma.productImage.updateMany({
        where: { productId },
        data: { isMain: false },
      })
    }
    const image = await prisma.productImage.create({
      data: {
        productId,
        imageUrl,
        altText: altText ?? null,
        isMain,
      },
    })
    return image
  }
  static async bulkCreateImages(data: BulkCreateProductImageInput) {
    const { productId, images } = data
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) throw new AppError('Product not found')

    const hasMain = images.some((img) => img.isMain)
    if (hasMain) {
      await prisma.productImage.updateMany({
        where: { productId },
        data: { isMain: false },
      })
    }

    const createData = images.map((img) => ({
      productId,
      imageUrl: img.imageUrl,
      altText: img.altText ? img.altText : null,
      isMain: img.isMain ?? false,
    }))

    const created = await prisma.productImage.createMany({
      data: createData,
      skipDuplicates: true,
    })
    return {
      count: created.count,
      message: 'Images uploaded successfully',
    }
  }
  static async getImagesByProductId(productId: number) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    })

    if (!product) throw new AppError('Product not found')

    const images = await prisma.productImage.findMany({
      where: { productId },
      orderBy: [{ isMain: 'desc' }, { id: 'asc' }],
    })

    return images
  }
  static async updateImage(id: number, data: UpdateProductImageInput) {
    const existing = await prisma.productImage.findUnique({
      where: { id },
    })

    if (!existing) throw new NotFoundError('Image not found')

    if (data.isMain === true) {
      // Reset các ảnh khác về false nếu ảnh này là ảnh chính mới
      await prisma.productImage.updateMany({
        where: { productId: existing.productId },
        data: { isMain: false },
      })
    }
    const updateData: any = {
      altText: data.altText !== undefined ? data.altText : null,
    }
    if (typeof data.isMain !== 'undefined') {
      updateData.isMain = data.isMain
    }
    const updated = await prisma.productImage.update({
      where: { id },
      data: updateData,
    })

    return updated
  }
  static async deleProductImage(id: number) {
    const result = await prisma.productImage.delete({
      where: { id },
    })
    return result
  }
}
