import { prisma } from '@/utils/lib'
import { CreateCategoryInput } from './category.schema'

export class CategoryService {
  static async create(data: CreateCategoryInput) {
    // Kiểm tra trùng tên
    const existing = await prisma.category.findUnique({
      where: { name: data.name },
    })
    if (existing) throw new Error('Danh mục này đã tồn tại')

    return prisma.category.create({ data })
  }

  static async getAll() {
    return prisma.category.findMany({
      orderBy: { name: 'asc' },
    })
  }
}
