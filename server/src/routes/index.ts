import { brandRoutes } from '@/modules/brands/brand.routes'
import { categoryRoutes } from '@/modules/categories/category.routes'
import { colorRoutes } from '@/modules/colors/color.routes'
import { productRoutes } from '@/modules/products/product.routes'
import { createProductSchema } from '@/modules/products/product.schema'
import { sizeRoutes } from '@/modules/sizes/size.routes'
import { FastifyInstance } from 'fastify'
import zodToJsonSchema from 'zod-to-json-schema'

export const registerRoutes = (app: FastifyInstance) => {
  // ===== REGISTER ROUTE V1 ======== //
  app.register(
    async (v1App) => {
      v1App.register(productRoutes, { prefix: '/product' }), // =====> /api/v1/auth, /api/v1/product ,....
        v1App.register(categoryRoutes, { prefix: '/categories' }),
        v1App.register(brandRoutes, { prefix: '/brand' }),
        v1App.register(colorRoutes, { prefix: '/color' }),
        v1App.register(sizeRoutes, { prefix: '/size' })
    },
    { prefix: '/api/v1' }
  )
}
