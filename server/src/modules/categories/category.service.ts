import { prisma } from '@/utils/lib'
import { CreateCategoryInput, UpdateCategoryInput } from './category.schema'
import { AppError } from '@/utils/errors'

export class CategoryService {
  static async create(data: CreateCategoryInput) {
    // Kiểm tra trùng tên
    const existing = await prisma.category.findUnique({
      where: { name: data.name },
    })
    if (existing) throw new AppError('This category already exists')

    return prisma.category.create({ data })
  }

  static async update(id: number, data: UpdateCategoryInput) {
    const existing = await prisma.category.findUnique({
      where: { name: data.name },
    })
    if (existing) throw new AppError('This category already exists')

    const update = await prisma.category.update({
      where: { id },
      data,
    })

    return update
  }

  static async getAll() {
    return prisma.category.findMany({
      orderBy: { name: 'asc' },
    })
  }
  static async getCategoryDetail(id: number) {
    return prisma.category.findUnique({
      where: { id },
    })
  }
  static async delete(id: number) {
    const result = await prisma.category.delete({
      where: { id },
    })
    return result.name
  }
}
