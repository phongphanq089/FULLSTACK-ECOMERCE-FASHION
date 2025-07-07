import { prisma } from '@/utils/lib'
import { CreateBrandInput } from './brand.schema'

export class BrandService {
  static async create(data: CreateBrandInput) {
    // Kiểm tra trùng tên
    const existing = await prisma.brand.findUnique({
      where: { name: data.name },
    })
    if (existing) throw new Error('Danh mục này đã tồn tại')

    return prisma.brand.create({ data })
  }

  static async getAll() {
    return prisma.category.findMany({
      orderBy: { name: 'asc' },
    })
  }
}
