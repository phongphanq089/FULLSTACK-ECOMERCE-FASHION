import { prisma } from '@/utils/lib'
import {
  CreateProductInput,
  FilterProductQueryInput,
  ProductQuerySchemaInput,
} from './product.schema'
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
      if (!exists) throw new AppError('Invalid categoryId')
      data.category = { connect: { id: categoryId } }
    }

    if (brandId) {
      const exists = await prisma.brand.findUnique({ where: { id: brandId } })
      if (!exists) throw new AppError('Invalid Brand')
      data.brand = { connect: { id: brandId } }
    }
    if (sizeIds?.length) {
      const validSizes = await prisma.size.findMany({
        where: { id: { in: sizeIds } },
      })

      if (validSizes.length !== sizeIds.length) {
        throw new AppError('One or more sizeIds are invalid')
      }

      data.sizes = { connect: sizeIds.map((id) => ({ id })) }
    }

    if (colorIds?.length) {
      const validColors = await prisma.color.findMany({
        where: { id: { in: colorIds } },
      })
      if (validColors.length !== colorIds.length) {
        throw new AppError('One or more colorIds are invalid')
      }
      data.colors = { connect: colorIds.map((id) => ({ id })) }
    }

    const product = await prisma.product.create({ data })

    return product
  }
  static async updateProduct(resBody: CreateProductInput, id: string) {
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

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data,
    })

    return product
  }
  static async getFilterOptions() {
    const [categories, brands, sizes, colors] = await Promise.all([
      prisma.category.findMany({ where: { isActive: true } }),
      prisma.brand.findMany({ where: { isActive: true } }),
      prisma.size.findMany(),
      prisma.color.findMany(),
    ])

    return {
      categories,
      brands,
      sizes,
      colors,
    }
  }
  static async getProductsWithPagination(resBody: ProductQuerySchemaInput) {
    const { search, page = 1, limit = 10, orderBy, sort } = resBody
    const where: Prisma.ProductWhereInput = {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    }
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: {
          [orderBy]: sort,
        },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: true,
          brand: true,
          sizes: true,
          colors: true,
          ProductImage: true,
          variants: true,
        },
      }),
      prisma.product.count({ where }),
    ])

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }
  static async getProductDetail(id: number) {
    const result = await prisma.product.findUnique({
      where: { id: id },
      include: {
        category: true,
        brand: true,
        sizes: true,
        colors: true,
        ProductImage: true,
        variants: true,
      },
    })

    return result
  }
  static async filterProducts(query: FilterProductQueryInput) {
    const {
      search,
      categoryId,
      brandId,
      sizeIds,
      colorIds,
      page = 1,
      limit = 10,
      orderBy,
      sort,
      minPrice,
      maxPrice,
    } = query

    const where: Prisma.ProductWhereInput = {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {},
        categoryId ? { categoryId } : {},
        brandId ? { brandId } : {},
        sizeIds?.length ? { sizes: { some: { id: { in: sizeIds } } } } : {},
        colorIds?.length ? { colors: { some: { id: { in: colorIds } } } } : {},
        minPrice !== undefined || maxPrice !== undefined
          ? {
              variants: {
                some: {
                  price: {
                    ...(minPrice !== undefined ? { gte: minPrice } : {}),
                    ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
                  },
                },
              },
            }
          : {},
      ],
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { [orderBy]: sort },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: true,
          brand: true,
          sizes: true,
          colors: true,
          ProductImage: true,
          variants: true,
        },
      }),
      prisma.product.count({ where }),
    ])

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }
  static async delete(id: number) {
    const result = await prisma.product.delete({
      where: { id: id },
    })

    return result.name
  }
}
