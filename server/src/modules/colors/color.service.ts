import { prisma } from '@/utils/lib'
import { CreateColorInput } from './color.schema'

export class ColorService {
  static async create(data: CreateColorInput) {
    // Kiểm tra trùng tên
    const existing = await prisma.color.findUnique({
      where: { name: data.name },
    })
    if (existing) throw new Error('Danh mục này đã tồn tại')

    return prisma.color.create({ data })
  }

  static async getAll() {
    return prisma.category.findMany({
      orderBy: { name: 'asc' },
    })
  }
}
