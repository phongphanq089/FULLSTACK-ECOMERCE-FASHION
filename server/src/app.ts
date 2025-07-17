import fastify from 'fastify'
import { ENV_CONFIG } from './config/envConfig'
import fastifyCors from '@fastify/cors'
import prismaPlugin from './plugins/prisma'
import { zodErrorHandlerPlugin } from './middleware/errorHandlerPlugin'
import fastifyCookie from '@fastify/cookie'
import { registerRoutes } from './routes'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { withRefResolver } from 'fastify-zod'
import { rbacSeeder } from './utils/rbacSeeder'

export const buildApp = () => {
  const app = fastify({
    logger: ENV_CONFIG.isDevelopment,
  })

  app.register(fastifyCors, {
    origin: ENV_CONFIG.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  })

  app.register(
    fastifyCookie,
    ENV_CONFIG.COOKIE_SECRET
      ? { secret: ENV_CONFIG.COOKIE_SECRET, parseOptions: {} }
      : { parseOptions: {} }
  )

  app.register(prismaPlugin)
  // ======= RUN REGISTER ROUTE ====== //

  app.register(
    fastifySwagger,
    withRefResolver({
      openapi: {
        info: {
          title: 'Ecommerce API Docs',
          description: 'API documentation for the ecommerce website',
          version: '1.0.0',
        },
      },
    })
  )

  // 5. Đăng ký error handler cuối cùng
  app.register(zodErrorHandlerPlugin)

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })

  registerRoutes(app)

  rbacSeeder(app)

  app.get('/', async (request, reply) => {
    return reply.send({
      success: true,
      message:
        ' ✅ ✅ ============= API ECOMMERCE WEBSITE PROJECT  ✅ ✅ =============',
      timestamp: new Date().toISOString(),
    })
  })

  return app
}
