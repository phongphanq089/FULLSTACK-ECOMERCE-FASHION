import { brandRoutes } from '@/modules/brands/brand.routes'
import { categoryRoutes } from '@/modules/categories/category.routes'
import { colorRoutes } from '@/modules/colors/color.routes'
import { logsRoutes } from '@/modules/logs/logs.route'
import { productImageRoutes } from '@/modules/product-image/productImage.routes'
import { productVariantRoutes } from '@/modules/product-variant/productVariant.routes'
import { productRoutes } from '@/modules/products/product.routes'
import { sizeRoutes } from '@/modules/sizes/size.routes'
import { FastifyInstance } from 'fastify'

export const registerRoutes = (app: FastifyInstance) => {
  // ===== REGISTER ROUTE V1 ======== //
  app.register(
    async (v1App) => {
      v1App.register(productRoutes, { prefix: '' }) // =====> /api/v1/auth, /api/v1/product ,....
      v1App.register(productImageRoutes, { prefix: '' })
      v1App.register(categoryRoutes, { prefix: '' })
      v1App.register(brandRoutes, { prefix: '' })
      v1App.register(colorRoutes, { prefix: '' })
      v1App.register(sizeRoutes, { prefix: '' })
      v1App.register(productVariantRoutes, { prefix: '' })
      v1App.register(logsRoutes, { prefix: '' })
    },
    { prefix: '/api/v1' }
  )
}
