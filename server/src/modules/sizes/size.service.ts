import { prisma } from '@/utils/lib'
import { CreateSizeInput, UpdateSizeInput } from './size.schema'

export class SizeService {
  static async create(data: CreateSizeInput) {
    const existing = await prisma.size.findUnique({
      where: { name: data.name },
    })
    if (existing) throw new Error('This size already exists')

    return prisma.size.create({ data })
  }

  static async update(id: number, data: UpdateSizeInput) {
    const existing = await prisma.size.findUnique({
      where: { name: data.name },
    })

    if (existing) throw new Error('This size already exists')

    const result = await prisma.size.update({ where: { id }, data })

    return result.name
  }

  static async getAll() {
    return prisma.size.findMany({
      orderBy: { name: 'asc' },
    })
  }
  static async getDetail(id: number) {
    const result = await prisma.size.findUnique({
      where: { id },
    })

    return result?.name
  }
}
