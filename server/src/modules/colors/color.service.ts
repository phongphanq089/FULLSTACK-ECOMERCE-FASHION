import { prisma } from '@/utils/lib'
import { CreateColorInput, UpdateColorInput } from './color.schema'
import { AppError } from '@/utils/errors'

export class ColorService {
  static async create(data: CreateColorInput) {
    const existing = await prisma.color.findUnique({
      where: { name: data.name },
    })
    if (existing) throw new AppError('This category already exists')

    return prisma.color.create({ data })
  }

  static async update(id: number, data: UpdateColorInput) {
    const existing = await prisma.color.findUnique({
      where: { name: data.name },
    })
    if (existing) throw new AppError('This color already exists')

    const color = await prisma.color.update({
      where: { id },
      data,
    })
    return color.name
  }
  static async getAll() {
    return prisma.category.findMany({
      orderBy: { name: 'asc' },
    })
  }

  static async getDetail(id: number) {
    const color = await prisma.color.findUnique({
      where: { id },
    })
    return color
  }

  static async delete(id: number) {
    const color = await prisma.color.delete({
      where: { id },
    })
    return color.hexCode
  }
}
