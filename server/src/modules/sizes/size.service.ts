import { prisma } from '@/utils/lib'
import { CreateSizeInput } from './size.schema'

export class SizeService {
  static async create(data: CreateSizeInput) {
    // Kiểm tra trùng tên
    const existing = await prisma.size.findUnique({
      where: { name: data.name },
    })
    if (existing) throw new Error('Danh mục này đã tồn tại')

    return prisma.size.create({ data })
  }

  static async getAll() {
    return prisma.size.findMany({
      orderBy: { name: 'asc' },
    })
  }
}
