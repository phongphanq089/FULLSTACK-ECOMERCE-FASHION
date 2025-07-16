import { prisma } from '@/utils/lib'
import { CreateBrandInput, UpdateBrandInput } from './brand.schema'

export class BrandService {
  static async create(data: CreateBrandInput) {
    const existing = await prisma.brand.findUnique({
      where: { name: data.name },
    })
    if (existing) throw new Error('This brand already exists')

    return prisma.brand.create({ data })
  }
  static async update(id: number, data: UpdateBrandInput) {
    const existing = await prisma.brand.findUnique({
      where: { name: data.name },
    })
    if (existing) throw new Error('This brand already exists')
    const update = await prisma.brand.update({
      where: { id },
      data,
    })
    return update
  }
  static async getDetail(id: number) {
    const brand = await prisma.brand.findUnique({
      where: { id },
    })
    return brand
  }

  static async delete(id: number) {
    const brand = await prisma.brand.delete({
      where: { id },
    })
    return brand.name
  }

  static async getAll() {
    return prisma.brand.findMany({
      orderBy: { name: 'asc' },
    })
  }
}
