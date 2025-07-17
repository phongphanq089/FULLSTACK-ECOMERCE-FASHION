import { Prisma } from '@prisma/client'

type PaginationOptions<T extends Prisma.Enumerable<unknown>> = {
  model: any
  where?: Prisma.PrismaClientKnownRequestError['meta'] | any
  include?: any
  select?: any
  orderBy?: any
  page?: number
  limit?: number
}

export async function pagination<T>({
  model,
  where = {},
  include,
  select,
  orderBy = { createdAt: 'desc' },
  page = 1,
  limit = 10,
}: PaginationOptions<T>) {
  const skip = (page - 1) * limit

  const [data, total] = await Promise.all([
    model.findMany({
      where,
      include,
      select,
      orderBy,
      skip,
      take: limit,
    }),
    model.count({ where }),
  ])

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  }
}
